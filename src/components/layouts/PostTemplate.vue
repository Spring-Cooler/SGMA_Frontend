<template>
    <Title>디자인 스터디 모집합니다!!</Title>

    <PostHeader :data="headerData" :isNotice="false" @deletePost="deletePost"></PostHeader>

    

    <div class="post-footer">
      <MediumButton label="지원하기"></MediumButton>
    </div>

    <DeleteModal :isVisible="modalVisibility" @confirm="confirm" @cancel="cancel">해당 게시글을 삭제하시겠습니까?</DeleteModal>
    
    <div class="comment-section">
      <div class="comment-cnt">
        <i class="fa-regular fa-comment"></i>
        <span>댓글 1</span>
      </div>
      <input class="comment-input" placeholder="댓글을 남겨보세요."></input>
      <div class="submit-comment-wrapper">
        <SmallButton class="light-gray" label="등록하기" @click="addComment"></SmallButton>
      </div>
    </div>

    <ul class="comment-list">
      <li class="comment-item">
        <span class="comment-author-icon"></span>
        <div class="comment-content">
          <span>
            <span class="comment-author">김윤수</span>
            <span class="comment-date">2023. 7. 18</span>
          </span>
          <p class="comment-text">와~~~~ 드디어 모집 글 올리셨군요</p>
          <button class="comment-btn"  @click="toggleReply">답글달기</button>

          <div v-if="isReplying" class="reply-input-container">
            <input v-model="replyText" class="reply-input" placeholder="답글을 입력하세요..." />
          </div>
          <div v-if="isReplying" div class="buttons">
            <button class="submit-reply-btn" @click="submitReply">등록</button>
            <button class="cancel-reply-btn" @click="toggleReply">취소</button>
          </div>
            
          <ul class="reply-list">
            <li class="comment-reply">
              <span class="comment-reply-author-icon"></span>
              <div class="comment-reply-content">
                <span>
                  <span class="comment-reply-author">이유빈</span>
                  <span class="comment-reply-date">2023. 7. 19</span>
                </span>
                <p class="comment-reply-text">와~~~~ </p>
              </div>
            </li>
            <li class="comment-reply">
              <span class="comment-reply-author-icon"></span>
              <div class="comment-reply-content">
                <span>
                  <span class="comment-reply-author">이유빈</span>
                  <span class="comment-reply-date">2023. 7. 19</span>
                </span>
                <p class="comment-reply-text">와~~~~ </p>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import PostHeader from '@/components/layouts/PostHeader.vue';
import DeleteModal from '@/components/common/DeleteModal.vue';
import SmallButton from '@/components/common/SmallButton.vue'
import MediumButton from '@/components/common/MediumButton.vue';
import Title from '@/components/common/Title.vue';
import StartDate from '@/components/common/StartDate.vue';
import EndDate from '@/components/common/EndDate.vue';
import PostContent from '@/components/common/PostContent.vue';

const modalVisibility = ref(false);
const isReplying = ref(false); // 답글 입력 창 상태 관리
const replyText = ref(''); 

const headerData = ref({
  profile_image: '../../assets/images/default_profile.svg',
  nickname: '김민석',
  likes: 22,
  comments: 3,
});

const deletePost = () => {
  modalVisibility.value = true;
};

const confirm = () => {
  // 삭제 확인 로직 처리
  modalVisibility.value = false;
  console.log('삭제가 확인되었습니다.');
};

const cancel = () => {
  modalVisibility.value = false;
};

const toggleReply = () => {
  isReplying.value = !isReplying.value;
  replyText.value = ''; // 입력 창 초기화
};

const submitReply = () => {
  if (replyText.value.trim()) {
    // 여기서 실제로 답글을 추가하는 로직을 구현해야 함
    console.log('등록된 답글:', replyText.value);
    toggleReply(); // 답글 입력 창 닫기
  }
};
</script>

<style scoped>


.post-footer {
  display: flex;
  width: 100%;
  margin-top: 5rem;
  justify-content: right;
  align-items: center;
}

.reply-list{
  border-top: 1px solid #eee;
  display:flex;
  flex-direction: column;
  align-items: flex-end;
}

