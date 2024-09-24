<template class="root-container">
  <Header></Header>
  <SideBar></SideBar>
  <!-- main, router-view 들어갈 자리 -->
  <main class="main">
    <section class="main-content">
      <Schedule />
    </section>
  </main>

</template>

<script setup>
import Header from './components/common/Header.vue';
import SideBar from './components/common/SideBar.vue';
import Schedule from './components/schedule/Schedule.vue';
</script>

<style scoped></style>