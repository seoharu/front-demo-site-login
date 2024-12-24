<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h2>로그인</h2>

    <FormInput
      v-model="form.email"
      type="email"
      placeholder="이메일"
      :error="errors.email"
    />

    <FormInput
      v-model="form.password"
      type="password"
      placeholder="비밀번호 (TMDB API Key)"
      :error="errors.password"
    />
    <FormCheckbox
      v-model="form.rememberMe"
      label="로그인 상태 유지"
    />

    <FormButton :loading="isLoading">
      로그인
    </FormButton>

    <!-- 구분선 추가 -->
    <div class="divider">
      <span>또는</span>
    </div>

    <!-- 카카오 로그인 버튼 -->
    <div class="kakao-login-wrapper">
      <button
        type="button"
        class="kakao-login-button"
        @click="handleKakaoLogin"
        :disabled="isKakaoLoading"
      >
        <img
          src="@/assets/kakao_login_medium_narrow.png"
          alt="카카오 로그인"
        />
      </button>
    </div>

    <button
      type="button"
      class="toggle-button"
      @click="$emit('toggle-auth')"
    >
      계정이 없으신가요? 회원가입
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from '@/components/common/Form/FormInput.vue'
import FormButton from '@/components/common/Form/FormButton.vue'
import FormCheckbox from '@/components/common/Form/FormCheckbox.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthStore } from '@/store/auth'

const { login } = useAuth()
const authStore = useAuthStore()

// eslint-disable-next-line no-undef
const emit = defineEmits<{
  (e: 'toggle-auth'): void
  (e: 'login-success'): void
}>()

const isLoading = ref(false)
const isKakaoLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    isLoading.value = true
    errors.email = ''
    errors.password = ''

   const result = await login(form)
    if (result.success) {
      emit('login-success')
    } else {
      // 에러 메시지에 따라 적절한 필드에 에러 표시
      if (result.error?.includes('이메일')) {
        errors.email = result.error
      } else {
        errors.password = result.error
      }
    }
  } finally {
    isLoading.value = false
  }
}


const handleKakaoLogin = async () => {
  try {
    isKakaoLoading.value = true
    const success = await authStore.loginWithKakao()
    if (success) {
      emit('login-success')
    }
  } catch (error) {
    console.error('Kakao login failed:', error)
  } finally {
    isKakaoLoading.value = false
  }
}

</script>

<style scoped lang="scss">
.auth-form {
  padding: 40px;

  h2 {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }
}
.divider {
  position: relative;
  text-align: center;
  margin: 16px 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 20px);
    height: 1px;
    background-color: #e2e8f0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  span {
    background-color: white;
    padding: 0 10px;
    color: #64748b;
    font-size: 12px;
  }
}

.kakao-login-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

.kakao-login-button {
  width: 60%; // 너비 줄임
  max-width: 200px; // 최대 너비 설정
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 6px;
  overflow: hidden;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  img {
    width: 100%;
    height: auto;
    display: block; // 이미지 하단 여백 제거
    border-radius: 6px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
                0 2px 4px rgba(0, 0, 0, 0.06);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
.toggle-button {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
