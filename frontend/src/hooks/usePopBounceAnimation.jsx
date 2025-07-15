import { useEffect } from 'react';

const usePopBounceAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.pop-bounce');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            setTimeout(() => {
              entry.target.classList.remove('animate');
            }, 1000);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default usePopBounceAnimation;
