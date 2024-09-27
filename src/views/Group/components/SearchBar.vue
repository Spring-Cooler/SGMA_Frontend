<template>
    <div class="search-container">
      <div class="search-bar-wrapper">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search-bar" placeholder="검색어를 입력해주세요">
      </div>
      <SmallButton class="popsicle" label="검색"></SmallButton>
      <SmallButton class="popsicle" label="글쓰기"></SmallButton>
    </div>
</template>

<script>
import SmallButton from '@/components/common/SmallButton.vue';

export default {
    components: {
        SmallButton,
    },
};
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