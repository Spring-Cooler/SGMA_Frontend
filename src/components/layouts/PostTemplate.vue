<template>
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
</template>

<script setup>

</script>

<style scoped>

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

.comment-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
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
</style>
