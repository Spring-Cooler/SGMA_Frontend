<template>
	<header class="top-nav">
	  <div class="top-left-menu-container" @click="navigate">
		<img class="logo hide-text" src="@/assets/logo.svg" alt="logo" />
		<span>SGMA</span>
	  </div>
	  <div class="top-right-menu-container">
		<div class="search-bar">
		  <i class="fa-solid fa-magnifying-glass"></i>
		  <span>스터디 그룹 찾아보기</span>
		</div>
		<div class="login-btn-wrapper">
		  <button type="button" id="login-btn" class="btn login-btn" @click="openLoginModal">로그인</button>
		</div>
	  </div>
  
	  <!-- 로그인 모달 창 -->
	  <LoginModal
		v-if="isLoginModalVisible"
		@close="closeLoginModal"
		@goToStep1="openRegisterModal"
	  />
  
	  <!-- 회원가입 단계별 모달 -->
	  <SignupStep1
		v-if="isRegisterModalVisible && currentSignupStep === 1"
		@close="closeRegisterModal"
		@goToStep2="goToStep2"  
		@openLogin="openLoginModal"
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import LoginModal from '@/components/common/LoginModal.vue';
  import SignupStep1 from '@/views/user/components/SignupStep1.vue';
  import SignupStep2 from '@/views/user/components/SignupStep2.vue';
  import SignupStep3 from '@/views/user/components/SignupStep3.vue';
  import PrivacyPolicyModal from '@/views/user/components/PrivacyPolicyModal.vue'; // PrivacyPolicyModal
  
  const router = useRouter();
  
  // 모달 상태 변수
  const isLoginModalVisible = ref(false);
  const isRegisterModalVisible = ref(false);
  const currentSignupStep = ref(1); // 회원가입 단계를 1로 초기화
  const isPrivacyPolicyModalVisible = ref(false); // 개인정보 처리방침 모달 상태
  
	// 로그인 모달 열기
	const openLoginModal = () => {
	console.log("openLoginModal triggered");
	isLoginModalVisible.value = true; // 로그인 모달 열기
	isRegisterModalVisible.value = false; // 회원가입 모달 닫기
	};
	// 로그인 모달 닫기
const closeLoginModal = () => {
  console.log("closeLoginModal triggered");
  isLoginModalVisible.value = false; // 로그인 모달 닫기
};


	// 회원가입 모달 열기
	const openRegisterModal = () => {
		console.log("openRegisterModal triggered");
		isLoginModalVisible.value = false; // 로그인 모달 닫기
		isRegisterModalVisible.value = true; // 회원가입 모달 열기
		currentSignupStep.value = 1; // 회원가입 1단계로 초기화
	};
  
  // 회원가입 모달 닫기
  const closeRegisterModal = () => {
	isRegisterModalVisible.value = false;
	currentSignupStep.value = 1; // 단계 초기화
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
	console.log("회원가입이 완료되었습니다!");
	closeRegisterModal(); // 회원가입 모달 닫기
  };
  
  function navigate() {
	router.push("/"); // 지정된 경로로 이동 
  }
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
  </style>
  