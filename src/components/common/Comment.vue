<template>
    <div class="comment">
        <div class="comment-container">
            <img class="comment-author-icon" src="../../assets/images/default_profile.svg"></img>
            <div class="comment-content-container">
                <div class="comment-info">
                    <span class="comment-author">{{props.data.nickname}}</span>
                    <span class="comment-date">{{formatDate(props.data.created_at)}}</span>
                </div>
                <div class="comment-content">
                    <p class="comment-text">{{props.data.content}}</p>
                </div>
                <div class="reply-btn-wrapper">
                    <span class="reply-btn"  @click="toggleReply">답글달기</span>
                </div>
            </div>
        </div>
        <button class="delete-btn" @click="toggleModal">
            <span>x</span>
        </button>
        <DeleteModal :isVisible="modalVisibility" @confirm="deleteComment" @cancel="toggleModal">해당 댓글을 삭제하시겠습니까?</DeleteModal>
    </div>
    <div class="reply-input-container">
        <div v-if="isReplying" class="reply-input-wrapper">
            <input v-model="data.content" class="reply-input" placeholder="답글을 입력하세요..." />
        </div>
        <div v-if="isReplying" class="btn-container">
            <TinyButton class="btn " @click="submitReply" label="등록"></TinyButton>
            <TinyButton class="btn light-gray" @click="toggleReply" label="취소"></TinyButton>
        </div>
    </div>
    <slot></slot>
</template>

<script setup>
import { ref, reactive } from 'vue';
import TinyButton from './TinyButton.vue';
import axios from 'axios';
import DeleteModal from './DeleteModal.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  }
})

const data = reactive({
    content: '',
    member_id: 1,
    comment_id: props.commentId,
});

const emit = defineEmits(['add','remove']);

const isReplying = ref(false); // 답글 입력 창 상태 관리
const modalVisibility = ref(false);

const toggleReply = () => {
  isReplying.value = !isReplying.value;
  data.content = '';
};

const submitReply = async () => {
  try {
    let response = (await axios.post(`/api/study-group/board/replies`, data)).data;
    if(response.success) {
      toggleReply(); // 답글 입력 창 닫기
      emit('add');
    } 
  } catch (error) {
    console.error(error);
  }
};

const toggleModal = () => {
  modalVisibility.value = !modalVisibility.value;
}

const deleteComment = async () => {
  try {
    let response = (await axios.delete(`/api/study-group/board/comments/${props.commentId}`)).data;
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
.comment {
    display: flex; /* 수평 배치를 위해 flex 사용 */
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem; /* 댓글 간 간격 */
}

.comment-container {
  display: flex;
  align-items: flex-start; /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  gap: 1rem;
}

.comment img {
    height: 4.8rem;
    width: 4.8rem;
    border-radius: 50%;
}

.comment-content-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.comment-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.comment-author {
  font-weight: 500; /* 글자 두께 조절 */
  font-size: 2rem;
}

.comment-date {
  font-size: 1.5rem; /* 날짜 크기 조정 */
  color: #8c8c8c; /* 날짜 색상 조정 */
}

.comment-content {
    display: flex;
}

.comment-text {
  font-size: 2rem;
  font-weight: 400;
  line-height: 3rem;
  word-wrap: break-word;
}

.reply-btn-wrapper {
    display: flex;
}

.reply-btn {
    display: flex;
    cursor:pointer;
    color: #868C94;
    font-size: 1.6rem;
    font-weight: 500;
    border: none;
}

.reply-input-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100rem;
  margin-left: 5.8rem;
}

.reply-input-wrapper {
  display: flex;
}

.reply-input {
  height: 4rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
}

.btn-container{
  display: flex;
  width: 100%;
  justify-content: right;
  margin-top: 1rem;
  gap: 2rem;
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