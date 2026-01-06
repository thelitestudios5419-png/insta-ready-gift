import styled from "styled-components";

const GradientOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  background: radial-gradient(
      circle at top left,
      rgba(255, 182, 193, 0.45),
      transparent 55%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(255, 192, 203, 0.4),
      transparent 55%
    ),
    linear-gradient(
      135deg,
      rgba(255, 240, 245, 0.8),
      rgba(255, 255, 255, 0.6),
      rgba(255, 228, 225, 0.8)
    );
`;

export default GradientOverlay;   // 👈 THIS LINE IS REQUIRED
