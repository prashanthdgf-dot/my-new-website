// Lazy-loaded canvas-confetti loader to keep critical rendering path light
let confettiPromise: Promise<any> | null = null;

async function getConfetti() {
  if (!confettiPromise) {
    confettiPromise = import('canvas-confetti').then((mod) => mod.default || mod);
  }
  return confettiPromise;
}

/**
 * Curated color palette representing the Dhanus Gold premium brand:
 * Gold tones, warm bronze, luxury champagne, pristine white, and deep charcoal.
 */
const GOLD_PALETTE = ['#D4AF37', '#F3E5AB', '#AA7C11', '#FFDF00', '#FFFFFF', '#1A1A1A'];

/**
 * Triggers a premium double-cannon side explosion of golden confetti.
 * Perfect for major events like form submissions.
 */
export async function triggerSideCannons() {
  const confetti = await getConfetti();
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999, colors: GOLD_PALETTE };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    
    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}

/**
 * Triggers a subtle, single-shot golden burst from the center of the screen.
 * Best suited for micro-interactions like quick button clicks.
 */
export async function triggerGoldBurst() {
  const confetti = await getConfetti();
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: GOLD_PALETTE,
    scalar: 1.1,
    gravity: 1.2,
    drift: 0,
    ticks: 150,
    zIndex: 9999
  });
}

/**
 * Triggers a starry sky-like falling glitter shower.
 */
export async function triggerGoldShower() {
  const confetti = await getConfetti();
  const end = Date.now() + (1.2 * 1000);

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: GOLD_PALETTE
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: GOLD_PALETTE
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
