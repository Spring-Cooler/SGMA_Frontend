<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<Title>{{ schedule.title || 'No Title' }}</Title>

			<div class="schedule-buttons">
				<button
					:class="{ 'btn': true, 'orange': !participate, 'sunset-orange': participate, 'btn-participate': true }"
					@click="toggleParticipate">{{ participate ? '참여 취소' : '일정 참여' }}</button>
			</div>

			<div class="schedule-content">
				<p class="schedule-subtitle"><i class="fa-regular fa-calendar"></i> <strong>일정 시작 시간:</strong> {{
					schedule.start || 'N/A' }} {{ schedule.startTime || 'N/A' }}</p>
				<p class="schedule-subtitle"><i class="fa-regular fa-calendar"></i> <strong>일정 종료 시간:</strong> {{
					schedule.start || 'N/A' }} {{ schedule.endTime || 'N/A' }}</p>
				<p class="schedule-subtitle"><strong>참여자 수:</strong> {{ schedule.numParticipants || 0 }}</p>
				<p class="schedule-subtitle"><strong>내용:</strong> {{ schedule.details || 'No details available' }}</p>
				<p class="schedule-subtitle"><strong>시험 여부:</strong> {{ schedule.testStatus ? 'Y' : 'N' }}</p>

				<div v-if="schedule.testStatus">
					<p class="schedule-subtitle"><strong>출제 문제 수:</strong> {{ schedule.numProblemsPerParticipant || 0 }}
					</p>
					<p class="schedule-subtitle"><strong>평균: </strong> {{ schedule.test_average || 'N/A' }}</p>
					<p class="schedule-subtitle"><strong>표준 편차: </strong>{{ schedule.test_standard_deviation || 'N/A' }}
					</p>

					<!-- Show user score if participating -->
					<p class="schedule-subtitle" v-if="participate && participateInfo">
						<strong>내 점수: </strong>{{ participateInfo.test_score || 'N/A' }}
					</p>

					<!-- Pass participants and user's data to TestStatusChart -->
					<div class="chart-container" v-if="participants.length > 0">
						<TestStatusChart :participants="participants" :current-user="participateInfo" />
					</div>
					<p v-else>참여자 데이터가 없습니다.</p> <!-- Display if no participants -->
				</div>
			</div>

			<div class="schedule-buttons" v-if="participate && schedule.testStatus">
				<button class="btn">문제 출제</button>
				<button class="btn" @click="goToExamPage">시험 응시</button>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import Title from '@/components/common/Title.vue';

import TestStatusChart from './components/TestStatusChart.vue';

const props = defineProps({
	scheduleId: {
		type: String,
		required: true,
	},
	schedule: {
		type: Object,
		default: () => null,
	}
})

const schedule = ref({});
let participate = ref(false);
let participants = ref([]);
let participateInfo = ref(null);
const route = useRoute();
const router = useRouter();

const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

onMounted(() => {
	if (!accessToken) {
		alert('로그인을 해주세요');
		router.push('/');
		return;
	}
	fetchData();
	if (props.schedule && Object.keys(props.schedule).length > 0) {
		schedule.value = { ...props.schedule };
	} else {
		console.warn('No schedule data passed via props.');
	}
});

const fetchData = async () => {
	try {
		console.log('Fetching participants for scheduleId:', props.scheduleId);
		const response = (await axios.get(`/schedule-service/api/study-schedule/scheduleParticipant/${props.scheduleId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})).data;

		console.log('Response received:', response);

		if (response.success) {
			const participantsData = response.data || [];
			participants.value = participantsData;

			console.log('Participants data:', participantsData);

			const memberId = JSON.parse(localStorage.getItem('token')).userId;
			const foundParticipant = participantsData.find(participant => participant.member_id == memberId);

			participate.value = !!foundParticipant;
			participateInfo.value = foundParticipant || null; // Store user's own information

			console.log('Participate info:', participateInfo.value);
		} else {
			console.error('API response indicates failure:', response);
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

const goToExamPage = () => {
	const scheduleId = 3;
	router.push(`/study-problems/schedules/${scheduleId}`);
}

const toggleParticipate = async () => {
	const previousState = participate.value;
	try {
		const memberId = JSON.parse(localStorage.getItem('token')).userId;
		participate.value = !participate.value;
		schedule.value.numParticipants += (participate.value ? 1 : -1);

		const newParticipant = {
			participant_id: null,
			schedule_id: schedule.value.id,
			member_id: memberId,
			submission_status: participate.value ? "PARTICIPATED" : "NOT_PARTICIPATED",
			num_submitted_problems: 0,
			testScore: null,
			testPercentage: null
		};

		const response = await axios.post('http://localhost:8080/schedule-service/api/study-schedule/participant', newParticipant, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (!response.data.success) {
			throw new Error(response.data.message || 'Unknown error');
		}
		console.log('Participation updated successfully:', response.data);
	} catch (error) {
		console.error('Error updating participation:', error);
		// Revert state on error
		participate.value = previousState;
		schedule.value.numParticipants += (participate.value ? -1 : 1);
		alert('참여 상태를 업데이트하는데 오류가 발생했습니다. 다시 시도해주세요.');
	}
};
</script>

<style scoped>
.btn-participate {
	margin-right: 3rem;
}

.schedule-buttons {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: right;
	gap: 2rem;
}

.schedule-content {
	width: 100%;
	margin-top: 5.3rem;
	display: flex;
	flex-direction: column;
	justify-content: left;
}

.schedule-subtitle {
	font-size: 2rem;
	margin: 0.5rem 0;
}

.chart-container {
	margin-top: 2rem;
	width: 100%;
}
</style>
