export {};

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }

  interface Event {
    data: string;
  }
}
