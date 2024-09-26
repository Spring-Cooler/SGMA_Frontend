<template>
  <div class="notice-banner">
    <!-- 왼쪽 내용: 아이콘과 텍스트 -->
    <div class="left-content">
      <div class="notice-icon">
        <img src="@/assets/images/안내사항.png" alt="Notice Icon" />
      </div>
      <h2 class="notice-text"></h2>
      <div class="button-container">
        <img src="@/assets/images/공지사항 변경 버튼.png" alt="Change Button" />
      </div>
    </div>

    <!-- 오른쪽 내용: 그래프 이미지 -->
    <div class="right-content">
      <img src="@/assets/images/graph-and-people_svgrepo.com.png" alt="Graph and people" class="banner-image" />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.notice-banner {
  position: relative;
  top: 9rem;
  display: flex;
  justify-content: space-between;
  /* 요소들을 양쪽 끝에 정렬 */
  align-items: center;
  /* 요소들을 수직 중앙 정렬 */
  width: 100%;
  height: 360px;
  /* 배너의 전체 높이 설정 */
  background-color: #FFE083;
  padding: 0 6rem;
  /* 좌우 패딩 설정 */
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
  /* 전체 배너에 Noto Sans 적용 */
}

/* 왼쪽 컨텐츠 스타일 */
.left-content {
  display: flex;
  flex-direction: column;
  /* 요소들을 세로로 정렬 */
  align-items: flex-start;
  /* 왼쪽 정렬 */
  gap: 3rem;
  /* 요소들 사이 간격 설정 */
  max-width: 300px;
  /* 최대 너비 설정 */
}


/* 안내사항 아이콘 */
.notice-icon img {
  width: 80px;
  /* 아이콘 크기 조정 */
  height: auto;
  margin-top: 70px;
  margin-bottom: 30px;
}

/* 공지사항 텍스트 스타일 */
.notice-text {
  font-family: 'Noto Sans', sans-serif;
  /* Noto Sans 폰트 적용 */
  font-size: 28px;
  /* 텍스트 크기 조정 */
  font-weight: bold;
  /* 굵기 조정 */
  color: #202020;
  /* 텍스트 색상 설정 */
  margin: 0;
  /* h2의 기본 margin 제거 */
  display: inline;
  /* 인라인 요소로 설정 */
}

.notice-text::before {
  content: "효율적인 팀 스터디 관리, \A";
  /* 줄바꿈을 의미하는 \A 추가 */
  white-space: pre;
  /* 줄바꿈(\A) 적용을 위해 사용 */
}

.notice-text::after {
  content: "애쓰지마? SGMA!";
}

/* 공지사항 변경 버튼 컨테이너 */
.button-container img {
  width: 60px;
  /* 버튼 이미지 크기 조정 */
  height: auto;
}

/* 오른쪽 컨텐츠 스타일 */
.right-content {
  margin-top: 80px;
  display: flex;
  align-items: center;
  height: 100%;
}

.banner-image {
  width: 220px;
  /* 그래프 이미지 크기 조정 */
  height: auto;
}
</style>
