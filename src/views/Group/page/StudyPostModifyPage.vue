<template>
    <div class="study-post-modify-page">
        <Navigation></Navigation>
        <GroupSideBar></GroupSideBar>
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>스터디 게시글 수정</Title>
                    <form @submit.prevent="submitModifyPost">
                        <div class="modify-title">
                            <span>제목</span>
                            <input type="text" v-model="postData.title" placeholder="제목을 입력해주세요." required/>
                        </div>
                        <div class="modify-content">
                            <span>내용</span>
                            <textarea v-model="postData.content" placeholder="내용을 입력해주세요." required></textarea>
                        </div>
                        <div class="modify-date-container" v-if="postData.post_type === 'schedule' || postData.post_type === 'recruitment'">
                            <div class="date-input">
                                <span>시작 시간</span>
                                <input type="datetime-local" v-model="postData.start_time" required />
                            </div>
                            <div class="date-input">
                                <span>종료 시간</span>
                                <input type="datetime-local" v-model="postData.end_time" required />
                            </div>
                        </div>
                        <div class="btn-container">
                            <MediumButton label="수정하기" type="submit"></MediumButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
    import Navigation from '@/components/layouts/Navigation.vue';
    import Title from '@/components/common/Title.vue';
    import MediumButton from '@/components/common/MediumButton.vue';
    import { computed, onMounted, ref, reactive } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';

    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

    const loading = ref(false);

    const postData = computed(() => store.getters.getPostData);

    const boardData = reactive({
        board_id: postData.value.id,
        title: postData.value.title,
        content: postData.value.content,
    })

    const noticeData = reactive({
        notice_id: postData.value.id,
        title: postData.value.title,
        content: postData.value.content,
    })

    const recruitmentData = reactive({
        recruitment_board_id: postData.value.id,
        title: postData.value.title,
        content: postData.value.content,
        recruitment_start_time: postData.value.start_time,
        recruitment_end_time: postData.value.end_time,
    })

    const categoryList = ref([]);

    const checkValidTime = () => {
        // 시간 유효성 검사
        if (postData.value.start_time && postData.value.end_time) {
            const startTime = new Date(postData.value.start_time);
            const endTime = new Date(postData.value.end_time);

            if (endTime <= startTime) {
                alert("종료 시간이 시작 시간과 같거나 이전일 수 없습니다.");
                return false;
            }
        }

        return true;
    }

    const fetchCategoryData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/categories`,
            {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })).data;
            if(response.success) {
                categoryList.value = response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const submitModifyPost = async () => {
        try {
            if(!checkValidTime()) return;
            let response;
            switch (postData.value.post_type) {
                case 'board': 
                    boardData.title = postData.value.title;
                    boardData.content = postData.value.content;
                    response = (await axios.put(`/study-group-service/api/study-group/boards`, boardData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })).data; 
                    break;
                case 'notice': 
                    noticeData.title = postData.value.title;
                    noticeData.content = postData.value.content;
                    response = (await axios.put(`/study-group-service/api/study-group/notices`, noticeData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })).data; 
                    break;
                case 'schedule': 
                    response = (await axios.put(`/study-group-service/api/study-group/schedules/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })).data; 
                    break;
                case 'recruitment': 
                    recruitmentData.title = postData.value.title;
                    recruitmentData.content = postData.value.content;
                    recruitmentData.recruitment_start_time = postData.value.start_time;
                    recruitmentData.recruitment_end_time = postData.value.end_time;
                    response = (await axios.put(`/recruitment-service/api/recruitment-board/${route.params.recruitmentId}`,recruitmentData,{
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })).data;
                    break;
                default: console.error("게시글 타입 에러");
            }
            if(response.success) {
                router.go(-1);
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        if(postData.value.post_type === 'recruitment') {
            fetchCategoryData();
        }
        loading.value = !(postData.value && postData.value.post_type); // 데이터가 없을 경우 로딩 유지
    });
</script>

<style scoped>
    .post-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        gap: 5.3rem;
        font-size: 2.4rem;
        font-weight: 700;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 4rem;
        font-weight: 500;
    }

    .post-container form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5.3rem;
    }

    .modify-title {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }

    .modify-title input {
        font-size: 2rem;
        padding: 1rem;
        height: 5rem;
        border: 1px solid #8c8c8c;
        border-radius: 1rem;
    }

    .modify-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }

    .modify-content textarea {
        font-family: 'Noto Sans';
        font-size: 2rem;
        padding: 1rem;
        height: 44rem;
        border: 1px solid #8c8c8c;
        border-radius: 1rem;
    }

    .modify-date-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 5.3rem;
    }

    .date-input {
        display: flex;
        flex-direction: column;
        width: 25rem;
        gap: 1rem;
        font-size: 2rem;
    }

    .date-input input {
        padding: 1rem;
        border: 1px solid #8c8c8c;
        border-radius: 1rem;
        height: 5rem;
    }

    .btn-container {
        display: flex;
        justify-content: right;
        width: 100%;
        margin-bottom: 4rem;
    }
</style>