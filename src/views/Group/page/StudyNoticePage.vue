<template>
  <div class="study-notice-page">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <GroupSideBar />

    <!-- 메인 컨텐츠 -->
    <main class="main">
      <div class="main-content">
        <Title>스터디 공지사항</Title>
        <SearchBar></SearchBar>
        <div class="notice-info">
          <div class="notice-no">번호</div>
          <div class="notice-title">제목</div>
          <div class="notice-created-at">등록일</div>
        </div>
        <Notice></Notice>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import SearchBar from '../components/SearchBar.vue';
import Title from '@/components/common/Title.vue';
import Notice from '../components/Notice.vue';
</script>

<style>
  .notice-info {
    display: flex;
    height: 9.2rem;
    width: 100%;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
  }

  .notice-no {
    display: flex;
    width: 10%;
    justify-content: center;
    align-items: center;
  }

  .notice-title {
    display: flex;
    width: 75%;
    justify-content: center;
    align-items: center;
  }

  .notice-created-at {
    display: flex;
    width: 15%;
    justify-content: center;
    align-items: center;
  }
</style>