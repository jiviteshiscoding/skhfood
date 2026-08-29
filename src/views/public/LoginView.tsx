import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { LanguageSelector } from '@/components/auth/LanguageSelector';
import { DemoWorkspaceModal, DemoRoleProfile } from '@/components/auth/DemoWorkspaceModal';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ROUTE_PATHS } from '@/routes/route-paths';
import { authService } from '@/services/auth.service';
import { UserRole, Organization } from '@/types/auth';
import { ROLE_LABELS } from '@/config/constants';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User as UserIcon,
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('FARMER');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  
  // Validation & Error states
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ title: string; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load organizations for signup dropdown
  React.useEffect(() => {
    const loadOrgs = async () => {
      const res = await authService.getOrganizations();
      if (res.success && res.data) {
        setOrganizations(res.data);
      }
    };
    loadOrgs();
  }, []);

  const { signIn, signUp, loginAsDemoRole, isLoading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTarget = (location.state as { from?: { pathname?: string } })?.from?.pathname || ROUTE_PATHS.DASHBOARD;

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string; fullName?: string } = {};

    if (authMode === 'signup' && !fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessInfo(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (authMode === 'signin') {
        const result = await signIn(email, password);
        if (result.success) {
          const stakeholderName = result.data?.profile?.full_name || result.data?.user?.user_metadata?.full_name || result.data?.user?.email || email;
          setSuccessInfo({
            title: 'Sign In Successful',
            message: `Logged in as ${stakeholderName}. Redirecting to dashboard...`,
          });
          toast.success(`Logged in as ${stakeholderName}`, 'Welcome to Farm Tracer');
          setTimeout(() => {
            navigate(redirectTarget, { replace: true });
          }, 300);
        } else {
          const errMsg = result.error?.message || 'Invalid email or password. Please verify your credentials.';
          setFormError(errMsg);
        }
      } else {
        const result = await signUp({
          email,
          password,
          fullName,
          role: selectedRole,
          organizationId: selectedOrgId || undefined,
        });

        if (result.success) {
          const registeredName = fullName || result.data?.user?.email || email;
          if (result.data?.session) {
            setSuccessInfo({
              title: 'Account Created Successfully',
              message: `Account created successfully. Logged in as ${registeredName}. Redirecting to dashboard...`,
            });
            toast.success('Account created successfully.', 'Registration Successful');
            setTimeout(() => {
              navigate(redirectTarget, { replace: true });
            }, 300);
          } else {
            setSuccessInfo({
              title: 'Account Created Successfully',
              message: `Account created successfully for ${email}. Please check your email inbox to verify your account, then sign in below.`,
            });
            toast.success(
              'Account created successfully. Please check your email if confirmation is required.',
              'Registration Successful'
            );
            setAuthMode('signin');
          }
        } else {
          const errMsg = result.error?.message || 'Registration failed. Please check your details and try again.';
          console.error('[LoginView Signup Error]', result.error);
          setFormError(errMsg);
        }
      }
    } catch (err: unknown) {
      const genericMsg = err instanceof Error ? err.message : 'An unexpected error occurred during submission.';
      console.error('[LoginView handleFormSubmit Exception]', err);
      setFormError(genericMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectDemoRole = (roleProfile: DemoRoleProfile) => {
    loginAsDemoRole(roleProfile);
    toast.info(
      `Entered workspace as ${roleProfile.title} (${roleProfile.organization})`,
      'Role Workspace Active'
    );
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/20 mb-3">
            <Sprout className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Farm Tracer
            </h1>
            <Badge variant="status" statusKey="HARVESTED" size="sm">
              SKH031
            </Badge>
          </div>
          <p className="text-xs text-slate-600 max-w-xs mx-auto">
            Digital Food Traceability & Lineage System
          </p>
        </div>

        {/* Main Auth Card */}
        <Card variant="glass" className="shadow-xl border-slate-200/80 p-6 sm:p-8">
          {/* Card Topbar with Language Selector */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {authMode === 'signin' ? 'Stakeholder Sign In' : 'Register Stakeholder'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {authMode === 'signin' ? 'Access your supply-chain custody role' : 'Create a verified supply-chain account'}
              </p>
            </div>
            <LanguageSelector />
          </div>

          {/* Mode Tabs (Sign In vs Sign Up) */}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setFormError(null);
                setSuccessInfo(null);
              }}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setFormError(null);
                setSuccessInfo(null);
              }}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Register New Account
            </button>
          </div>

          {formError && (
            <Alert variant="error" className="mb-4">
              <div className="text-xs">
                <span className="font-bold">Error: </span>
                {formError}
              </div>
            </Alert>
          )}

          {successInfo && (
            <Alert variant="success" className="mb-4" title={successInfo.title}>
              <div className="text-xs leading-relaxed">
                {successInfo.message}
              </div>
            </Alert>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <>
                <Input
                  label="Full Name / Representative"
                  type="text"
                  placeholder="e.g. Rajesh Patil"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  error={errors.fullName}
                  leftIcon={<UserIcon className="w-4 h-4" />}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700">
                    Stakeholder Supply-Chain Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    {Object.entries(ROLE_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-700 flex items-center justify-between">
                    <span>Assigned Organization / Entity</span>
                    <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedOrgId}
                      onChange={(e) => setSelectedOrgId(e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="">-- Independent / Unassigned --</option>
                      {organizations.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name} ({org.type}{org.city ? ` - ${org.city}` : ''})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            <Input
              label="Email address"
              type="email"
              placeholder="e.g. farmer@kopargaon-farm.org"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              required
            />

            {authMode === 'signin' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                  />
                  <span>Remember session</span>
                </label>
                <span className="text-[11px] text-slate-400">Supabase Auth</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading || isSubmitting}
              disabled={isLoading || isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isSubmitting 
                ? (authMode === 'signin' ? 'Authenticating...' : 'Registering Account...') 
                : (authMode === 'signin' ? 'Sign In to Workspace' : 'Create Stakeholder Account')}
            </Button>
          </form>

          {/* Clean Divider for 1-Click Demo Quick Access */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2.5 text-slate-400 font-semibold tracking-wider">
                Or 1-Click Demo Workspace
              </span>
            </div>
          </div>

          {/* Demo Workspace Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDemoModalOpen(true)}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-emerald-200/90 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-900 transition-all text-left shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950 group-hover:text-emerald-900">
                  Explore Demo Workspace
                </div>
                <div className="text-[11px] text-emerald-700">
                  1-Click Switcher for All 10 Stakeholder Roles
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Phase 2 Footer */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Phase 2 Real Supabase Auth Ready</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">rebuild branch</span>
          </div>
        </Card>

        {/* Consumer Public Verification Helper */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Looking for public food verification?{' '}
            <button
              onClick={() => navigate('/trace/FT-BSK-2026-001')}
              className="text-brand-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3 text-brand-600" />
              Scan / Open Public Trace
            </button>
          </p>
        </div>
      </div>

      {/* Demo Workspace Modal */}
      <DemoWorkspaceModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectRole={handleSelectDemoRole}
      />
    </div>
  );
};
