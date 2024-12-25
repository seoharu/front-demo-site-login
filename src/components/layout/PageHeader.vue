<template>
  <header
    class="header-container"
    :class="{
      'header-scrolled': isScrolled,
      'header-initial': !isScrolled
    }"
  >
    <nav class="container mx-auto h-full flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <font-awesome-icon icon="fas fa-film" class="logo" />
      </router-link>

      <!-- Main Navigation -->
      <div class="movie-pages">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="movie-page"
          :class="{ 'active': $route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Right Side User Section -->
      <div class="right-side">
        <button
          @click="handleUserClick"
          v-if="isLoggedIn"
          class="user-button"
        >
          <font-awesome-icon icon="fas fa-user" class="text-lg" />
        </button>
        <router-link
          v-else
          to="/signin"
          class="login-link"
        >
          <font-awesome-icon icon="fas fa-sign-in-alt" class="mr-2" />
          로그인
        </router-link>

        <!-- User Dropdown Menu -->
        <Transition
          enter-active-class="dropdown-enter"
          enter-from-class="dropdown-enter-from"
          enter-to-class="dropdown-enter-to"
          leave-active-class="dropdown-leave"
          leave-from-class="dropdown-leave-from"
          leave-to-class="dropdown-leave-to"
        >
          <div
            v-if="isUserMenuOpen"
            class="dropdown-menu"
          >
            <div class="dropdown-header">
<!--              {{ currentUser }}-->
              <div class="profile-container">
                <div class="profile-info">
                  <font-awesome-icon icon="fas fa-id-badge" class="profile-icon" />
                  <span class="profile-name">{{ currentUser }}</span>

                </div>
                <span class="welcome-text">님 환영합니다</span>
              </div>
            </div>


            <button
              @click="handleLogout"
              class="dropdown-item"
            >
              <font-awesome-icon icon="fas fa-sign-out-alt" class="mr-2" />
              로그아웃
            </button>
          </div>
        </Transition>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* 헤더 기본 스타일 */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

/* 프로필 정보 영역 */
.profile-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 프로필 이름 */
.profile-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #60A5FA;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
}

.profile-container:hover .profile-name {
  color: #3B82F6;
}

/* 프로필 아이콘 */
.profile-icon {
  font-size: 1.125rem;
  color: #60A5FA;
  transition: all 0.3s ease;
}

.profile-container:hover .profile-icon {
  color: #3B82F6;
  transform: rotate(12deg);
}

/* 환영 메시지 */
.welcome-text {
  font-size: 0.875rem;
  color: #9CA3AF;
}

/* 드롭다운 헤더 기본 스타일 유지 */
.dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem 0.5rem 0 0;
}

.header-initial {
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0) 100%);
  backdrop-filter: blur(0);
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}

.header-scrolled {
  height: 50px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}


/* 스크롤 시 메뉴 아이템 스타일 변경 */
.header-scrolled .movie-page {
  color: rgba(255, 255, 255, 0.8);
}

.header-scrolled .movie-page:hover {
  color: white;
}

.header-scrolled .movie-page::after {
  background: #60A5FA;
}

