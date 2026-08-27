import React, { useState } from "react";
import {
  LogOut,
  ShieldCheck,
  Building2,
  MapPin,
  FileCheck,
  Sparkles,
  QrCode,
  Wifi,
  WifiOff,
  RefreshCw,
  Layers,
  ChevronDown,
  UserCheck,
  ArrowRight,
  PlusCircle,
  AlertTriangle,
} from "lucide-react";
import { UserRole, UserProfile, SupportedLanguage } from "../../types";
import { ROLE_CONFIGS } from "../../pages/LoginPage";
import { Navbar } from "../Navbar";
import { MobileNav } from "../MobileNav";
import { TRANSLATIONS } from "../../lib/translations";

interface ProtectedShellProps {
  currentRole: UserRole;
  currentUser: UserProfile;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onLogout: () => void;
  onRoleChange: (role: UserRole) => void;
  onOpenLoginModal: () => void;
  onOpenScanner: () => void;
  onOpenSyncModal: () => void;
  onNavigateHome: () => void;
  onNavigateTrace?: (batchId?: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  pendingSyncCount: number;
  canInstallPwa: boolean;
  onInstallPwa: () => void;
  children: React.ReactNode;
}

export const ProtectedShell: React.FC<ProtectedShellProps> = ({
  currentRole,
  currentUser,
  language,
  onLanguageChange,
  onLogout,
  onRoleChange,
  onOpenLoginModal,
  onOpenScanner,
  onOpenSyncModal,
  onNavigateHome,
  onNavigateTrace,
  isOffline,
  onToggleOffline,
  pendingSyncCount,
  canInstallPwa,
  onInstallPwa,
  children,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const roleCfg = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.FARMER;
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        currentUser={currentUser}
        onOpenLoginModal={onOpenLoginModal}
        onRoleChange={onRoleChange}
        language={language}
        onLanguageChange={onLanguageChange}
        isOffline={isOffline}
        onToggleOffline={onToggleOffline}
        pendingSyncCount={pendingSyncCount}
        onOpenSyncModal={onOpenSyncModal}
        onOpenScanner={onOpenScanner}
        onNavigateHome={onNavigateHome}
        canInstallPwa={canInstallPwa}
        onInstallPwa={onInstallPwa}
      />

      {/* Protected Session Status Bar */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: Active Stakeholder Identity Banner */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs border ${roleCfg.bgLightClass} ${roleCfg.borderClass}`}>
                {roleCfg.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    {currentUser.name}
                  </h1>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${roleCfg.bgLightClass} ${roleCfg.borderClass} ${roleCfg.textClass}`}>
                    {roleCfg.title}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> FSSAI Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 font-medium mt-0.5">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    {currentUser.organization}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {currentUser.district}, {currentUser.state}
                  </span>
                  {currentUser.fssaiNumber && (
                    <>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline font-mono text-[11px] text-slate-600">
                        {currentUser.fssaiNumber}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Quick Role Switcher & Explicit Logout Button */}
            <div className="flex items-center gap-2 self-end md:self-center">
              {/* Switch Role Dropdown Trigger */}
              <button
                type="button"
                onClick={onOpenLoginModal}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
                title="Switch Stakeholder Role"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.switch_role || "Switch Role"}</span>
              </button>

              {/* Explicit Sign Out Button */}
              <button
                type="button"
                onClick={onLogout}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200 shadow-2xs"
                title="Sign out of active session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>{t.logout || "Log Out"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Protected Content Area */}
      <main className="flex-1 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab="DASHBOARD"
        onSelectTab={(tab) => {
          if (tab === "SCANNER") onOpenScanner();
          else if (tab === "HOME") onNavigateHome();
          else if (tab === "TRACE" && onNavigateTrace) onNavigateTrace();
        }}
        onOpenScanner={onOpenScanner}
        pendingSyncCount={pendingSyncCount}
        onOpenSyncModal={onOpenSyncModal}
        onOpenLoginModal={onOpenLoginModal}
        currentRole={currentRole}
        currentUser={currentUser}
      />
    </div>
  );
};
