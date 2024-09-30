<template>
    <div class="comment-header">
        <CommentInfo :comments="props.data.comments"></CommentInfo>
        <CommentInput @add="addComment"></CommentInput>
    </div>
</template>

<script setup>
    import CommentInfo from '../common/CommentInfo.vue';
    import CommentInput from '../common/CommentInput.vue';
    
    const props = defineProps({
        data: {
          type: Object,
          required: true,
        }
    })
    
    const emit = defineEmits(['add']);
    
    const addComment = (content) => {
        emit('add', content);
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