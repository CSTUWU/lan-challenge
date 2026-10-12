import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight || 1;

      let progress = 0;
      if (scrollY <= vh * 1.4) {
        progress = scrollY / (vh * 1.4);
      } else {
        progress = 1 + (scrollY - vh * 1.4) / vh;
      }

      if (progress < 0) progress = 0;
      if (progress > 3) progress = 3;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollProgress;
}
