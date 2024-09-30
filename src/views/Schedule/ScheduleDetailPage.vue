<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<Title>{{ schedule.title }}</Title>
			<div class="schedule-buttons">
				<button
					:class="{ 'btn': true, 'orange': !participate, 'sunset-orange': participate, 'btn-participate': true }"
					@click="toggleParticipate">{{
						participate ? '참여 취소' : '일정 참여' }}</button>
			</div>
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
				<div v-if="schedule.testStatus">
					<p class="schedule-subtitle"><strong>출제 문제 수:</strong> {{
						schedule.numProblemsPerParticipant }}</p>
					<p class="schedule-subtitle"><strong>평균: </strong> {{ schedule.test_average }}</p>
					<p class="schedule-subtitle"> <strong>표준 편차: </strong>{{ schedule.test_standard_deviation }}</p>
					<p class="schedule-subtitle" v-if="participate"> <strong>내 점수: </strong>{{ 37 }}</p>
				</div>



			</div>

			<div class="schedule-buttons" v-if="participate && schedule.testStatus">
				<!-- buttons -->
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
const props = defineProps({
	scheduleId: {
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

/* participateInfo에 추가할 예정 */
let participate = ref(false);
let participateInfo = ref(null);
// 라우터와 현재 경로 정보를 사용
const route = useRoute();
const router = useRouter();

const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
// 컴포넌트가 마운트될 때 라우터 파라미터로 전달된 스케줄 정보 가져오기
onMounted(() => {
	if (!accessToken) {
		alert('로그인을 해주세요');
		router.push('/');
		return;
	}
	fetchData();
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
		schedule.value.test_average = props.schedule.test_average;
		schedule.value.test_standard_deviation = props.schedule.test_standard_deviation;
		console.log(`schedule: ${schedule.value}`)
		console.log(accessToken);
	} else {
		console.log('No schedule passed. Fetch from store or API using ID:', props.id);
	}

});
const fetchData = async () => {
	try {
		const response = (await axios.get(`/schedule-service/api/study-schedule/scheduleParticipant/${props.scheduleId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})).data;

		if (response.success) {
			console.log("getParticipants:");
			console.log(response);

			// Correctly access the participants array
			const participants = response.data || [];  // Ensure we're accessing the participants from the data property
			const memberId = JSON.parse(localStorage.getItem('token')).userId; // Get current member ID

			// Check if the current user is in the participants array
			const foundParticipant = participants.find(participant => participant.member_id == memberId); // Use member_id to match

			if (foundParticipant) {
				// User is participating, set the status and participant info
				participate.value = true;
				participateInfo.value = foundParticipant; // Set the found participant's details
				console.log("Participant found:", participateInfo.value);
			} else {
				// User is not participating
				participate.value = false;
				participateInfo.value = null;
				console.log("Participant not found");
			}
		}
	} catch (error) {
		console.log("Error fetching data:", error);
	}
};


// 스케줄 목록으로 돌아가기
const goToExamPage = () => {
	const scheduleId = 3;
	router.push(`/study-problems/schedules/${scheduleId}`);
}

// const toggleParticipate = () => {
// 	participate.value = !participate.value;
// 	schedule.value.numParticipants += (participate.value ? 1 : -1);

// }
// Toggle participation method
const previousState = participate.value;
const toggleParticipate = async () => {
	// Capture the current state before toggling
	const previousState = participate.value;

	try {
		const memberId = JSON.parse(localStorage.getItem('token')).userId; // Fetch memberId from token

		// Toggle local participation state
		participate.value = !participate.value;

		// Update the participant count based on the new participation status
		schedule.value.numParticipants += (participate.value ? 1 : -1);

		// Create the request payload
		const newParticipant = {
			participant_id: null,  // Replace this with the actual participantId if available
			schedule_id: schedule.value.id,
			member_id: memberId,  // memberId fetched from token
			submission_status: participate.value ? "PARTICIPATED" : "NOT_PARTICIPATED",
			num_submitted_problems: 0,
			testScore: null,
			testPercentage: null
		};
		console.log(newParticipant);

		// Send a POST request to update participation
		const response = await axios.post('http://localhost:8080/schedule-service/api/study-schedule/participant', newParticipant, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (response.data.success) {
			console.log('Participation updated successfully:', response.data);
		} else {
			throw new Error('Participation update failed: ' + (response.data.message || 'Unknown error'));
		}

	} catch (error) {
		console.error('Error updating participation:', error.response ? error.response.data : error.message);

		// Revert state on error
		participate.value = previousState;  // Revert to the previous participation state
		schedule.value.numParticipants += (participate.value ? 1 : -1); // Adjust the participant count accordingly
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



h1 {
	font-size: 3rem;
	margin-bottom: 1rem;
}
</style>
