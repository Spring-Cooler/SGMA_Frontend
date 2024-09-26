<template>
	<Navigation />
	<div class="schedule-detail-page">
		<div class="schedule-detail-container">
			<h1>{{ schedule.title }}</h1>
			<p><strong>시작:</strong> {{ schedule.startTime }}</p>
			<p><strong>종료:</strong> {{ schedule.endTime }}</p>
			<p><strong>내용:</strong> {{ schedule.details }}</p>
			<!-- <button class="btn back" @click="goBack">Back to Schedule</button> -->
			<br>
			<button class="btn">시험 응시</button>
			</main>
		</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';

// 스케줄 정보를 담을 ref 변수
const schedule = ref({
	id: '',
	title: '',
	startTime: '',
	endTime: '',
	details: ''
});

// 라우터와 현재 경로 정보를 사용
const route = useRoute();
const router = useRouter();

// 컴포넌트가 마운트될 때 라우터 파라미터로 전달된 스케줄 정보 가져오기
onMounted(() => {
	const scheduleData = route.params.schedule;
	if (scheduleData) {
		schedule.value = JSON.parse(scheduleData);
	}
});

// 스케줄 목록으로 돌아가기
const goBack = () => {
	router.push('/study-schedule');
};
</script>

<style scoped>
#schedule-detail {
	display: flex;
	height: 100vh;
	/* 전체 높이를 설정하여 뷰포트에 맞춤 */
}

h1 {
	font-size: 3rem;
	margin-bottom: 1rem;
}

p {
	font-size: 1.5rem;
	margin: 0.5rem 0;
}

.btn.back {
	margin-top: 1rem;
	padding: 10px 20px;
	background-color: #8bc34a;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn.back:hover {
	background-color: #7aae42;
}
</style>
