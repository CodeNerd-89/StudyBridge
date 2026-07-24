import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const AIChatBanner = () => {
  return (
    <Card className="flex flex-col gap-4 bg-primary p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Badge variant="accent">Tahmid</Badge>
        <h2 className="mt-3 text-2xl font-bold">Need a fast answer from the AI assistant?</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">Get advice on country selection, application timing, and scholarship fit in one chat.</p>
      </div>
      <Button to="/chatbot" variant="secondary">
        Open chat
      </Button>
    </Card>
  );
};

export default AIChatBanner;