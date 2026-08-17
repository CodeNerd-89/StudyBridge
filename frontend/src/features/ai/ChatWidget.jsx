import { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import api from '../../services/api';

const initialMessages = [
  { role: 'assistant', text: 'Hi! I\'m your AI Admission Advisor. Ask me about universities, scholarships, or your admission chances.' },
];

const ChatWidget = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (event) => {
    event.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();
    setMessages((current) => [...current, { role: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', { message: userMessage });
      setMessages((current) => [...current, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      const errorText = err.response?.data?.message || 'Something went wrong. Please try again.';
      setMessages((current) => [...current, { role: 'assistant', text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex-1 space-y-3">
        {messages.map((entry, index) => (
          <div key={`${entry.role}-${index}`} className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${entry.role === 'assistant' ? 'bg-slate-100 text-slate-700' : 'ml-auto bg-brand text-white'}`}>
            {entry.text}
          </div>
        ))}
        {loading && (
          <div className="max-w-[80%] rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-400">
            Thinking...
          </div>
        )}
      </div>
      <form className="mt-5 flex gap-3" onSubmit={handleSend}>
        <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type your question..." disabled={loading} />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? '...' : 'Send'}
        </Button>
      </form>
    </Card>
  );
};

export default ChatWidget;