.bookmark-btn:hover, .edit-btn:hover {
  background-color: #e5e5e5;
}

.apply-btn:hover {
  background-color: #8fa561;
}

.comment-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid #eee;
  margin-top: 5rem;
  gap: 1rem;
}

.comment-cnt {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  height: 7rem;
  width: 80rem;
  gap: 1rem;
  font-size: 1.65rem;
  font-weight: 400;
}

.comment-input {
  width: 80rem;
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
  align-items: center;
  width: 80rem;
  margin-top: 1rem;
}

.submit-comment-wrapper button {
  font-size: 2.2rem;
}

.submit-comment-btn:hover {
  background-color: #8fa561;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}


.comment-item {
  display: flex; /* 수평 배치를 위해 flex 사용 */
  align-items: flex-start; /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  padding-bottom: 1rem; /* 댓글 간 간격 */
  margin-bottom: 1rem; /* 댓글 간 간격 */
}

.comment-author-icon {
  width: 30px; /* 아이콘 크기 조정 */
  height: 30px; /* 아이콘 크기 조정 */
  border-radius: 50%; /* 원형으로 만들기 */
  background-color: #ccc; /* 배경색 설정 */
  margin-right: 10px; /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0; /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */
  
}

.comment-content {
  display: flex;
  flex-direction: column; /* 텍스트와 날짜를 수직 배치 */
  
}

.comment-author {
  font-weight: bold; /* 글자 두께 조절 */
  margin-right: 5px; /* 이름과 날짜 간격 */
  font-size:16px
}

.comment-date {
  font-size: 12px; /* 날짜 크기 조정 */
  color: #888; /* 날짜 색상 조정 */
  margin-bottom: 5px; /* 날짜와 텍스트 사이의 간격 조정 */
}

.comment-text {
  color: #212224;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 25.60px;
  word-wrap: break-word
}
.comment-btn{
  cursor:pointer;
  margin-top:5px;
  background-color: white;
  color: #868C94;
  font-size: 12px;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
  width:45px;
  height: 18px;
  border: none;
  white-space: nowrap;
  margin-bottom:17px;
}


.comment-reply {
  display: flex;
  align-items: flex-start;
  margin-left: 50px;
  border-bottom: 1px solid #eee;
  margin-top: 16px;
  margin-bottom: 40px;
}

.comment-reply-author-icon {
  width: 30px; /* 아이콘 크기 조정 */
  height: 30px; /* 아이콘 크기 조정 */
  border-radius: 50%; /* 원형으로 만들기 */
  background-color: #ccc; /* 배경색 설정 */
  margin-right: 10px; /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0; /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */
}

.comment-reply-content {
  display: flex;
  flex-direction: column; /* 텍스트와 날짜를 수직 배치 */
  width: 744px;
  margin-top:4px;
}

.comment-reply-author {
  font-weight: bold; /* 글자 두께 조절 */
  margin-right: 5px; /* 이름과 날짜 간격 */
  font-size:16px
}

.comment-reply-date {
  font-size: 12px; /* 날짜 크기 조정 */
  color: #888; /* 날짜 색상 조정 */
  margin-bottom: 5px; /* 날짜와 텍스트 사이의 간격 조정 */
}

.comment-reply-text {
  color: #212224;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 25.60px;
  margin-bottom:40px;
  word-wrap: break-word
}
.fa-regular fa-comment{
  font-size: 16px;
}
.submit-reply-btn, .cancel-reply-btn {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
.submit-reply-btn {
  background-color: #8fa561;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px; 
}

.cancel-reply-btn {
  background-color: #aaa;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.reply-input {
  width: 600px;
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.buttons{
  display: flex;
  margin-left:450px;
  padding:10px;
}
@keyframes like-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5); /* 커지는 애니메이션 */
  }
  100% {
    transform: scale(1);
  }
}

.like-heart {
  display: inline-block;
  animation: like-animation 0.5s ease-out; /* 애니메이션 0.5초 동안 실행 */
}

.like-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.like-count i {
  margin-right: 5px;
  transition: color 0.3s; /* 색상 전환 애니메이션 */
}
</style>
