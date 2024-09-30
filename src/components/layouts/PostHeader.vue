<template>
    <div class="post-header">
        <div class="writer-info" v-if="!isNotice">
            <img class="writer-profile-image" src='../../assets/images/default_profile.svg' alt="profile_image">
            <div class="writer-name">{{props.data.nickname}}</div>
        </div>
        <div class="writer-info" v-else></div>
        <div class="post-actions">
            <div v-if="!isNotice">
                <span class="like-count" @click="toggleLike">
                    <i class="fa-solid fa-heart" :class="{ 'like-heart': isAnimating }" :style="{ color: isLiked ? 'red' : 'gray' }"></i>
                    {{likeCount}} 
                </span>
                <span class="comment-count">
                    <i class="fa-solid fa-comment"></i>
                    {{props.data.comments}} 
                </span>
            </div>
            <TinyButton class="light-gray" label="목록" @click="goBack"></TinyButton>
            <TinyButton class="light-gray" label="수정" @click="modifyPost"></TinyButton>
            <TinyButton class="sunset-orange" label="삭제" @click="deletePost"></TinyButton>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TinyButton from '@/components/common/TinyButton.vue';
import axios from 'axios';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    isNotice: {
        type: Boolean,
        required: true
    },
    isRecruitment: {
        type: Boolean,
        required: true
    },
    memberId: {
        type: Number,
    },
    userId: {
        type: Number,
    },
});

const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

// 좋아요 상태와 좋아요 수 관리
const likeList = ref([]);
const isLiked = ref(false); // 좋아요 상태를 관리
const likeCount = ref(props.data.likes);  // 좋아요 수를 관리
const isAnimating = ref(false); // 좋아요 애니메이션 상태 관리
const emit = defineEmits(['modifyPost','deletePost','like','unlike']);
const router = useRouter();
const route = useRoute();

const fetchLikeData = async () => {
  try {
    let response;
    if(props.isRecruitment) {
        response = (await axios.get(`/recruitment-service/api/recruitment-board-like/recruitmentboard/${route.params.recruitmentId}`)).data;
    } else {
        response = (await axios.get(`/study-group-service/api/study-group/board/likes/board-id/${route.params.boardId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).data;     
    }
    if(response.success) {
        likeList.value = response.data;
        for(const like of likeList.value) {
            if(props.isRecruitment) {
                if(like.user_id === props.userId) {
                    isLiked.value = true;
                    break;
                }
            }
            else {
                if(like.member_id === props.memberId) {
                    isLiked.value = true;
                    break;
                }
            }
        }
    }
  } catch(error) {
    console.error(error);
  }
}

const goBack = () => {
    const modifiedPath = route.fullPath.replace(/\/\d+$/, ''); // 맨 뒤 숫자만 제거
    router.push(modifiedPath);
}

const modifyPost = () => {
    emit('modifyPost');
}

const deletePost = () => {
    emit('deletePost');
}

// 좋아요 토글 함수
const toggleLike = async () => {
  if (!isAnimating.value) { // 애니메이션이 진행 중이 아닐 때만 실행
    if (isLiked.value) {
      likeCount.value--; // 좋아요를 취소하면 수 감소
      emit('unlike');
    } else {
      likeCount.value++; // 좋아요를 누르면 수 증가
      emit('like');
    }
    isLiked.value = !isLiked.value; // 상태를 토글

    isAnimating.value = true; // 애니메이션 시작
    setTimeout(() => {
      isAnimating.value = false; // 애니메이션 종료 후 상태 초기화
    }, 500); // 애니메이션 지속 시간과 일치시킴 (0.5초)
  }
};

onMounted(() => {
    if(accessToken !== null) {
        fetchLikeData();
    }
})
</script>

<style scoped>
.post-header {
    display: flex;
    height: 9.2rem;
    width: 100%;
    margin-top: 5.3rem;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    border-bottom: 1px solid #EAECEE;
}

.writer-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.writer-info img {
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 50%;
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 2rem; 
  cursor: pointer;
}

.post-actions div {
    display: flex;
    gap: 2rem; 
}

.like-count, .comment-count {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #888;
  gap: 1rem;
}

.like-count i {
  transition: color 0.3s;
}

.like-heart {
  animation: like-animation 0.5s ease-out; /* 애니메이션 0.5초 동안 실행 */
}

@keyframes like-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5); /* 커지는 애니메이션 */
  }
  100% {
    transform: scale(1);
  }
}
</style>