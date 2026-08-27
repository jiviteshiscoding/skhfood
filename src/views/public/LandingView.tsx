import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS, buildTraceUrl } from '@/routes/route-paths';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  GitFork, 
  AlertTriangle,
  QrCode
} from 'lucide-react';

export const LandingView: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="success" size="md" className="mb-4">
          SKH031 Food Safety & Traceability
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Track the batch. <br className="hidden sm:inline" />
          <span className="text-brand-600">Trace the lineage.</span> <br className="hidden sm:inline" />
          Recall only what&apos;s affected.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          From farm harvest to retail shelf. A verified digital supply-chain graph connecting 
          farmers, aggregators, processors, factories, distributors, and consumers.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to={ROUTE_PATHS.LOGIN}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Stakeholder Portal
            </Button>
          </Link>
          <Link to={buildTraceUrl('FT-BSK-2026-001')}>
            <Button variant="outline" size="lg" leftIcon={<Search className="w-4 h-4" />}>
              Explore Public Trace
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        <Card variant="glass" className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-brand-700 flex items-center justify-center">
            <GitFork className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Transformation Lineage</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Record batch merging, splitting, and multi-ingredient transformations (e.g., Wheat → Maida → Biscuit).
          </p>
        </Card>

        <Card variant="glass" className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Targeted Recall Engine</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Trace contaminated sources forward through graph traversal to pinpoint exact downstream retail inventory.
          </p>
        </Card>

        <Card variant="glass" className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Consumer Transparency</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Public QR verification with verified custody transfers, shelf-life calculation, and journey timelines.
          </p>
        </Card>
      </div>

      {/* Hero Architecture Spec Banner */}
      <div className="mt-12 max-w-4xl mx-auto w-full">
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 rounded-xl text-brand-400">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Phase 0 Clean Foundation</h4>
              <p className="text-xs text-slate-400">React + TypeScript + Vite + Supabase Schema Ready</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info" size="sm">rebuild branch</Badge>
            <Badge variant="success" size="sm">Phase 0 Verified</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
