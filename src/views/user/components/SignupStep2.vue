<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>

      <!-- 페이지 번호 표시 -->
      <div class="page-indicator">
        <span>2</span>
        <span>3</span>
      </div>

      <div class="modal-header">
        <h2>SGMA</h2>
      </div>

      <div class="modal-body">
        <div class="message-container">
          <!-- 1번: 인사말 -->
          <p class="first-text">만나서 반가워요!</p>
          <p class="second-text">아이디와 비밀번호를 입력해주세요.</p>
        </div>

        <div class="input-container">
          <!-- 아이디와 비밀번호 입력 -->
          <div class="userAuthId-container">
            <input
              type="text"
              placeholder="아이디 입력"
              v-model="userAuthId"
              maxlength="20"
            />
            <button class="check-btn" @click="checkUserAuthIdDuplication">중복 확인</button>
          </div>
          <!-- 아이디 입력 에러 메시지 -->
          <span v-if="userAuthIdError" class="error-text">{{ userAuthIdError }}</span>
          <!-- 아이디 중복 검증 메시지 -->
          <span v-if="userAuthIdDuplicationStatus" :class="{'success-text': !userAuthIdError, 'error-text': userAuthIdError}">
            {{ userAuthIdDuplicationStatus }}
          </span>

          <div class="password-input-container">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="비밀번호 입력"
              v-model="password"
              maxlength="24"
            />
            <i class="eye-icon" @click="togglePasswordVisibility">
              <img
                :src="passwordVisible ? eyeOpenIcon : eyeClosedIcon"
                alt="eye icon"
              />
            </i>
          </div>
          <!-- 비밀번호 입력 에러 메시지 -->
          <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
        </div>

        <div class="terms-container">
          <!-- 약관 동의 및 개인정보 처리방침 -->
          <div class="agreement-container">
            <!-- 약관 동의 토글 버튼 -->
            <div class="checkbox-container" @click="toggleAgreement">
              <div :class="['checkbox', { 'checked': isAgreed }]"></div>
              <span class="checkbox-text">SGMA 이용약관 동의 및 개인정보처리방침</span>
            </div>
            <!-- 약관 보기 화살표 -->
            <div class="privacy-arrow-container" @click="openPrivacyPolicyModal">
              <i class="arrow-icon"></i> <!-- 화살표 아이콘 -->
            </div>
          </div>
          <!-- 약관 동의 에러 메시지 -->
          <span v-if="agreementError" class="error-text">{{ agreementError }}</span>
        </div>
      </div>

      <div class="modal-footer">
        <!-- 5번: 하단 버튼들 -->
        <YesNoButton type="cancel" label="이전" @click="goToPreviousStep" />
        <YesNoButton
          type="next"
          label="다음"
          @click="goToNextStep"
          :disabled="!canProceed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import YesNoButton from "@/components/common/YesNoButton.vue"; // YesNoButton 컴포넌트 임포트
import eyeOpenIcon from "@/assets/images/eye_open.png";
import eyeClosedIcon from "@/assets/images/eye_closed.png";
import { validateUserAuthId } from "@/api/user"; // user.js 파일에서 중복 확인 메서드 임포트

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(["close", "goToStep3", "goToStep1", "openPrivacyPolicy"]);

const userAuthId = ref("");
const password = ref("");
const isAgreed = ref(false); // 약관 동의 여부
const passwordVisible = ref(false); // 비밀번호 표시 여부
const isUserAuthIdAvailable = ref(false); // 아이디 사용 가능 여부

// 에러 메시지 상태
const userAuthIdError = ref(""); // 아이디 입력 에러 메시지
const passwordError = ref(""); // 비밀번호 입력 에러 메시지
const agreementError = ref(""); // 약관 동의 에러 메시지
const userAuthIdDuplicationStatus = ref(""); // 아이디 중복 검증 결과 메시지

// 눈 아이콘 경로 설정
const eyeOpen = eyeOpenIcon; // 비밀번호 표시 아이콘 경로
const eyeClosed = eyeClosedIcon; // 비밀번호 숨김 아이콘 경로

