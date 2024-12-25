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
        const kakaoClientId = process.env.VUE_APP_KAKAO_CLIENT_ID;
        console.log('Using Kakao Client ID:', kakaoClientId); // 디버깅용

        if (!kakaoClientId) {
          console.error('Kakao Client ID not found in environment variables');
          return false;
        }

        window.Kakao.init(kakaoClientId);
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
      const authObj = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: async (response) => {
            console.log('Login success:', response);
            // 로그인 성공 직후 프로필 정보 가져오기
            try {
              const profileData = await this.getProfile();
              resolve({
                auth: response,
                profile: profileData
              });
            } catch (profileError) {
              reject(new Error('프로필 정보 조회 실패: ' + profileError.message));
            }
          },
          fail: (err) => {
            console.error('Login failed:', err);
            reject(new Error(err.message || '카카오 로그인 실패'));
          },
          scope: 'profile_nickname, profile_image'
        });
      });

      return authObj;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async getProfile() {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      throw new Error('로그인이 필요합니다');
    }

    try {
      const response = await window.Kakao.API.request({
        url: '/v2/user/me'
      });

      console.log('Raw profile response:', response); // 디버깅용

      // 응답 구조 확인 및 필수 필드 검증
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format');
      }

      // properties가 존재하고 nickname이 있는지 확인
      if (!response.properties || !response.properties.nickname) {
        console.error('Properties or nickname missing:', response);
        throw new Error('프로필 정보가 불완전합니다');
      }

      return {
        id: response.id,
        connected_at: response.connected_at,
        properties: {
          nickname: response.properties.nickname,
          profile_image: response.properties.profile_image
        },
        kakao_account: response.kakao_account
      };

    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async logout() {
    if (!window.Kakao?.Auth?.getAccessToken()) {
      return;
    }

    try {
      await window.Kakao.Auth.logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
};

export default kakaoAuth;