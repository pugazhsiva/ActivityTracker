// global.d.ts

// CSS files
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// For non-CSS usage (if you're just importing for side effects)
// declare module '*.css';

// Audio files
declare module "*.mp3";
declare module "*.mp4";

// Image files
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
