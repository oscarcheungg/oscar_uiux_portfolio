import type { CSSProperties, ReactElement } from 'react';

/* Props are grouped, and each group you pass must be complete — see the note
   at the top of DynamicParticles.js about how it merges defaults. */

export interface ParticlesAppearance {
  /** Image URL sampled into the particle field. Must be same-origin (read via canvas). */
  logoImage: string;
  /** Sample the logo's own colours instead of color1/color2. */
  useOriginalColors: boolean;
  color1: string;
  color2: string;
  particleDensity: number;
  particleSize: number;
  volumeDepth: number;
  bevel: number;
  logoScale: number;
  cameraDistance: number;
}

export interface ParticlesInteraction {
  enableRotation: boolean;
  rotationSpeed: number;
  mouseRadius: number;
  mouseForce: number;
}

export interface ParticlesBehavior {
  animationSpeed: number;
  noiseAmplitude: number;
}

export interface ParticlesLighting {
  lightColor: string;
  shadowColor: string;
}

export interface DynamicParticlesProps {
  /** Runs the animation. Defaults to true. */
  editorPreview?: boolean;
  appearance?: ParticlesAppearance;
  interaction?: ParticlesInteraction;
  behavior?: ParticlesBehavior;
  lighting?: ParticlesLighting;
  style?: CSSProperties;
  className?: string;
}

declare function DynamicParticles(props: DynamicParticlesProps): ReactElement;
export default DynamicParticles;
