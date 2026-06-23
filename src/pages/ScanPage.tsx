import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Scanner from "../components/Scanner";

export default function ScanPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-6 pt-24 pb-12 gap-8 animate-fade-in">
        <h1 className="font-display text-2xl text-cream text-center">Scanner un vin</h1>
        <Scanner onScan={(barcode) => navigate(`/wine/${barcode}`)} />
      </main>
    </div>
  );
}
