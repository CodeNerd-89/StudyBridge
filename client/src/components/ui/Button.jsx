import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-[#e35f39] text-white hover:bg-[#cf5330] shadow-sm shadow-[0_10px_30px_rgba(227,95,57,0.25)]',
  secondary: 'bg-white text-slate-700 hover:bg-[#fff3ed] border border-[#ead7cf]',
  outline: 'border border-[#e35f39] text-[#e35f39] hover:bg-[#fff3ed]',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#e35f39] focus:ring-offset-2 focus:ring-offset-white';

const Button = ({ variant = 'primary', className = '', to, href, type = 'button', children, ...props }) => {
  const classes = `${baseClasses} ${variants[variant] ?? variants.primary} ${className}`;

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;