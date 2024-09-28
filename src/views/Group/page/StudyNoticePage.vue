<template>
  <div class="study-notice-page">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <GroupSideBar />

    <!-- 메인 컨텐츠 -->
    <main class="main">
      <div class="main-content">
        <Title>스터디 공지사항</Title>
        <SearchBar path="/study-groups/1/notices" postType="notice"></SearchBar>
        <div class="notice-info">
          <div class="notice-no">번호</div>
          <div class="notice-title">제목</div>
          <div class="notice-created-at">등록일</div>
        </div>
        <div class="notice-list" v-if="loading">Loading...</div>
        <div class="notice-list" v-else>
          <div v-for="(item, index) in items" :key="index">
            <!-- 데이터를 바탕으로 표시할 컴포넌트 -->
            <Notice :data="item" @detail="detail(item.notice_id)"></Notice>
          </div>
        </div>
        <Pagination :data="pageInfo" @changePage="handlePageChange"></Pagination>   
      </div>
    </main>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import SearchBar from '../components/SearchBar.vue';
import Title from '@/components/common/Title.vue';
import Notice from '../components/Notice.vue';
import Pagination from '@/components/common/Pagination.vue';
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const items = ref([]);
const loading = ref(true);
const groupId = ref(1);
const currentPage = ref(1);
const route = useRoute();
const router = useRouter();
const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
let pageInfo = reactive({});

const fetchData = async () => {
  try {
    let response; // response 변수를 미리 선언
    // route.query.title이 undefined인지 확인
    if (typeof route.query.title === 'undefined') {
      response = await axios.get(`/study-group-service/api/study-group/notices/group-id/${groupId.value}?page=${currentPage.value}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } else {
      response = await axios.get(`/study-group-service/api/study-group/notices/group-id/${groupId.value}/title/${route.query.title}?page=${currentPage.value}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    if(response.data.data !== null) {
      items.value = response.data.data.elements;
      pageInfo = response.data.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// 쿼리 매개변수 변경 감지 및 데이터 가져오기
watch(() => route.query.title, () => {
    currentPage.value = 1; // 검색 시 첫 페이지로 리셋
    fetchData();
})

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    fetchData();
    window.scrollTo({ top: 0 });
}

const detail = (id) => { 
    router.push(`/study-groups/1/notices/${id}`);
}

onMounted(() => {
  fetchData();
});
</script>

<style>
  .notice-info {
    display: flex;
    height: 9.2rem;
    width: 100%;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
  }

  .notice-no {
    display: flex;
    width: 10%;
    justify-content: center;
    align-items: center;
  }

  .notice-title {
    display: flex;
    width: 75%;
    justify-content: center;
    align-items: center;
  }

  .notice-created-at {
    display: flex;
    width: 15%;
    justify-content: center;
    align-items: center;
  }

  .notice-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>