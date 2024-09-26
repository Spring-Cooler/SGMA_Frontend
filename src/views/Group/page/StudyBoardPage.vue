<template>
    <div class="study-board-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
        
        <!-- 메인 컨텐츠 -->
        <main class="main">
            <div class="main-content">
                <Title>스터디 자유게시판</Title>
                <SearchBar></SearchBar>
                <div class="notice-info">
                  <span>번호</span>
                  <span>제목</span>
                  <div class="sub-container">
                    <span>작성자</span>
                    <span>등록일</span>
                  </div>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
    import SearchBar from '../components/SearchBar.vue';
    import Title from '@/components/common/Title.vue';
</script>

<style>
  .notice-info {
    display: flex;
    height: 9.2rem;
    width: 96.8rem;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
  }

  .sub-container {
    display: flex;
    gap: 8.5rem;
  }
</style>