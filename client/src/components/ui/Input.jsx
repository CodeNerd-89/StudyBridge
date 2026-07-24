const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 ${className}`}
      {...props}
    />
  );
};

export default Input;