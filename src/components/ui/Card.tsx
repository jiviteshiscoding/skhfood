import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'bordered' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-xl border border-slate-200/80 shadow-sm',
      flat: 'bg-slate-50 rounded-xl border border-slate-100',
      bordered: 'bg-white rounded-xl border-2 border-slate-200',
      glass: 'glassmorphism rounded-xl border border-white/40 shadow-sm',
    };

    return (
      <div ref={ref} className={cn(variants[variant], 'p-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
