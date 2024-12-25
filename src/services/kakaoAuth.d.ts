// src/services/kakaoAuth.d.ts

export interface KakaoUser {
  id: number;
  connected_at: string;
  properties?: {
    nickname?: string;
    profile_image?: string;
  };
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

export interface KakaoAuth {
  init(): boolean;
  login(): Promise<any>;
  getProfile(): Promise<KakaoUser>;
}

export const kakaoAuth: KakaoAuth;
export default kakaoAuth;