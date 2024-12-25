// src/composables/useAuth.ts
import { ref, computed } from 'vue'
import { useValidation } from './useValidation'
import { useRouter } from 'vue-router'
import { kakaoAuth } from '@/services/kakaoAuth.js'
import type { KakaoSDK } from '@/types/kakao'


interface User {
  id: string
  password: string // TMDB API Key
}

interface KakaoUser {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile?: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    email?: string;
  };
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}


export const useAuth = () => {
  const router = useRouter()
  const { validateLoginForm, validateRegisterForm } = useValidation()
  const currentUser = ref<string | null>(null)
  const kakaoUserInfo = ref<KakaoUser | null>(null)
  const isScrolled = ref(false)
  const isMobileMenuOpen = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    return currentUser.value !== null
  })

  // localStorage 안전하게 사용하는 유틸리티 함수

  const safeSetItem = (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error)
    }
  }

  // TMDB API 키 검증
  const validateTMDbKey = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`
      )
      return response.ok
    } catch {
      return false
    }
  }

  // API 에러 처리 함수 추가
  const handleApiError = (err: unknown) => {
    // 오프라인 상태 체크
  if (!navigator.onLine) {
    const message = '인터넷 연결을 확인해주세요.';
    error.value = message;
    return { success: false, error: message };
  }

  // 타임아웃 에러 체크
  if (err instanceof Error && err.name === 'TimeoutError') {
    const message = '서버 응답 시간이 초과되었습니다. 다시 시도해주세요.';
    error.value = message;
    return { success: false, error: message };
  }

  console.error('API Error:', err);
  const message = err instanceof Error
    ? err.message
    : '서비스 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';

  error.value = message;
  return { success: false, error: message };
  };

  const kakaoLogin = async (): Promise<AuthResponse> => {
    loading.value = true
    error.value = null

    try {
      console.log('카카오 로그인 시작');
      const authResponse = await kakaoAuth.login()
      console.log('카카오 인증 응답:', authResponse);

      if (!authResponse) {
        throw new Error('카카오 로그인 인증 실패')
      }

      const userInfo = await kakaoAuth.getProfile()
      console.log('카카오 프로필 응답:', userInfo);

      if (!userInfo || !userInfo.properties || !userInfo.properties.nickname) {
        throw new Error('카카오 프로필 정보가 올바르지 않습니다.')
      }

      // 닉네임이 있는지 한번 더 확인
      const nickname = userInfo.properties.nickname.trim()
      if (!nickname) {
        throw new Error('카카오 닉네임을 가져올 수 없습니다.')
      }

      if (!userInfo || !userInfo.properties || !userInfo.properties.nickname) {
        throw new Error('카카오 사용자 정보를 가져올 수 없습니다')
      }

      const validatedUser = userInfo as KakaoUser
       // 프로필 정보 저장
      kakaoUserInfo.value = validatedUser
      currentUser.value = nickname

      // localStorage에도 저장
      safeSetItem('kakaoUser', userInfo)
      safeSetItem('currentUser', nickname)

      // properties에서 직접 접근
      currentUser.value = validatedUser.properties.nickname;

      console.log('카카오 로그인 사용자 정보:', {
        ID: userInfo.id,
        닉네임: nickname,
        프로필사진: userInfo.properties.profile_image,
        연결시간: userInfo.connected_at,
        계정정보: validatedUser.kakao_account
      })

      router.push('/')
      return { success: true }
    } catch (error) {
      console.error('Kakao login error:', error)
      const errorMessage = error instanceof Error ? error.message : '카카오 로그인 중 오류 발생'

      return { success: false, error: errorMessage }
    } finally {
      loading.value = false
    }
  }

  const register = async (form: RegisterForm): Promise<AuthResponse> => {
    try {
      const validation = validateRegisterForm(form)
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error
        }
      }

      const isValidKey = await validateTMDbKey(form.password)
      if (!isValidKey) {
        return {
          success: false,
          error: '유효하지 않은 TMDB API 키입니다.'
        }
      }

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some(user => user.id === form.email)) {
        return {
          success: false,
          error: '이미 등록된 이메일입니다.'
        }
      }

      users.push({
        id: form.email,
        password: form.password
      })
      localStorage.setItem('users', JSON.stringify(users))

      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      return {
        success: false,
        error: '회원가입 중 오류가 발생했습니다.'
      }
    }
  }

  const login = async (form: LoginForm): Promise<AuthResponse> => {
    try {
      const validation = validateLoginForm(form)
      if (!validation.isValid) {
        return { success: false, error: validation.error }
      }

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.id === form.email && u.password === form.password)

      if (!user) {
        return { success: false, error: '이메일 또는 비밀번호가 일치하지 않습니다.' }
      }

      const isValidKey = await validateTMDbKey(form.password)
      if (!isValidKey) {
        return { success: false, error: '유효하지 않은 TMDB API 키입니다.' }
      }

      localStorage.setItem('TMDb-Key', form.password)
      localStorage.setItem('currentUser', form.email)
      if (form.rememberMe) {
        localStorage.setItem('keepLoggedIn', 'true')
      }

      currentUser.value = form.email
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: '로그인 중 오류가 발생했습니다.' }
    }
  }

  const logout = async () => {
    try {
      if (window.Kakao?.Auth?.getAccessToken()) {
        await window.Kakao.Auth.logout()
      }

      currentUser.value = null
      kakaoUserInfo.value = null
      localStorage.removeItem('kakaoUser')
      localStorage.removeItem('TMDb-Key')
      localStorage.removeItem('currentUser')
      localStorage.removeItem('keepLoggedIn')
      isMobileMenuOpen.value = false

      router.push('/signin')
    } catch (error) {
      console.error('Logout error:', error)

      handleApiError(error);
      throw error;
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    try {
      // 카카오 로그인 체크
      const savedKakaoUser = localStorage.getItem('kakaoUser')
      console.log('savedKakaoUser:', savedKakaoUser)

      if (window.Kakao?.Auth?.getAccessToken()) {
        try {
          const userInfo = await kakaoAuth.getProfile()
          console.log('Fresh profile info:', userInfo)

          const kakaoUserInfo = userInfo as any

          if (userInfo?.properties?.nickname) {
            // 타입 캐스팅과 함께 필수 필드 확인
            const validatedUser: KakaoUser = {
              id: userInfo.id,
              connected_at: userInfo.connected_at,
              properties: {
                nickname: userInfo.properties.nickname,
                profile_image: userInfo.properties.profile_image,
              },
              kakao_account: {
                profile_nickname_needs_agreement: false,
                profile_image_needs_agreement: false,
                profile: {
                  nickname: kakaoUserInfo.properties.nickname,
                  profile_image_url: kakaoUserInfo.properties.profile_image || '',
                  thumbnail_image_url: kakaoUserInfo.properties.thumbnail_image || ''
                },
                email: kakaoUserInfo.kakao_account?.email || ''
              }
            }

            kakaoUserInfo.value = validatedUser
            currentUser.value = validatedUser.properties.nickname

            // localStorage에 저장
            safeSetItem('kakaoUser', validatedUser)
            safeSetItem('currentUser', validatedUser.properties.nickname)

            console.log('Updated current user:', currentUser.value)
            return true
          }
        } catch (error) {
          console.error('Failed to fetch profile:', error)
          await logout()
        }
      } else if (savedKakaoUser) {
        console.log('Token missing but saved user exists, logging out')
        await logout()
        }

      // 일반 로그인 체크
      const savedUser = localStorage.getItem('currentUser')
      const keepLoggedIn = localStorage.getItem('keepLoggedIn')

      if (savedUser && keepLoggedIn === 'true') {
        currentUser.value = savedUser
        return true
      }

      return false
    } catch (error) {

      console.error('Auth check error:', error)
      return false
    }
  }

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '대세 콘텐츠', path: '/popular' },
    { name: '찾아보기', path: '/search' },
    { name: '내가 찜한 콘텐츠', path: '/wishlist' }
  ]

  const requireAuth = (): boolean => {
    return isLoggedIn.value
  }

  return {
    currentUser,
    kakaoUserInfo,
    isLoggedIn,
    loading,
    error,
    login,
    register,
    kakaoLogin,
    logout,
    checkAuth,
    requireAuth,
    isScrolled,
    isMobileMenuOpen,
    handleScroll,
    toggleMobileMenu,
    closeMobileMenu,
    menuItems
  }
}