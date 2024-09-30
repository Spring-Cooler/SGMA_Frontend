<template>
    <button class="btn large-btn">
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
    .large-btn {
      height: 4.8rem;
      width: 18rem;
    }
  </style>
  