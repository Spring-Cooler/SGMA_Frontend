<template>
  <Navigation />
  <SideBar />
  <div class="post-container">
    <div class="post-header">
      <div class="post-title">{{ boardDetail.title }}
        <div class="author-icon">
          <div class="author-name">{{ boardDetail.user_nickname }}</div>
          <div id="test">
          <div v-if="boardDetail">
          <h1></h1>
          <p>{{ boardDetail.content }}</p>
          <!-- 기타 모집글 상세 정보 표시 -->
        </div>
        </div>
      </div>

      <div class="post-actions">
        <span class="like-count" @click="toggleLike">
          <i class="fa-solid fa-heart" :class="{ 'like-heart': isAnimating }"
            :style="{ color: isLiked ? 'red' : 'gray' }"></i> {{ likeCount }}
        </span>
        <span class="comment-count"><i class="fa-solid fa-comment"></i> 1</span>
        <button class="delete-btn" @click="showModal">삭제하기</button>
        <DeleteModal v-if="isModalVisible" :isVisible="isModalVisible" @confirm="handleConfirm1"
          @cancel="handleCancel" />
        <button class="edit-btn">수정하기</button>
      </div>
    </div>
  </div>


    <!-- <div class="post-content">
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

    </div> -->
  
    
    

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
import { ref, onMounted  } from 'vue';
import SideBar from '@/components/layouts/SideBar.vue';
import Navigation from '@/components/layouts/Navigation.vue';
import DeleteModal from './components/DeleteModal.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const props = defineProps({
        groupId: {
            type: Number,
            required: true
        },
        boardId: {
            type: Number,
            required: true
        },
        id: {
          type: String,
          required: true,
        },
    });

const boardDetail = ref({});
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


const route = useRoute();
const boardId  = route.params.id;

const getBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/api/recruitment-board/board/${boardId}`);
    if (response.data.success) {
      boardDetail.value = response.data.data; // 응답의 구조에 맞게 데이터 할당
      console.log("response", boardDetail.value); // 데이터 확인용 로그
    } else {
      console.error('API 요청 실패:', response.data.error);
    }
  } catch (error) {
    console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
  }
};

const handleConfirm1 = async () => {
  try {
    // 삭제 API 호출
    const response = await axios.delete(`/api/api/recruitment-board/${boardId}`);
    
    if (response.data.success) {
      console.log('삭제가 완료되었습니다.');
      // 삭제 후 다른 페이지로 이동
      router.push({ name: 'StudyGroups' }); // 게시글 목록으로 리다이렉트
    } else {
      console.error('삭제 요청 실패:', response.data.error);
    }
  } catch (error) {
    console.error('삭제 요청 중 오류 발생:', error);
  } finally {
    isModalVisible.value = false; // 모달 닫기
  }
};



const submitReply = () => {
  if (replyText.value.trim()) {
    // 여기서 실제로 답글을 추가하는 로직을 구현해야 함
    console.log('등록된 답글:', replyText.value);
    toggleReply(); // 답글 입력 창 닫기
  }
};


onMounted(() => {
  getBoardDetail();  // 컴포넌트가 마운트될 때 데이터 로드
});

</script>

<style scoped>
.post-title {
  width: 87.5rem;
  heigth:6.7rem;
  margin-top: 20rem;
  margin-right: auto; /* 오른쪽 여백을 자동으로 설정하여 왼쪽 정렬 */
  margin-left: 0; /* 왼쪽 여백을 0으로 설정 */
  color: #212224;
  font-size: 4rem;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 6rem;
  word-wrap: break-word;
  white-space: nowrap;
}

.post-container {
  margin-left: 67.9rem;
  max-width: 100%;
  margin-right: 0.5rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.8rem;
}



.author-icon {
  margin-top: 2.6rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1rem;
  
}

.author-name {
  margin-left:7.2rem;
  font-size: 1.6rem;
  margin-right: 1rem;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 3rem;
}



.reply-list{
  border-top: 0.1rem solid #eee;
  display:flex;
  flex-direction: column;
  align-items: flex-end;
}



.post-title {
  width: auto; /* 너비를 자동으로 조정 */
  margin-top: 13rem;
  margin-right: 0; /* 오른쪽 여백 제거 */
  margin-left: 0; /* 왼쪽 여백을 0으로 설정 */
  width: auto;
  /* 너비를 자동으로 조정 */
  color: #212224;
  font-size: 4rem;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 6rem;
  word-wrap: break-word;
  white-space: nowrap;
}

.post-header {
  width:80rem;
  border-bottom: 0.1rem solid #eee;
  display: flex;
  justify-content: flex-start;
  /* 요소들을 왼쪽 정렬 */
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem; /* 요소들 간의 간격 추가 */
}

.post-info {
  display: flex;
  align-items: center;
  margin-right: 2rem; /* 제목과 작성자 아이콘 사이의 간격 설정 */
}



.post-actions {
  margin-top: 32.3rem;
  margin-bottom: 2.7rem;
  display: flex;
  align-items: center;
  gap: 1rem; 
  cursor: pointer;
}

.like-count,
.comment-count {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #888;
}

.like-count i, .comment-count i {
  margin-right: 0.5rem;
  transition: color 0.3s;
}

.delete-btn {
  width: 8.4rem;
  height: 100%;
  padding: 0.55rem 1.6rem;
  font-size: 1.4rem;
  border: 0.1rem #DCDFE3 solid;
  cursor: pointer;
  color: #940000;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 2.1rem;
  word-wrap: break-word;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  display: inline-flex;
  white-space: nowrap;
}

.edit-btn {
  padding: 0.55rem 1.6rem;
  font-size: 1.4rem;
  border: 0.1rem #DCDFE3 solid;
  cursor: pointer;
  color: #202020;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 2.1rem;
  word-wrap: break-word;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  display: inline-flex;
  white-space: nowrap;
}

.bookmark-btn:hover,
.edit-btn:hover {
  background-color: #e5e5e5;
}

.post-content {
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.56rem;
  word-wrap: break-word
}

.post-date{
  margin-bottom: 1rem;
  font-size:1.6rem;
}



.apply-btn {
  margin-left: 66.5rem;
  display: block;
  width: 9.6rem;
  padding: 1rem 0;
  font-size: 1.8rem;
  color: #fff;
  background-color: #A1B872;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-align: center;
  margin-bottom: 3rem;
}

.apply-btn:hover {
  background-color: #8fa561;
}

.comment-section {
  padding-top: 2rem;
}

.comment-section h2 {
  color: #212224;
  font-size: 1.6rem;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 2.4rem;
  word-wrap: break-word
}


.comment-input {
  width: 79.2rem;
  height: 4.8rem;
  padding: 1rem;
  font-size: 1.4rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.6rem;
  margin-bottom: 0.1rem;
  color:#ADB3BA;
  font-size: 1.6rem;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 2.8rem;
  word-wrap: break-word; 
}

.submit-comment-btn {
  white-space: nowrap;
  width: 8.4rem;
  height: 3.2rem;
  display: inline-block;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  color: #fff;
  background-color: #ADB3BA;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-left: 70.8rem;
  margin-top: 0.8rem;

}

.submit-comment-btn:hover {
  background-color: #8fa561;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}


.comment-item {
  display: flex; /* 수평 배치를 위해 flex 사용 */
  align-items: flex-start; /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  padding-bottom: 1rem; /* 댓글 간 간격 */
  margin-bottom: 1rem; /* 댓글 간 간격 */
}

.comment-author-icon {
  width: 3rem; /* 아이콘 크기 조정 */
  height: 3rem; /* 아이콘 크기 조정 */
  border-radius: 50%; /* 원형으로 만들기 */
  background-color: #ccc; /* 배경색 설정 */
  margin-right: 1rem; /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0; /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */
  
  display: flex;
  /* 수평 배치를 위해 flex 사용 */
  align-items: flex-start;
  /* 아이콘과 텍스트가 수평으로 배치되도록 설정 */
  padding-bottom: 1rem;
  /* 댓글 간 간격 */
  margin-bottom: 1rem;
  /* 댓글 간 간격 */
}

.comment-author-icon {
  width: 3rem;
  /* 아이콘 크기 조정 */
  height: 3rem;
  /* 아이콘 크기 조정 */
  border-radius: 50%;
  /* 원형으로 만들기 */
  background-color: #ccc;
  /* 배경색 설정 */
  margin-right: 1rem;
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
  font-weight: bold; /* 글자 두께 조절 */
  margin-right: 0.5rem; /* 이름과 날짜 간격 */
  font-size:1.6rem
}

.comment-date {
  font-size: 1.2rem; /* 날짜 크기 조정 */
  color: #888; /* 날짜 색상 조정 */
  margin-bottom: 0.5rem; /* 날짜와 텍스트 사이의 간격 조정 */
  font-weight: bold;
  /* 글자 두께 조절 */
  margin-right: 0.5rem;
  /* 이름과 날짜 간격 */
  font-size: 1.6rem;
  
}


.comment-text {
  color: #212224;
  font-size: 1.6rem;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 2.56rem;
  word-wrap: break-word
}
.comment-btn{
  cursor:pointer;
  margin-top:0.5rem;
}
.comment-btn {
  cursor: pointer;
  margin-top: 0.5rme;
  background-color: white;
  color: #868C94;
  font-size: 1.2rem;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 1.8rem;
  word-wrap: break-word;
  width:4.5rem;
  height: 1.8rem;
  border: none;
  white-space: nowrap;
  margin-bottom:1.7rem;
}


.comment-reply {
  display: flex;
  align-items: flex-start;
  margin-left: 5rem;
  border-bottom: 0.1rem solid #eee;
  margin-top: 1.6rem;
  margin-bottom: 4rem;
}

.comment-reply-author-icon {
  width: 3rem; /* 아이콘 크기 조정 */
  height: 3rem; /* 아이콘 크기 조정 */
  border-radius: 50%; /* 원형으로 만들기 */
  background-color: #ccc; /* 배경색 설정 */
  margin-right: 1rem; /* 아이콘과 텍스트 간의 간격 조절 */
  flex-shrink: 0; /* 아이콘이 크기에 맞춰 줄어들지 않도록 설정 */
}

.comment-reply-content {
  display: flex;
  flex-direction: column; /* 텍스트와 날짜를 수직 배치 */
  width: 74.4rem;
  margin-top:0.4rem;
}

.comment-reply-author {
  font-weight: bold; /* 글자 두께 조절 */
  margin-right: 0.5rem; /* 이름과 날짜 간격 */
  font-size:1.6rem;
}

.comment-reply-date {
  font-size: 1.2rem; /* 날짜 크기 조정 */
  color: #888; /* 날짜 색상 조정 */
  margin-bottom: 0.5rem; /* 날짜와 텍스트 사이의 간격 조정 */
  flex-direction: column;
  /* 텍스트와 날짜를 수직 배치 */
  width: 74.4rem;
  margin-top: 0.4rme;
}

.comment-reply-author {
  font-weight: bold;
  /* 글자 두께 조절 */
  margin-right: 0.5rem;
  /* 이름과 날짜 간격 */
  font-size: 1.6rem
}

.comment-reply-date {
  font-size: 1.2rem;
  /* 날짜 크기 조정 */
  color: #888;
  /* 날짜 색상 조정 */
  margin-bottom: 0.5rem;
  /* 날짜와 텍스트 사이의 간격 조정 */
}

.comment-reply-text {
  color: #212224;
  font-size: 1.6rem;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 2.56rem;
  margin-bottom:4rem;
  word-wrap: break-word
}
.fa-regular fa-comment{
  font-size: 1.6rem;
}
.submit-reply-btn, .cancel-reply-btn {
  padding: 0.5rem 1rem;
  line-height: 2.56rem;
  margin-bottom: 4rem;
  word-wrap: break-word
}

.fa-regular fa-comment {
  font-size: 1.6rem;
}

.submit-reply-btn,
.cancel-reply-btn {
  padding: 0.5rem 1rem;

  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
}

.submit-reply-btn {
  background-color: #8fa561;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-right: 1rem; 
}

.cancel-reply-btn {
  background-color: #aaa;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.reply-input {
  width: 60rem;
  flex: 1;
  padding: 0.5rem;
  border: 0.1rem solid #ddd;
  border-radius: 0.5rem;
}

.buttons {
  display: flex;
  margin-left:45rem;
  padding:1rem;
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
  font-size: 1.4rem;
  color: #888;
}

.like-count i {
  margin-right: 0.5rem;
  transition: color 0.3s; /* 색상 전환 애니메이션 */
}
</style>