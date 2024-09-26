<template>
    <button
      :class="buttonClass"
      @click="onClick"
    >
      {{ label }}
    </button>
  </template>
  
  <script>
  export default {
    name: "YesNoButton",
    props: {
      type: {
        type: String,
        default: "next", // next 또는 cancel 값을 가질 수 있음
      },
      label: {
        type: String,
        required: true,
      },
    },
    computed: {
      buttonClass() {
        return this.type === "cancel" ? "cancel-btn" : "next-btn";
      },
    },
    methods: {
      onClick() {
        this.$emit("click");
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    width: 360px;
    height: 5rem;
    margin: 1rem;
    border: none;
    border-radius: 10px; /* 둥근 모서리 적용 */
    font-size: 2rem; /* 글자 크기 */
    cursor: pointer;
    font-weight: bold; /* 글자 두께 */
  }
  
  .cancel-btn {
    background-color: #A6A6A6; /* 회색 */
    color: #fff;
  }
  
  .next-btn {
    background-color: #a1b872; /* 녹색 */
    color: #fff;
  }
  </style>
  