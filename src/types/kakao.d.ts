// src/types/kakao.d.ts
interface KakaoSDK {
  init(apiKey: string): void;
  isInitialized(): boolean;
  Auth: {
    login(options: { success: (response: any) => void; fail: (error: any) => void }): void;
    logout(): Promise<void>;
    getAccessToken(): string | null;
  };
  API: {
    request(options: {
      url: string;
      success?: (response: any) => void;
      fail?: (error: any) => void;
    }): Promise<any>;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

export type { KakaoSDK };