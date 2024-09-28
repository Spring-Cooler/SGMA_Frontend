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
  import CancelButton from '@/views/Recruitment/components/CancelButton.vue'; // CancelButton 컴포넌트 임포트
  import Navigation from '@/components/layouts/Navigation.vue';
  import SideBar from '@/components/layouts/SideBar.vue';
</script>

<style scoped>
.list {
    position: absolute;
    top: 18.4rem; 
    left: 62rem; 
    right: 20rem; 
}
.header-container {
  z-index: -9999;
  position: absolute;
  display: flex; /* 플렉스 박스를 사용해 가로 배치 */
  justify-content: space-between; /* 양 끝에 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  color: #202020;
  font-size: 40px;
  font-family: Noto Sans;
  font-weight: 600;
  line-height: 60px;
  word-wrap: break-word
}
.list-header{
  white-space: nowrap;
}

</style>