export function UdCrest({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M32 4 L58 18 V42 C58 58 46 70 32 76 C18 70 6 58 6 42 V18 Z" />
      <circle cx="32" cy="34" r="10" fill="white" opacity="0.15" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="bold"
        fontFamily="serif"
      >
        UD
      </text>
    </svg>
  );
}
