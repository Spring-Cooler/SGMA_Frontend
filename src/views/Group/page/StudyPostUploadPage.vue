<template>
    <div class="study-post-upload-page">
        <Navigation></Navigation>
        <GroupSideBar></GroupSideBar>
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>스터디 게시글 작성</Title>
                    <form @submit.prevent="uploadPost">
                        <div class="upload-title">
                            <span>제목</span>
                            <input type="text" v-model="postData.title" placeholder="제목을 입력해주세요." required/>
                        </div>
                        <div class="upload-content">
                            <span>내용</span>
                            <textarea v-model="postData.content" placeholder="내용을 입력해주세요." required></textarea>
                        </div>
                        <div class="upload-date-container" v-if="postData.post_type === 'schedule'">
                            <div class="date-input">
                                <span>시작 시간</span>
                                <input type="datetime-local" v-model="postData.start_time" />
                            </div>
                            <div class="date-input">
                                <span>종료 시간</span>
                                <input type="datetime-local" v-model="postData.end_time" />
                            </div>
                        </div>
                        <div class="btn-container">
                            <MediumButton label="작성하기" type="submit"></MediumButton>
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import MediumButton from '@/components/common/MediumButton.vue';
import axios from 'axios';

const store = useStore();

const route = useRoute();

const router = useRouter();

const loading = ref(false);

const postData = computed(() => store.getters.getPostData);

const boardData = ref({
    title: postData.value.title,
    content: postData.value.content,
    group_id: route.params.groupId,
    member_id: 1,
})

const noticeData = ref({
    title: postData.value.title,
    content: postData.value.content,
    group_id: route.params.groupId,
})

const uploadPost = async () => {
    let response;
    switch (postData.value.post_type) {
        case 'board': 
            boardData.value.title = postData.value.title;
            boardData.value.content = postData.value.content;
            response = (await axios.post(`/api/study-group/boards`, boardData.value)).data; 
            break;
        case 'notice': 
            noticeData.value.title = postData.value.title;
            noticeData.value.content = postData.value.content;
            response = (await axios.post(`/api/study-group/notices`, noticeData.value)).data; 
            break;
        case 'schedule': 
            response = await axios.post(`/api/study-group/schedules/`); 
            break;
        default: console.error("게시글 타입 에러");
    }
    if(response.success) {
        switch (postData.value.post_type) {
            case 'board':
                router.push(`/study-groups/${route.params.groupId}/boards/${response.data.board_id}`); 
                break;
            case 'notice': 
                router.push(`/study-groups/${route.params.groupId}/notices/${response.data.notice_id}`); 
                break;
            case 'schedule': 
                break;
            default: console.error("게시글 타입 에러");
        }
    }
}

onMounted(() => {
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

.upload-title {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}

.upload-title input {
    font-size: 2rem;
    padding: 1rem;
    height: 5rem;
    border: 1px solid #8c8c8c;
    border-radius: 1rem;
}

.upload-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
}

.upload-content textarea {
    font-family: 'Noto Sans';
    font-size: 2rem;
    padding: 1rem;
    height: 44rem;
    border: 1px solid #8c8c8c;
    border-radius: 1rem;
}

.upload-date-container {
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