// 약관 동의 체크박스 토글 함수
const toggleAgreement = () => {
  isAgreed.value = !isAgreed.value;
};

// 비밀번호 표시/숨기기 토글 함수
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

/**
 * 사용자 아이디 중복 확인 함수
 */
const checkUserAuthIdDuplication = async () => {
  // 초기화
  userAuthIdError.value = "";
  userAuthIdDuplicationStatus.value = "";
  isUserAuthIdAvailable.value = false;

  // 입력된 아이디가 없을 경우 에러 처리
  if (!userAuthId.value) {
    userAuthIdError.value = "아이디를 입력해주세요.";
    return;
  }

  try {
    // user_auth_id 형식으로 userAuthId를 전달하여 중복 체크
    const response = await validateUserAuthId(userAuthId.value);
    console.log(response); // response 구조 확인

    // 응답 데이터 구조가 예상한 대로 있는지 확인
    if (response && response.data) {
      const isExist = response.data.exist; // 존재 여부 확인 (문자열로 비교)

      // "false" 문자열과 비교하여 사용 가능한 아이디인지 확인
      if (isExist === false) {
        userAuthIdDuplicationStatus.value = "사용 가능한 아이디입니다."; // 사용 가능
        isUserAuthIdAvailable.value = true; // 사용 가능 플래그
      } else if (isExist === true) {
        userAuthIdError.value = "이미 사용 중인 아이디입니다."; // 중복된 아이디
        isUserAuthIdAvailable.value = false; // 사용 불가 플래그
      } 
    } else {
      // 예상하지 못한 응답 구조일 경우 처리
      userAuthIdError.value = "서버 응답이 올바르지 않습니다. 다시 시도해 주세요.";
      console.error("Unexpected response structure:", response);
      isUserAuthIdAvailable.value = false; // 사용 불가 플래그
    }
  } catch (error) {
    // API 호출 중 오류 발생 시 처리
    userAuthIdError.value = "아이디 중복 확인 중 오류가 발생했습니다.";
    console.error('checkUserAuthIdDuplication 에러:', error);
    isUserAuthIdAvailable.value = false; // 사용 불가 플래그
  }
};

// 다음 버튼 활성화 여부 계산
const canProceed = computed(() => {
  return userAuthId.value !== "" 
    && password.value !== "" 
    && isAgreed.value 
    && isUserAuthIdAvailable.value; // 사용 가능 여부도 추가
});

// 모달 닫기 함수
const closeModal = () => {
  emit("close");
};

// 이전 단계로 이동하는 함수
const goToPreviousStep = () => {
  emit("goToStep1"); // 이전 단계로 이동 이벤트 발생
};

// 다음 단계로 이동하는 함수
const goToNextStep = () => {
  // 에러 메시지 초기화
  userAuthIdError.value = "";
  passwordError.value = "";
  agreementError.value = "";

  // 각 입력 값에 대한 유효성 검사
  if (!userAuthId.value) {
    userAuthIdError.value = "아이디를 입력해주세요.";
  }
  if (!password.value) {
    passwordError.value = "비밀번호를 입력해주세요.";
  }
  if (!isAgreed.value) {
    agreementError.value = "약관에 동의해주세요.";
  }

  // 모든 유효성 검사가 통과하면 다음 단계로 이동
  if (canProceed.value) {
    emit("goToStep3", userAuthId.value); // Step 3으로 이동할 때 아이디를 함께 전달
  }
};

// 개인정보 처리방침 모달 열기 함수
const openPrivacyPolicyModal = () => {
  emit("openPrivacyPolicy"); // 부모 컴포넌트에게 개인정보 처리방침 모달을 열라는 이벤트 전달
};
</script>

<style scoped>
/* 오류 텍스트 스타일 */
.error-text {
  color: red;
  font-size: 1.4rem;
  margin-top: 0.2rem;
}

/* 성공 텍스트 스타일 */
.success-text {
  color: green;
  font-size: 1.4rem;
  margin-top: 0.2rem;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

/* 모달 콘텐츠 */
.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 400px;
  height: 480px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: left;
  animation: slide-up 0.3s ease-out; /* 애니메이션 효과 추가 */
}

