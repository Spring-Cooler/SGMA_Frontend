<template class="root-container">
  <Navigation />
  <SideBar />
  <main class="main">
    <!-- router view들어갈 자리(class="main-content") -->
    <div class="main-content">
      <!-- <SchedulePage /> -->
      <ModalPopup />
    </div>
  </main>
</template>

<script setup>
import Navigation from './components/layouts/Navigation.vue';
import SideBar from './components/layouts/SideBar.vue';
import SchedulePage from './views/Schedule/SchedulePage.vue';
import ModalPopup from './components/common/ModalPopup.vue';
</script>

<style scoped></style>