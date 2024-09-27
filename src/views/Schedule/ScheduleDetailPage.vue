<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<Title>{{ schedule.title }}</Title>
			<div class="schedule-content">
				<!-- schedule body container -->
				<p class="schedule-subtitle"><i class="fa-regular fa-calendar"></i> <strong>일정 시작 시간:</strong> {{
					schedule.start }} {{
						schedule.startTime }} </p>
				<p class="schedule-subtitle"><i class="fa-regular fa-calendar"></i> <strong>일정 종료 시간:</strong> {{
					schedule.start }} {{
						schedule.endTime }}</p>

				<p class="schedule-subtitle"><strong>참여자 수:</strong> {{ schedule.numParticipants }}</p>
				<p class="schedule-subtitle"><strong>내용:</strong> {{ schedule.details }}</p>
				<p class="schedule-subtitle"><strong>시험 여부:</strong> {{ schedule.testStatus ? 'Y' : 'N' }}</p>
				<p class="schedule-subtitle" v-if="schedule.testStatus"><strong>출제 문제 수:</strong> {{
					schedule.numProblemsPerParticipant }}</p>



			</div>
			<br>
			<div>
				<!-- buttons -->
				<div class="schdule-buttons" v-if="participate && schedule.testStatus">
					<button class="btn">문제 출제하기</button>
					<button class="btn">시험 응시</button>
				</div>
				<button class="btn" v-else @click="toggleParticipate">{{ participate ? '일정 참여 취소' : '일정 참여' }}</button>
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
	scheduledDate: '',
	startTime: '',
	endTime: '',
	details: '',
	testStatus: false,
	numProblemsPerParticipant: 0,
	numParticipants: 0
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
		schedule.value.scheduledDate = props.schedule.scheduledDate.split('T')[0].replaceAll("-", "  ");
		schedule.value.details = props.schedule.details;
		schedule.value.startTime = props.schedule.startTime;
		schedule.value.endTime = props.schedule.endTime;
		schedule.value.testStatus = props.schedule.testStatus;
		schedule.value.numProblemsPerParticipant = props.schedule.numProblemsPerParticipant;
		schedule.value.numParticipants = props.schedule.numParticipants;
		console.log(schedule.value.numProblemsPerParticipant)


	} else {
		console.log('No schedule passed. Fetch from store or API using ID:', props.id);
	}

});

// 스케줄 목록으로 돌아가기
const goBack = () => {
	router.push('/study-schedule');
};

const toggleParticipate = () => {
	participate.value = !participate.value;
	schedule.value.numParticipants += (participate.value ? 1 : -1);
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

.schedule-subtitle {
	font-size: 2rem;
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
