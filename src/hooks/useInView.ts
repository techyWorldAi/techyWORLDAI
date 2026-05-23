import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the referenced element enters the viewport.
 * Useful for triggering CSS transitions on scroll.
 */
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
