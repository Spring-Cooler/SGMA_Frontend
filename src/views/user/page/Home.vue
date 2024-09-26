<template>
  <div class="home-page">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <SideBar />

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <NoticeBanner /> <!-- 배너를 메인 컨텐츠 안에 포d함시킴 -->

      <div class="content">
        <!-- 주간 인기 모집글 -->
        <section class="recent-activities">
          <h1>주간 인기 모집글</h1>
          <ul>
            <li v-for="(item, index) in activityList" :key="index" class="activity-card">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <span class="date">{{ item.date }}</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import NoticeBanner from '@/views/user/components/NoticeBanner.vue';

const activityList = [
  { title: '스터디 그룹 "Java 스터디"', description: '새로운 멤버가 가입했습니다.', date: '2024-09-26' },
  { title: '스터디 그룹 "Python 스터디"', description: '새로운 공지가 등록되었습니다.', date: '2024-09-25' },
  { title: 'Frontend 스터디', description: '모임이 곧 시작됩니다.', date: '2024-09-24' },
  // 추가 항목
];
</script>

<style scoped>
.home-page {
  display: flex;
  height: 100vh; /* 전체 높이를 설정하여 뷰포트에 맞춤 */
}

.main-content {
  position: relative;
  top: 9rem;
  margin-left: 42rem; /* 사이드바 너비만큼 왼쪽에 여백을 줌 */
  padding: 0; /* 배너와 컨텐츠 사이에 여백 없음 */
  width: calc(100% - 42rem); /* 전체 너비에서 사이드바 너비를 제외 */
  background-color: #f8f9fa; /* 배경색 설정 */
  
  display: flex; /* 플렉스 컨테이너로 설정 */
  flex-direction: column; /* 세로로 쌓이도록 설정 */
  align-items: flex-start; /* 왼쪽 정렬 */
}

.content {
  padding: 2rem; /* 기본 컨텐츠 패딩 */
  width: calc(100% - 4rem); /* 좌우 여백을 뺀 너비 설정 */
  margin: 2rem; /* 배너와의 간격 설정 */
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  background-color: #ffffff; /* 배경색 설정 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 박스 그림자 */
  border-radius: 8px; /* 테두리 둥글게 */
  overflow-y: auto; /* 스크롤이 필요할 때를 대비하여 추가 */
}

/* 주간 인기 모집글 섹션 스타일 */
.recent-activities {
  width: 100%;
}

.recent-activities h1 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #333;
}

.recent-activities ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 각 활동 항목 스타일 */
.activity-card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.activity-card:hover {
  background-color: #f0f0f0;
}

.activity-card h3 {
  margin: 0;
  font-size: 1.6rem;
  color: #555;
}

.activity-card p {
  margin: 0.5rem 0;
  color: #777;
}

.activity-card .date {
  align-self: flex-end;
  font-size: 0.8rem;
  color: #999;
}
</style>
