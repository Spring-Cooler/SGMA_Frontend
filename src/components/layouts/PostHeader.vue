<template>
    <div class="post-header">
        <div class="writer-info">
            <img class="writer-profile-image" src='../../assets/images/default_profile.svg' alt="profile_image">
            <div class="writer-name">{{props.data.nickname}}</div>
        </div>
        <div class="post-actions">
            <div v-if="!isNotice">
                <span class="like-count" @click="toggleLike">
                    <i class="fa-solid fa-heart" :class="{ 'like-heart': isAnimating }" :style="{ color: isLiked ? 'red' : 'gray' }"></i>
                    {{props.data.likes}} 
                </span>
                <span class="comment-count">
                    <i class="fa-solid fa-comment"></i>
                    {{props.data.comments}} 
                </span>
            </div>
            <TinyButton class="light-gray" label="목록" @click="goBack"></TinyButton>
            <TinyButton class="light-gray" label="수정"></TinyButton>
            <TinyButton class="sunset-orange" label="삭제" @click="deletePost"></TinyButton>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import TinyButton from '@/components/common/TinyButton.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    isNotice: {
        type: Boolean,
        required: true
    }
});

// 좋아요 상태와 좋아요 수 관리
const isLiked = ref(false); // 좋아요 상태를 관리
const likeCount = ref(props.data.likes);  // 좋아요 수를 관리
const isAnimating = ref(false); // 좋아요 애니메이션 상태 관리
const emit = defineEmits(['deletePost'])
const router = useRouter();

const goBack = () => {
    router.go(-1);
}

const deletePost = () => {
    emit('deletePost');
}

// 좋아요 토글 함수
const toggleLike = () => {
  if (!isAnimating.value) { // 애니메이션이 진행 중이 아닐 때만 실행
    if (isLiked.value) {
      likeCount.value--; // 좋아요를 취소하면 수 감소
    } else {
      likeCount.value++; // 좋아요를 누르면 수 증가
    }
    isLiked.value = !isLiked.value; // 상태를 토글

    isAnimating.value = true; // 애니메이션 시작
    setTimeout(() => {
      isAnimating.value = false; // 애니메이션 종료 후 상태 초기화
    }, 500); // 애니메이션 지속 시간과 일치시킴 (0.5초)
  }
};
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
}

.like-count i, .comment-count i {
  margin-right: 1rem;
  transition: color 0.3s;
}
</style>