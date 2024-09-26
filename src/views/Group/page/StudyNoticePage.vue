<template>
  <div class="study-notice-page">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <GroupSideBar />

    <!-- 메인 컨텐츠 -->
    <main class="main">
      <div class="main-content">
        <div class="notice-header">
				  <span>스터디 공지사항</span>
			  </div>
        <div class="search-container">
          <div class="search-bar-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search-bar" placeholder="검색어를 입력해주세요">
          </div>
          <div class="button-container">
            <SmallButton label="검색"></SmallButton>
            <SmallButton label="글쓰기"></SmallButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import SmallButton from '@/components/common/SmallButton.vue';
</script>

<style scoped>
.notice-header {
	width: 100%;
	display: flex;
	justify-content: left;
	align-items: center;
	margin-top: 9.4rem;
  font-size: 4rem;
  font-weight: 900;
}

.search-container {
  display: flex;
  height: 14rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 5.3rem;
  background-color: #FFE083;
}

.search-bar-wrapper {
  display: flex;
  border: none;
  background-color: #ffffff;
  width: 60rem;
  height: 4.8rem;
  align-items: center;
  border-radius: 1rem;
}

.search-bar-wrapper i {
  font-size: 2.4rem;
  margin-left: 2rem;
}

.search-bar-wrapper input {
  height: 100%;
  width: 55.6rem;
  border: none;
}

.button-container {
  display: flex;
  justify-self: right;
  gap: 2rem;
}
</style>