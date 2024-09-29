<template>
    <button class="btn small-btn">
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
    .small-btn {
      height: 4.8rem;
      width: 12rem;
    }
  </style>
  