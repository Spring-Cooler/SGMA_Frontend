<template>
    <div class="study-member-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
  
        <!-- 메인 컨텐츠 -->
        <main class="main">
            <div class="main-content">
                <Title>스터디 그룹원</Title>
                <div class="button-container">
                    <MediumButton label="신청자 관리"></MediumButton>
                    <MediumButton label="그룹원 관리"></MediumButton>
                </div>
                <div class="member-container">
                    <Member>sangmin99</Member>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
    import Title from '@/components/common/Title.vue';
    import MediumButton from '@/components/common/MediumButton.vue';
    import Member from '../components/Member.vue';
</script>

<style>
    .button-container {
        display: flex;
        width: 100%;
        justify-content: right;
        height: 4.8rem;
        gap: 2rem;
    }

    .member-container {
        display: flex;
        width: 100%;
        flex-direction: column;
    }
</style>

