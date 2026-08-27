import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTE_PATHS } from '@/routes/route-paths';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sprout, LogOut, User as UserIcon } from 'lucide-react';
import { ROLE_LABELS } from '@/config/constants';

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2.5 font-bold text-slate-900 group">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm group-hover:bg-brand-700 transition">
            <Sprout className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight">Farm Tracer</span>
            <span className="text-[10px] uppercase font-semibold text-brand-700 tracking-wider">SKH031 Digital Traceability</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-800">
                  {profile?.full_name || user.email}
                </span>
                {profile?.role && (
                  <Badge variant="success" size="sm">
                    {ROLE_LABELS[profile.role] || profile.role}
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={ROUTE_PATHS.LOGIN}>
                <Button variant="primary" size="sm" leftIcon={<UserIcon className="w-3.5 h-3.5" />}>
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
