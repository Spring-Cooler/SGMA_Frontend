<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>
      <div class="modal-body">
        <p class="first-text">어서와요!</p>
        <p class="second-text">이름과 이메일을 입력해주세요.</p>
        <input type="text" placeholder="이름 입력" v-model="name" />
        <input type="email" placeholder="이메일 입력" v-model="email" />

        <div class="email-verification">
          <button class="verify-btn" @click="sendVerification">{{ verificationButtonText }}</button>
        </div>

        <div class="verification-code">
          <div class="input-with-timer">
            <input type="text" placeholder="숫자 6자리 입력" v-model="verificationCode" />
            <span class="timer">{{ formattedTime }}</span>
          </div>
          <button class="confirm-btn">확인</button>
        </div>

        <div class="modal-footer">
          <YesNoButton
            type="cancel"
            label="취소"
            @click="goToLogin"
          />
          <YesNoButton
            type="next"
            label="다음"
            @click="handleNext"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import YesNoButton from '@/components/common/YesNoButton.vue'; // YesNoButton 컴포넌트 임포트

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(['close', 'openLogin']);

const name = ref('');
const email = ref('');
const verificationCode = ref('');
const verificationButtonText = ref('인증번호 발송');
const timeRemaining = ref(0); // 초기 시간은 0으로 설정, 발송 버튼 클릭 시 300초로 설정
let timerInterval = null;

// 발송 버튼 클릭 시 타이머 시작
const sendVerification = () => {
  if (!timerInterval) { // 타이머가 이미 작동 중이 아닐 때만 시작
    timeRemaining.value = 300; // 5분 설정
    verificationButtonText.value = '이메일 재발송';
    startTimer();
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

// 모달 닫기 함수
const closeModal = () => {
  clearTimer(); // 타이머 정리
  emit('close');
};

// 로그인 모달로 이동
const goToLogin = () => {
  emit('openLogin'); // 부모 컴포넌트에게 로그인 모달을 열라는 이벤트 전달
  emit('close'); // 회원가입 모달 닫기
};

// 다음 버튼 클릭 처리
const handleNext = () => {
  console.log('다음 버튼 클릭됨');
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
  height: 480px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

/* 모달 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* 모달 헤더 */
.modal-header {
  margin-bottom: 1rem;
}

.modal-header h2 {
  margin: 2rem 0; /* 상단 간격 축소 */
  font-size: 4rem; /* 글자 크기 축소 */
  color: #a1b872;
}

/* 인사말 텍스트 */
.first-text{
  font-size: 2.2rem; /* 텍스트 크기 축소 */
  color: #525150; /* 글자 색상 */
  text-align: left;
}
.second-text {
  font-size: 2.2rem; /* 텍스트 크기 축소 */
  font-weight: 700;
  color: #525150; /* 글자 색상 */
  text-align: left;
  margin-bottom: 1rem; /* 간격 수정 */
}

/* 인풋 필드 */
.modal-body input {
  width: 360px;
    height: 40px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.6rem;
    margin: 1rem;
}

/* 이메일 인증 섹션 */
.email-verification {
  display: flex;
  align-items: center;
  font-size: 1.4rem; /* 글자 크기 축소 */
  margin-bottom: 1.2rem;
}

/* 인증번호 발송 버튼 */
.verify-btn {
  width: 120px;
  height: 30px;
  border: 1px solid #525150;
  border-radius: 5px;
  margin: 1rem;
  background-color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  color: #525150; /* 글자 색상 변경 */
  margin-left: auto; /* 버튼을 오른쪽으로 정렬 */
}

/* 인증코드 입력 필드 및 확인 버튼 */
.verification-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem; /* 간격 추가 */
}

.verification-code input {
  width: 385px; /* 너비 조정 */
  padding: 0.8rem; /* 패딩 감소 */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.4rem; /* 글자 크기 축소 */
}

.timer {
  color: #e99a24; /* 타이머 색상 */
  font-size: 1.4rem; /* 글자 크기 축소 */
  margin: 0 1rem; /* 좌우 간격 */
}

.input-with-timer {
  position: relative;
  width: 100%;
}

.input-with-timer input {
  width: 100%; /* 입력 필드 너비를 100%로 설정 */
  padding-right: 60px; /* 타이머 영역 확보 */
}

.input-with-timer .timer {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #e99a24;
  font-size: 1.4rem; /* 타이머 글자 크기 */
}
/* 확인 버튼 */
.confirm-btn {
  padding: 0.8rem 1.5rem;
  background-color: #a1b872;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.4rem;
}

/* 모달 푸터 */
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
</style>
