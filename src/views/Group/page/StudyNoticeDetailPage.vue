<template>
    <div class="study-notice-detail-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>{{title}}</Title>
                    <PostHeader :data="headerData" :isNotice="true" @modifyPost="goModifyPost" @deletePost="deletePost"></PostHeader>
                    <PostBody :data="bodyData" :isPerm="true"></PostBody>
                    <DeleteModal :isVisible="modalVisibility" @confirm="confirm" @cancel="cancel">해당 게시글을 삭제하시겠습니까?</DeleteModal>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
    import Title from '@/components/common/Title.vue';
    import PostHeader from '@/components/layouts/PostHeader.vue';
    import PostBody from '@/components/layouts/PostBody.vue';
    import DeleteModal from '@/components/common/DeleteModal.vue';
    import { ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const props = defineProps({
        noticeId: {
            type: String,
            required: true
        }
    })
    const router = useRouter();
    const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
    const store = useStore();

    const item = ref({});
    const loading = ref(true);
    const modalVisibility = ref(false);

    const title = ref(null);
    const nickname = ref(null);
    const likes = ref(0);

    const startDate = ref(null);
    const endDate = ref(null);
    const content = ref(null);

    const headerData = {
        nickname: nickname,
        likes: likes,
    }

    const bodyData = {
        startDate: null,
        endDate: null,
        content: content,
    }

    const fetchData = async () => {
      try {
        let response = (await axios.get(`/study-group-service/api/study-group/notices/${props.noticeId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;

        if (!response.success) {
            return;
        }
        loading.value = false;
        item.value = response.data;

        title.value = item.value.title;
        nickname.value = item.value.nickname;
        likes.value = item.value.likes;

        if (typeof item.value.schedule_start_time !== 'undefined') {
            startDate.value = item.value.schedule_start_time;
            endDate.value = item.value.schedule_end_time;
        } else if (typeof item.value.recruitment_start_time !== 'undefined') {
            startDate.value = item.value.recruitment_start_time;
            endDate.value = item.value.recruitment_end_time;
        }
        content.value = item.value.content;
      } catch (error) {
        console.error(error);
      }
    }

    const deletePost = () => {
        modalVisibility.value = true;
    };

    const confirm = async () => {
        let response = (await axios.delete(`/study-group-service/api/study-group/notices/${props.noticeId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;
        if(response.success) {
            modalVisibility.value = false;
            router.push(`/study-groups/1/notices`);
        }
    }

    const cancel = () => {
        modalVisibility.value = false;
    }

    const goModifyPost = () => {
        store.commit('setPostData', {
            id: props.noticeId,
            title: title.value,
            content: content.value,
            post_type: 'notice'
        });
        router.push(`/study-groups/1/notices/${props.noticeId}/modify`);
    }

    onMounted(() => {
        fetchData();
    })
</script>

<style scoped>
    .post-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 4rem;
    }
</style>