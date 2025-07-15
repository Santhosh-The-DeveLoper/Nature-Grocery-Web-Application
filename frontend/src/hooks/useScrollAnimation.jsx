import { useEffect } from 'react';

const useScrollAnimate = (selector = '.flip-bounce', rootMargin = '0px', trigger = null) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.15, rootMargin }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, rootMargin, trigger]); 
};

export default useScrollAnimate;
