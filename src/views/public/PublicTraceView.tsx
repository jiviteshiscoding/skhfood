import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROUTE_PATHS } from '@/routes/route-paths';
import { 
  CheckCircle2, 
  QrCode, 
  ArrowLeft,
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';

export const PublicTraceView: React.FC = () => {
  const { batchCode } = useParams<{ batchCode: string }>();

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link to={ROUTE_PATHS.HOME}>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Badge variant="status" statusKey="PROCESSED">
          Batch Active
        </Badge>
      </div>

      {/* Hero Card */}
      <Card variant="glass" className="mb-6 shadow-md border-emerald-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase text-brand-700 tracking-wider">
                Public Food Trace
              </span>
              <ShieldCheck className="w-4 h-4 text-brand-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Batch: {batchCode || 'Unknown'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Verified Farm-to-Consumer Digital Record
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 self-stretch sm:self-auto justify-center">
            <QrCode className="w-8 h-8 text-slate-800" />
            <div className="text-left text-xs">
              <div className="font-semibold text-slate-900">Public QR Trace</div>
              <div className="text-slate-500 font-mono">SKH-VERIFIED</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200/60 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Product</span>
            <span className="font-semibold text-slate-800">Packaged Biscuit</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Chain Depth</span>
            <span className="font-semibold text-slate-800">6 Stages (Verified)</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Recall Status</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Clean
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Expiry Status</span>
            <span className="font-semibold text-slate-800">Active / Safe</span>
          </div>
        </div>
      </Card>

      {/* Tabs Placeholder */}
      <div className="flex gap-2 border-b border-slate-200 mb-6 pb-2 text-sm font-medium text-slate-600">
        <span className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 font-semibold cursor-pointer">
          Trace Overview
        </span>
        <span className="px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
          Lineage Graph (Phase 8)
        </span>
        <span className="px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer">
          Route Map (Phase 9)
        </span>
      </div>

      {/* Foundation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-500" />
            Origin & Processing
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Phase 0 sets up the public route architecture for consumer trace lookup without requiring user authentication.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600">
            <div><strong>Origin:</strong> Kopargaon Agriculture Zone</div>
            <div><strong>Transformations:</strong> 3 Recorded Merges</div>
          </div>
        </Card>

        <Card variant="default">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            Custody Timeline
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Live timeline events and cryptographic event hash verification will be populated in subsequent phases.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-600">
            <div><strong>Production Date:</strong> 2026-08-20</div>
            <div><strong>Verified Transfers:</strong> 6 Handoffs</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
