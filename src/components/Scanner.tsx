import { useState } from "react";
import { useScanner } from "../hooks/useScanner";
import ErrorCard from "./ErrorCard";
import { scanSuccess } from "../lib/feedback";

interface Props {
  onScan: (barcode: string) => void;
}

export default function Scanner({ onScan }: Props) {
  const [flash, setFlash] = useState(false);
  const [manual, setManual] = useState("");

  const { videoRef, cameraError } = useScanner({
    onDetected: (barcode) => {
      setFlash(true);
      scanSuccess();
      setTimeout(() => onScan(barcode), 350);
    },
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manual.trim()) onScan(manual.trim());
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {cameraError ? (
        <ErrorCard message={cameraError} />
      ) : (
        <div className="relative w-full max-w-md aspect-[3/4] bg-bg-elevated rounded-2xl overflow-hidden shadow-soft-lg border border-white/10">
          <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
          <div
            className={`absolute inset-0 ${flash ? "animate-flash" : ""}`}
            style={{ pointerEvents: "none" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-56 h-36">
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-8 h-8 rounded-sm border-gold`}
                    style={{
                      borderTopWidth: pos.includes("top") ? 3 : 0,
                      borderBottomWidth: pos.includes("bottom") ? 3 : 0,
                      borderLeftWidth: pos.includes("left") ? 3 : 0,
                      borderRightWidth: pos.includes("right") ? 3 : 0,
                      animation: "pulse-frame 1.6s ease-in-out infinite",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      <p className="font-body text-cream/80 text-center">
        Pointez le code-barres vers la caméra
      </p>

      <form onSubmit={handleManualSubmit} className="w-full max-w-md flex flex-col gap-3">
        <label className="font-mono text-xs uppercase tracking-wide text-cream/60">
          Entrer le code-barres manuellement
        </label>
        <div className="flex gap-3">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="3760123456789"
            className="flex-1"
            inputMode="numeric"
          />
          <button
            type="submit"
            className="bg-gold text-bg-deep font-mono text-sm px-5 py-2 rounded-xl uppercase tracking-wide shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-soft-lg"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
