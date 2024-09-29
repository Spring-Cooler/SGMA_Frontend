<template>
    <div class="post-body">
        <div v-if="!isPerm">
          <StartDate>시작일: {{props.data.startDate}}</StartDate>
          <EndDate>종료일: {{props.data.endDate}}</EndDate>
        </div>
        <PostContent>
            <p class="content">{{ props.data.content }}</p>
        </PostContent>
    </div>
</template>

<script setup>
import StartDate from '@/components/common/StartDate.vue';
import EndDate from '@/components/common/EndDate.vue';
import PostContent from '@/components/common/PostContent.vue';

const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        isPerm: {
            type: Boolean,
            required: true
        }
    })
</script>

<style scoped>
.post-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 3rem;
  word-wrap: break-word;
  border-bottom: 1px solid #EAECEE;
}

.post-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
}

.content {
  white-space: pre-wrap; /* 줄바꿈 및 연속된 공백을 유지 */
  word-wrap: break-word;
}
</style>