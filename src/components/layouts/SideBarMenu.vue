<template>
	<div class="menu" :class="{ cur: isActive }" @click="navigate">
	  <!-- slot을 span으로 감쌈 -->
	  <span class="menu-text">
		<slot></slot>
	  </span>
	</div>
  </template>
	
  <script setup>
  import { useRouter, useRoute } from 'vue-router';
  import { computed } from 'vue';
  
  const props = defineProps({
	to: {
	  type: String,
	  required: true,
	},
  });	
  
  const router = useRouter();
  const route = useRoute();
  
  const isActive = computed(() => route.path === props.to);
  
  function navigate() {
	if (!props.to) {
	  console.warn('Invalid route location');
	  return;
	}
	router.push(props.to); // 지정된 경로로 이동 
  }
  </script>
	
  <style scoped>
  .menu {
	display: flex;
	height: 7.6rem;
	width: 38rem;
	align-items: center;
	font-size: 2.8rem;
	font-weight: 700;
	color: #a6a6a6;
	border-radius: 0 1.5rem 1.5rem 0;
	cursor: pointer;
  }
  
  .menu-text {
	padding-left: 3rem; /* 왼쪽 패딩 적용 */
  }
  
  .menu:hover:not(.now) {
	background-color: #f1f1f1;
  }
  
  .cur {
	background-color: #E0E9C8;
	color: #525150;
  }
  </style>
  