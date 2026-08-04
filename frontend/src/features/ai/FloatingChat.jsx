import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import api from '../../services/api';

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! 👋 I\'m your AI Admission Advisor. Ask me anything about universities, scholarships, or your admission chances.' },
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { message: userMessage });
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      const errorText = err.response?.status === 401
        ? 'Please log in to use the AI advisor.'
        : err.response?.data?.message || 'Something went wrong. Please try again.';
      setMessages((prev) => [...prev, { role: 'assistant', text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ───── Chat Panel ───── */}
      <div
        className={`fixed bottom-24 right-6 z-[60] flex w-[370px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ${
          open
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">StudyBridge AI</p>
            <p className="text-xs text-white/70">Admission Advisor</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((entry, index) => (
            <div
              key={`${entry.role}-${index}`}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                entry.role === 'assistant'
                  ? 'bg-slate-100 text-slate-700'
                  : 'ml-auto bg-primary text-white'
              }`}
            >
              {entry.text}
            </div>
          ))}
          {loading && (
            <div className="flex max-w-[85%] items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-slate-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {isLoggedIn ? (
          <form className="flex items-center gap-2 border-t border-slate-100 px-4 py-3" onSubmit={handleSend}>
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about admissions..."
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/10 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-opacity-90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <div className="border-t border-slate-100 px-4 py-3 text-center text-sm text-slate-500">
            <a href="/login" className="font-semibold text-primary underline">Log in</a> to chat with the advisor
          </div>
        )}
      </div>

      {/* ───── Floating Bubble ───── */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          open
            ? 'bg-slate-600 hover:bg-slate-700'
            : 'bg-primary hover:bg-opacity-90'
        }`}
        aria-label={open ? 'Close chat' : 'Open AI advisor'}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <span className="pointer-events-none fixed bottom-6 right-6 z-[59] h-14 w-14 animate-ping rounded-full bg-accent/30" />
      )}
    </>
  );
};

export default FloatingChat;
