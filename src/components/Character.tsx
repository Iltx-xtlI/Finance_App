import { useEffect } from 'react';

export default function Character() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle character movement based on arrow keys
      switch (event.key) {
        case 'ArrowUp':
          // Move character forward
          break;
        case 'ArrowDown':
          // Move character backward
          break;
        case 'ArrowLeft':
          // Turn character left
          break;
        case 'ArrowRight':
          // Turn character right
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div className="character">Character</div>;
} 