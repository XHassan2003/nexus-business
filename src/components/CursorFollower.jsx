import React, { useState, useEffect, useRef } from "react";

const PremiumCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Hoverables setup
    const hoverables = document.querySelectorAll(
      "a, button, input, textarea, .hoverable"
    );
    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0)`;
    }
  }, [position]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out
        ${isHidden ? "opacity-0" : "opacity-100"}
        ${isClicking ? "scale-90" : "scale-100"}
        ${isHovering ? "scale-125 bg-green-500/20 border-green-500" : "bg-green-600/10 border-green-400/70"}
      `}
      style={{
        border: "2px solid",
        boxShadow: isHovering
          ? "0 0 20px rgba(48, 172, 18, 0.6)"
          : "0 0 12px rgba(55, 161, 28, 0.3)",
        backdropFilter: "blur(3px)",
      }}
    >
      {/* Inner dot */}
      <div
        className={`w-2.5 h-2.5 rounded-full mx-auto my-auto bg-green-600 transition-all duration-150
          ${isClicking ? "scale-125 bg-green-800" : "scale-100"}
          ${isHovering ? "bg-Green-500" : ""}
        `}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default PremiumCursor;
