<template>
    <div class="post-body">
        <div v-if="!isPerm">
          <StartDate>시작일: {{formatDate(props.data.start_date)}}</StartDate>
          <EndDate>종료일: {{formatDate(props.data.end_date)}}</EndDate>
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

function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);  // ISO 8601 날짜 문자열을 Date 객체로 변환
  const year = date.getFullYear();    // 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, '0');  // 월 추출 (0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, '0');  // 일 추출

  return `${year}.${month}.${day}`;   // 원하는 형식으로 포맷팅
}    
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