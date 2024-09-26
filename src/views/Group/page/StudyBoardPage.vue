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