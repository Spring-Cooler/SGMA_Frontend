<template>
    <div class="study-notice-detail-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>{{noticeDetail.title}}</Title>
                    <PostHeader 
                        :data="headerData" 
                        :isNotice="true"
                        :isRecruitment="false"
                        :userId="userId"
                        @modifyPost="goModifyPost" 
                        @deletePost="handleDeletePost"
                    >
                    </PostHeader>
                    <PostBody :data="bodyData" :isPerm="true"></PostBody>
                    <DeleteModal 
                        :isVisible="modalVisibility" 
                        @confirm="handleConfirm" 
                        @cancel="handleCancel"
                    >
                        해당 게시글을 삭제하시겠습니까?
                    </DeleteModal>
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
    import { ref, reactive, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';

    const router = useRouter();
    const route = useRoute();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;    
    const store = useStore();

    const noticeDetail = ref({});
    const loading = ref(true);
    const modalVisibility = ref(false);

    const headerData = reactive({
        user_id: null,
    })

    const bodyData = reactive({
        content: '',
    })

    const fetchNoticeData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/notices/${route.params.noticeId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if (response.success) {
                noticeDetail.value = response.data;
                console.log(noticeDetail.value);
                headerData.user_id = noticeDetail.value.user_id;
                bodyData.content = noticeDetail.value.content;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeletePost = () => {
        modalVisibility.value = true;
    };

    const handleConfirm = async () => {
        try {
            const response = (await axios.delete(`/study-group-service/api/study-group/notices/${route.params.noticeId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                modalVisibility.value = false;
                router.push(`/study-groups/${route.params.groupId}/notices`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = () => {
        modalVisibility.value = false;
    }

    const goModifyPost = () => {
        store.commit('setPostData', {
            id: route.params.noticeId,
            title: noticeDetail.value.title,
            content: noticeDetail.value.content,
            post_type: 'notice'
        });
        router.push(`/study-groups/${route.params.groupId}/notices/${route.params.noticeId}/modify`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
            return;
        }
        fetchNoticeData();
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