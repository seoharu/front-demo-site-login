// src/services/kakaoAuth.js

export const kakaoAuth = {
  // SDK 초기화
  init() {
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.KAKAO_CLIENT_ID);
        console.log('Kakao SDK 초기화 성공');
      }
    } catch (error) {
      console.error('Kakao SDK 초기화 실패:', error);
      throw new Error('카카오 로그인 서비스를 초기화하는데 실패했습니다.');
    }
  },

  // 로그인 처리
  async login() {
    try {
      const response = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });

      // 토큰을 localStorage에 저장
      localStorage.setItem('kakaoToken', response.access_token);
      console.log('카카오 로그인 성공');
      return response;

    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      if (error.error_code === 'access_denied') {
        throw new Error('로그인이 취소되었습니다.');
      } else {
        throw new Error('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  },

  // 로그아웃 처리
  async logout() {
    try {
      await new Promise((resolve, reject) => {
        window.Kakao.Auth.logout((response) => {
          if (response) {
            resolve(response);
          } else {
            reject(new Error('로그아웃 실패'));
          }
        });
      });

      // localStorage에서 토큰 제거
      localStorage.removeItem('kakaoToken');
      localStorage.removeItem('userInfo');
      console.log('카카오 로그아웃 성공');
      return true;

    } catch (error) {
      console.error('카카오 로그아웃 실패:', error);
      throw new Error('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  },

  // 사용자 정보 조회
  async getProfile() {
    try {
      const response = await new Promise((resolve, reject) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });

      // 필요한 정보 추출 및 가공
      const userInfo = {
        id: response.id,
        nickname: response.properties.nickname,
        profileImage: response.properties.profile_image,
        email: response.kakao_account?.email,
        gender: response.kakao_account?.gender,
        ageRange: response.kakao_account?.age_range
      };

      // 추가 정보 콘솔 출력 (요구사항)
      console.log('카카오 사용자 추가 정보:', {
        email: userInfo.email,
        gender: userInfo.gender,
        ageRange: userInfo.ageRange
      });

      // localStorage에 사용자 정보 저장
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return userInfo;

    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      if (error.error_code === 'NOT_CONNECTED_USER') {
        throw new Error('카카오 계정 연결이 해제되었습니다. 다시 로그인해주세요.');
      } else if (error.error_code === 'INVALID_TOKEN') {
        // 토큰 만료 시 localStorage 클리어
        localStorage.removeItem('kakaoToken');
        localStorage.removeItem('userInfo');
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (error.error_code === 'API_LIMIT_EXCEEDED') {
        throw new Error('잠시 후 다시 시도해주세요.');
      } else {
        throw new Error('사용자 정보를 불러오는데 실패했습니다.');
      }
    }
  },

  // 로그인 상태 확인
  checkLoginStatus() {
    try {
      const token = localStorage.getItem('kakaoToken');
      const userInfo = localStorage.getItem('userInfo');

      if (!token || !userInfo) {
        return false;
      }

      // 토큰 유효성 체크
      return window.Kakao.Auth.getAccessToken() !== null;
    } catch (error) {
      console.error('로그인 상태 확인 실패:', error);
      return false;
    }
  },

  // 초기 상태 복구
  restoreSession() {
    try {
      const token = localStorage.getItem('kakaoToken');
      if (token) {
        window.Kakao.Auth.setAccessToken(token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('세션 복구 실패:', error);
      return false;
    }
  }
};

export default kakaoAuth;