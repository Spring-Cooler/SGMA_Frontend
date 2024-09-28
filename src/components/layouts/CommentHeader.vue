<template>
    <div class="comment-header">
        <CommentInfo :comments="props.data.comments"></CommentInfo>
        <CommentInput :boardId="props.boardId" @add="addComments"></CommentInput>
    </div>
</template>

<script setup>
import CommentInfo from '../common/CommentInfo.vue';
import CommentInput from '../common/CommentInput.vue';

const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    boardId: {
      type: Number,
      required: true,
    }
})

const emit = defineEmits(['add']);

const addComments = () => {
    emit('add');
}

</script>

<style scoped>
.comment-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>