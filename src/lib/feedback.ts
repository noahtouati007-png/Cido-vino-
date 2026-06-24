// Petits retours sensoriels pour donner un ressenti d'app native.

export function haptic(pattern: number | number[] = 30) {
  try {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    /* ignore */
  }
}

let audioCtx: AudioContext | null = null;

// Un petit "pop" doré synthétisé, sans fichier audio à charger.
export function playPop(frequency = 660) {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  } catch {
    /* ignore */
  }
}

export function scanSuccess() {
  haptic([20, 40, 20]);
  playPop(720);
}

export function tap() {
  haptic(12);
}
