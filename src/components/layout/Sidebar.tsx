import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/route-paths';
import { 
  LayoutDashboard, 
  Boxes, 
  History, 
  GitFork, 
  AlertOctagon, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: ROUTE_PATHS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { to: ROUTE_PATHS.BATCHES, label: 'Batches', icon: Boxes },
    { to: ROUTE_PATHS.EVENTS, label: 'Supply Chain Events', icon: History },
    { to: ROUTE_PATHS.LINEAGE, label: 'Lineage & Graph', icon: GitFork },
    { to: ROUTE_PATHS.RECALLS, label: 'Safety & Recalls', icon: AlertOctagon },
    { to: ROUTE_PATHS.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">SKH031 Build</p>
        <p className="mt-0.5">Phase 0 Foundation</p>
      </div>
    </aside>
  );
};
