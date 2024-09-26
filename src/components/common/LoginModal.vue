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
        <button class="login-btn" @click="login"></button> <!-- 텍스트를 제거하고 이미지 버튼으로 변경 -->
        <div class="sns-login">
          <hr />
          <span>SNS LOGIN</span>
          <hr />
        </div>
        <div class="sns-buttons">
          <button class="sns-btn kakao"></button> <!-- 카카오 버튼 -->
          <button class="sns-btn naver"></button> <!-- 네이버 버튼 -->
        </div>
        <div class="login-options">
          <a href="#">아이디 찾기</a> | 
          <a href="#">비밀번호 찾기</a> | 
          <a href="#">회원가입</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close']);

const username = ref('');
const password = ref('');

// 모달 닫기 함수
const closeModal = () => {
  emit('close');
};

// 로그인 버튼 클릭 시 처리
const login = () => {
  console.log('아이디:', username.value);
  console.log('비밀번호:', password.value);
  closeModal(); // 로그인 후 모달 닫기
};
</script>

<style scoped>
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
  width: 400px; /* 너비를 640px에서 400px로 줄였습니다 */
  height: 480px; /* 너비를 640px에서 400px로 줄였습니다 */
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
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #8bc34a;
}

.modal-body input {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1.6rem;
}

/* 로그인 버튼 이미지 설정 */
.login-btn {
  width: 100%;
  height: 5rem; /* 버튼 높이 설정 */
  border: none;
  background-image: url('@/assets/images/btn_login.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  margin-bottom: 1.5rem; /* 아래 요소와 간격 추가 */
}

/* SNS 로그인 버튼 */
.sns-login {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.sns-login hr {
  flex: 1;
  border: none;
  border-top: 1px solid #ddd;
}

.sns-login span {
  margin: 0 1rem;
  color: #888;
}

/* SNS 버튼 스타일 */
.sns-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.sns-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-size: cover; /* 이미지를 버튼 크기에 맞춤 */
  background-repeat: no-repeat;
  background-position: center;
}

/* 카카오 버튼 이미지 설정 */
.kakao {
  background-image: url('@/assets/images/btn_kakao.png');
}

/* 네이버 버튼 이미지 설정 */
.naver {
  background-image: url('@/assets/images/btn_naver.png');
}

.login-options {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #888;
}

.login-options a {
  color: #8bc34a;
  text-decoration: none;
}
</style>
