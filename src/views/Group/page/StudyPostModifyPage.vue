<template>
    <div class="study-post-modify-page">
        <Navigation></Navigation>
        <GroupSideBar></GroupSideBar>
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>스터디 게시글 수정</Title>
                    <form @submit.prevent="modifyPost">
                        <div class="modify-title">
                            <span>제목</span>
                            <input type="text" v-model="postData.title" placeholder="제목을 입력해주세요." required/>
                        </div>
                        <div class="modify-content">
                            <span>내용</span>
                            <textarea v-model="postData.content" placeholder="내용을 입력해주세요." required></textarea>
                        </div>
                        <div class="modify-date-container" v-if="postData.post_type === 'schedule'">
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import MediumButton from '@/components/common/MediumButton.vue';
import axios from 'axios';

const store = useStore();

const router = useRouter();

const accessToken = 
    localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

const loading = ref(false);

const postData = computed(() => store.getters.getPostData);

const boardData = ref({
    board_id: postData.value.id,
    title: postData.value.title,
    content: postData.value.content,
})

const noticeData = ref({
    notice_id: postData.value.id,
    title: postData.value.title,
    content: postData.value.content,
})

const modifyPost = async () => {
    let response;
    switch (postData.value.post_type) {
        case 'board': 
            boardData.value.title = postData.value.title;
            boardData.value.content = postData.value.content;
            response = (await axios.put(`/study-group-service/api/study-group/boards`, boardData.value,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data; 
            break;
        case 'notice': 
            noticeData.value.title = postData.value.title;
            noticeData.value.content = postData.value.content;
            response = (await axios.put(`/study-group-service/api/study-group/notices`, noticeData.value,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data; 
            break;
        case 'schedule': 
            response = await axios.put(`/study-group-service/api/study-group/schedules/`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }); 
            break;
        default: console.error("게시글 타입 에러");
    }
    if(response.success) {
        router.go(-1);
    }
}

onMounted(() => {
    if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
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