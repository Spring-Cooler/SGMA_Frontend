<template>
    <div class="study-board-detail-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <SideBar />
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>{{boardDetail.title}}</Title>
                    <PostHeader 
                        :data="headerData" 
                        :isNotice="false" 
                        :isRecruitment="true"
                        :userId="userId"
                        @modifyPost="goModifyPost" 
                        @deletePost="toggleModal"
                        @like="handleLike"
                        @unlike="handleUnlike"
                    >
                    </PostHeader>
                    <PostBody :data="bodyData" :isPerm="false"></PostBody>
                    <PostFooter>
                        <div v-if="applyStatus==='n'">
                            <MediumButton label="지원하기" @click="handleApply"></MediumButton>
                        </div>
                        <div v-else-if="applyStatus==='y'">
                            <MediumButton class="light-gray" label="지원취소" @click="handleApply"></MediumButton>
                        </div>
                    </PostFooter>
                    <DeleteModal 
                        :isVisible="modalVisibility" 
                        @confirm="handleDeletePost" 
                        @cancel="toggleModal"
                    >
                        해당 게시글을 삭제하시겠습니까?
                    </DeleteModal>
                    <CommentHeader :data="headerData" @add="handleAddComment"></CommentHeader>
                    <CommentBody v-for="(commentDetail, commentIndex) in commentList" :key="commentIndex">
                        <Comment 
                            :data="commentDetail" 
                            @add="handleAddReply" 
                            @remove="handleDeleteComment(commentDetail.recruitment_board_comment_id)" 
                            :commentId="commentDetail.recruitment_board_comment_id"
                        >
                            <ReplyBody v-for="(replyDetail, replyIndex) in replyList[commentDetail.recruitment_board_comment_id]" :key="replyIndex">
                                <Reply 
                                    :data="replyDetail" 
                                    @remove="handleDeleteReply(replyDetail.recruitment_board_reply_id, commentDetail.recruitment_board_comment_id)" 
                                    :replyId="replyDetail.recruitment_board_reply_id"
                                >
                                </Reply>
                            </ReplyBody>
                        </Comment>
                    </CommentBody>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import SideBar from '@/components/layouts/SideBar.vue';
    import Title from '@/components/common/Title.vue';
    import PostHeader from '@/components/layouts/PostHeader.vue';
    import PostBody from '@/components/layouts/PostBody.vue';
    import PostFooter from '@/components/layouts/PostFooter.vue';
    import DeleteModal from '@/components/common/DeleteModal.vue';
    import CommentHeader from '@/components/layouts/CommentHeader.vue';
    import CommentBody from '@/components/layouts/CommentBody.vue';
    import Comment from '@/components/common/Comment.vue';
    import Reply from '@/components/common/Reply.vue';
    import { ref, onMounted, reactive } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';
    import ReplyBody from '@/components/layouts/ReplyBody.vue';
    import MediumButton from '@/components/common/MediumButton.vue';

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;

    const memberList = ref([]);
    const commentList = ref([]);
    const replyList = ref({});
    const boardDetail = ref({});

    const loading = ref(true);
    const modalVisibility = ref(false);
    const applyStatus = ref(null);

    const headerData = reactive({
        nickname: '',
        likes: 0,
        comments: 0,
        user_id: null,
    })

    const bodyData = reactive({
        content: '',
        start_date: null,
        end_date: null,
    })

    const commentData = reactive({
        content: '',
        user_id: userId,
        recruitment_board_id: route.params.recruitmentId,
        anonymous_status: 'N',
    });

    const replyData = reactive({
        content: '',
        user_id: userId,
        recruitment_board_comment_id: null,
        anonymous_status: 'N',
    });

    const likeData = reactive({
        recruitment_board_id: route.params.recruitmentId,
        user_id: userId,
    })

    const applicantData = reactive({
        recruitment_board_id: route.params.recruitmentId,
        user_id: userId,
        group_id: null,
    })

    const toggleModal = () => {
        modalVisibility.value = !modalVisibility.value;
    };

    const fetchBoardData = async () => {
        try {
            const response = (await axios.get(`/recruitment-service/api/recruitment-board/board/${route.params.recruitmentId}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                boardDetail.value = response.data;
                headerData.user_id = boardDetail.value.user_id;
                headerData.nickname = boardDetail.value.user_nickname;
                headerData.likes = boardDetail.value.likes;
                bodyData.content = boardDetail.value.content;
                bodyData.start_date = boardDetail.value.recruitment_start_time;
                bodyData.end_date = boardDetail.value.recruitment_end_time;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCommentData = async () => {
        try {
            const response = (await axios.get(`/recruitment-service/api/recruitment-board-comments/${route.params.recruitmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                headerData.comments = response.data.length;
                commentList.value = response.data;
                for(const comment of commentList.value) {
                    fetchReplyData(comment.recruitment_board_comment_id);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchReplyData = async (commentId) => {
        try {
            const response = (await axios.get(`/recruitment-service/api/recruitment-board-reply/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                headerData.comments += response.data.length;
                replyList.value[commentId] = response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchApplicantData = async (userId) => {
        try {
            const response = (await axios.get(`/recruitment-service/api/study-applicant/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                applyStatus.value = 'y';
            } else {
                applyStatus.value = 'n';
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchMemberData = async (userId) => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/members/user-id/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                memberList.value = response.data;
                for(const member of memberList.value) {
                    if(member.group_id === boardDetail.value.group_id) {
                        return true;
                    }
                }
                return false;
            } 
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddComment = async (content) => {
        try {
            commentData.content = content;
            console.log(commentData);
            const response = (await axios.post(`/recruitment-service/api/recruitment-board-comments/${route.params.recruitmentId}`, commentData, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                commentData.content = '';
            }
            await fetchCommentData();
            window.scrollTo({
                top: document.body.scrollHeight
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddReply = async (commentId, content) => {
        try {
            replyData.recruitment_board_comment_id = commentId;
            replyData.content = content;
            const response = (await axios.post(`/recruitment-service/api/recruitment-board-reply/${commentId}`, replyData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                replyData.recruitment_board_comment_id = null
                replyData.content = '';
                await fetchCommentData();
            } 
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeletePost = async () => {
        try {
            const response = (await axios.delete(`/recruitment-service/api/recruitment-board/${route.params.recruitmentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if (response.success) {
                modalVisibility.value = false;
                router.push(`/study-groups/${boardDetail.value.group_id}/recruitments`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = (await axios.delete(`/recruitment-service/api/recruitment-board-comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                // 댓글 리스트에서 해당 댓글 제거
                commentList.value = commentList.value.filter(comment => comment.recruitment_board_comment_id !== commentId);
                headerData.comments -= 
                    (typeof replyList.value[commentId] === 'undefined') ? 1 : replyList.value[commentId].length + 1; // 댓글 수 감소
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteReply = async (replyId, commentId) => {
        console.log(replyId, commentId);
        try {
            const response = (await axios.delete(`/recruitment-service/api/recruitment-board-reply/${replyId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                // 대댓글 리스트에서 해당 대댓글 제거
                replyList.value[commentId] = replyList.value[commentId].filter(reply => reply.recruitment_board_reply_id !== replyId);
                headerData.comments -= 1; // 댓글 수 감소
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLike = async () => {
        try {
            const response = (await axios.post(`/recruitment-service/api/recruitment-board/likes`, likeData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnlike = async () => {
        try {
            const response = (await axios.delete(`/recruitment-service/api/recruitment-board/likes?recruitment-id=${route.params.recruitmentId}&user-id=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleApply = async () => {
        try {
            if(applyStatus.value == 'n') {
                applicantData.group_id = boardDetail.value.group_id;
                const response = (await axios.post(`/recruitment-service/api/study-applicant`, applicantData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
                if(response.success) {
                    alert("지원 완료");
                    applyStatus.value = 'y';
                }
            } else {
                const response = (await axios.delete(`/recruitment-service/api/study-applicant/${userId}/${route.params.recruitmentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
                if(response.success) {
                    alert("지원이 취소되었습니다.");
                    applyStatus.value = 'n';
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const goModifyPost = () => {
        store.commit('setPostData', {
            id: route.params.recruitmentId,
            title: boardDetail.value.title,
            content: boardDetail.value.content,
            start_time: boardDetail.value.recruitment_start_time,
            end_time: boardDetail.value.recruitment_end_time,
            category: boardDetail.value.study_group_category_id,
            post_type: 'recruitment',
        });
        router.push(`/study-groups/${boardDetail.value.group_id}/recruitments/${route.params.recruitmentId}/modify`);
    }

    onMounted(async () => {
        try {
            loading.value = true; // 로딩 시작
            // 게시글 데이터 불러오기
            await fetchBoardData();
            // 댓글 및 답글 데이터 불러오기
            await fetchCommentData();
        
            // 로그인된 사용자일 경우 멤버 데이터 및 신청자 상태 확인
            if (accessToken !== null) {
                const isMember = await fetchMemberData(userId);
                if (!isMember) {
                    await fetchApplicantData(userId);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false; // 로딩 종료
        }
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