<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="confirmation-modal-content">
        <div class="modal-header">
          <h2>SGMA</h2>
        </div>
        <div class="modal-body">
          <p class="message">
            <span class="highlight">인증코드(랜덤 6자리)</span>를 <span class="highlight-email">이메일로 발송</span>했습니다.<br>
            인증 코드를 확인해주세요!
          </p>
        </div>
        <div class="modal-footer">
          <button class="confirm-btn" @click="closeModal">확인</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close']);
  
  // 모달 닫기 함수
  const closeModal = () => {
    emit('close'); // 부모 컴포넌트에 close 이벤트 전달
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
    background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  
  /* 모달 콘텐츠 */
  .confirmation-modal-content {
    background-color: white;
    border-radius: 10px;
    width: 400px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center; /* 가운데 정렬 */
    position: relative;
  }
  
  /* 모달 헤더 */
  .modal-header {
    margin-bottom: 1rem;
  }
  
  .modal-header h2 {
    font-size: 3.5rem;
    color: #a1b872;
  }
  
  /* 모달 메시지 */
  .modal-body .message {
    font-size: 1.6rem;
    color: #525150;
    line-height: 2.2rem; /* 줄 간격 */
    margin-bottom: 2rem;
  }
  
  .message .highlight {
    color: #f39800; /* 인증 코드 색상 */
    font-weight: 700;
  }
  
  .message .highlight-email {
    color: #4caf50; /* 이메일 강조 색상 */
  }
  
  /* 확인 버튼 */
  .confirm-btn {
    width: 100%;
    height: 40px;
    padding: 0.8rem;
    background-color: #a1b872;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.6rem;
  }
  </style>
  