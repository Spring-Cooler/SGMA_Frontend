<template>
    <div class="notice" @click="detail">
        <div class="notice-no">{{ props.data.notice_id }}</div>
        <div class="notice-title">{{ props.data.title }}</div>
        <div class="notice-created-at">{{ formatDate(props.data.created_at) }}</div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['detail']);

const detail = () => {
    emit('detail');
}

function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);  // ISO 8601 날짜 문자열을 Date 객체로 변환
  const year = date.getFullYear();    // 연도 추출
  const month = String(date.getMonth() + 1).padStart(2, '0');  // 월 추출 (0부터 시작하므로 +1)
  const day = String(date.getDate()).padStart(2, '0');  // 일 추출

  return `${year}.${month}.${day}`;   // 원하는 형식으로 포맷팅
}
</script>

<style>
    .notice {
        display: flex;
        height: 9.2rem;
        width: 100%;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
        border-top: 1px solid #EAECEE;
        cursor: pointer;
    } 

    .notice-no {
        display: flex;
        width: 10%;
        justify-content: center;
        align-items: center;
    }

    .notice-title {
        display: flex;
        width: 75%;
        justify-content: center;
        align-items: center;
    } 

    .notice-created-at {
        display: flex;
        width: 15%;
        justify-content: center;
        align-items: center;
    }
</style>