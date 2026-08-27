import React, { useState, useId } from "react";
import {
  Sprout,
  Factory,
  Truck,
  Warehouse as WarehouseIcon,
  Store,
  ShieldAlert,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Globe,
  HelpCircle,
  Fingerprint,
  RefreshCw,
} from "lucide-react";
import { UserRole, UserProfile, SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../lib/translations";

export interface RoleConfig {
  key: UserRole;
  title: string;
  category: string;
  icon: string;
  badge: string;
  defaultEmail: string;
  defaultPass: string;
  description: string;
  themeColor: string;
  borderClass: string;
  bgLightClass: string;
  bgDarkClass: string;
  textClass: string;
  ringClass: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  FARMER: {
    key: "FARMER",
    title: "Farmer / Producer",
    category: "Upstream Production",
    icon: "🌱",
    badge: "Producer Node",
    defaultEmail: "farmer@sahyadri.org",
    defaultPass: "farmer123",
    description: "Create crop batches, log harvest, geotag farm location & generate verifiable QR labels.",
    themeColor: "emerald",
    borderClass: "border-emerald-300",
    bgLightClass: "bg-emerald-50",
    bgDarkClass: "bg-emerald-600",
    textClass: "text-emerald-700",
    ringClass: "focus:ring-emerald-500",
  },
  PROCESSOR: {
    key: "PROCESSOR",
    title: "Agro Processor",
    category: "Transformation Hub",
    icon: "🏭",
    badge: "Processing Plant",
    defaultEmail: "processor@sahyadriagro.in",
    defaultPass: "processor123",
    description: "Scan incoming raw crops, process & package outputs, and link DAG lineage.",
    themeColor: "blue",
    borderClass: "border-blue-300",
    bgLightClass: "bg-blue-50",
    bgDarkClass: "bg-blue-600",
    textClass: "text-blue-700",
    ringClass: "focus:ring-blue-500",
  },
  DISTRIBUTOR: {
    key: "DISTRIBUTOR",
    title: "Distributor & Logistics",
    category: "Cold Chain Transport",
    icon: "📦",
    badge: "Logistics Hub",
    defaultEmail: "distributor@mahindralogistics.com",
    defaultPass: "distributor123",
    description: "Log custody transfers, record vehicle & reefer temperatures, track transit custody.",
    themeColor: "amber",
    borderClass: "border-amber-300",
    bgLightClass: "bg-amber-50",
    bgDarkClass: "bg-amber-600",
    textClass: "text-amber-700",
    ringClass: "focus:ring-amber-500",
  },
  COLD_STORAGE: {
    key: "COLD_STORAGE",
    title: "Cold Storage Warehouse",
    category: "Temperature Control",
    icon: "❄️",
    badge: "Thermal Vault",
    defaultEmail: "coldstorage@gokulmilk.coop",
    defaultPass: "coldstorage123",
    description: "Monitor humidity/temp sensors and maintain cold chain integrity for perishables.",
    themeColor: "cyan",
    borderClass: "border-cyan-300",
    bgLightClass: "bg-cyan-50",
    bgDarkClass: "bg-cyan-600",
    textClass: "text-cyan-700",
    ringClass: "focus:ring-cyan-500",
  },
  TRANSPORTER: {
    key: "TRANSPORTER",
    title: "Reefer Transporter",
    category: "Transit Fleet",
    icon: "🚚",
    badge: "Reefer Fleet",
    defaultEmail: "transporter@fastfreight.in",
    defaultPass: "transporter123",
    description: "Manage reefer truck fleet, log real-time transit telemetry and checkpoints.",
    themeColor: "indigo",
    borderClass: "border-indigo-300",
    bgLightClass: "bg-indigo-50",
    bgDarkClass: "bg-indigo-600",
    textClass: "text-indigo-700",
    ringClass: "focus:ring-indigo-500",
  },
  WAREHOUSE: {
    key: "WAREHOUSE",
    title: "Warehouse Hub",
    category: "Storage Logistics",
    icon: "🏬",
    badge: "Storage Hub",
    defaultEmail: "warehouse@snowmancold.com",
    defaultPass: "warehouse123",
    description: "Log pallet storage, dispatch verification, and tamper-evident receipts.",
    themeColor: "teal",
    borderClass: "border-teal-300",
    bgLightClass: "bg-teal-50",
    bgDarkClass: "bg-teal-600",
    textClass: "text-teal-700",
    ringClass: "focus:ring-teal-500",
  },
  RETAILER: {
    key: "RETAILER",
    title: "Retailer / Supermarket",
    category: "Point of Sale",
    icon: "🏪",
    badge: "Retail Point",
    defaultEmail: "retailer@naturefresh.com",
    defaultPass: "retailer123",
    description: "Scan delivered shipments, verify shelf-life, mark batches ready for consumers.",
    themeColor: "purple",
    borderClass: "border-purple-300",
    bgLightClass: "bg-purple-50",
    bgDarkClass: "bg-purple-600",
    textClass: "text-purple-700",
    ringClass: "focus:ring-purple-500",
  },
  AUTHORITY: {
    key: "AUTHORITY",
    title: "FSSAI Inspector",
    category: "Regulatory Supervision",
    icon: "🛡️",
    badge: "Govt Authority",
    defaultEmail: "inspector@fssai.gov.in",
    defaultPass: "authority123",
    description: "Audit regulatory compliance, analyze risk alerts, and issue targeted recalls.",
    themeColor: "rose",
    borderClass: "border-rose-300",
    bgLightClass: "bg-rose-50",
    bgDarkClass: "bg-rose-600",
    textClass: "text-rose-700",
    ringClass: "focus:ring-rose-500",
  },
  ADMIN: {
    key: "ADMIN",
    title: "Platform Admin",
    category: "System Core",
    icon: "⚙️",
    badge: "System Core",
    defaultEmail: "admin@farmtracer.internal",
    defaultPass: "admin123",
    description: "Manage system state, offline sync queues, and node security parameters.",
    themeColor: "slate",
    borderClass: "border-slate-300",
    bgLightClass: "bg-slate-100",
    bgDarkClass: "bg-slate-800",
    textClass: "text-slate-800",
    ringClass: "focus:ring-slate-500",
  },
  CONSUMER: {
    key: "CONSUMER",
    title: "Consumer / Citizen",
    category: "Public Transparency",
    icon: "🛒",
    badge: "Citizen Access",
    defaultEmail: "consumer@citizen.in",
    defaultPass: "consumer123",
    description: "Scan product QR codes on packaging to verify farm-to-fork origin and safety.",
    themeColor: "emerald",
    borderClass: "border-emerald-300",
    bgLightClass: "bg-emerald-50",
    bgDarkClass: "bg-emerald-600",
    textClass: "text-emerald-700",
    ringClass: "focus:ring-emerald-500",
  },
};

const LANGUAGES: { code: SupportedLanguage; label: string; nativeName: string }[] = [
  { code: "EN", label: "English", nativeName: "English" },
  { code: "HI", label: "Hindi", nativeName: "हिंदी" },
  { code: "MR", label: "Marathi", nativeName: "मराठी" },
  { code: "GU", label: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "TA", label: "Tamil", nativeName: "தமிழ்" },
  { code: "TE", label: "Telugu", nativeName: "తెలుగు" },
  { code: "KN", label: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "BN", label: "Bengali", nativeName: "বাংলা" },
  { code: "PA", label: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, userProfile: UserProfile) => void;
  onOpenPublicScanner: () => void;
  onNavigatePublicTrace: () => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  demoUsers: Record<UserRole, UserProfile>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onOpenPublicScanner,
  onNavigatePublicTrace,
  language,
  onLanguageChange,
  demoUsers,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;

  const [selectedRole, setSelectedRole] = useState<UserRole>("FARMER");
  const [email, setEmail] = useState<string>(ROLE_CONFIGS.FARMER.defaultEmail);
  const [password, setPassword] = useState<string>(ROLE_CONFIGS.FARMER.defaultPass);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStepText, setLoadingStepText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showDemoGrid, setShowDemoGrid] = useState<boolean>(true);

  const emailInputId = useId();
  const passwordInputId = useId();

  const currentRoleCfg = ROLE_CONFIGS[selectedRole] || ROLE_CONFIGS.FARMER;

  // Handle role switch - also auto-fills email/pass for quick evaluation
  const handleRoleSelect = (roleKey: UserRole) => {
    setSelectedRole(roleKey);
    const cfg = ROLE_CONFIGS[roleKey];
    setEmail(cfg.defaultEmail);
    setPassword(cfg.defaultPass);
    setErrorMessage(null);
    setFieldErrors({});
  };

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = t.invalid_email || "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = t.invalid_email || "Please enter a valid email format.";
    }

    if (!password) {
      errors.password = t.password_short || "Password is required.";
    } else if (password.length < 4) {
      errors.password = t.password_short || "Password must be at least 4 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoadingStepText(t.logging_in || "Verifying credentials...");

    // Simulated async authentication process
    setTimeout(() => {
      setLoadingStepText("Establishing tamper-evident audit node...");
    }, 450);

    setTimeout(() => {
      // Find matching demo user or construct custom profile
      const demoProfile = demoUsers[selectedRole];
      const userProfile: UserProfile = {
        id: demoProfile?.id || `usr-${Date.now()}`,
        name: demoProfile?.name || email.split("@")[0].replace(".", " ").toUpperCase(),
        organization: demoProfile?.organization || `${selectedRole} Enterprise Node`,
        email: email.trim(),
        role: selectedRole,
        district: demoProfile?.district || "Pune",
        state: demoProfile?.state || "Maharashtra",
        address: demoProfile?.address || "Maharashtra, India",
        fssaiNumber: demoProfile?.fssaiNumber || `FSSAI-${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
        verified: true,
      };

      if (rememberMe) {
        localStorage.setItem("farm_tracer_active_user", JSON.stringify(userProfile));
        localStorage.setItem("farm_tracer_auth_token", `ft-auth-${Date.now()}`);
      }

      setIsLoading(false);
      onLoginSuccess(selectedRole, userProfile);
    }, 900);
  };

  const handleInstantDemoLogin = (roleKey: UserRole) => {
    setSelectedRole(roleKey);
    const cfg = ROLE_CONFIGS[roleKey];
    setEmail(cfg.defaultEmail);
    setPassword(cfg.defaultPass);
    const demoProfile = demoUsers[roleKey] || demoUsers.FARMER;

    setIsLoading(true);
    setLoadingStepText(`Connecting to ${cfg.title} node...`);

    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem("farm_tracer_active_user", JSON.stringify(demoProfile));
        localStorage.setItem("farm_tracer_auth_token", `ft-auth-${Date.now()}`);
      }
      setIsLoading(false);
      onLoginSuccess(roleKey, demoProfile);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white font-sans antialiased relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-teal-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-slate-700/60 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 font-black text-lg ring-2 ring-emerald-400/30">
            FT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-serif">
                {t.app_title || "Farm Tracer"}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                SKH031 Core MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden md:block">
              {t.tagline || "From Farm to Fork, Know the Journey"}
            </p>
          </div>
        </div>

        {/* Header Right Actions: Language Selector & Public QR Scanner */}
        <div className="flex items-center gap-2.5">
          {/* Public Scanner Button */}
          <button
            onClick={onOpenPublicScanner}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 text-xs font-bold transition-all shadow-xs"
            title="Scan QR Code as Public Consumer"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">{t.scan_qr || "Scan QR"}</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-emerald-400 absolute left-2.5 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Interface Language"
              className="pl-8 pr-3 py-1.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer appearance-none shadow-xs hover:bg-slate-700 transition-colors"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.nativeName} ({lang.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Login Workspace Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          
          {/* Left Column: Stakeholder Role Selector & Supply Chain Blueprint */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-800/40 border border-slate-700/60 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Supply Chain Stakeholder Nodes
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                  10 Verified Roles
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Farm Tracer provides role-tailored cryptographic capabilities at each stage of the food supply chain.
                Select a persona to auto-populate test credentials:
              </p>

              {/* Role Tiles Grid */}
              <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((rKey) => {
                  const cfg = ROLE_CONFIGS[rKey];
                  const isSelected = selectedRole === rKey;
                  return (
                    <button
                      key={rKey}
                      type="button"
                      onClick={() => handleRoleSelect(rKey)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? `bg-slate-800 border-emerald-400 ring-2 ring-emerald-500/50 shadow-md`
                          : `bg-slate-900/60 border-slate-700/70 hover:bg-slate-800/60 hover:border-slate-600`
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-xl">{cfg.icon}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-white leading-tight">
                          {cfg.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                          {cfg.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Role Highlight Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-xs mt-2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">{currentRoleCfg.icon}</span>
                <div>
                  <span className="font-bold text-white text-sm">
                    {currentRoleCfg.title}
                  </span>
                  <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {currentRoleCfg.badge}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentRoleCfg.description}
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Default Test ID:</span>
                <code className="text-emerald-300 font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded">
                  {currentRoleCfg.defaultEmail}
                </code>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Form Title & Role Context Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
                      {t.sign_in_title || "Supply Chain Node Login"}
                    </h1>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {t.sign_in_subtitle || "Authenticate your tamper-evident supply chain node identity."}
                  </p>
                </div>

                {/* Selected Role Pill */}
                <div className={`px-3 py-1 rounded-full border text-xs font-extrabold flex items-center gap-1.5 ${currentRoleCfg.bgLightClass} ${currentRoleCfg.borderClass} ${currentRoleCfg.textClass}`}>
                  <span>{currentRoleCfg.icon}</span>
                  <span>{currentRoleCfg.title}</span>
                </div>
              </div>

              {/* Error Banner if error exists */}
              {errorMessage && (
                <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <p className="flex-1 font-medium">{errorMessage}</p>
                </div>
              )}

              {/* Interactive Authentication Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor={emailInputId}
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    {t.email_label || "Email Address"} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      id={emailInputId}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                      }}
                      placeholder={t.email_placeholder || "farmer@sahyadri.org"}
                      disabled={isLoading}
                      className={`w-full pl-9 pr-4 py-3 bg-slate-50 border text-slate-900 rounded-2xl text-sm font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                        fieldErrors.email
                          ? "border-rose-400 focus:ring-rose-500 bg-rose-50/40"
                          : `border-slate-200 ${currentRoleCfg.ringClass}`
                      }`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={passwordInputId}
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      {t.password_label || "Password"} <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail(currentRoleCfg.defaultEmail);
                        setPassword(currentRoleCfg.defaultPass);
                        setErrorMessage(null);
                      }}
                      className="text-[11px] font-bold text-emerald-700 hover:underline"
                    >
                      {t.quick_fill_credentials || "Auto-fill Demo Password"}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      id={passwordInputId}
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                      }}
                      placeholder={t.password_placeholder || "Enter password"}
                      disabled={isLoading}
                      className={`w-full pl-9 pr-11 py-3 bg-slate-50 border text-slate-900 rounded-2xl text-sm font-medium transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                        fieldErrors.password
                          ? "border-rose-400 focus:ring-rose-500 bg-rose-50/40"
                          : `border-slate-200 ${currentRoleCfg.ringClass}`
                      }`}
                    />
                    {/* Password Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Session Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span>{t.remember_me || "Keep node session active (IndexedDB)"}</span>
                  </label>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Fingerprint className="w-3.5 h-3.5 text-emerald-600" /> Offline Encrypted
                  </span>
                </div>

                {/* Primary Submit Button & 1-Click Action */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isLoading
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-600/25"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{loadingStepText || (t.logging_in || "Authenticating...")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.sign_in || "Sign In to Farm Tracer"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* 1-Click Instant Evaluation Button for Judges */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleInstantDemoLogin(selectedRole)}
                    className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant 1-Click Demo Entry ({currentRoleCfg.title})</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Bottom Public Consumer Bypass & Security Notice */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={onNavigatePublicTrace}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 group"
              >
                <QrCode className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>{t.public_trace_link || "Public Citizen? Track Batch via QR →"}</span>
              </button>

              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>FSSAI SKH031 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 px-4 py-3 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Farm Tracer • Smart Kopargaon Hackathon (SKH031) • Food Safety & Traceability</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Offline-First Architecture</span>
            <span>•</span>
            <span>SHA-256 DAG Lineage</span>
            <span>•</span>
            <span>Local IndexedDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
