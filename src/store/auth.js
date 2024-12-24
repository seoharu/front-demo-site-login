// src/store/auth.js
import { defineStore } from 'pinia';
import { kakaoAuth } from '@/services/kakaoAuth';

export const useAuthStore = defineStore('auth', {
 state: () => ({
   user: null,
   isAuthenticated: false,
   loading: false,
   error: null
 }),

 actions: {
   async loginWithKakao() {
     try {
       this.loading = true;
       this.error = null;

       // 카카오 로그인
       const authObj = await kakaoAuth.login();

       // 사용자 정보 가져오기
       const userInfo = await kakaoAuth.getProfile();

       // 상태 업데이트
       this.user = {
         id: userInfo.id,
         nickname: userInfo.nickname,
         profileImage: userInfo.profileImage,
         email: userInfo.email
       };

       this.isAuthenticated = true;

       // 토큰 및 사용자 정보 저장
       localStorage.setItem('kakaoToken', authObj.access_token);
       localStorage.setItem('userInfo', JSON.stringify(this.user));

       return true;
     } catch (error) {
       this.error = error.message || '로그인에 실패했습니다.';
       console.error('Kakao login failed:', error);
       return false;
     } finally {
       this.loading = false;
     }
   },

   async logout() {
     try {
       this.loading = true;
       this.error = null;

       await kakaoAuth.logout();

       // 상태 초기화
       this.user = null;
       this.isAuthenticated = false;

       // 로컬 스토리지 클리어
       localStorage.removeItem('kakaoToken');
       localStorage.removeItem('userInfo');

       return true;
     } catch (error) {
       this.error = error.message || '로그아웃에 실패했습니다.';
       console.error('Logout failed:', error);
       return false;
     } finally {
       this.loading = false;
     }
   },

   // 페이지 새로고침시 로그인 상태 복구
   initializeAuth() {
     try {
       const savedUserInfo = localStorage.getItem('userInfo');
       const token = localStorage.getItem('kakaoToken');

       if (savedUserInfo && token) {
         this.user = JSON.parse(savedUserInfo);
         this.isAuthenticated = true;
         kakaoAuth.restoreSession();
       }
     } catch (error) {
       console.error('Failed to initialize auth:', error);
       this.user = null;
       this.isAuthenticated = false;
       localStorage.removeItem('kakaoToken');
       localStorage.removeItem('userInfo');
     }
   },

   clearError() {
     this.error = null;
   }
 },

 getters: {
   userProfile: (state) => state.user,
   isLoading: (state) => state.loading,
   errorMessage: (state) => state.error
 }
});