<template>
    <form class="comment-input-container" @submit.prevent="addComment">
        <input class="comment-input" placeholder="댓글을 남겨보세요." v-model="content" required></input>
        <div class="submit-comment-wrapper">
          <SmallButton type="submit" class="light-gray btn" label="등록하기"></SmallButton>
        </div>
    </form>
</template>

<script setup>
import SmallButton from './SmallButton.vue';
import { ref } from 'vue';

const content = ref('');

const emit = defineEmits(['add']);

const addComment = () => {
  emit('add', content.value);
  content.value = '';
}
</script>

<style scoped>
.comment-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  margin-top: 1rem;
}

.comment-input {
  width: 100%;
  height: 5.6rem;
  padding: 1.5rem;
  font-size: 2rem;
  font-weight: 500;
  border: 1px solid #ddd;
  border-radius: 1rem;
}

.submit-comment-wrapper {
  display: flex;
  justify-content: right;
  align-items: flex-start;
  margin-bottom: 7.5rem;
  width: 100%;
}

.submit-comment-wrapper button {
  font-size: 2.2rem;
}
</style>