import React from 'react';
import { cn } from '@/lib/utils';
import { STATUS_COLORS } from '@/config/constants';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'status';
  statusKey?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  statusKey,
  size = 'md',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  }[size];

  if (variant === 'status' && statusKey && STATUS_COLORS[statusKey]) {
    const statusStyle = STATUS_COLORS[statusKey];
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          statusStyle.bg,
          statusStyle.text,
          statusStyle.border,
          sizeStyles,
          className
        )}
        {...props}
      >
        {children || statusKey}
      </span>
    );
  }

  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    status: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizeStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
