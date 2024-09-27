<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">×</button>
      <div class="modal-header">
        <h2>SGMA</h2>
      </div>
      <div class="modal-body">
        <input type="text" placeholder="아이디" v-model="username" />
        <input type="password" placeholder="비밀번호" v-model="password" />
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
import { ref } from 'vue';

// 외부에서 받아온 이벤트 정의
const emit = defineEmits(['close', 'openRegister']);

const username = ref('');
const password = ref('');

// 모달 닫기 함수
const closeModal = () => {
  emit('close');
};
// 로그인 처리 함수
const login = () => {
  console.log('아이디:', username.value);
  console.log('비밀번호:', password.value);
  closeModal(); // 로그인 후 모달 닫기
};

// 회원가입 모달로 이동
const goToRegister = () => {
  console.log('회원가입 모달 열기 이벤트 발생');
  // setTimeout 없이 순서를 조정
  emit('openRegister'); // 회원가입 모달 열기 이벤트 먼저 발생
  emit('close'); // 로그인 모달 닫기 이벤트 나중에 발생

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
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-header h2 {
  margin: 3rem;
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