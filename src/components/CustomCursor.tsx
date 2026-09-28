import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isPointerRef = useRef(false);

  // Softer spring for the outer trailing effect
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse), skip completely on touch/coarse devices
    const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Fast selector check without calling window.getComputedStyle (which causes layout thrashing)
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, label, summary, [tabindex]:not([tabindex="-1"])')
        );
        if (clickable !== isPointerRef.current) {
          isPointerRef.current = clickable;
          setIsPointer(clickable);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer Premium Aura / Spotlight */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-[#FFC400]/40 bg-[#FFC400]/10 backdrop-blur-sm pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicked ? 0.8 : (isPointer ? 1.5 : 1),
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicked ? 0.8 : (isPointer ? 1.5 : 1),
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
      
      {/* Inner Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#FFC400] rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_12px_2px_rgba(255,196,0,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicked ? 0.5 : (isPointer ? 0 : 1),
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicked ? 0.5 : (isPointer ? 0 : 1),
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
    </>
  );
}