/* 네비게이션 컨테이너 */
.container {
  padding: 0 4%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 로고 스타일링 */
.logo {
  color: #60A5FA;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  color: #3B82F6;
  transform: scale(1.1);
}

/* 스크롤 시 로고 스타일 변경 */
.header-scrolled .logo {
  transform: scale(0.9);
}

.header-scrolled .logo:hover {
  transform: scale(1);
}

/* 스크롤 시 드롭다운 메뉴 스타일 변경 */
.header-scrolled .dropdown-menu {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

/* 스크롤 시 로그인 버튼 스타일 변경 */
.header-scrolled .login-link {
  background: rgba(59, 130, 246, 0.9);
}

.header-scrolled .login-link:hover {
  background: rgba(37, 99, 235, 1);
}

/* 초기 상태의 추가 스타일 */
.header-initial .movie-page::after {
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
}

.header-initial .movie-page.active::after {
  background: #60A5FA;
}

/* 호버 시 발광 효과 */
.header-scrolled .movie-page:hover::after {
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
}

/* 트랜지션 개선 */
.header-container * {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}



/* 네비게이션 메뉴 */
.movie-pages {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.movie-page {
  position: relative;
  text-decoration: none;
  color: #E5E7EB;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.movie-page::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3B82F6;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.movie-page:hover {
  color: white;
}

.movie-page:hover::after,
.movie-page.active::after {
  transform: scaleX(1);
}

.movie-page.active {
  color: #60A5FA;
}

/* 사용자 섹션 */
.right-side {
  position: relative;
}

.user-button {
  padding: 0.5rem;
  color: white;
  border-radius: 50%;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.user-button:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.login-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: #3B82F6;
  color: white;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.login-link:hover {
  background: #2563EB;
  transform: translateY(-1px);
}

/* 드롭다운 메뉴 */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: 160px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 0.875rem;
}

.dropdown-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  color: #E5E7EB;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  width: 200px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dropdown-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: white;
  transform: translateX(2px);
}

/* 드롭다운 애니메이션 클래스 */
.dropdown-enter {
  transition: all 0.3s ease-out;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave {
  transition: all 0.2s ease-in;
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 반응형 디자인 */
/* 기존 미디어 쿼리 수정 및 추가 */
@media (max-width: 768px) {
 .header-container {
   height: 56px;
 }

 .header-scrolled {
   height: 48px;
 }

 .container {
   padding: 0 0.75rem;
 }

 .movie-pages {
   gap: 1.25rem;
 }

 .movie-page {
   font-size: 0.85rem;
 }

 .login-link {
   padding: 0.4rem 0.8rem;
   font-size: 0.85rem;
 }
}

@media (max-width: 640px) {
 .header-container {
   height: 52px;
 }

 .header-scrolled {
   height: 44px;
 }

 .container {
   padding: 0 0.5rem;
 }

 .movie-pages {
   gap: 1rem;
 }

 .movie-page {
   font-size: 0.8rem;
 }

 .logo {
   font-size: 1.25rem;
 }

 .login-link {
   padding: 0.35rem 0.7rem;
   font-size: 0.8rem;
 }

 .dropdown-menu {
   width: 180px;
 }
}

@media (max-width: 480px) {
 .header-container {
   height: 48px;
 }

 .header-scrolled {
   height: 40px;
 }

 .movie-pages {
   gap: 0.75rem;
 }

 .movie-page {
   font-size: 0.75rem;
 }

 .logo {
   font-size: 1.1rem;
 }

 .login-link {
   padding: 0.3rem 0.6rem;
   font-size: 0.75rem;
 }

 .dropdown-menu {
   width: 160px;
 }
}

@media (max-width: 430px) {
 .header-container {
   height: 55px;
 }

 .header-scrolled {
   height: 38px;
 }

 .container {
   padding: 0 0.25rem;
 }

 .movie-pages {
   gap: 0.5rem;
 }

 .movie-page {
   font-size: 0.7rem;
 }

 .logo {
   font-size: 1rem;
 }

 .dropdown-menu {
   width: 150px;
   font-size: 0.75rem;
 }
}
</style>

<script setup lang="ts">
// 기존 스크립트 부분은 동일하게 유지
import { ref, onMounted, onUnmounted, watch, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilm, faUser, faSignOutAlt, faSignInAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons'

library.add(faFilm, faUser, faSignOutAlt, faSignInAlt, faIdBadge)

defineComponent({
  name: 'PageHeader'
})

const router = useRouter()
const {
  currentUser,
  isLoggedIn,
  logout,
  isScrolled,
  handleScroll,
  menuItems,
  checkAuth
} = useAuth()

// 디버깅을 위한 watch 추가
watch(() => currentUser.value, (newValue) => {
  console.log('currentUser changed:', newValue);
});

const isUserMenuOpen = ref(false)

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.right-side')) {
    isUserMenuOpen.value = false
  }
}

const handleUserClick = () => {
  if (isLoggedIn.value) {
    isUserMenuOpen.value = !isUserMenuOpen.value
  } else {
    router.push('/signin')
  }
}

const handleLogout = () => {
  logout()
  isUserMenuOpen.value = false
  router.push('/signin')
}

watch(() => router.currentRoute.value.path, () => {
  isUserMenuOpen.value = false
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
  checkAuth()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})
</script>