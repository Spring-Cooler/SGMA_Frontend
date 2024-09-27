<template>
	<header class="top-nav">
	  <div class="top-left-menu-container" @click="navigate">
		<img class="logo hide-text" src="@/assets/logo.svg" alt="logo" />
		<span>SGMA</span>
	  </div>
	  <div class="top-right-menu-container">
		<div class="search-bar" @click="navigateToSearch">
		  <i class="fa-solid fa-magnifying-glass"></i>
		  <span>스터디 그룹 찾아보기</span>
		</div>
		<div class="login-btn-wrapper" v-if="!isLoggedIn">
		  <button type="button" id="login-btn" class="btn login-btn" @click="openLoginModal">로그인</button>
		</div>
		<div class="user-profile" v-if="isLoggedIn">
		  <img
			:src="user.profileImage || 'https://example.com/default-profile.png'"
			class="profile-avatar"
			alt="프로필 이미지"
			@click="toggleDropdown"
		  />
		  <!-- 드롭다운 메뉴 -->
		  <div v-if="isDropdownVisible" class="dropdown-menu">
			<button class="dropdown-item" @click="navigateToMypage">
			  <i class="fa-solid fa-user"></i> 마이페이지
			</button>
			<button class="dropdown-item" @click="logout">
			  <i class="fa-solid fa-right-from-bracket"></i> 로그아웃
			</button>
		  </div>
		</div>
	  </div>
  
	  <!-- 로그인 모달 창 -->
	  <LoginModal
		v-if="isLoginModalVisible"
		@close="closeLoginModal"
		@goToStep1="openRegisterModal"
	  />
  
	  <!-- 회원가입 단계별 모달 -->
	  <!-- (이전 코드와 동일) -->
	</header>
  </template>
  
  <script setup>
  import { ref, inject, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import LoginModal from '@/components/common/LoginModal.vue';
  
  const router = useRouter();
  
  // 사용자 정보 및 로그인 상태 주입받기
  const user = inject('user');
  const token = inject('token');
  const setTokenData = inject('setTokenData');
  const setUserData = inject('setUserData');
  
  const isLoggedIn = ref(false); // 로그인 상태 확인
  const isDropdownVisible = ref(false); // 드롭다운 메뉴 상태
  
  // 로그인 상태 확인
  const checkLoginStatus = () => {
	isLoggedIn.value = !!token.accessToken; // accessToken이 존재하면 로그인된 것으로 간주
  };
  
  // 로그인 상태 변화 감시
  watch(
	() => token.accessToken,
	() => {
	  checkLoginStatus(); // accessToken 변경 시 로그인 상태 확인
	},
	{ immediate: true }
  );
  
  // 드롭다운 메뉴 토글
  const toggleDropdown = () => {
	isDropdownVisible.value = !isDropdownVisible.value;
  };
  
  // 마이페이지로 이동
  const navigateToMypage = () => {
	router.push('/mypage');
	isDropdownVisible.value = false; // 드롭다운 닫기
  };
  
  // 로그아웃 처리
  const logout = () => {
	// 토큰과 사용자 정보를 초기화
	setTokenData({ access_token: null, access_token_expiry: null, refresh_token: null, refresh_token_expiry: null });
	setUserData({
	  user_id: null,
	  user_auth_id: null,
	  user_identifier: null,
	  user_name: null,
	  nickname: null,
	  email: null,
	  user_status: null,
	  created_at: null,
	  withdrawn_at: null,
	  profile_image: null,
	  accept_status: null,
	  signup_path: null,
	});
  
	// localStorage 비우기
	localStorage.removeItem('token');
	localStorage.removeItem('user');
  
	// 로그인 상태와 드롭다운 초기화
	isLoggedIn.value = false;
	isDropdownVisible.value = false;
  
	// 로그인 페이지로 이동 (또는 다른 페이지)
	router.push('/');
  };
  
  // 모달 상태 변수
  const isLoginModalVisible = ref(false);
  const isRegisterModalVisible = ref(false);
  const currentSignupStep = ref(1); // 회원가입 단계를 1로 초기화
  const isPrivacyPolicyModalVisible = ref(false); // 개인정보 처리방침 모달 상태
  
  // 로그인 모달 열기
  const openLoginModal = () => {
	isLoginModalVisible.value = true; // 로그인 모달 열기
	isRegisterModalVisible.value = false; // 회원가입 모달 닫기
  };
  
  // 로그인 모달 닫기
  const closeLoginModal = () => {
	isLoginModalVisible.value = false; // 로그인 모달 닫기
  };
  
  // 회원가입 모달 열기
  const openRegisterModal = () => {
	isLoginModalVisible.value = false; // 로그인 모달 닫기
	isRegisterModalVisible.value = true; // 회원가입 모달 열기
	currentSignupStep.value = 1; // 회원가입 1단계로 초기화
  };
  
  // 회원가입 모달 닫기
  const closeRegisterModal = () => {
	isRegisterModalVisible.value = false;
	currentSignupStep.value = 1; // 단계 초기화
  };
  
  // 개인정보 처리방침 모달 열기
  const openPrivacyPolicyModal = () => {
	isPrivacyPolicyModalVisible.value = true;
	isRegisterModalVisible.value = false;
  };
  
  // 개인정보 처리방침 모달 닫기
  const closePrivacyPolicyModal = () => {
	isPrivacyPolicyModalVisible.value = false;
	isRegisterModalVisible.value = true; // 다시 회원가입 모달로 돌아가기
  };
  
  // 회원가입 완료
  const completeSignup = () => {
	closeRegisterModal(); // 회원가입 모달 닫기
  };
  
  // 스터디 그룹 찾아보기 페이지로 이동
  const navigateToSearch = () => {
	router.push('/search');
  };
  
  // 드롭다운 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', (event) => {
	const dropdownElement = document.querySelector('.user-profile');
	if (!dropdownElement.contains(event.target)) {
	  isDropdownVisible.value = false;
	}
  });
  
  </script>
  
  <style scoped>
  /* 상단 네비게이션 스타일 */
  .top-nav {
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 9rem;
	background-color: #ffffff;
	border-bottom: 1px solid #8c8c8c;
	z-index: 1000;
  }
  
  /* 로고 스타일 */
  .top-left-menu-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin-left: 3.4rem;
	cursor: pointer;
  }
  
  .top-left-menu-container img {
	height: 100%;
	width: 10.25rem;
  }
  
  .top-left-menu-container span {
	color: #a1b872;
	font-size: 3.5rem;
	font-weight: 700;
  }
  
  /* 우측 메뉴 스타일 */
  .top-right-menu-container {
	display: flex;
	gap: 4rem;
	margin-right: 5rem;
  }
  
  .search-bar {
	display: flex;
	align-items: center;
	height: 4.8rem;
	width: 29rem;
	background-color: #e3e4e5;
	border-radius: 10px;
	color: #888888;
	font-size: 2.4rem;
	font-weight: 500;
	gap: 1rem;
	cursor: pointer;
  }
  
  .search-bar i {
	margin-left: 1rem;
  }
  
  .login-btn-wrapper {
	display: flex;
	align-items: center;
	gap: 4rem;
  }
  
  .login-btn-wrapper::before {
	font-size: 2.4rem;
	color: #a6a6a6;
	content: "|";
  }
  
  .login-btn {
	height: 4.8rem;
	width: 10rem;
  }
  
  /* 사용자 프로필 섹션 */
  .user-profile {
	position: relative; /* 드롭다운 위치 조정을 위해 상대적 위치 설정 */
	display: flex;
	align-items: center;
	gap: 1rem;
  }
  
  .profile-avatar {
	width: 4.8rem;
	height: 4.8rem;
	border-radius: 50%;
	object-fit: cover;
	cursor: pointer;
  }
  
  /* 드롭다운 메뉴 스타일 */
  .dropdown-menu {
	position: absolute;
	top: 5rem; /* 프로필 이미지 바로 아래에 위치 */
	right: 0;
	background-color: #ffffff;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	z-index: 1001; /* 네비게이션보다 위에 보이도록 설정 */
  }
  
  .dropdown-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	width: 150px;
	padding: 1rem;
	font-size: 1.6rem;
	background-color: #ffffff;
	border: none;
	cursor: pointer;
  }
  
  .dropdown-item:hover {
	background-color: #f0f0f0; /* hover 시 회색 배경 */
  }
  
  .user-name {
	font-size: 1.8rem;
	font-weight: 600;
	color: #202020;
  }
  </style>
  