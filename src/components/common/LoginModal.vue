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
          <!-- 로그인 버튼 텍스트 추가 및 스타일 수정 -->
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
          <!-- 아이디 찾기, 비밀번호 찾기, 회원가입 링크 간격 수정 -->
          <div class="login-options">
            <a href="#">아이디 찾기</a>
            <span class="divider">|</span>
            <a href="#">비밀번호 찾기</a>
            <span class="divider">|</span>
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
    width: 420px; /* 너비 조정 */
    height: 500px; /* 높이 조정 */
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
    margin: 1rem; /* 아래 요소와 간격 추가 */
  }
  
  /* 로그인 버튼 이미지 설정 */
  .login-btn {
    width: 360px;
    height: 40px; /* 높이 증가 */
    border: none;
    background-color: #a1b872; /* 배경색 변경 */
    color: #ffffff; /* 글자 색상 흰색으로 변경 */
    text-align: center;
    font-size: 1.8rem; /* 글자 크기 */
    font-weight: bold; /* 글자 굵게 */
    border-radius: 5px;
    cursor: pointer;
    margin-top: 6rem; /* 아래 요소와 간격 추가 */
    margin-bottom: 2rem; /* 아래 요소와 간격 추가 */
  }
  
  /* SNS 로그인 섹션 스타일 */
  .sns-login {
    font-size: 1.5rem; /* 글자 크기 */
    display: flex;
    align-items: center;
    margin: 2rem 0;
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
    gap: 6.5rem; /* 소셜 로그인 버튼 간격을 더 넓게 설정 */
    margin-bottom: 6rem; /* 아래 요소와 간격 추가 */
  }
  
  .sns-btn {
    width: 5rem; /* 버튼 크기 증가 */
    height: 5rem; /* 버튼 크기 증가 */
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background-size: cover;
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
    margin-top: 1.5rem; /* 상단 간격 증가 */
    font-size: 1.3rem;
    color: #888;
    display: flex;
    justify-content: center;
    gap: 2rem; /* 각 링크 사이의 간격을 넓게 설정 */
  }
  
  /* 링크 사이에 구분자 */
  .divider {
    color: #888; /* 구분자 색상 */
  }
    
  .login-options a {
    color: #888888;
    text-decoration: none;
  }
  </style>
  