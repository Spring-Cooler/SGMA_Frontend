<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        
        <!-- 페이지 번호 표시 -->
        <div class="page-indicator">
          <span>3</span>
          <span>3</span> <!-- Step 3 of 3 -->
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
            <input type="text" placeholder="닉네임 입력" v-model="nickname" maxlength="10" />
          </div>
        </div>
        
        <div class="modal-footer">
          <YesNoButton
            type="cancel"
            label="이전"
            @click="goToPreviousStep"
          />
          <YesNoButton
            type="complete"
            label="완료"
            @click="completeSignup"
            :disabled="!canComplete"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import YesNoButton from '@/components/common/YesNoButton.vue'; // YesNoButton 컴포넌트 임포트
  
  // 외부에서 받아온 이벤트 정의
  const emit = defineEmits(['close', 'goToStep2', 'complete']); // complete 이벤트 추가
  
  // 닉네임과 프로필 사진을 위한 데이터
  const nickname = ref('');
  const profilePicture = ref('');
  
  // 닉네임과 프로필 사진이 모두 입력되어야만 완료 버튼이 활성화됨
  const canComplete = computed(() => {
    return nickname.value !== '' && profilePicture.value !== '';
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
  
  // 모달 닫기 함수
  const closeModal = () => {
    emit('close');
  };
  
  // 이전 단계로 이동
  const goToPreviousStep = () => {
    emit('goToStep2'); // Step2로 이동
  };
  
  // 회원가입 완료 함수
  const completeSignup = () => {
    if (canComplete.value) {
      console.log('회원가입 완료 클릭됨');
      emit('complete'); // 부모 컴포넌트에 회원가입 완료 이벤트 발생
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
    height: 480px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center; /* 가운데 정렬 */
  }
  
  /* 페이지 번호 표시 */
  .page-indicator {
    position: absolute;
    top: 10px; /* 모달 콘텐츠 위쪽에 배치 */
    right: 10px; /* 오른쪽 끝에 배치 */
    display: flex;
    align-items: center;
    background-color: #e0e9c8;
    padding: 3px 8px; /* 안쪽 여백 */
    border-radius: 10px; /* 둥근 모서리 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 */
  }
  
  .page-indicator span {
    font-size: 1.4rem;
    color: #525150;
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
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  /* 모달 헤더 */
  .modal-header {
    margin-bottom: 2rem;
  }
  
  .modal-header h2 {
    font-size: 3rem;
    color: #a1b872;
  }
  
  /* 인사말 텍스트 */
  .message-container {
    margin-bottom: 1.5rem;
  }
  
  .first-text {
    font-size: 2.4rem;
    color: #525150;
  }
  
  .second-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #525150;
  }
  
  /* 프로필 사진과 닉네임 입력 */
  .profile-picture-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-picture-label {
    cursor: pointer;
  }
  
  .profile-picture {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #a1b872;
    position: relative;
    overflow: hidden;
  }
  
  .profile-picture span {
    font-size: 3rem;
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
  
  input[type="text"] {
    width: 80%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.6rem;
    text-align: center; /* 텍스트 가운데 정렬 */
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
  