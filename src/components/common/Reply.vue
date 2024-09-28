<template>
    <div class="reply">
        <div class="reply-container">
            <img class="reply-author-icon" src="../../assets/images/default_profile.svg"></img>
            <div class="reply-content-container">
                <div class="reply-info">
                    <span class="reply-author">{{props.data.nickname}}</span>
                    <span class="reply-date">{{formatDate(props.data.created_at)}}</span>
                </div>
                <div class="reply-content">
                    <p class="reply-text">{{props.data.content}}</p>
                </div>
            </div>
        </div>
        <button class="delete-btn" @click="toggleModal">
            <span>x</span>
        </button>
        <DeleteModal :isVisible="modalVisibility" @confirm="deleteReply" @cancel="toggleModal">해당 댓글을 삭제하시겠습니까?</DeleteModal>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import DeleteModal from './DeleteModal.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  replyId: {
    type: Number,
    required: true,
  }
})

const emit = defineEmits(['remove']);

const modalVisibility = ref(false);

const toggleModal = () => {
  modalVisibility.value = !modalVisibility.value;
}

const deleteReply = async () => {
  try {
    let response = (await axios.delete(`/api/study-group/board/replies/${props.replyId}`)).data;
    if(response.success) {
      modalVisibility.value = false;
      emit('remove');
    }
  } catch (error) {
    console.log(error);
  }
}

function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);  // ISO 8601 날짜 문자열을 Date 객체로 변환
  const year = date.getFullYear();    // 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, '0');  // 월 추출 (0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, '0');  // 일 추출

  return `${year}.${month}.${day}`;   // 원하는 형식으로 포맷팅
}
</script>

<style scoped>
.reply {
    display: flex; /* 수평 배치를 위해 flex 사용 */
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem; /* 댓글 간 간격 */
}

.reply-container {
  display: flex;
  align-items: flex-start; /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  margin-left: 5.8rem;
  gap: 1rem;
}

.reply img {
    height: 4.8rem;
    width: 4.8rem;
    border-radius: 50%;
}

.reply-content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.reply-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.reply-author {
  font-weight: 500; /* 글자 두께 조절 */
  font-size: 2rem;
}

.reply-date {
  font-size: 1.5rem; /* 날짜 크기 조정 */
  color: #8c8c8c; /* 날짜 색상 조정 */
}

.reply-content {
    display: flex;
}

.reply-text {
  font-size: 2rem;
  font-weight: 400;
  line-height: 3rem;
  word-wrap: break-word;
}

.delete-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 4rem;
  width: 4rem;
  background-color: transparent;
  border: none;
  border-radius: 1rem;
  transition: 0.3s;
}

.delete-btn:hover {
  background-color: #ddd;
}
</style>