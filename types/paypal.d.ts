declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: Record<string, string>;
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError?: (error: unknown) => void;
      }) => {
        render: (selector: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

export {};
