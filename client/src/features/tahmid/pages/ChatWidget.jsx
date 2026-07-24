import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';

const initialMessages = [
  { role: 'assistant', text: 'Ask me about countries, universities, or scholarship fit.' },
  { role: 'user', text: 'Show me strong STEM options.' },
];

const ChatWidget = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  const handleSend = (event) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setMessages((current) => [...current, { role: 'user', text: message }, { role: 'assistant', text: 'Good fit: Canada, Germany, and the UK for STEM.' }]);
    setMessage('');
  };

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex-1 space-y-3">
        {messages.map((entry, index) => (
          <div key={`${entry.role}-${index}`} className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${entry.role === 'assistant' ? 'bg-slate-100 text-slate-700' : 'ml-auto bg-brand text-white'}`}>
            {entry.text}
          </div>
        ))}
      </div>
      <form className="mt-5 flex gap-3" onSubmit={handleSend}>
        <Input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type your question..." />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </form>
    </Card>
  );
};

export default ChatWidget;
