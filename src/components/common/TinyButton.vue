<template>
    <button class="btn tiny-btn">
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
    .tiny-btn {
      height: 4.8rem;
      width: 8rem;
    }
  </style>
  