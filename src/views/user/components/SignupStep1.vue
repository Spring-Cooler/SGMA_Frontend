<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      
      <!-- 페이지 번호 표시 -->
      <div class="page-indicator">
        <span>1</span>
        <span>3</span>
      </div>
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>
      <div class="modal-body">
        <div class="message-container"> <!-- 1번: 인사말 -->
          <p class="first-text">어서와요!</p>
          <p class="second-text">이름과 이메일을 입력해주세요.</p>
        </div>
        
        <div class="input-container"> <!-- 2번: 이름 입력 -->
          <input type="text" placeholder="이름 입력" v-model="name" maxlength="6"/>
          <span v-if="nameError" class="error-text">{{ nameError }}</span>
          
          <input type="email" placeholder="이메일 입력" v-model="email" maxlength="24"/>
          <!-- 이메일 유효성 검사 메시지 -->
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>
        
        <div class="verification-container"> <!-- 3번: 체크박스와 버튼 정렬 -->
          <div class="checkbox-container">
            <div class="email-checkbox" :class="{ 'verified': isVerified }"></div>
            <span class="checkbox-text">이메일 인증</span>
          </div>
          <button class="verify-btn" @click="handleSendVerification">{{ verificationButtonText }}</button>
        </div>
        <span v-if="verificationMessage" class="message-text">{{ verificationMessage }}</span> <!-- 인증 메세지 표시 -->
        <span v-if="verificationError" class="error-text">{{ verificationError }}</span> <!-- 인증 에러 메시지 표시 -->
          
        <div class="code-input-container"> <!-- 4번: 인증코드 입력과 타이머 -->
          <div class="input-with-timer">
            <input type="text" placeholder="문자 6자리 입력" v-model="verificationCode" maxlength="6" />
            <span class="timer">{{ formattedTime }}</span>
          </div>
          <button class="confirm-btn" @click="confirmVerificationCode">확인</button>
        </div>
      </div>  
  
         <!-- 오류 메시지 위치를 modal-footer 내부로 이동 -->
      <div class="modal-footer"> <!-- 5번: 하단 버튼들 -->
        <YesNoButton
          type="cancel"
          label="취소"
          @click="goToLogin"
        />
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
import { ref, onMounted, onUnmounted, computed, defineEmits  } from 'vue';
import axios from 'axios';
import YesNoButton from '@/components/common/YesNoButton.vue'; // YesNoButton 컴포넌트 임포트

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(['close', 'goToStep2', 'openLogin']);

const name = ref('');
const email = ref('');
const verificationCode = ref('');
const verificationButtonText = ref('인증번호 발송');
const timeRemaining = ref(0); // 초기 시간은 0으로 설정, 발송 버튼 클릭 시 300초로 설정
const verificationMessage = ref(''); // 인증 관련 메시지
const verificationError = ref(''); // 인증 에러 메시지
const nextStepError = ref(''); // 다음 단계 오류 메시지
const nameError = ref(''); // 이름 입력 에러 메시지
const emailError = ref(''); // 이메일 입력 에러 메시지
const isVerified = ref(false); // 이메일 인증 성공 여부
let timerInterval = null;

// 이메일 유효성 검사 정규 표현식
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 유효성 검사 결과 계산
const isEmailValid = computed(() => {
  return emailPattern.test(email.value);
});

// 이메일 인증번호 발송 API 호출 함수
const sendVerificationCode = async () => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/signup', {
      email: email.value
    });
    verificationMessage.value = "인증번호가 이메일로 발송되었습니다."; // 발송 성공 메시지
    verificationError.value = ''; // 에러 메시지 초기화
    console.log('인증번호 발송 성공:', response.data);
  } catch (error) {
    verificationError.value = error.response?.data?.message || "죄송합니다. 서버 내부 오류입니다."; // 서버 에러 메시지 표시
    verificationMessage.value = ''; // 성공 메시지 초기화
    console.error('sendVerificationCode 에러:', error);
  }
};

