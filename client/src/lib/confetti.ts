import confetti from 'canvas-confetti';

type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: ('square' | 'circle')[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

// Basic confetti burst from a centered position
export const fireConfetti = (options: ConfettiOptions = {}) => {
  const defaults: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: [
      '#4285F4', // Blue
      '#EA4335', // Red 
      '#FBBC05', // Yellow
      '#34A853', // Green
      '#FF9900', // Orange
      '#7D42F4', // Purple
    ],
  };

  confetti({
    ...defaults,
    ...options,
  });
};

// Fire confetti from both sides of the screen
export const fireConfettiCannon = () => {
  const end = Date.now() + 2000;

  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF9900', '#7D42F4'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

// Realistic fireworks effect
export const fireFireworks = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Use random colors each time
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 250);
};

// A confetti shower that falls from the top
export const confettiShower = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0 }
  };

  function fire(particleRatio: number, opts: ConfettiOptions) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  
  fire(0.2, {
    spread: 60,
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Trigger confetti based on achievement type
export const celebrateAchievement = (type: 'small' | 'medium' | 'large' = 'medium') => {
  switch (type) {
    case 'small':
      fireConfetti({ particleCount: 50, spread: 40 });
      break;
    case 'medium':
      fireConfettiCannon();
      break;
    case 'large':
      fireFireworks();
      break;
    default:
      fireConfetti();
  }
};