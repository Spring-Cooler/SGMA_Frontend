<template>
    <button class="btn medium-btn">
      {{ label }}
    </button>
  </template>
  
  <script setup>
    const props = defineProps({
      label: {
        type: String,
        required: true,
      }
    })
  </script>
  
  <style scoped>
    .medium-btn {
      height: 4.8rem;
      width: 16rem;
    }
  </style>
  