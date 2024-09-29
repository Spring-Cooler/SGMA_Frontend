<template>
    <div class="post-body">
        <div v-if="!isPerm">
          <StartDate>시작일: {{props.data.startDate}}</StartDate>
          <EndDate>종료일: {{props.data.endDate}}</EndDate>
        </div>
        <PostContent>
            <p v-html="formattedContent"></p>
        </PostContent>
    </div>
</template>

<script setup>
import StartDate from '@/components/common/StartDate.vue';
import EndDate from '@/components/common/EndDate.vue';
import PostContent from '@/components/common/PostContent.vue';
import { computed } from 'vue';

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

// 줄바꿈(\n)을 <br>로 변환하는 computed property
const formattedContent = computed(() => {
    return props.data.content.value.replace(/\n/g, '<br>');
});    
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
</style>