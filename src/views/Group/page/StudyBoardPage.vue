<template>
    <div class="study-board-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <Title>스터디 자유게시판</Title>
                <SearchBar path="/study-groups/1/boards" postType="board"></SearchBar>
                <div class="board-info">
                    <div class="board-no">번호</div>
                    <div class="board-title">제목</div>
                    <div class="board-writer">작성자</div>
                    <div class="board-created-at">등록일</div>
                </div>
                <div class="board-list loading" v-if="loading">작성된 게시글이 없습니다.</div>
                <div class="board-list" v-else>
                    <div v-for="(board, boardIndex) in boardList" :key="boardIndex">
                        <Board :data="board" @detail="goDetail(board.board_id)"></Board>
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
    import { ref, reactive, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const boardList = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const route = useRoute();
    const router = useRouter();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const pageInfo = ref({});

    const fetchBoardData = async () => {
        try {
            let response;

            if (typeof route.query.title === 'undefined') {
                response = (await axios.get(`/study-group-service/api/study-group/boards/group-id/${route.params.groupId}?page=${currentPage.value}`, 
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            } else {
                response = (await axios.get(`/study-group-service/api/study-group/boards/group-id/${route.params.groupId}/title/${route.query.title}?page=${currentPage.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            }
            if(response.success) {
                boardList.value = response.data.elements;
                pageInfo.value = response.data;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 쿼리 매개변수 변경 감지 및 데이터 가져오기
    watch(() => route.query.title, () => {
        currentPage.value = 1; // 검색 시 첫 페이지로 리셋
        fetchData();
    });

    const handlePageChange = (newPage) => {
        currentPage.value = newPage;
        fetchData();
        window.scrollTo({ top: 0 });
    }

    const goDetail = (boardId) => { 
        router.push(`/study-groups/${route.params.groupId}/boards/${boardId}`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchBoardData();
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

    .loading {
        align-items: center;
        font-size: 2rem;
    }
</style>