// 발송 버튼 클릭 시 타이머 시작
const handleSendVerification = () => {
  // 초기화
  nameError.value = '';
  emailError.value = '';
  verificationError.value = '';
  verificationMessage.value = ''; // 기존 메시지 초기화

  // 입력값 유효성 체크
  if (name.value === '') {
    nameError.value = "이름을 입력해주세요.";
    return;
  }
  if (!isEmailValid.value) {
    emailError.value = "유효한 이메일을 입력해주세요.";
    return;
  }

  verificationMessage.value = "인증번호를 전송 중입니다..."; // 전송 중 메시지 표시

  if (!timerInterval) {
    timeRemaining.value = 300; // 5분 설정
    verificationButtonText.value = '이메일 재발송';
    sendVerificationCode(); // 인증번호 발송 함수 호출
    startTimer(); // 타이머 시작
  } else {
    timeRemaining.value = 300; // 타이머가 작동 중이라도 5분으로 초기화
  }
};

// 타이머 시작 함수
const startTimer = () => {
  clearTimer(); // 기존 타이머 초기화
  timerInterval = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      clearTimer(); // 타이머 종료 시 타이머 초기화
    }
  }, 1000);
};

// 타이머 정리 함수
const clearTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// 인증번호 확인 함수
const confirmVerificationCode = async () => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/confirmation', {
      email: email.value,
      code: verificationCode.value
    });
    if (response.data.success) {
      verificationMessage.value = "인증되었습니다."; // 인증 성공 메시지
      verificationError.value = ''; // 에러 메시지 초기화
      isVerified.value = true; // 인증 성공 토글 활성화
    } else {
      verificationError.value = response.data.message || "인증번호가 올바르지 않습니다."; // 서버에서 받은 메시지 표시
      verificationMessage.value = ''; // 성공 메시지 초기화
    }
  } catch (error) {
    verificationError.value = error.response?.data?.message || "인증에 실패했습니다. 다시 시도해주세요."; // 서버 에러 메시지 표시
    verificationMessage.value = ''; // 성공 메시지 초기화
    console.error('confirmVerificationCode 에러:', error);
  }
};

// 모달 닫기 함수
const closeModal = () => {
  clearTimer(); // 타이머 정리
  emit('close');
};

// 다음 버튼 활성화 여부 계산
const canProceed = computed(() => {
  // return name.value !== '' && isEmailValid.value && isVerified.value; // 이름, 유효한 이메일, 인증 성공 여부 확인
  return true;
});

// 로그인 모달로 이동
const goToLogin = () => {
  emit('openLogin'); // openLogin 이벤트 방출 // 부모 컴포넌트에게 로그인 모달을 열라는 이벤트 전달
  emit('close'); // 회원가입 모달 닫기
};

// 다음 단계로 이동하는 함수
const goToNextStep = () => {
  console.log('goToNextStep 함수 호출됨'); // 함수 호출 확인
  nextStepError.value = ''; // 기존 에러 메시지 초기화

  if (canProceed.value) {
    nextStepError.value = ''; // 오류 메시지 초기화
    console.log('Step2로 이동'); // 성공 메시지
    emit('goToStep2'); // Step2로 이동
  } else {
    // 필수 입력값이 부족한 경우 경고 메시지
    if (!name.value) {
      nextStepError.value = '이름을 입력해주세요.';
    } else if (!isEmailValid.value) {
      nextStepError.value = '유효한 이메일을 입력해주세요.';
    } else if (!isVerified.value) {
      nextStepError.value = '이메일 인증을 완료해 주세요.';
    } else {
      nextStepError.value = '모든 필드를 입력하고 이메일 인증을 완료해 주세요.';
    }
    console.log('nextStepError:', nextStepError.value); // 에러 메시지 확인
  }
};

