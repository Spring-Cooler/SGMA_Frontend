<template>
    <div class="comment-cnt">
        <i class="fa-regular fa-comment"></i>
        <span>{{ props.comments }}</span>
    </div>
</template>

<script setup>
    const props = defineProps({
        comments: {
            type: Number,
            required: true
        }
    }) 
</script>

<style scoped>
.comment-cnt {
  display: flex;
  justify-content: left;
  align-items: flex-end;
  margin-top: 6rem;
  width: 100%;
  gap: 1rem;
  font-size: 1.65rem;
  font-weight: 400;
}
</style>