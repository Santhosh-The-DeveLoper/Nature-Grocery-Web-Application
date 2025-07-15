import { useEffect } from 'react';

const useFlipZoomAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const items = entry.target.querySelectorAll('.flip-bounce');

          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              el.classList.remove('animate');
              void el.offsetWidth;
              setTimeout(() => el.classList.add('animate'), i * 100);
            });
          } else {
            items.forEach((el) => el.classList.remove('animate'));
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('menu');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);
};

export default useFlipZoomAnimation;
