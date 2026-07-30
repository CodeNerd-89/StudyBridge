const variants = {
  default: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand/10 text-brand',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-emerald-100 text-emerald-700',
};

const Badge = ({ variant = 'default', className = '', children, ...props }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] ?? variants.default} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;