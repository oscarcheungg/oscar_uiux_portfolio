import type { CSSProperties, ReactElement } from 'react';

/** Props derived from the component's own Framer property controls. */
export interface EtheralShadowProps {
  type?: 'preset' | 'custom';
  /** Seed for the preset mask (0–100). */
  presetIndex?: number;
  customImage?: { src: string; alt?: string };
  sizing?: 'fill' | 'stretch';
  /** Legacy alias for color1. */
  color?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  /** 0–1. */
  shadowOpacity?: number;
  animation?: { preview?: boolean; scale?: number; speed?: number; duration?: number };
  noise?: { opacity?: number; scale?: number };
  style?: CSSProperties;
  className?: string;
}

declare function EtheralShadow(props: EtheralShadowProps): ReactElement;
export default EtheralShadow;
