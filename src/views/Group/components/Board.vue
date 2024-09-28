<template>
    <div class="board" @click="detail">
        <div class="board-no">{{ props.data.board_id }}</div>
        <div class="board-title">{{ props.data.title }}</div>
        <div class="board-writer">{{ props.data.nickname }}</div>
        <div class="board-created-at">{{ formatDate(props.data.created_at) }}</div>
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
    .board {
        display: flex;
        height: 9.2rem;
        width: 100%;
        align-items: center;
        font-size: 2rem;
        font-weight: 500;
        border-top: 1px solid #EAECEE;
        cursor: pointer;
    }

    .board-no {
        display: flex;
        height: 100%;
        width: 10%;
        justify-content: center;
        align-items: center;
    }

    .board-title {
        display: flex;
        height: 100%;
        width: 60%;
        justify-content: center;
        align-items: center;
    }

    .board-writer {
        display: flex;
        height: 100%;
        width: 15%;
        justify-content: center;
        align-items: center;
    }

    .board-created-at {
        display: flex;
        height: 100%;
        width: 15%;
        justify-content: center;
        align-items: center;
    }
</style>