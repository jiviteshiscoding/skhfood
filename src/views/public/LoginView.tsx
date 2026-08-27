import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Sprout, Lock, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDummySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.info(
        'Phase 0 Foundation Active: Full Supabase authentication is scheduled for Phase 1/2.',
        'Foundation Shell'
      );
    }, 600);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-brand-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Stakeholder Sign In</h2>
          <p className="text-sm text-slate-600 mt-1">
            Access your supply chain role portal
          </p>
        </div>

        <Card variant="glass" className="shadow-lg">
          <form onSubmit={handleDummySubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="stakeholder@farmtracer.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200/60">
            <Alert variant="info" title="Phase 0 Status">
              Login UI shell created with pure styling & components. Real Supabase auth workflows will be integrated in Phase 1 & 2.
            </Alert>
          </div>
        </Card>
      </div>
    </div>
  );
};
