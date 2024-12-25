<!-- views/OAuthCallback.vue -->
<template>
  <div>로그인 처리 중...</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(() => {
      // 로그인 처리 완료 후 메인 페이지로 리다이렉트
      router.push('/');
    });

    return {};
  }
};
</script>