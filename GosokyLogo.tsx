type Props = { size?: number; className?: string };

export function GosokyLogo({ size = 40, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="GOSOKY GLOBAL"
    >
      <circle cx="50" cy="50" r="46" stroke="#84cda4" strokeWidth="1.5" opacity="0.5" />
      <circle cx="50" cy="50" r="38" stroke="#d5aa55" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#2c7990" strokeWidth="1.2" opacity="0.6" />
      <path d="M20 50 Q50 28 80 50 Q50 72 20 50 Z" stroke="#81d2a2" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M50 20 Q72 50 50 80 Q28 50 50 20 Z" stroke="#81d2a2" strokeWidth="1.5" fill="none" opacity="0.7" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="#d5aa55" strokeWidth="0.8" opacity="0.5" />
      <line x1="50" y1="20" x2="50" y2="80" stroke="#d5aa55" strokeWidth="0.8" opacity="0.5" />
      <circle cx="50" cy="50" r="5" fill="#d5aa55" />
      <circle cx="50" cy="50" r="2" fill="#081c22" />
      <circle cx="22" cy="50" r="2.5" fill="#81d2a2" />
      <circle cx="78" cy="50" r="2.5" fill="#81d2a2" />
      <circle cx="50" cy="22" r="2.5" fill="#2c7990" />
      <circle cx="50" cy="78" r="2.5" fill="#2c7990" />
      <circle cx="35" cy="35" r="1.8" fill="#d5aa55" opacity="0.7" />
      <circle cx="65" cy="65" r="1.8" fill="#d5aa55" opacity="0.7" />
      <circle cx="65" cy="35" r="1.8" fill="#81d2a2" opacity="0.6" />
      <circle cx="35" cy="65" r="1.8" fill="#81d2a2" opacity="0.6" />
    </svg>
  );
}
