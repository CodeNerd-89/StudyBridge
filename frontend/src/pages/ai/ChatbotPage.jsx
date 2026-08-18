import ChatWidget from '../../features/ai/ChatWidget';
import NotificationBell from '../../features/ai/NotificationBell';

const ChatbotPage = () => {
  return (
    <section className="flex flex-col space-y-3">
      {/* Compact Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">AI Admission Advisor</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
            Get instant personalized university recommendations, scholarship matches, and admission advice.
          </p>
        </div>
        <NotificationBell />
      </div>

      {/* Main Chat Interface */}
      <ChatWidget />
    </section>
  );
};

export default ChatbotPage;
