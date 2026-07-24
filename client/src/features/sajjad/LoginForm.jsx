import { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="max-w-xl p-6 sm:p-8">
      <Badge variant="brand">Secure access</Badge>
      <h2 className="mt-4 text-2xl font-bold text-primary">Sign in to your StudyBridge workspace</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Use the same account for recommendations, saved lists, and AI practice.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
        </div>
        <Button className="w-full" type="submit" variant="primary">
          Continue
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;