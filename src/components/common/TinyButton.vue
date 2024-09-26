<template>
    <button class="btn small-btn">
      {{ label }}
    </button>
  </template>
  
  <script>
  export default {
    name: "SmallButton",
    props: {
      label: {
        type: String,
        required: true,
      },
    }
  };
  </script>
  
  <style scoped>
    .small-btn {
      height: 4.8rem;
      width: 8rem;
    }
  </style>
  