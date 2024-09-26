<template class="root-container">
  <Navigation />
  <SideBar />
  <EveryBoard /> 
  <!-- <List /> -->
  <!-- <main class="main">
    router view들어갈 자리(class="main-content") 
    <div class="main-content">
      <SchedulePage />
    </div>
  </main> -->

</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import EveryBoard from '@/views/Recruitment/EveryBoard.vue';
// import List from './components/layouts/List.vue';
// import Navigation from './components/layouts/Navigation.vue';
// import SideBar from './components/layouts/SideBar.vue';
// import SchedulePage from './views/Schedule/SchedulePage.vue';


</script>

<style scoped></style>