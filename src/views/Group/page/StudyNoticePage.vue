<template>
    <div class="study-notice-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <Title>스터디 공지사항</Title>
                <SearchBar :path="`/study-groups/${route.params.groupId}/notices`" postType="notice"></SearchBar>
                <div class="notice-info">
                    <div class="notice-no">번호</div>
                    <div class="notice-title">제목</div>
                    <div class="notice-created-at">등록일</div>
                </div>
                <div class="notice-list loading" v-if="loading">작성된 공지사항이 없습니다.</div>
                <div class="notice-list" v-else>
                    <div v-for="(notice, noticeIndex) in noticeList" :key="noticeIndex">
                        <Notice :data="notice" @detail="goDetail(notice.notice_id)"></Notice>
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
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const pageInfo = ref({});

    const noticeList = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);

    const fetchNoticeData = async () => {
        try {
            let response; 
        
            if (typeof route.query.title === 'undefined') {
                response = (await axios.get(`/study-group-service/api/study-group/notices/group-id/${route.params.groupId}?page=${currentPage.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            } else {
                response = (await axios.get(`/study-group-service/api/study-group/notices/group-id/${route.params.groupId}/title/${route.query.title}?page=${currentPage.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            }
            if(response.success) {
                noticeList.value = response.data.elements;
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
        fetchNoticeData();
    })

    const handlePageChange = (newPage) => {
        currentPage.value = newPage;
        fetchNoticeData();
        window.scrollTo({ top: 0 });
    }

    const goDetail = (noticeId) => { 
        router.push(`/study-groups/${route.params.groupId}/notices/${noticeId}`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchNoticeData();
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

    .notice-list{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .loading {
        align-items: center;
        font-size: 2rem;
    }
</style>