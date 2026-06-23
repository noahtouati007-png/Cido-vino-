import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { useEffect, useRef, useState } from "react";

interface UseScannerOptions {
  onDetected: (barcode: string) => void;
}

export function useScanner({ onDetected }: UseScannerOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;
    let stopped = false;

    reader
      .decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
        if (stopped) return;
        if (result) {
          const text = result.getText();
          setScanned(true);
          if (navigator.vibrate) navigator.vibrate(120);
          onDetected(text);
        } else if (err && !(err instanceof NotFoundException)) {
          // ignore continuous decode misses
        }
      })
      .catch(() => {
        setCameraError("Sans les yeux, pas de vérité. Activez la caméra.");
      });

    return () => {
      stopped = true;
      reader.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videoRef, cameraError, scanned };
}
