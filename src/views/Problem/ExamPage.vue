<template>
	<div id="exam-header" class="olive">
		<h1>올림픽 문제 스터디</h1>
	</div>
	<div class="main-content">
		<Title>{{ problemInfos[problemIndex].problem_content }}</Title>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Title from '@/components/common/Title.vue';
let problemIndex = ref(0);
let problemInfos = ref([{
	problemId: 1,
	problem_content: "다음중 오륜기에 들어가는 색이 아닌 것은?",
	problem_type: "MULTIPLE",
	choices: ["빨간색", "파란색", "노란색", "보라색"]

}])
</script>

<style scoped>
#exam-header {
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 10rem;
	z-index: 1000;
}

#exam-header>h1 {
	margin-left: 8rem;
	font-size: 8rem;
	color: white;
}
</style>