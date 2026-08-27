import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 SKH Farm Tracer. Smart Kopargaon Hackathon (SKH031) Digital Food Traceability.</p>
        </div>
      </footer>
    </div>
  );
};
