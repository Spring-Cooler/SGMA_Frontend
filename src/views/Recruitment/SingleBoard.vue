<template>
  <Navigation />
  <SideBar />
  <div class="post-container">
    <div class="post-header">
      <div class="post-title">디자인 스터디 모집합니다!!
        <div class="author-icon">
          <div class="author-name">김민석</div>
        </div>
      </div>

      <div class="post-actions">
        <span class="like-count" @click="toggleLike">
          <i class="fa-solid fa-heart" :class="{ 'like-heart': isAnimating }"
            :style="{ color: isLiked ? 'red' : 'gray' }"></i> {{ likeCount }}
        </span>
        <span class="comment-count"><i class="fa-solid fa-comment"></i> 1</span>
        <button class="delete-btn" @click="showModal">삭제하기</button>
        <DeleteModal v-if="isModalVisible" :isVisible="isModalVisible" @confirm="handleConfirm"
          @cancel="handleCancel" />
        <button class="edit-btn">수정하기</button>
      </div>
    </div>


    <div class="post-content">
      <p class="post-date">
        <i class="fa-regular fa-calendar-check"></i>
        모집 시작일: 2024년 9월 20일 <br>
        <i class="fa-regular fa-calendar-xmark"></i> 모집 마감일: 2024년 9월 24일
      </p>
      <br>
      <p>안녕하세요! 디자인 스터디입니다.</p>
      ✅ 이력서 작성 지원<br>
      ✅ 프로젝트 참여 시 약 100명의 사용자 동시 확인 및 개발자와의 협업 경험<br>
      ✅ 이메일: abcd1234@naver.com으로 포트폴리오와 함께 하여 메일 발송<br>
      ✅ 선발된 분들께는 프로젝트용으로 기부받은 맥북 지급 및 실습 예정<br>
      ✅ 링크: <a href="https://open.kakao.com/o/sfogeir" target="_blank">https://open.kakao.com/o/sfogeir</a>
      <p>문의사항 있으신 분은 위의 링크로 오픈채팅방으로 연락주시면 감사하겠습니다.</p>

    </div>

    <button class="apply-btn">지원하기</button>

    <div class="comment-section">
      <h2><i class="fa-regular fa-comment"></i> 댓글 1</h2>
      <input class="comment-input" placeholder="댓글을 남겨보세요."></input>
    </div>
    <button class="submit-comment-btn" @click="addComment">등록하기</button>
    <ul class="comment-list">
      <li class="comment-item">
        <span class="comment-author-icon"></span>
        <div class="comment-content">
          <span>
            <span class="comment-author">김윤수</span>
            <span class="comment-date">2023. 7. 18</span>
          </span>
          <p class="comment-text">와~~~~ 드디어 모집 글 올리셨군요</p>
          <button class="comment-btn" @click="toggleReply">답글달기</button>


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

  </div>
</template>

<script setup>
import { ref } from 'vue';
import SideBar from '@/components/layouts/SideBar.vue';
import Navigation from '@/components/layouts/Navigation.vue';
// import DeleteModal from './components/DeleteModal.vue';

const isModalVisible = ref(false);
const isReplying = ref(false); // 답글 입력 창 상태 관리
const replyText = ref('');
const isAnimating = ref(false); // 좋아요 애니메이션 상태 관리

// 좋아요 상태와 좋아요 수 관리
const isLiked = ref(false); // 좋아요 상태를 관리
const likeCount = ref(22);  // 좋아요 수를 관리


const showModal = () => {
  isModalVisible.value = true;
};

const handleConfirm = () => {
  // 삭제 확인 로직 처리
  isModalVisible.value = false;
  console.log('삭제가 확인되었습니다.');
};

