<template>
	<div class="list">
		스터디 참가 신청자 관리
        <button class="cancel-button">취소</button>
	</div>
</template>

<script setup>
</script>

<style scoped>
.list {
    position: absolute;
    top: 184px; /* 화면 위에서 184px 떨어진 위치 */
    left: 620px; /* 가로 중앙 정렬 */
    font-size: 40px;
    font-family: Noto Sans;
    font-weight: 600;
    line-height: 60px;
    word-wrap: break-word;
}
.cancel-button {
    background-color: #E99A24; /* 취소 버튼 색상 */
    color: white;
    font-size: 24px;
    font-family: Noto Sans;
    font-weight: 600;
    word-wrap: break-word;
    width: 80px;
    height: 48px;
    cursor: pointer;
    margin-top: 8px;
    margin-left: 496px;
}
</style>