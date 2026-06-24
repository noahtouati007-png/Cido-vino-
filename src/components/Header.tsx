import { Link, useLocation } from "react-router-dom";

interface Props {
  transparent?: boolean;
}

const NAV_LINKS = [
  { to: "/search", label: "Chercher" },
  { to: "/scan", label: "Scanner" },
  { to: "/dish", label: "Accorder" },
  { to: "/cave", label: "Ma cave" },
  { to: "/history", label: "Historique" },
];

export default function Header({ transparent = false }: Props) {
  const { pathname } = useLocation();

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        transparent ? "bg-transparent" : "glass shadow-soft"
      }`}
    >
      <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]">
        <img src="/logo.png" alt="Cibo Vino" className="h-10 w-10 rounded-full shadow-soft" />
        <span className="font-signature text-xl tracking-widest text-cream hidden sm:inline">CIBO VINO</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`font-mono text-xs uppercase tracking-wide transition-colors duration-300 ${
              pathname === link.to ? "text-gold" : "text-cream/60 hover:text-cream"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
