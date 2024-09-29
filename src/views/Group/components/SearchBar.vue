<template>
    <div class="search-container">
      <div class="search-bar-wrapper">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" 
        class="search-bar" 
        placeholder="검색어를 입력해주세요" 
        v-model="searchQuery">
      </div>
      <SmallButton class="popsicle" label="검색" @click="goSearch"></SmallButton>
      <SmallButton class="popsicle" label="글쓰기" @click="goUploadPost"></SmallButton>
    </div>
</template>

<script setup>
  import SmallButton from '@/components/common/SmallButton.vue';
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';

  const props = defineProps({
    postType: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
  });
  
  const route = useRoute();
  const router = useRouter();
  const store = useStore();

  const searchQuery = ref('');

  const goSearch = () => {
    if(!searchQuery.value) {
      router.push({path: props.path});
      return;
    }
	  router.push({path: props.path, query: {title: searchQuery.value}});
  }

  const goUploadPost = () => {
    store.commit('setPostData', {
            post_type: props.postType,
        });
    if(props.postType === 'board')
      router.push(`/study-groups/${route.params.groupId}/boards/upload`);
    else if(props.postType === 'notice')
      router.push(`/study-groups/${route.params.groupId}/notices/upload`); 
  }
</script>

<style scoped>
.search-container {
  display: flex;
  height: 14rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 5.3rem;
  background-color: #FFE083;
  gap: 2rem;
}

.search-bar-wrapper {
  display: flex;
  border: none;
  background-color: #ffffff;
  width: 60rem;
  height: 4.8rem;
  align-items: center;
  border-radius: 1rem;
}

.search-bar-wrapper i {
  font-size: 2.4rem;
  margin-left: 2rem;
}

.search-bar-wrapper input {
  height: 100%;
  width: 52rem;
  border: none;
  font-size: 2.4rem;
  margin-left: 1rem;

}

.search-bar-wrapper input:focus {
  outline: none;
}

.search-bar-wrapper input::placeholder {
  color: #8c8c8c;
}
</style>