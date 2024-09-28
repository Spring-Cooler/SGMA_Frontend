<template>
	<header class="top-nav">
	<div class="top-left-menu-container" @click="navigateToHome">
		<img class="logo hide-text" src="@/assets/logo.svg" alt="logo" />
		<span>SGMA</span>
	</div>
	<div class="top-right-menu-container">
		<div class="search-bar" @click="navigateToSearch">
		<i class="fa-solid fa-magnifying-glass"></i>
		<span>스터디 그룹 찾아보기</span>
		</div>

		   <!-- login-btn-wrapper와 user-profile 사이에 구분선 추가 -->
		   <div v-if="isLoggedIn" class="divider"></div> <!-- 로그인 상태일 때 구분선 표시 -->
  <div v-if="!isLoggedIn" class="divider"></div> <!-- 비로그인 상태일 때 구분선 표시 -->

		<div class="login-btn-wrapper" v-if="!isLoggedIn">
		<button type="button" id="login-btn" class="btn login-btn" @click="openLoginModal">로그인</button>
		</div>
		<div class="user-profile" v-if="isLoggedIn">
		<img
			:src="  defaultProfileImage || user.profileImage "
			class="profile-avatar"
			alt="프로필 이미지"
			@click="toggleDropdown"
		/>
		<!-- 드롭다운 메뉴 -->
		<div v-if="isDropdownVisible" class="dropdown-menu">
  <button class="dropdown-item" @click="navigateToMypage">
    <i class="fa-solid fa-user custom-icon"></i> 마이페이지
  </button>
  <button class="dropdown-item" @click="logout">
    <i class="fa-solid fa-right-from-bracket custom-icon"></i> 로그아웃
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
	<!-- 회원가입 단계별 모달 -->
	<SignupStep1
	v-if="isRegisterModalVisible && currentSignupStep === 1"
	@close="closeRegisterModal"
	@openLogin="openLoginModal" 
	@goToStep2="goToStep2"  
  />
  <SignupStep2
	v-if="isRegisterModalVisible && currentSignupStep === 2"
	@close="closeRegisterModal"
	@goToStep1="openRegisterModal"
	@goToStep3="goToStep3"
	@openPrivacyPolicy="openPrivacyPolicyModal" 
  />
  <SignupStep3
	v-if="isRegisterModalVisible && currentSignupStep === 3"
	@close="closeRegisterModal"
	@goToStep2="goToStep2"
	@complete="completeSignup"
  />
   <!-- 개인정보 처리방침 모달 -->
   <PrivacyPolicyModal v-if="isPrivacyPolicyModalVisible" @close="closePrivacyPolicyModal" />
	</header>
</template>

<script setup>
import { ref, inject, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from '@/components/common/LoginModal.vue';
import SignupStep1 from '@/views/user/components/SignupStep1.vue';
  import SignupStep2 from '@/views/user/components/SignupStep2.vue';
  import SignupStep3 from '@/views/user/components/SignupStep3.vue';
  import PrivacyPolicyModal from '@/views/user/components/PrivacyPolicyModal.vue'; // PrivacyPolicyModal
// 기본 프로필 이미지 import
import defaultProfileImage from '@/assets/images/default_profile.svg';
const router = useRouter();

// 사용자 정보 및 로그인 상태 주입받기
const token = inject('token');
const setTokenData = inject('setTokenData');

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

// 홈 페이지로 이동
const navigateToHome = () => {
	router.push('/');
};


// 마이페이지로 이동
const navigateToMypage = () => {
	router.push('/mypage');
	isDropdownVisible.value = false; // 드롭다운 닫기
};
// 로그아웃 처리
const logout = () => {
  // 토큰과 사용자 정보를 초기화
  setTokenData({
    user_identifier: null,
    access_token: null,
    access_token_expiry: null,
    refresh_token: null,
    refresh_token_expiry: null,
  });

  // localStorage 초기화
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  // 로그인 상태 갱신
  isLoggedIn.value = false;

  // 로그아웃 후 홈으로 이동
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


// Navigation.vue에서 이벤트 핸들러 정의
const goToStep2 = () => {
console.log('goToStep2 received');
currentSignupStep.value = 2; // 명확하게 Step 2로 이동
console.log(`Current step: ${currentSignupStep.value}`);
};
// Navigation.vue에서 이벤트 핸들러 정의
const goToStep3 = () => {
console.log('goToStep2 received');
currentSignupStep.value = 3; // 명확하게 Step 2로 이동
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
if (dropdownElement && !dropdownElement.contains(event.target)) {
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
	  align-items: center; /* 수직 중앙 정렬 */
	  gap: 4rem; /* 각 요소 사이에 여백 */
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

/* 구분선 스타일 */
.divider {
height: 2rem; /* 원하는 높이로 설정 */
width: 1px; /* 세로 구분선 */
background-color: #a6a6a6; /* 구분선 색상 */
margin: 0 1.5rem; /* 좌우 여백으로 위치 조정 */
}

/* 로그인 버튼 / 프로필 컨테이너 */
.login-btn-wrapper {
display: flex;
align-items: center;
justify-content: center;
width: 10rem; /* 고정 너비 설정 */
gap: 1rem; /* 여백 조정 */
}

/* 로그인 버튼 */
.login-btn {
height: 4.8rem;
width: 10rem;
}

/* 사용자 프로필 */
.user-profile {
display: flex;
align-items: center;
justify-content: center;
width: 10rem; /* 동일한 고정 너비 설정 */
}

/* 사용자 프로필 섹션 */
.user-profile .profile-avatar {
  width: 6rem; /* 원하는 너비로 설정 */
  height: 6rem; /* 원하는 높이로 설정 */
  object-fit: cover; /* 이미지가 찌그러지지 않고 잘 맞게 표시됨 */
  border-radius: 50%; /* 원형으로 만들기 위해 사용 */
}


/* 드롭다운 메뉴 스타일 */
.dropdown-menu {
	position: absolute;
	top: 7.6rem; /* 프로필 이미지 바로 아래에 위치 */
	right: 8rem;
	background-color: #ffffff;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), /* 기본 그림자 */
              0 2px 4px rgba(0, 0, 0, 0.05);   /* 추가적인 약한 그림자 */
	z-index: 1001; /* 네비게이션보다 위에 보이도록 설정 */
}

.dropdown-item {
	display: flex;
	align-items: center;
	gap: 1rem;
	width: 20rem;
	height: 5rem;
	padding: 1rem;
	font-size: 2rem;
	border: 1px solid #ddd;
	border-radius: 10px;
	background-color: #ffffff;
	border: none;
	cursor: pointer;
}

.dropdown-item:hover {
	background-color: #f0f0f0; /* hover 시 회색 배경 */
}

/* 특정 클래스 .custom-icon에 대해 opacity 적용 */
.custom-icon {
  opacity: 0.5; /* 아이콘 투명도를 50%로 설정 */
}
</style>
