declare module 'khalti-checkout-web' {
  interface KhaltiConfig {
    publicKey: string;
    productIdentity: string;
    productName: string;
    productUrl: string;
    amount?: number;
    eventHandler: {
      onSuccess(payload: any): void;
      onError(error: any): void;
      onClose(): void;
    };
    customerInfo?: {
      name: string;
      email?: string;
      phone?: string;
    };
  }

  interface KhaltiCheckoutInstance {
    show(options?: { amount?: number }): void;
  }

  export default class KhaltiCheckout {
    constructor(config: KhaltiConfig);
    show(options?: { amount?: number }): void;
  }
}