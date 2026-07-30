import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-white hover:bg-opacity-90 shadow-sm',
  secondary: 'bg-white text-primary hover:bg-secondary border border-outline',
  outline: 'border border-primary text-primary hover:bg-secondary',
  accent: 'bg-accent text-white hover:bg-opacity-90 shadow-sm',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-white';

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