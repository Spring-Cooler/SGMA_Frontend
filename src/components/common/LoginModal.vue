<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>
      <div class="modal-body">
        <input type="text" placeholder="아이디" v-model="username" />
        <div class="password-input-container">
          <input 
            :type="passwordVisible ? 'text' : 'password'" 
            placeholder="비밀번호 입력" 
            v-model="password" 
            maxlength="24" 
          />
          <i class="eye-icon" @click="togglePasswordVisibility">
            <img :src="passwordVisible ? eyeOpenIcon : eyeClosedIcon" alt="eye icon" />
          </i>
        </div>
        <button class="login-btn" @click="login">로그인</button>
        <div class="sns-login">
          <hr />
          <span>SNS LOGIN</span>
          <hr />
        </div>
        <div class="sns-buttons">
          <button class="sns-btn kakao"></button>
          <button class="sns-btn naver"></button>
        </div>
        <div class="login-options">
          <a href="#">아이디 찾기</a>
          <span class="divider">|</span>
          <a href="#">비밀번호 찾기</a>
          <span class="divider">|</span>
          <!-- 회원가입 버튼 클릭 시 회원가입 모달 열기 -->
          <a href="#" @click.prevent="goToRegister">회원가입</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import axios from 'axios'; // axios 가져오기
import eyeOpenIcon from '@/assets/images/eye_open.png';
import eyeClosedIcon from '@/assets/images/eye_closed.png';

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(['close', 'goToStep1']);

// 상태와 메서드 `inject`로 받아오기
const token = inject('token'); // 토큰 상태
const user = inject('user'); // 사용자 상태
const setTokenData = inject('setTokenData'); // 토큰 데이터 설정 함수
const setUserData = inject('setUserData'); // 사용자 데이터 설정 함수

const username = ref('');
const password = ref('');

const passwordVisible = ref(false); // 비밀번호 표시 여부

// 모달 닫기 함수
const closeModal = () => {
  emit('close');
};

// 눈 아이콘 경로 설정
const eyeOpen = eyeOpenIcon; // 비밀번호 표시 아이콘 경로
const eyeClosed = eyeClosedIcon; // 비밀번호 숨김 아이콘 경로

// 비밀번호 표시/숨기기 토글 함수
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 로그인 처리 함수
const login = async () => {
  try {
    // axios를 사용하여 로그인 요청
    const response = await axios.post('/user-service/login', {
      user_auth_id: username.value,
      password: password.value,
      signup_path: 'NORMAL'
    });

    if (response.data.success) {
      // 로그인 성공 시 토큰 데이터를 설정 (setTokenData 사용)
      setTokenData(response.data.data); // 토큰 정보 설정
      await getUserInfo(response.data.data.access_token); // 사용자 정보 가져오기
      closeModal(); // 모달 닫기
    } else {
      // 서버에서 반환한 오류 메시지 표시
      alert(response.data.error.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    // 네트워크 오류나 서버 오류가 발생한 경우
    console.error('로그인 오류:', error);

    // axios 오류 응답 객체가 있을 경우, 더 구체적인 메시지 출력
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error.message || '로그인 요청이 거부되었습니다.');
    } else {
      alert('로그인 요청이 실패했습니다. 서버 상태를 확인해주세요.');
    }
  }
};

// 사용자 정보 조회 함수
const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('/user-service/api/users/user-id/17', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.data.success) {
      // 사용자 정보 설정 (setUserData 사용, password는 제외)
      setUserData({
        user_id: response.data.data.user_id,
        user_name: response.data.data.user_name,
        user_auth_id: response.data.data.user_auth_id,
        nickname: response.data.data.nickname,
        email: response.data.data.email,
        user_status: response.data.data.user_status,
        created_at: response.data.data.created_at,
        withdrawn_at: response.data.data.withdrawn_at,
        profile_image: response.data.data.profile_image,
        accept_status: response.data.data.accept_status,
        signup_path: response.data.data.signup_path,
        user_identifier: response.data.data.user_identifier
      });
    } else {
      alert('사용자 정보를 가져오지 못했습니다.');
    }
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    alert('사용자 정보 조회에 실패했습니다.');
  }
};

// 회원가입 모달로 이동
const goToRegister = () => {
  emit('goToStep1');
  // emit('close');
};
</script>

<style scoped>
/* 스타일 동일하게 유지 */
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

.modal-content {
  background-color: white;
  border-radius: 10px;
  width: 400px;
  height: 480px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
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

.modal-header h2 {
  margin: 2rem;
  font-size: 6rem;
  color: #a1b872;
}

.modal-body input {
  width: 360px;
  height: 40px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.6rem;
  margin: 1rem;
}

/* 비밀번호 입력 필드 컨테이너 */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.modal-body input {
  width: 360px;
  height: 40px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.6rem;
}

/* 눈 아이콘 스타일링 */
.eye-icon {
  position: absolute;
  right: 20px; /* 아이콘을 오른쪽 끝에 배치 */
  cursor: pointer;
}

.eye-icon img {
  width: 16px; /* 아이콘 너비 조정 */
  height: 16px; /* 아이콘 높이 조정 */
  opacity: 0.5;
}

.login-btn {
  width: 360px;
  height: 40px;
  border: none;
  background-color: #a1b872;
  color: #ffffff;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 6rem;
  margin-bottom: 2rem;
}

.sns-login {
  font-size: 1.5rem;
  display: flex;
  width: auto;
  align-items: center;
  margin: 2rem 0;
}

.sns-login hr {
  flex: 1;
  border: none;
  border-top: 1px solid #ddd;
}

.sns-login span {
  margin: 0 1.4rem;
  color: #888;
}

.sns-buttons {
  display: flex;
  justify-content: center;
  gap: 6.5rem;
  margin-bottom: 6rem;
}

.sns-btn {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.kakao {
  background-image: url('@/assets/images/btn_kakao.png');
}

.naver {
  background-image: url('@/assets/images/btn_naver.png');
}

.login-options {
  margin-top: 1.5rem;
  font-size: 1.4rem;
  color: #888;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
}

.divider {
  color: #888;
}

.login-options a {
  color: #888888;
  text-decoration: none;
}
</style>
