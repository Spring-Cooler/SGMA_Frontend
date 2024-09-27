<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<h1>{{ schedule.title }}</h1>
			<div>
				<!-- schedule body container -->
				<p><strong>시작:</strong> {{ schedule.startTime }}</p>
				<p><strong>종료:</strong> {{ schedule.endTime }}</p>
				<p><strong>내용:</strong> {{ schedule.details }}</p>
			</div>
			<br>
			<div class="schedule-content">
				<!-- buttons -->
				<button class="btn" v-if="participate">문제 출제하기</button>
				<button class="btn" v-if="participate">시험 응시</button>
				<button class="btn" v-else @click="participateInSchedule">일정 참여</button>
			</div>

		</div>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	schedule: {
		type: Object,
		default: () => { null }
	}
})
// 스케줄 정보를 담을 ref 변수
const schedule = ref({
	id: '',
	title: '',
	startTime: '',
	endTime: '',
	details: ''
});
let participate = ref(false);
// 라우터와 현재 경로 정보를 사용
const route = useRoute();
const router = useRouter();

// 컴포넌트가 마운트될 때 라우터 파라미터로 전달된 스케줄 정보 가져오기
onMounted(() => {
	if (props.schedule) {
		console.log('Received schedule:', props.schedule);
	} else {
		console.log('No schedule passed. Fetch from store or API using ID:', props.id);
	}

});

// 스케줄 목록으로 돌아가기
const goBack = () => {
	router.push('/study-schedule');
};

const participateInSchedule = () => {
	participate.value = true;
}
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

.schedule-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: right;
	gap: 2rem;
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
