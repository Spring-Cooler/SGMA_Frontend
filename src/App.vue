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

    <router-view /> <!-- 여기에 라우터가 활성화된 컴포넌트를 렌더링 -->
</template>

<script setup>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

body {
  font-family: 'Noto Sans', sans-serif;
}
</style>