// 타이머 형식 변경 함수
const formattedTime = computed(() => {
  const minutes = String(Math.floor(timeRemaining.value / 60)).padStart(2, '0');
  const seconds = String(timeRemaining.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
});

// 생명주기 훅으로 컴포넌트가 마운트될 때와 언마운트될 때 타이머 관리
onMounted(() => {
  console.log('회원가입 모달 열림');
});

onUnmounted(() => {
  clearTimer(); // 컴포넌트가 파괴될 때 타이머 정리
});
</script>

<style scoped>
/* 오류 텍스트 스타일 */
.error-text {
  color: #E1523A;
  font-size: 1.4rem;
  margin-top: 0.2rem;
}

/* 성공 텍스트 스타일 */
.message-text {
  color: #02B853;
  font-size: 1.4rem;
  margin-top: 0.5rem;
}

/* 모달 오버레이 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
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
  height: 480px; /* 모달의 높이를 고정 */
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: left; /* 왼쪽 정렬 */
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
  position: absolute; /* modal-content를 기준으로 절대 위치 */
  top: 20px; /* 모달 콘텐츠 위쪽에 배치 */
  left: 20px; /* 오른쪽 끝에서 10px 떨어짐 */
  display: flex; /* 숫자들을 수평 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  background-color: #E0E9C8; /* 배경색 */
  padding: 5px 10px; /* 안쪽 여백 */
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 */
}

.page-indicator span {
  font-size: 1.4rem; /* 숫자 크기 */
  color: #525150; /* 숫자 색상 */
  margin: 0 5px; /* 숫자 사이 간격 */
}

.page-indicator span:nth-child(1) {
  font-weight: 700; /* 현재 페이지 강조 */
}

.page-indicator span:nth-child(2) {
  color: #525150; /* 총 페이지 수 흐리게 */
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
  display: flex; /* 플렉스박스 사용 */
  flex-direction: column; /* 수직 정렬 */
  justify-content: space-between; /* 각 행 간격 조정 */
  align-items: flex-start; /* 모든 요소들을 왼쪽 정렬 */
  gap: 1rem; /* 각 요소들 사이의 간격 */
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
  gap: 1rem; /* 입력 필드 간격 */
  margin-top: 2rem;
}

.modal-body input {
  width: 360px;
  height: 40px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.6rem;
}

/* 인증번호 발송 */
.verification-container {
  display: flex;
  justify-content: space-between; /* 요소들을 양쪽에 배치 */
  align-items: center;
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

/* 인증 전 원형 스타일 */
.email-checkbox {
  width: 18px; /* 체크박스 크기 조정 */
  height: 18px;
  border-radius: 50%;
  margin-right: 10px; /* 체크박스와 텍스트 사이 간격 */
  cursor: pointer;
  background-color: #d5d5d5; /* 인증 전 기본 회색 */
}

/* 인증 후 체크박스 스타일 */
.email-checkbox.verified {
  background-image: url('@/assets/images/checkbox_checked.png'); /* 인증 성공 체크박스 이미지 */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent; /* 배경 투명 */
}

.checkbox-text {
  font-size: 1.8rem; /* 텍스트 크기 */
  font-weight: 600;
  color: #525150; /* 텍스트 색상 */
}

/* 인증번호 발송 버튼 */
.verify-btn {
  width: 100px;
  height: 40px;
  border: 1px solid #525150;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  color: #525150;
}

/* 인증코드 입력 필드 및 타이머 */
.code-input-container {
  display: flex;
  justify-content: space-between; /* 좌우 공간 배분 */
  align-items: center;
  width: 100%;
  margin-top: 2rem;
}

.input-with-timer {
  position: relative;
  width: 70%; /* 입력 필드 넓이 설정 */
}

.input-with-timer input {
  width: 100%;
  padding-right: 60px; /* 타이머 공간 확보 */
}

.input-with-timer .timer {
  position: absolute;
  right: 10px; /* 타이머 위치 조정 */
  top: 50%;
  transform: translateY(-50%);
  color: #e99a24;
  font-size: 1.4rem;
}

/* 확인 버튼 */
.confirm-btn {
  width: 100px;
  height: 40px;
  padding: 0.8rem 1.5rem;
  background-color: #a1b872;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2rem;
  margin-left: 10px; /* 간격 추가 */
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
