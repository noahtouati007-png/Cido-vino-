import { Link } from "react-router-dom";

interface Props {
  transparent?: boolean;
}

export default function Header({ transparent = false }: Props) {
  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-center md:justify-start px-6 py-4 transition-all duration-300 ${
        transparent ? "bg-transparent" : "glass shadow-soft"
      }`}
    >
      <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]">
        <img src="/logo.png" alt="Cibo Vino" className="h-10 w-10 rounded-full shadow-soft" />
        <span className="font-signature text-xl tracking-widest text-cream hidden sm:inline">CIBO VINO</span>
      </Link>
    </header>
  );
}
