// src/services/kakaoAuth.js
export const kakaoAuth = {
  init() {
    try {
      // Kakao SDK가 로드되었는지 확인
      if (!window.Kakao) {
        console.error('Kakao SDK not loaded');
        return false;
      }

      // 이미 초기화되었는지 확인
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.KAKAO_CLIENT_ID);
        console.log('Kakao SDK initialized');
      }
      return true;
    } catch (error) {
      console.error('Kakao init error:', error);
      return false;
    }
  },

  async login() {
    if (!this.init()) {
      throw new Error('Kakao SDK initialization failed');
    }

    try {
      const response = await window.Kakao.Auth.login({
        success: (auth) => {
          console.log('Login success', auth);
          return auth;
        },
        fail: (err) => {
          console.error('Login failed', err);
          throw err;
        }
      });
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async getProfile() {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      throw new Error('Not logged in');
    }

    try {
      const response = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log('Profile response:', response);
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }
};

export default kakaoAuth;