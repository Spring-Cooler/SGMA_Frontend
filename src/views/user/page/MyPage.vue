<template>
  <div class="mypage">
    <Navigation />
    <SideBar />
    <div class="content">
      <!-- 내 프로필 컴포넌트 -->
      <UserProfile />
      <!-- 내가 쓴 댓글 목록 컴포넌트 -->
      <UserComments />
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import UserProfile from '@/views/user/components/UserProfile.vue';
import UserComments from '@/views/user/components/UserComments.vue';
</script>

<style scoped>
/* 전체 페이지 레이아웃 설정 */
.mypage {
  display: flex;
  height: 100vh; /* 전체 높이를 차지 */
}

/* 메인 컨텐츠 영역 */
.content {
  position: relative;
  top: 9rem;
  display: flex;
  flex-direction: row; /* 수직 배치 */
  padding: 2rem;
  width: calc(100% - 42rem); /* 사이드바를 제외한 너비 */
  margin-left: 42rem; /* 사이드바 너비 */
  background-color: #f8f9fa;
  gap: 2rem;
}
</style>
