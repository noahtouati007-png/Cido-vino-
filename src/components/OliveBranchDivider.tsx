interface Props {
  className?: string;
  animated?: boolean;
}

export default function OliveBranchDivider({ className = "", animated = false }: Props) {
  return (
    <div className={`flex items-center justify-center py-6 ${className}`}>
      <svg
        width="180"
        height="28"
        viewBox="0 0 180 28"
        fill="none"
        className={animated ? "vine-draw" : ""}
      >
        <path
          d="M5 14 H175"
          stroke="#7A9142"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M70 14 Q75 4 85 7 Q80 14 70 14Z"
          fill="#7A9142"
        />
        <path
          d="M95 14 Q100 24 110 21 Q105 14 95 14Z"
          fill="#7A9142"
        />
        <path
          d="M55 14 Q60 6 68 9 Q63 14 55 14Z"
          fill="#7A9142"
        />
        <path
          d="M112 14 Q117 22 125 19 Q120 14 112 14Z"
          fill="#7A9142"
        />
        <circle cx="90" cy="14" r="3" fill="#C9A84C" />
      </svg>
    </div>
  );
}
