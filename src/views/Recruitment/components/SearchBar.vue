<template>
    <div class="search-container">
      <div class="search-bar-wrapper">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" 
        class="search-bar" 
        placeholder="관심 스터디를 검색해보세요" 
        v-model="searchQuery">
      </div>
      <SmallButton class="olive h-9" label="검색" @click="goSearch"></SmallButton>
    </div>
</template>

<script setup>
  import SmallButton from '@/components/common/SmallButton.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    path: {
        type: String,
        required: true
    }
  });
  
  const router = useRouter();

  const searchQuery = ref('');

  const goSearch = () => {
    if(!searchQuery.value) {
      router.push({path: props.path});
      return;
    }
	  router.push({path: props.path, query: {title: searchQuery.value}});
  }
</script>

<style scoped>
    .search-container {
      display: flex;
      height: 14rem;
      width: 80%;
      justify-content: center;
      align-items: center;
      margin-top: 5.3rem;
      gap: 2rem;
    }

    .search-bar-wrapper {
      display: flex;
      border: none;
      background-color: #ffffff;
      width: 70rem;
      height: 9rem;
      align-items: center;
      border-radius: 1rem;
      border: 1px solid #a6a6a6;
    }

    .search-bar-wrapper i {
      font-size: 3.6rem;
      margin-left: 2rem;
    }

    .search-bar-wrapper input {
      height: 100%;
      width: 52rem;
      border: none;
      font-size: 2.4rem;
      font-weight: 700;
      margin-left: 2rem;
    }

    .search-bar-wrapper input:focus {
      outline: none;
    }

    .search-bar-wrapper input::placeholder {
      color: #a6a6a6;
    }

    .h-9 {
        height: 9rem;
    }
</style>