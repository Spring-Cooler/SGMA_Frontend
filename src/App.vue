<template class="root-container">
  <Navigation />
  <SideBar />
  <SingleBoard /> 
  <!-- <List /> -->
  <!-- <main class="main">
    router view들어갈 자리(class="main-content") 
    <div class="main-content">
      <SchedulePage />
    </div>
  </main> -->
  <!-- <router-view /> 여기에 라우터가 활성화된 컴포넌트를 렌더링 -->

</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';

import SingleBoard from './views/Recruitment/SingleBoard.vue';
// import List from './components/layouts/List.vue';
// import Navigation from './components/layouts/Navigation.vue';
// import SideBar from './components/layouts/SideBar.vue';
// import SchedulePage from './views/Schedule/SchedulePage.vue';


// import Home from './views/user/page/Home.vue';
</script>

<style scoped></style>