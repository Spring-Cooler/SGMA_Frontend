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
                    <PostHeader :data="headerData" :isNotice="false" @deletePost="toggleModal"></PostHeader>
                    <PostBody :data="bodyData" :isPerm="true"></PostBody>
                    <DeleteModal :isVisible="modalVisibility" @confirm="deletePost" @cancel="toggleModal">해당 게시글을 삭제하시겠습니까?</DeleteModal>
                    <CommentHeader :data="headerData" :boardId="props.boardId" @add="addComment"></CommentHeader>
                    <CommentBody v-for="(commentDetail, index) in commentList" :key="index">
                        <Comment :data="commentDetail" @add="addReply()" @remove="deleteComment" :commentId="commentDetail.comment_id">
                            <ReplyBody v-for="(replyDetail, replyIndex) in replyList[commentDetail.comment_id]" :key="replyIndex">
                                <Reply :data="replyDetail" @remove="deleteReply" :replyId="replyDetail.reply_id"></Reply>
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
    import { ref, onMounted } from 'vue';
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
    const isValid = ref(true);

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

    const fetchData = async () => {
      try {
        let response; // response 변수를 미리 선언

        response = (await axios.get(`/api/study-group/boards/${props.boardId}`)).data;
        if(!response.success) return;
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
        isValid.value = false;
      } finally {
        (isValid.value) ? loading.value = false : loading.value = true;
      }
    }

    const fetchComments = async () => {
      try {
        let response = (await axios.get(`/api/study-group/board/comments/board-id/${props.boardId}`)).data;
        comments.value = response.data.length;
        if(response.success) {
            commentList.value = response.data;
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
            let response = (await axios.get(`/api/study-group/board/replies/comment-id/${commentId}`)).data;
            comments.value += response.data.length;
            if(response.success) {
                replyList.value[commentId] = response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addComment = async () => {
        await fetchComments();
        window.scrollTo({
            top: document.body.scrollHeight
        })
    }

    const addReply = async () => {
        await fetchComments();
    }

    const toggleModal = () => {
        modalVisibility.value = !modalVisibility.value;
    };

    const deleteComment = async () => {
        await fetchComments();
    }

    const deleteReply = async () => {
        await fetchComments();
    }

    const deletePost = async () => {
        let response = (await axios.delete(`/api/study-group/boards/${props.boardId}`)).data;
        if (response.success) {
            modalVisibility.value = false;
            router.go(-1);
        }
    }

    onMounted(() => {
        fetchData();
        fetchComments();
    })
</script>

<style scoped>
    .post-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
    }

    .loading {
        font-size: 4rem;
    }
</style>