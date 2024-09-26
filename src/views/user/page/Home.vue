<template>
  <div class="home-page">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <SideBar />

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <NoticeBanner /> <!-- 배너를 메인 컨텐츠 안에 포함시킴 -->

      <div class="content">
        <h1>홈 화면에 오신 것을 환영합니다!</h1>
        <p>여기서 SGMA의 다양한 기능들을 탐색하고,<br/> 스터디 그룹을 찾아보세요.</p>
        
        <!-- 예시로 최근 활동 내역을 추가 -->
        <section class="recent-activities">
          <h2>최근 활동 내역</h2>
          <ul>
            <li>스터디 그룹 "Java 스터디"에 새로운 멤버가 가입했습니다.</li>
            <li>스터디 그룹 "Python 스터디"의 새로운 공지가 등록되었습니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
            <li>당신이 참여하고 있는 "Frontend 스터디" 모임이 곧 시작됩니다.</li>
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
</script>

<style scoped>
.home-page {
  display: flex;
}

.main-content {
  margin-left: 42rem; /* 사이드바 너비만큼 왼쪽에 여백을 줌 */
  padding: 0; /* 배너와 컨텐츠 사이에 여백 없음 */
  width: calc(100% - 42rem); /* 전체 너비에서 사이드바 너비를 제외 */
  background-color: #f8f9fa; /* 배경색 설정 */
}

.content {
  padding: 2rem; /* 기본 컨텐츠 패딩 */
}
</style>
