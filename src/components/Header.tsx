import { Link } from "react-router-dom";

interface Props {
  transparent?: boolean;
}

export default function Header({ transparent = false }: Props) {
  return (
    <header
      className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-center md:justify-start px-6 py-4 ${
        transparent ? "bg-transparent" : "bg-olive-deep"
      }`}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Cibo Vino" style={{ maxHeight: 48 }} />
      </Link>
    </header>
  );
}
