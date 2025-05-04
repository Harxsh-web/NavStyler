import { useEffect } from 'react';
import { celebrateAchievement } from '@/lib/confetti';

interface CelebrationProps {
  type?: 'small' | 'medium' | 'large';
  trigger: boolean;
  message?: string;
  children?: React.ReactNode;
}

/**
 * A component that triggers a confetti celebration when `trigger` changes to true
 * 
 * @example
 * // Celebrate when form is submitted successfully
 * const [isSuccess, setIsSuccess] = useState(false);
 * ...
 * <Celebration trigger={isSuccess} type="medium">
 *   <div>Success message here!</div>
 * </Celebration>
 */
export function Celebration({ 
  type = 'medium', 
  trigger, 
  message,
  children 
}: CelebrationProps) {
  useEffect(() => {
    if (trigger) {
      celebrateAchievement(type);
    }
  }, [trigger, type]);

  if (!children && !message) {
    return null;
  }

  return (
    <div className="celebration-container">
      {message && (
        <div className="text-center my-4 font-medium text-lg text-primary">
          {message}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * A hook that triggers a confetti celebration
 * 
 * @example
 * const celebrate = useCelebration();
 * ...
 * <button onClick={() => celebrate('large')}>Celebrate!</button>
 */
export function useCelebration() {
  return (type: 'small' | 'medium' | 'large' = 'medium') => {
    celebrateAchievement(type);
  };
}