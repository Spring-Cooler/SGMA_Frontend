<template>
  <Navigation />
  <SideBar />
    <div class="list">
        <div class="header-container">
        <ListHeader />
        <CancelButton />
        </div>
    </div>
</template>

<script setup>
  import ListHeader from '@/views/Recruitment/ListHeader.vue'; // ListHeader 컴포넌트 임포트
  import CancelButton from '@/views/Recruitment/CancelButton.vue'; // CancelButton 컴포넌트 임포트
  import Navigation from '@/components/layouts/Navigation.vue';
  import SideBar from '@/components/layouts/SideBar.vue';
</script>

<style scoped>
.list {
    position: absolute;
    top: 184px; 
    left: 620px; 
    right: 200px; 
}
.header-container {
  display: flex; /* 플렉스 박스를 사용해 가로 배치 */
  justify-content: space-between; /* 양 끝에 배치 */
  align-items: center; /* 세로 중앙 정렬 */
}
.list-header{
  white-space: nowrap;
}

</style>