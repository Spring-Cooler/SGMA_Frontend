<template>
    <div class="end-date">
        <i class="fa-regular fa-calendar-xmark"></i>
        <span><slot></slot></span>
    </div>    
</template>

<style scoped>
    .end-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
</style>