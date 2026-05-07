"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-triggered reveal animations using Intersection Observer.
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0–1) to trigger. Default 0.15
 * @param {string} options.rootMargin - Root margin for observer. Default "0px 0px -60px 0px"
 * @param {boolean} options.triggerOnce - If true, only triggers once. Default true
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Custom hook for staggered children animations on scroll.
 * @param {number} childCount - Number of children to stagger
 * @param {Object} options - Same options as useScrollReveal
 * @returns {{ ref: React.RefObject, isVisible: boolean, getDelay: (index: number) => string }}
 */
export function useStaggerReveal(childCount, options = {}) {
  const { ref, isVisible } = useScrollReveal(options);

  const getDelay = (index) => `${index * 120}ms`;

  return { ref, isVisible, getDelay };
}

/**
 * Custom hook for continuous scroll-driven animations (Parallax).
 * Updates a CSS variable (--scroll-offset) based on scroll position.
 * @param {number} speed - The multiplier for the parallax effect. 1 is normal scroll, 0.5 is half speed.
 * @returns {React.RefObject}
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // Calculate distance from center of viewport
        const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        const scrollValue = centerOffset * speed;
        ref.current.style.setProperty('--scroll-offset', `${scrollValue}px`);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize
    updateScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