/* 슬라이드 애니메이션 */
@keyframes slide-up {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 페이지 번호 표시 */
.page-indicator {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  background-color: #e0e9c8;
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.page-indicator span {
  font-size: 1.4rem;
  color: #525150;
  margin: 0 5px;
}

.page-indicator span:nth-child(1) {
  font-weight: 700;
}

.page-indicator span:nth-child(2) {
  color: #525150;
}

/* 모달 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 3.2rem;
  opacity: 50%;
  background: none;
  border: none;
  cursor: pointer;
}

/* 모달 헤더 */
.modal-header {
  text-align: center;
}

.modal-header h2 {
  margin: 2rem;
  font-size: 5rem;
  color: #a1b872;
}

/* 모달 바디 */
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin: 0.5rem;
}

/* 인사말 텍스트 */
.message-container {
  display: flex;
  flex-direction: column;
}

.first-text {
  font-size: 2.2rem;
  color: #525150;
}

.second-text {
  font-size: 2.2rem;
  font-weight: 700;
  color: #525150;
  margin-bottom: 1rem;
}

/* 입력 필드 */
.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.userAuthId-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.check-btn {
  width: 80px;
  height: 40px;
  font-size: 1.4rem;
  border: none;
  border-radius: 5px;
  background-color: #a1b872;
  color: white;
  cursor: pointer;
}

.check-btn:hover {
  background-color: #8aa15e;
}

/* 아이디 입력 필드 */
.userAuthId-container input {
  width: 274px; /* 아이디 입력 필드 너비 */
}

/* 비밀번호 입력 필드 컨테이너 */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-container input {
  width: 360px; /* 비밀번호 입력 필드 너비 */
}

/* 눈 아이콘 스타일링 */
.eye-icon {
  position: absolute;
  right: 10px; /* 비밀번호 필드 안쪽에 배치 */
  cursor: pointer;
}

.eye-icon img {
  width: 16px; /* 아이콘 너비 조정 */
  height: 16px; /* 아이콘 높이 조정 */
  opacity: 0.5;
}

/* 입력 필드 스타일 */
.modal-body input {
  height: 40px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.6rem;
}

/* 약관 동의 및 개인정보 처리방침 */
.terms-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 12rem;
  width: 100%; /* 전체 너비 */
}

/* 약관 동의 및 화살표 컨테이너 */
.agreement-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 토글과 화살표 사이에 공간을 만듦 */
  border: 1px solid #ccc; /* 컨테이너의 테두리 */
  padding: 1rem; /* 컨테이너의 내부 여백 */
  border-radius: 5px; /* 모서리 둥글게 */
  height: 40px;
  width: 360px;
}

/* 토글 버튼과 텍스트 컨테이너 */
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* 체크박스 */
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #525150;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.checked {
  background-image: url("@/assets/images/checkbox_checked.png"); /* 체크박스 체크 이미지 */
}

/* 체크박스 텍스트 */
.checkbox-text {
  font-size: 1.8rem;
  font-weight: 600;
  color: #525150;
}

/* 화살표 컨테이너 */
.privacy-arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 13px; /* 컨테이너 너비 */
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
}

/* 화살표 아이콘 */
.arrow-icon {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/arrow_right.png"); /* 화살표 이미지 경로 */
  background-size: 16px 16px; /* 이미지 크기 조정 */
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 중앙에 배치 */
}

/* 모달 푸터 */
.modal-footer {
  position: absolute; /* 모달 콘텐츠 내에서 절대 위치 지정 */
  bottom: 10px; /* 모달 콘텐츠의 하단에 배치 */
  width: 360px; /* 푸터의 너비 */
  justify-content: space-between; /* 요소들 간의 공간을 균등 분배 */
  display: flex; /* 플렉스 박스 사용 */
  background-color: white; /* 배경색이 바디와 같게 */
  margin: 0 auto; /* 좌우 가운데 정렬 */
  left: 0; /* 부모 요소 기준 왼쪽 기준점 */
  right: 0; /* 부모 요소 기준 오른쪽 기준점 */
}
</style>
