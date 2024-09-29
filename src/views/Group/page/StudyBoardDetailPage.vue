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
                    <Title>{{title}}</Title>
                    <PostHeader :data="headerData" :isNotice="false" @modifyPost="goModifyPost" @deletePost="toggleModal"></PostHeader>
                    <PostBody :data="bodyData" :isPerm="true"></PostBody>
                    <DeleteModal :isVisible="modalVisibility" @confirm="deletePost" @cancel="toggleModal">해당 게시글을 삭제하시겠습니까?</DeleteModal>
                    <CommentHeader :data="headerData" :boardId="props.boardId" @add="addComment"></CommentHeader>
                    <CommentBody v-for="(commentDetail, commentIndex) in commentList" :key="commentIndex">
                        <Comment :data="commentDetail" @add="addReply" @remove="deleteComment(commentDetail.comment_id)" :commentId="commentDetail.comment_id">
                            <ReplyBody v-for="(replyDetail, replyIndex) in replyList[commentDetail.comment_id]" :key="replyIndex">
                                <Reply :data="replyDetail" @remove="deleteReply(replyDetail.reply_id, commentDetail.comment_id)" :replyId="replyDetail.reply_id"></Reply>
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
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import ReplyBody from '@/components/layouts/ReplyBody.vue';

    const props = defineProps({
        groupId: {
            type: String,
            required: true
        },
        boardId: {
            type: String,
            required: true
        }
    })
    const router = useRouter();
    const store = useStore();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

    const commentList = ref([]);
    const replyList = ref({});

    const boardDetail = ref({});
    const loading = ref(true);
    const modalVisibility = ref(false);

    const title = ref(null);
    const nickname = ref(null);
    const likes = ref(0);
    const comments = ref(0);

    const startDate = ref(null);
    const endDate = ref(null);
    const content = ref(null);

    const headerData = {
        nickname: nickname,
        likes: likes,
        comments: comments,
    }

    const bodyData = {
        startDate: null,
        endDate: null,
        content: content,
    }

    const commentData = reactive({
        content: '',
        member_id: 1,
        board_id: props.boardId,
    });

    const replyData = reactive({
        content: '',
        member_id: 1,
        comment_id: null,
    });

    const fetchData = async () => {
      try {
        let response; // response 변수를 미리 선언

        response = (await axios.get(`/study-group-service/api/study-group/boards/${props.boardId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;
        if (!response.success) {
            return;
        }

        loading.value = false;
        boardDetail.value = response.data;

        title.value = boardDetail.value.title;
        nickname.value = boardDetail.value.nickname;
        likes.value = boardDetail.value.likes;

        if (typeof boardDetail.value.schedule_start_time !== 'undefined') {
            startDate.value = boardDetail.value.schedule_start_time;
            endDate.value = boardDetail.value.schedule_end_time;
        } else if (typeof boardDetail.value.recruitment_start_time !== 'undefined') {
            startDate.value = boardDetail.value.recruitment_start_time;
            endDate.value = boardDetail.value.recruitment_end_time;
        }
        content.value = boardDetail.value.content;
      } catch (error) {
        console.error(error);
      }
    }

    const fetchComments = async () => {
      try {
        let response = await axios.get(`/study-group-service/api/study-group/board/comments/board-id/${props.boardId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (response.data.success && response.data.data) {
            comments.value = response.data.data.length;
            commentList.value = response.data.data;
            for(const comment of commentList.value) {
                fetchReplies(comment.comment_id);
            }
        }
      } catch (error) {
        console.error(error);
      }
    }

    const fetchReplies = async (commentId) => {
        try {
            let response = await axios.get(`/study-group-service/api/study-group/board/replies/comment-id/${commentId}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.data.success && response.data.data) {
                comments.value += response.data.data.length;
                replyList.value[commentId] = response.data.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const toggleModal = () => {
        modalVisibility.value = !modalVisibility.value;
    };

    const addComment = async (content) => {
        try {
            commentData.content = content;
            let response = (await axios.post(`/study-group-service/api/study-group/board/comments`, commentData,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                commentData.content = '';
            }
            await fetchComments();
            window.scrollTo({
                top: document.body.scrollHeight
            })
        } catch (error) {
            console.error(error);
        }
    }

    const addReply = async (commentId, content) => {
        try {
            replyData.comment_id = commentId;
            replyData.content = content;
            let response = (await axios.post(`/study-group-service/api/study-group/board/replies`, replyData,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            if(response.success) {
                replyData.comment_id = null
                replyData.content = '';
                await fetchComments();
            } 
        } catch (error) {
          console.error(error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            let response = (await axios.delete(`/study-group-service/api/study-group/board/comments/${commentId}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            if(response.success) {
                // 댓글 리스트에서 해당 댓글 제거
                commentList.value = commentList.value.filter(comment => comment.comment_id !== commentId);
                comments.value -= 
                    (typeof replyList.value[commentId] === 'undefined') ? 1 : replyList.value[commentId].length + 1; // 댓글 수 감소
            }
        } catch (error) {
          console.log(error);
        }
    }

    const deleteReply = async (replyId, commentId) => {
        try {
            let response = (await axios.delete(`/study-group-service/api/study-group/board/replies/${replyId}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })).data;
            if(response.success) {
                // 대댓글 리스트에서 해당 대댓글 제거
                replyList.value[commentId] = replyList.value[commentId].filter(reply => reply.reply_id !== replyId);
                comments.value -= 1; // 댓글 수 감소
            }
        } catch (error) {
          console.log(error);
        }
    }

    const deletePost = async () => {
        let response = (await axios.delete(`/study-group-service/api/study-group/boards/${props.boardId}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;
        if (response.success) {
            modalVisibility.value = false;
            router.push(`/study-groups/1/boards`);
        }
    }

    const goModifyPost = () => {
        store.commit('setPostData', {
            id: props.boardId,
            title: title.value,
            content: content.value,
            post_type: 'board',
        });
        router.push(`/study-groups/1/boards/${props.boardId}/modify`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchData();
        fetchComments();
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