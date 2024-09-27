<!-- DeleteModal.vue -->
<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-container">
      <div class="modal-content">
        <p><slot></slot></p>
      </div>
      <div class="modal-buttons">
        <button class="btn yes-button" @click="confirmDelete">예</button>
        <button class="btn no-button" @click="cancelDelete">아니오</button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';

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
  z-index: 9999;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  height: 36rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.2);
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  font-weight: 900;
  font-size: 3rem;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
  gap: 6rem;
}

.yes-button {
  height: 6.5rem;
  width: 19.5rem;
  background-color: #F35757;
}

.no-button {
  height: 6.5rem;
  width: 19.5rem;
  background-color: #a6a6a6;
}
</style>
