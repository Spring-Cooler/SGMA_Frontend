<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<Title>{{ schedule.title }}</Title>
			<div class="schedule-content">
				<!-- schedule body container -->
				<p><strong>날짜:</strong> {{ schedule.start }}</p>
				<p><strong>시작:</strong> {{ schedule.startTime }}</p>
				<p><strong>종료:</strong> {{ schedule.endTime }}</p>
				<p><strong>내용:</strong> {{ schedule.details }}</p>
			</div>
			<br>
			<div>
				<!-- buttons -->
				<div class="schdule-buttons" v-if="participate">
					<button class="btn">문제 출제하기</button>
					<button class="btn">시험 응시</button>
				</div>
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
import Title from '@/components/common/Title.vue';
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
	start: '',
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
		schedule.value.id = props.schedule.id;
		// console.log(schedule.value)
		schedule.value.title = props.schedule.title;
		schedule.value.start = props.schedule.start.split('T')[0].replaceAll("-", "  ");
		schedule.value.details = props.schedule.details;
		schedule.value.startTime = props.schedule.startTime;
		schedule.value.endTime = props.schedule.endTime;



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
.schedule-content {
	width: 100%;
	margin-top: 5.3rem;
	display: flex;
	flex-direction: column;
	justify-content: left;
}

.schdule-buttons {
	display: flex;
	flex-direction: row;
	gap: 2rem;
	justify-content: right;
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
