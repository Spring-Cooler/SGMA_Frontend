<template>
	<div class="schedule-detail-page">
		<Navigation />
		<div class="schedule-detail-container">
			<h1>{{ schedule.title }}</h1>
			<p><strong>Start Time:</strong> {{ schedule.startTime }}</p>
			<p><strong>End Time:</strong> {{ schedule.endTime }}</p>
			<p><strong>Details:</strong> {{ schedule.details }}</p>
			<button class="btn back" @click="goBack">Back to Schedule</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '@/components/layouts/Navigation.vue';

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
	router.push('/schedule');
};
</script>

<style scoped>
.schedule-detail-page {
	padding: 20px;
}

.schedule-detail-container {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	background-color: #f5f5f5;
	border-radius: 8px;
}

h1 {
	font-size: 2rem;
	margin-bottom: 1rem;
}

p {
	font-size: 1.2rem;
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
