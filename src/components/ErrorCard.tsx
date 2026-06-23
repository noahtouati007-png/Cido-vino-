interface Props {
  message: string;
  children?: React.ReactNode;
}

export default function ErrorCard({ message, children }: Props) {
  return (
    <div className="linen-texture bg-olive-mid border border-olive-light p-6 max-w-md mx-auto text-center">
      <img src="/logo.png" alt="Cibo Vino" className="h-8 mx-auto mb-4 opacity-80" />
      <p className="font-display italic text-lg text-cream mb-4">{message}</p>
      {children}
    </div>
  );
}
