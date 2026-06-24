import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallBanner() {
  const { canInstall, promptInstall, dismiss } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md glass rounded-2xl border border-gold/30 shadow-soft-lg p-4 flex items-center gap-3 reveal">
      <img src="/logo.png" alt="" className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm text-cream leading-tight">
          Installer Cibo Vino
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-text-secondary">
          Accès direct depuis ton écran d'accueil
        </p>
      </div>
      <button
        onClick={promptInstall}
        className="bg-gold text-bg-deep font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-lg shrink-0 transition-transform duration-300 hover:scale-[1.04]"
      >
        Installer
      </button>
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="text-cream/40 hover:text-cream text-lg leading-none shrink-0 px-1"
      >
        ×
      </button>
    </div>
  );
}
