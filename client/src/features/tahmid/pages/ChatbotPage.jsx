import ChatWidget from './ChatWidget';
import NotificationBell from '../NotificationBell';

const ChatbotPage = () => {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Tahmid</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary">Chatbot</h1>
          <p className="mt-4 max-w-2xl text-slate-600">Use the assistant to get faster recommendations and quick answers.</p>
        </div>
        <NotificationBell />
      </div>
      <ChatWidget />
    </section>
  );
};

export default ChatbotPage;