const handleCancel = () => {
  isModalVisible.value = false;
};
// 좋아요 토글 함수
const toggleLike = () => {
  if (!isAnimating.value) { // 애니메이션이 진행 중이 아닐 때만 실행
    if (isLiked.value) {
      likeCount.value--; // 좋아요를 취소하면 수 감소
    } else {
      likeCount.value++; // 좋아요를 누르면 수 증가
    }
    isLiked.value = !isLiked.value; // 상태를 토글

    isAnimating.value = true; // 애니메이션 시작
    setTimeout(() => {
      isAnimating.value = false; // 애니메이션 종료 후 상태 초기화
    }, 500); // 애니메이션 지속 시간과 일치시킴 (0.5초)
  }
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
.post-title {
  width: 875px;
  height: 67px;
  margin-top: 200px;
  margin-right: auto;
  /* 오른쪽 여백을 자동으로 설정하여 왼쪽 정렬 */
  margin-left: 0;
  /* 왼쪽 여백을 0으로 설정 */
  color: #212224;
  font-size: 40px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 60px;
  word-wrap: break-word;
  white-space: nowrap;
}

.post-container {
  margin-left: 679px;
  max-width: 100%;
  margin-right: 5px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}



.author-icon {
  margin-top: 26px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;

}

.author-name {
  margin-left: 72px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 30px;
}

.reply-list {
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.post-title {
  width: auto;
  /* 너비를 자동으로 조정 */
  margin-top: 130px;
  margin-right: 0;
  /* 오른쪽 여백 제거 */
  margin-left: 0;
  /* 왼쪽 여백을 0으로 설정 */
  color: #212224;
  font-size: 40px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 60px;
  word-wrap: break-word;
  white-space: nowrap;
}

.post-header {
  width: 800px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start;
  /* 요소들을 왼쪽 정렬 */
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  /* 요소들 간의 간격 추가 */
}

.post-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
  /* 제목과 작성자 아이콘 사이의 간격 설정 */
}



.post-actions {
  margin-top: 323px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.like-count,
.comment-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.like-count i,
.comment-count i {
  margin-right: 5px;
  transition: color 0.3s;
}

.delete-btn {
  width: 84px;
  height: 100%;
  padding: 5.5px 16px;
  font-size: 14px;
  border: 1px #DCDFE3 solid;
  cursor: pointer;
  color: #940000;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 21px;
  word-wrap: break-word;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  white-space: nowrap;
}

.edit-btn {
  padding: 5.5px 16px;
  font-size: 14px;
  border: 1px #DCDFE3 solid;
  cursor: pointer;
  color: #202020;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 21px;
  word-wrap: break-word;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  white-space: nowrap;
}

.bookmark-btn:hover,
.edit-btn:hover {
  background-color: #e5e5e5;
}

.post-content {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.60px;
  word-wrap: break-word
}

.post-date {
  margin-bottom: 10px;
  font-size: 16px
}



.apply-btn {
  margin-left: 665px;
  display: block;
  width: 96px;
  padding: 10px 0;
  font-size: 18px;
  color: #fff;
  background-color: #A1B872;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-bottom: 30px;
}

.apply-btn:hover {
  background-color: #8fa561;
}

.comment-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.comment-section h2 {
  color: #212224;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word
}

/* .reply-list{
  margin-top: 70px;
  margin-left: 10px
} */
.comment-input {
  width: 792px;
  height: 48px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1px;
  color: #ADB3BA;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 28px;
  word-wrap: break-word;
}

.submit-comment-btn {
  white-space: nowrap;
  width: 84px;
  height: 32px;
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #ADB3BA;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 708px;
  margin-top: 8px;

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
  display: flex;
  /* 수평 배치를 위해 flex 사용 */
  align-items: flex-start;
  /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  padding-bottom: 10px;
  /* 댓글 간 간격 */
  margin-bottom: 10px;
  /* 댓글 간 간격 */
}

.comment-author-icon {
  width: 30px;
  /* 아이콘 크기 조정 */
  height: 30px;
  /* 아이콘 크기 조정 */
  border-radius: 50%;
  /* 원형으로 만들기 */
  background-color: #ccc;
  /* 배경색 설정 */
  margin-right: 10px;
  /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0;
  /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */

}

.comment-content {
  display: flex;
  flex-direction: column;
  /* 텍스트와 날짜를 수직 배치 */

}

.comment-author {
  font-weight: bold;
  /* 글자 두께 조절 */
  margin-right: 5px;
  /* 이름과 날짜 간격 */
  font-size: 16px
}

.comment-date {
  font-size: 12px;
  /* 날짜 크기 조정 */
  color: #888;
  /* 날짜 색상 조정 */
  margin-bottom: 5px;
  /* 날짜와 텍스트 사이의 간격 조정 */
}

.comment-text {
  color: #212224;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 25.60px;
  word-wrap: break-word
}

.comment-btn {
  cursor: pointer;
  margin-top: 5px;
  background-color: white;
  color: #868C94;
  font-size: 12px;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
  width: 45px;
  height: 18px;
  border: none;
  white-space: nowrap;
  margin-bottom: 17px;
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
  width: 30px;
  /* 아이콘 크기 조정 */
  height: 30px;
  /* 아이콘 크기 조정 */
  border-radius: 50%;
  /* 원형으로 만들기 */
  background-color: #ccc;
  /* 배경색 설정 */
  margin-right: 10px;
  /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0;
  /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */
}

.comment-reply-content {
  display: flex;
  flex-direction: column;
  /* 텍스트와 날짜를 수직 배치 */
  width: 744px;
  margin-top: 4px;
}

.comment-reply-author {
  font-weight: bold;
  /* 글자 두께 조절 */
  margin-right: 5px;
  /* 이름과 날짜 간격 */
  font-size: 16px
}

.comment-reply-date {
  font-size: 12px;
  /* 날짜 크기 조정 */
  color: #888;
  /* 날짜 색상 조정 */
  margin-bottom: 5px;
  /* 날짜와 텍스트 사이의 간격 조정 */
}

.comment-reply-text {
  color: #212224;
  font-size: 16px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 25.60px;
  margin-bottom: 40px;
  word-wrap: break-word
}

.fa-regular fa-comment {
  font-size: 16px;
}

.submit-reply-btn,
.cancel-reply-btn {
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

.buttons {
  display: flex;
  margin-left: 450px;
  padding: 10px;
}

@keyframes like-animation {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
    /* 커지는 애니메이션 */
  }

  100% {
    transform: scale(1);
  }
}

.like-heart {
  display: inline-block;
  animation: like-animation 0.5s ease-out;
  /* 애니메이션 0.5초 동안 실행 */
}

.like-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.like-count i {
  margin-right: 5px;
  transition: color 0.3s;
  /* 색상 전환 애니메이션 */
}
</style>
