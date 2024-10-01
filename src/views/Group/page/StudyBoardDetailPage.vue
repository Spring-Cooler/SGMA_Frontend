<template>
    <div class="study-board-detail-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <div class="post-container loading" v-if="loading">Loading...</div>
                <div class="post-container" v-else>
                    <Title>{{boardDetail.title}}</Title>
                    <PostHeader 
                        :data="headerData" 
                        :isNotice="false"
                        :isRecruitment="false" 
                        :memberId="memberId"
                        @modifyPost="goModifyPost" 
                        @deletePost="toggleModal"
                        @like="handleLike"
                        @unlike="handleUnlike"
                    >
                    </PostHeader>
                    <PostBody :data="bodyData" :isPerm="true"></PostBody>
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
                            @remove="handleDeleteComment(commentDetail.comment_id)" 
                            :commentId="commentDetail.comment_id"
                        >
                            <ReplyBody v-for="(replyDetail, replyIndex) in replyList[commentDetail.comment_id]" :key="replyIndex">
                                <Reply 
                                    :data="replyDetail" 
                                    @remove="handleDeleteReply(replyDetail.reply_id, commentDetail.comment_id)" 
                                    :replyId="replyDetail.reply_id"
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
    import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
    import Title from '@/components/common/Title.vue';
    import PostHeader from '@/components/layouts/PostHeader.vue';
    import PostBody from '@/components/layouts/PostBody.vue';
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

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;

    const memberList = ref([]);
    const memberMap = ref({});
    const memberId = ref();
    
    const commentList = ref([]);
    const replyList = ref({});
    const boardDetail = ref({});

    const loading = ref(true);
    const modalVisibility = ref(false);

    const headerData = reactive({
        member_id: null,
        nickname: '',
        likes: 0,
        comments: 0,
    })

    const bodyData = reactive({
        content: '',
    })

    const commentData = reactive({
        content: '',
        member_id: null,
        board_id: route.params.boardId,
    });

    const replyData = reactive({
        content: '',
        member_id: null,
        comment_id: null,
    });

    const likeData = reactive({
        board_id: route.params.boardId,
        member_id: null,
    })

    const toggleModal = () => {
        modalVisibility.value = !modalVisibility.value;
    };

    const fetchMemberData = async() => {
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
                    memberMap.value[member.group_id] = member;
                }
                if(memberMap.value[route.params.groupId]) {
                    memberId.value = memberMap.value[route.params.groupId].member_id;
                    commentData.member_id = memberId.value;
                    replyData.member_id = memberId.value;
                    likeData.member_id = memberId.value;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchBoardData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/boards/${route.params.boardId}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                boardDetail.value = response.data;
                headerData.member_id = boardDetail.value.member_id;
                headerData.nickname = boardDetail.value.nickname;
                headerData.likes = boardDetail.value.likes;
                bodyData.content = boardDetail.value.content;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCommentData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/board/comments/board-id/${route.params.boardId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                headerData.comments = response.data.length;
                commentList.value = response.data;
                for(const comment of commentList.value) {
                    fetchReplyData(comment.comment_id);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchReplyData = async (commentId) => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/board/replies/comment-id/${commentId}`,
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

    const handleAddComment = async (content) => {
        try {
            commentData.content = content;
            const response = (await axios.post(`/study-group-service/api/study-group/board/comments`, commentData, 
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
            replyData.comment_id = commentId;
            replyData.content = content;
            const response = (await axios.post(`/study-group-service/api/study-group/board/replies`, replyData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                replyData.comment_id = null
                replyData.content = '';
                await fetchCommentData();
            } 
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeletePost = async () => {
        try {
            const response = (await axios.delete(`/study-group-service/api/study-group/boards/${route.params.boardId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if (response.success) {
                modalVisibility.value = false;
                router.push(`/study-groups/${route.params.groupId}/boards`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = (await axios.delete(`/study-group-service/api/study-group/board/comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                // 댓글 리스트에서 해당 댓글 제거
                commentList.value = commentList.value.filter(comment => comment.comment_id !== commentId);
                headerData.comments -= 
                    (typeof replyList.value[commentId] === 'undefined') ? 1 : replyList.value[commentId].length + 1; // 댓글 수 감소
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteReply = async (replyId, commentId) => {
        try {
            const response = (await axios.delete(`/study-group-service/api/study-group/board/replies/${replyId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                // 대댓글 리스트에서 해당 대댓글 제거
                replyList.value[commentId] = replyList.value[commentId].filter(reply => reply.reply_id !== replyId);
                headerData.comments -= 1; // 댓글 수 감소
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLike = async () => {
        try {
            const response = (await axios.post(`/study-group-service/api/study-group/boards/like`, likeData,
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
            const response = (await axios.delete(`/study-group-service/api/study-group/boards/like?board-id=${route.params.boardId}&member-id=${memberId.value}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
        } catch (error) {
            console.error(error);
        }
    }

    const goModifyPost = () => {
        store.commit('setPostData', {
            id: route.params.boardId,
            title: boardDetail.value.title,
            content: boardDetail.value.content,
            post_type: 'board',
        });
        router.push(`/study-groups/${route.params.groupId}/boards/${route.params.boardId}/modify`);
    }

    onMounted(async () => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        await fetchMemberData();
        await fetchBoardData();
        await fetchCommentData();
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