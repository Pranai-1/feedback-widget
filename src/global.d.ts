export {};

declare global {
  interface Window {
    iFrameResize: (options: object, iframe: HTMLIFrameElement) => void;
    iFrameResizer?: {
      close: (iframe: HTMLIFrameElement) => void;
    };
  }
}
