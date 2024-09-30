<!-- DeleteModal.vue -->
<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-container">
        <p>게시글을 삭제하시겠습니까?</p>
        <div class="modal-buttons">
          <button class="yes-button" @click="confirmDelete">예</button>
          <button class="no-button" @click="cancelDelete">아니오</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  const props = defineProps({
    isVisible: Boolean,
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirmDelete = () => {
    emit('confirm');
  };
  
  const cancelDelete = () => {
    emit('cancel');
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
    align-items: center;
    justify-content: center;
  }
  
  .modal-container {
    width: 300px;
    height: 180px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .modal-container p{
    font-weight: bold;
    margin-top: 25px;
    font-size: 20px;
    text-align: center;
  }
  
  .modal-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .yes-button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .no-button {
    background-color: #aaa;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
  