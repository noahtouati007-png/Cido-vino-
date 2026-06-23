interface Props {
  rating: number;
  max?: number;
}

function Branch({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 19 C3 12 6 5 11 2 C16 5 19 12 19 19"
        stroke={filled ? "#C9A84C" : "#4A5E2F"}
        strokeWidth="1.4"
        fill={filled ? "#C9A84C" : "none"}
        opacity={filled ? 1 : 0.5}
      />
    </svg>
  );
}

export default function RatingBranches({ rating, max = 5 }: Props) {
  return (
    <div className="flex gap-1" aria-label={`Note: ${rating}/${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <Branch key={i} filled={i < rating} />
      ))}
    </div>
  );
}
