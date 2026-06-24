import html2canvas from "html2canvas";

// Capture un élément DOM en image PNG et tente de la partager,
// sinon la télécharge.
export async function shareElementAsImage(
  el: HTMLElement,
  fileName: string,
  shareText?: string
): Promise<void> {
  const canvas = await html2canvas(el, {
    backgroundColor: "#131b12",
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 0.95)
  );
  if (!blob) throw new Error("Impossible de générer l'image");

  const file = new File([blob], fileName, { type: "image/png" });

  // Web Share API niveau 2 (mobile) — partage natif avec fichier.
  const navAny = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
  };
  if (navAny.canShare && navAny.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      text: shareText,
      title: "Cibo Vino",
    });
    return;
  }

  // Fallback desktop : téléchargement.
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
