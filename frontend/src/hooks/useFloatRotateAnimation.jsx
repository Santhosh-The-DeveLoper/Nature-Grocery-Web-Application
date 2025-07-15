import { useEffect } from 'react';

const useFloatRotateAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const cards = entry.target.querySelectorAll('.float-rotate');
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.classList.remove('active');
            void card.offsetWidth;
            setTimeout(() => card.classList.add('active'), i * 120);
          });
        } else {
          cards.forEach(card => card.classList.remove('active'));
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
};

export default useFloatRotateAnimation;
