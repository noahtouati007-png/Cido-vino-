interface Props {
  message: string;
  children?: React.ReactNode;
}

export default function ErrorCard({ message, children }: Props) {
  return (
    <div className="glass rounded-2xl border border-white/10 shadow-soft-lg p-8 max-w-md mx-auto text-center animate-slide-up">
      <img src="/logo.png" alt="Cibo Vino" className="h-8 mx-auto mb-4 opacity-80" />
      <p className="font-display italic text-lg text-cream mb-4 leading-relaxed">{message}</p>
      {children}
    </div>
  );
}
