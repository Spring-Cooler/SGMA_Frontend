<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>

      <div class="page-indicator">
        <span>3</span>
        <span>3</span>
      </div>

      <div class="modal-header">
        <h2>SGMA</h2>
      </div>

      <div class="modal-body">
        <div class="message-container">
          <p class="first-text">마지막이에요!</p>
          <p class="second-text">프로필 사진과 닉네임을 설정해주세요.</p>
        </div>

        <div class="profile-picture-container">
          <label class="profile-picture-label">
            <div class="profile-picture">
              <input type="file" @change="handleFileChange" accept="image/*" hidden />
              <span v-if="!profilePicture">+</span>
              <img v-if="profilePicture" :src="profilePicture" alt="Profile Picture" />
            </div>
          </label>

          <!-- 닉네임 입력 및 중복 확인 버튼 -->
          <div class="nickname-container">
            <input type="text" placeholder="닉네임 입력" v-model="nickname" maxlength="10" />
            <button class="check-btn" @click="checkNicknameDuplication">중복 확인</button>
          </div>
          <span v-if="nicknameError" class="error-text">{{ nicknameError }}</span>
          <span v-if="nicknameDuplicationStatus" :class="{'success-text': !nicknameError, 'error-text': nicknameError}">
            {{ nicknameDuplicationStatus }}
          </span>
        </div>
      </div>

      <div class="modal-footer">
        <YesNoButton type="cancel" label="이전" @click="goToPreviousStep" />
        <YesNoButton type="complete" label="완료" @click="completeSignup" :disabled="!canComplete" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import YesNoButton from '@/components/common/YesNoButton.vue'; // YesNoButton 컴포넌트 임포트
// import { signupUser, validateNickname } from '@/api/user.js'; // 회원가입 및 닉네임 검증 API 함수 임포트
import { useRouter } from 'vue-router'; // vue-router 임포트

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(['close', 'goToStep2']);
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// 라우터 사용 설정
const router = useRouter();

// 닉네임과 프로필 사진을 위한 데이터
const nickname = ref('');
const profilePicture = ref('');
const nicknameError = ref('');
const isNicknameAvailable = ref(false); // 닉네임 사용 가능 여부
const nicknameDuplicationStatus = ref(''); // 닉네임 중복 검증 결과 메시지

// 닉네임만 입력되어야만 완료 버튼이 활성화됨
const canComplete = computed(() => {
  return nickname.value !== '' && isNicknameAvailable.value;
});

// 파일 선택 시 호출되는 함수
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 닉네임 중복 확인 함수
const checkNicknameDuplication = async () => {
  nicknameError.value = '';
  nicknameDuplicationStatus.value = '';
  isNicknameAvailable.value = false;

  if (!nickname.value) {
    nicknameError.value = '닉네임을 입력해주세요.';
    return;
  }

  try {
    const response = await validateNickname(nickname.value);
    console.log(response); // 응답 구조 확인

    if (response && response.success) {
      if (!response.data.exist) {
        nicknameDuplicationStatus.value = '사용 가능한 닉네임입니다.';
        isNicknameAvailable.value = true;
      } else {
        nicknameError.value = '이미 사용 중인 닉네임입니다.';
      }
    } else {
      nicknameError.value = '닉네임 중복 확인 중 오류가 발생했습니다.';
    }
  } catch (error) {
    nicknameError.value = '닉네임 중복 확인 중 오류가 발생했습니다.';
    console.error('checkNicknameDuplication 에러:', error);
  }
};

// 모달 닫기 함수
const closeModal = () => {
  emit('close');
};

// 이전 단계로 이동
const goToPreviousStep = () => {
  emit('goToStep2'); // Step 2로 이동
};

// 회원가입 완료 함수
const completeSignup = async () => {
  nicknameError.value = '';

  if (!canComplete.value) {
    return;
  }


  try {
    // // 최종 회원가입 API 호출
    // await signupUser({
    //   user_auth_id: props.username,  // Step 1에서 전달받은 아이디
    //   password: props.password,      // Step 2에서 전달받은 비밀번호
    //   user_name: props.username,     // 임시로 username을 user_name으로 사용
    //   nickname: nickname.value,      // 입력된 닉네임
    //   email: props.email,            // Step 2에서 전달받은 이메일
    //   signup_path: 'NORMAL',         // 회원가입 경로, NORMAL 설정
    // });

    alert('회원가입이 완료되었습니다! 홈 화면으로 이동합니다.');

    // 모달을 닫고 홈 화면으로 이동
    closeModal(); // 모달 닫기
    router.push('/'); // 홈 화면으로 이동
  } catch (error) {
    nicknameError.value = '회원가입에 실패했습니다. 다시 시도해주세요.';
    console.error('completeSignup 에러:', error);
  }
};
</script>

<style scoped>
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
  height: 480px; /* 높이를 살짝 늘려줌 */
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 강화 */
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
  justify-content: flex-start; /* 상단부터 배치 */
  gap: 1.5rem; /* 간격을 더 넓게 */
  margin: 0.5rem;
  padding: 1rem;
}

/* 인사말 텍스트 */
.message-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 인사말은 왼쪽 정렬 */
}

.first-text {
  font-size: 2.4rem; /* 조금 더 크고 선명하게 */
  color: #525150;
}

.second-text {
  font-size: 2.2rem;
  font-weight: 700;
  color: #525150;
  margin-bottom: 1rem;
}

/* 프로필 사진과 닉네임 입력 */
.profile-picture-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 프로필 사진과 닉네임을 가운데 정렬 */
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
}

.profile-picture-label {
  cursor: pointer;
}

.profile-picture {
  width: 140px;
  height: 140px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #a1b872; /* 두께를 늘리고 선명한 색상 */
  position: relative;
  overflow: hidden;
  transition: border 0.3s ease-in-out; /* 호버 시 부드럽게 전환 */
}

.profile-picture:hover {
  border: 2px solid #a1b872; /* 호버 시 실선으로 변경 */
}

.profile-picture span {
  font-size: 4rem; /* 폰트 크기 증가 */
  color: #a1b872;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* 닉네임 입력 및 중복 확인 */
.nickname-container {
  display: flex;
  align-items: center;
  gap: 1rem; /* 닉네임 필드와 버튼 간의 간격 */
}

input[type="text"] {
  width: 140px;
  height: 40px;
  padding: 0.8rem;
  border: 1.5px solid #c5ccd2;
  border-radius: 5px;
  font-size: 1.6rem;
  text-align: center; /* 텍스트 가운데 정렬 */
  transition: border-color 0.3s ease-in-out; /* 포커스 전환 효과 */
}

input[type="text"]:focus {
  border-color: #a1b872; /* 포커스 시 색상 변경 */
  outline: none;
}

/* 중복 확인 버튼 */
.check-btn {
  padding: 0.6rem 1rem;
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
</style>
