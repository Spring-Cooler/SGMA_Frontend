<template>
  <div class="post-container">
    <div class="post-header">
      <div class="post-title">디자인 스터디 모집합니다!!
        <div class="author-icon">
          <div class="author-name">김민석</div>
        </div>
      </div>
      
      <div class="post-actions">
        <span class="like-count" @click="toggleLike">
          <i class="fa-solid fa-heart" :style="{ color: isLiked ? 'red' : 'gray' }"></i> {{ likeCount }}
        </span>
        <span class="comment-count"><i class="fa-solid fa-comment"></i> 3</span>
        <button class="delete-btn">삭제하기</button>
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
      <h2><i class="fa-regular fa-comment"></i> 댓글 3</h2>
      <input class="comment-input" placeholder="댓글을 남겨보세요."></input>
    </div>
      <button class="submit-comment-btn">등록하기</button>
      <ul class="comment-list">
        <li class="comment-item">
          <span class="comment-author-icon"></span>
          <div class="comment-content">
            <span>
              <span class="comment-author">김윤수</span>
              <span class="comment-date">2023. 7. 18</span>
            </span>
            <p class="comment-text">와~~~~ 드디어 모집 글 올리셨군요</p>
            <button class="comment-btn">답글달기</button>
          </div>
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
        </li>
      </ul>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 좋아요 상태와 좋아요 수 관리
const isLiked = ref(false); // 좋아요 상태를 관리
const likeCount = ref(22);  // 좋아요 수를 관리

// 좋아요 토글 함수
const toggleLike = () => {
  if (isLiked.value) {
    likeCount.value--; // 좋아요를 취소하면 수 감소
  } else {
    likeCount.value++; // 좋아요를 누르면 수 증가
  }
  isLiked.value = !isLiked.value; // 상태를 토글
};
</script>

<style scoped>
.post-title {
  width: 875px;
  height: 67px;
  margin-top: 200px;
  margin-right: auto; /* 오른쪽 여백을 자동으로 설정하여 왼쪽 정렬 */
  margin-left: 0; /* 왼쪽 여백을 0으로 설정 */
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
  margin-left:72px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  margin-top: 30px;
}

.post-title {
  width: auto; /* 너비를 자동으로 조정 */
  margin-top: 130px;
  margin-right: 0; /* 오른쪽 여백 제거 */
  margin-left: 0; /* 왼쪽 여백을 0으로 설정 */
  color: #212224;
  font-size: 40px;
  font-family: Noto Sans;
  font-weight: 400;
  line-height: 60px;
  word-wrap: break-word;
  white-space: nowrap;
}

.post-header {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start; /* 요소들을 왼쪽 정렬 */
  align-items: center;
  margin-bottom: 20px;
  gap: 10px; /* 요소들 간의 간격 추가 */
}

.post-info {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 제목과 작성자 아이콘 사이의 간격 설정 */
}



.post-actions {
  margin-top: 323px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  gap: 10px; 
  cursor: pointer;
}

.like-count, .comment-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.like-count i, .comment-count i {
  margin-right: 5px;
  transition: color 0.3s;
}
.delete-btn{
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

.bookmark-btn:hover, .edit-btn:hover {
  background-color: #e5e5e5;
}

.post-content {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.60px;
  word-wrap: break-word
}

.post-date{
  margin-bottom: 10px;
  font-size:16px
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

.comment-input {
  width: 792px;
  height: 48px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1px;
  color:#ADB3BA;
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
  display: flex; /* 수평 배치 */
  align-items: flex-start; /* 아이콘과 텍스트가 위쪽에 맞춰 정렬되도록 설정 */
  
  border-bottom: 1px solid #eee; /* 아래 경계선 */
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
</style>
