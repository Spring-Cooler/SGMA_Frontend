<template>
    <div class="study-board-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
        
        <!-- 메인 컨텐츠 -->
        <main class="main">
            <div class="main-content">
                <Title>스터디 자유게시판</Title>
                <SearchBar></SearchBar>
                <div class="board-info">
                  <div class="board-no">번호</div>
                  <div class="board-title">제목</div>
                  <div class="board-writer">작성자</div>
                  <div class="board-created-at">등록일</div>
                </div>
                <div class="board-list" v-if="loading">Loading...</div>
                <div class="board-list" v-else>
                  <div v-for="(item, index) in items" :key="index">
                    <!-- 데이터를 바탕으로 표시할 컴포넌트 -->
                    <Board :data="item"></Board>
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
    import Board from '../components/Board.vue';
    import Pagination from '@/components/common/Pagination.vue';
    import axios from 'axios';
    import { ref, reactive, onMounted } from 'vue';

    const items = ref([]);
    const loading = ref(true);
    const groupId = ref(1);
    const currentPage = ref(1);
    let pageInfo = reactive({});

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/study-group/boards/group-id/${groupId.value}?page=${currentPage.value}`);
        items.value = response.data.data.elements;
        pageInfo = response.data.data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }

    const handlePageChange = (newPage) => {
        currentPage.value = newPage;
        fetchData();
        window.scrollTo({ top: 0 });
    }

    onMounted(() => {
      fetchData();
    });
</script>

<style>
  .board-info {
    display: flex;
    height: 9.2rem;
    width: 100%;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
  }

  .board-no {
    display: flex;
    height: 100%;
    width: 10%;
    justify-content: center;
    align-items: center;
  }

  .board-title {
    display: flex;
    height: 100%;
    width: 60%;
    justify-content: center;
    align-items: center;
  }

  .board-writer {
    display: flex;
    height: 100%;
    width: 15%;
    justify-content: center;
    align-items: center;
  }

  .board-created-at {
    display: flex;
    height: 100%;
    width: 15%;
    justify-content: center;
    align-items: center;
  }

  .board-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>