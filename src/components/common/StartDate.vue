<template>
    <div class="start-date">
        <i class="fa-regular fa-calendar-check"></i>
        <span><slot></slot></span>
    </div>
</template>

<style scoped>
    .start-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
</style>