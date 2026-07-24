interface LogoProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function Logo({ size = 28, className = '', color = 'currentColor' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="22" y1="22" x2="78" y2="78" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
      <line x1="22" y1="78" x2="78" y2="22" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
      
      <circle cx="22" cy="78" r="10.5" fill={color} />
      <circle cx="22" cy="22" r="10.5" fill={color} />
      <circle cx="50" cy="50" r="10.5" fill={color} />
      <circle cx="78" cy="78" r="10.5" fill={color} />
      <circle cx="78" cy="22" r="10.5" fill={color} />
    </svg>
  );
}
