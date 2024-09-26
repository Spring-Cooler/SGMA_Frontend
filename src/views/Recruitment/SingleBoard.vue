<template>
  <div class="post-container">
    <div class="post-header">
      <div class="post-title">디자인 스터디 모집합니다!!
        <div class="author-icon">
          <div class="author-name">김민석</div>
        </div>
      </div>
      
      
    
      <div class="post-actions">
        <span class="like-count"><i class="fa-solid fa-heart"></i> 22</span>
        <span class="comment-count"><i class="fa-solid fa-comment"></i> 3</span>
        <button class="delete-btn">삭제하기</button>
        <button class="edit-btn">수정하기</button>
      </div>
    </div>
    

    <div class="post-content">
      <p class="post-date">
        모집 시작일: 2024년 9월 20일 <br>
        모집 마감일: 2024년 9월 24일
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
      <h2>댓글 3</h2>
      <textarea class="comment-input" placeholder="댓글을 남겨보세요."></textarea>
      <button class="submit-comment-btn">등록하기</button>
      <ul class="comment-list">
        <li class="comment-item">
          <span class="comment-author">김한수</span> - 와~~! 디자인 스터디 모집 글 올려주셨군요
        </li>
        <li class="comment-item">
          <span class="comment-author">이유리</span> - 네 맞아요~~~
        </li>
        <li class="comment-item">
          <span class="comment-author">이유리</span> - 제가 참여하고 싶어요 ㅠㅠ
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.like-count, .comment-count {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.like-count i, .comment-count i {
  margin-right: 5px;
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
  font-size:16px
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
  margin-bottom: 10px;
}

.comment-input {
  width: 100%;
  height: 80px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.submit-comment-btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #A1B872;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.comment-author {
  font-weight: bold;
  margin-right: 5px;
}
</style>
