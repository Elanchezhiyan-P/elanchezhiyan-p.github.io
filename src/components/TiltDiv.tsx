import React from "react";
import { useCardTilt } from "@/hooks/useCardTilt";

interface TiltDivProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  style?: React.CSSProperties;
}

/**
 * Drop-in wrapper that adds a CSS 3D perspective-tilt on hover to any content.
 * Usage:
 *   <TiltDiv className="my-card" intensity={10}>
 *     <Card>...</Card>
 *   </TiltDiv>
 */
const TiltDiv: React.FC<TiltDivProps> = ({
  children,
  className,
  intensity = 8,
  glare = true,
  style: externalStyle,
}) => {
  const tilt = useCardTilt({ intensity, glare });

  return (
    <div
      ref={tilt.ref}
      className={className}
      style={{ ...externalStyle, ...tilt.style, position: "relative" }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      {children}
      {tilt.glareStyle && <div style={tilt.glareStyle} aria-hidden="true" />}
    </div>
  );
};

export default TiltDiv;
