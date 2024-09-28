<template>
  <section class="comments-section">
    <h1>내가 모집글에 쓴 댓글</h1>
    <div v-if="comments.length > 0" v-for="comment in comments" :key="comment.comment_id" class="comment-card">
      <p class="study-group-name">{{ comment.study_group_name }}</p> <!-- 스터디 그룹 이름 -->
      <h3>{{ comment.recruitment_board_title }}</h3> <!-- 게시글 제목 -->
      <hr class="divider" /> <!-- 수평선으로 구분 -->
      <div class="comment-meta">
        <p class="comment-content">{{ comment.content }}</p> <!-- 댓글 내용 -->
        <div class="comment-date">{{ formatDate(comment.created_at) }}</div> <!-- 댓글 작성 날짜 -->
      </div>
      <span class="tag" :class="{'inactive': comment.recruitment_status !== 'ACTIVE'}">
        {{ comment.recruitment_status === 'ACTIVE' ? '모집중' : '모집종료' }}
      </span>

      <!-- 대댓글 표시 영역 -->
      <div v-if="comment.replies && comment.replies.length > 0" class="replies">
        <div v-for="reply in comment.replies" :key="reply.reply_id" class="reply-card">
          <div class="reply-meta">
            <p class="reply-content">{{ reply.content }}</p> <!-- 대댓글 내용 -->
            <div class="reply-date">{{ formatDate(reply.created_at) }}</div> <!-- 대댓글 작성 날짜 -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-comments">
      <p>작성한 댓글이 없습니다.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { getUserComments } from '@/api/user';

const token = inject('token');
const comments = ref([]); // 댓글 목록을 저장하는 상태
const errorMessage = ref(''); // 에러 메시지를 저장할 상태

// 댓글 목록 데이터를 불러오는 함수
const fetchUserComments = async () => {
  try {
    console.log("userId:", token.userId);
    console.log("accessToken:", token.accessToken);
    
    const response = await getUserComments(token.userId, token.accessToken);
    console.log('API 응답 데이터:', response.data);

    if (response.data && response.data.comments) {
      comments.value = response.data.comments;
    } else {
      errorMessage.value = '작성한 댓글이 없습니다.';
      console.warn('작성한 댓글이 없습니다. 응답 데이터:', response.data);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = '댓글 목록 조회 중 오류가 발생했습니다.';
    }
    console.error('댓글 목록 조회 오류:', err);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(fetchUserComments);
</script>

<style scoped>
/* 댓글 목록 섹션 */
.comments-section {
  flex: 1; /* 나머지 공간을 차지 */
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  height: fit-content;
}

.comment-card {
  display: flex;
  flex-direction: column;
  position: relative; /* 태그 위치 조정을 위한 설정 */
  padding: 1.5rem;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 스터디 그룹 이름 스타일 */
.study-group-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem; /* 스터디 그룹 이름 폰트 사이즈 작게 */
  color: #888; /* 조금 연한 색상 */
}

/* 게시글 제목 스타일 */
.comment-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem; /* 게시글 제목 폰트 사이즈 크게 */
  font-weight: bold; /* 제목을 굵게 */
  color: #333; /* 진한 색상 */
}

/* 수평선 스타일 */
.divider {
  border: none; /* 기본 테두리 제거 */
  border-top: 1px solid #ddd; /* 얇은 수평선 */
  margin: 1rem 0; /* 상하 간격 설정 */
}

/* 댓글 내용 스타일 */
.comment-content {
  margin: 0.5rem 0;
  font-size: 1.6rem; /* 댓글 내용 폰트 사이즈 */
  color: #666;
  flex: 1; /* 댓글 내용이 차지할 수 있는 공간을 모두 차지하도록 설정 */
}

/* 댓글 메타 정보 스타일 */
.comment-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* 날짜를 아래로 정렬 */
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: #999;
}

/* 댓글 날짜 스타일 */
.comment-date {
  font-size: 1.2rem; /* 날짜 폰트 사이즈 */
  color: #999; /* 색상 변경 */
  align-self: flex-end; /* 자신을 아래쪽으로 정렬 */
}

/* 대댓글 카드 스타일 */
.replies {
  margin-top: 1rem; /* 대댓글 상단 여백 */
  padding-left: 1.5rem; /* 대댓글을 왼쪽으로 약간 들여쓰기 */
  border-left: 2px solid #ddd; /* 대댓글 구분선 */
}

.reply-card {
  padding: 0.75rem 1rem;
  background-color: #f9f9f9;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  margin-bottom: 0.75rem;
}

.reply-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #777;
}

/* 대댓글 내용 스타일 */
.reply-content {
  font-size: 1.4rem;
  color: #555;
}

/* 대댓글 날짜 스타일 */
.reply-date {
  font-size: 1.2rem;
  color: #aaa;
}

/* 태그 스타일 */
.tag {
  position: absolute; /* 태그를 카드 안에서 상대적으로 위치 설정 */
  top: 1.5rem; /* 상단 위치 조정 */
  right: 1.5rem; /* 우측 위치 조정 */
  background-color: #ffff;
  border: 1.2px solid #a1b872;
  width: 8rem;
  height: 3.2rem;
  font-size: 1.4rem; /* 폰트 크기 살짝 조정 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center;
  color: #a1b872; /* 글자 색상을 흰색으로 변경 */
  border-radius: 5px; /* 둥근 모서리 */
}

/* 비활성 상태 태그 */
.tag.inactive {
  color: #ff6363; /* 글자 색상을 흰색으로 변경 */
  background-color: #ffff;
  border: 1.2px solid #ff6363;
}

/* 댓글이 없을 때의 스타일 */
.no-comments p {
  font-size: 4rem; /* 글자 크기 키우기 */
  font-weight: bold; /* 글자 굵게 */
  text-align: center; /* 가운데 정렬 */
  color: #999; /* 색상 변경 */
  margin-top: 8rem; /* 상단 여백 */
}
</style>
