import Lenis from 'lenis';

let lenis = null;

export function initLenis() {
  if (typeof window === 'undefined') return null;

  if (!lenis) {
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
  }

  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function getLenis() {
  return lenis;
}
