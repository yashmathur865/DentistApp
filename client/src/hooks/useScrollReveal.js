import { useEffect, useRef } from 'react';

/**
 * Hook to trigger animations when elements scroll into view.
 * Adds 'visible' class to elements matching the selector.
 * 
 * @param {string} selector - CSS selector for elements to observe (e.g., '.reveal')
 * @param {Object} options - IntersectionObserver options
 */
const useScrollReveal = (selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale', options = {}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const defaultOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15,
      ...options
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing once revealed for one-time animation
          // observerRef.current.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, options]);

  // Function to re-initialize (useful after route changes or dynamic content loading)
  const refresh = () => {
    if (!observerRef.current) return;
    
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // Re-observe if not already visible
      if (!el.classList.contains('visible')) {
        observerRef.current.observe(el);
      }
    });
  };

  return { refresh };
};

export default useScrollReveal;
