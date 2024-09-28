<template>
    <div class="comment-input-container">
        <input class="comment-input" placeholder="댓글을 남겨보세요." v-model="data.content"></input>
        <div class="submit-comment-wrapper">
          <SmallButton class="light-gray btn" label="등록하기" @click="addComment"></SmallButton>
        </div>
    </div>
</template>

<script setup>
import SmallButton from './SmallButton.vue';
import axios from 'axios';
import { reactive } from 'vue';

const props = defineProps({
    boardId: {
        type: Number,
        required: true,
    }
})

const data = reactive({
    content: '',
    member_id: 1,
    board_id: props.boardId,
});

const emit = defineEmits(['add']);

const addComment = async () => {
    try {
        let response = (await axios.post(`/api/study-group/board/comments`, data)).data;
        if(response.success) {
          data.content = '';
          emit('add');
        }
    } catch (error) {
        console.error(error);
    }
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
  margin-bottom: 10rem;
  width: 100%;
}

.submit-comment-wrapper button {
  font-size: 2.2rem;
}
</style>