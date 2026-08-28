import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LanguageOption {
  code: 'en' | 'hi' | 'mr';
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
];

export interface LanguageSelectorProps {
  className?: string;
  variant?: 'minimal' | 'bordered';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  variant = 'bordered',
}) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (code: 'en' | 'hi' | 'mr') => {
    setSelectedLang(code);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500',
          variant === 'bordered'
            ? 'border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 shadow-sm'
            : 'px-2 py-1 text-slate-600 hover:bg-slate-100'
        )}
      >
        <Globe className="w-3.5 h-3.5 text-slate-500" />
        <span>{activeOption.nativeLabel}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-1.5 w-40 rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Select Language
            </div>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  'flex w-full items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left',
                  selectedLang === lang.code
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                )}
              >
                <div>
                  <div>{lang.nativeLabel}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{lang.label}</div>
                </div>
                {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-brand-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
