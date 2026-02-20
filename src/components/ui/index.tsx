import { cn } from '../../utils';

// ============================================================
// UI PRIMITIVOS — Botones, Cards, Badges reutilizables
// ============================================================

// ---------- BADGE ----------
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'online' | 'offline';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
    const variants: Record<BadgeVariant, string> = {
        default: 'bg-blue-100 text-blue-700',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-red-100 text-red-700',
        online: 'bg-emerald-500 text-white',
        offline: 'bg-slate-400 text-white',
    };
    return (
        <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
            {children}
        </span>
    );
};

// ---------- BUTTON ----------
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }: ButtonProps) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
        secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:shadow',
        ghost: 'hover:bg-slate-100 text-slate-600',
        danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
        success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    };

    const sizes: Record<ButtonSize, string> = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    );
};

// ---------- CARD ----------
interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => (
    <div
        onClick={onClick}
        className={cn('bg-white rounded-2xl border border-slate-100 shadow-sm', className)}
    >
        {children}
    </div>
);