interface Props {
  className?: string;
  animated?: boolean;
}

export default function OliveBranchDivider({ className = "", animated = false }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 py-6 ${className}`}>
      <span
        className="h-px flex-1 max-w-[120px]"
        style={{
          background: "linear-gradient(to right, transparent, rgba(212,175,106,0.5))",
        }}
      />
      <span
        className={`block w-2 h-2 rotate-45 bg-gold ${animated ? "animate-pulse" : ""}`}
        style={{ boxShadow: "0 0 12px rgba(212,175,106,0.6)" }}
      />
      <span
        className="h-px flex-1 max-w-[120px]"
        style={{
          background: "linear-gradient(to left, transparent, rgba(212,175,106,0.5))",
        }}
      />
    </div>
  );
}
