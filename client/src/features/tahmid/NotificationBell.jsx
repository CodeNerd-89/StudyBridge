import { useState } from 'react';
import { Bell } from 'lucide-react';
import Badge from '../../components/ui/Badge';

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand hover:text-brand"
      >
        <Bell className="h-4 w-4" />
        Notifications
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <Badge variant="accent">2 updates</Badge>
          <p className="mt-3 text-sm text-slate-600">New scholarship deadline and a fresh quiz recommendation are ready.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;