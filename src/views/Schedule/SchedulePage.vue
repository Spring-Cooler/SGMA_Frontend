<template>
	<Navigation />
	<GroupSideBar />
	<main class="main">
		<div class="main-content">
			<div class="schedule-header">
				<span>스터디 일정</span>
			</div>
			<div class="schedule-container">
				<!-- Calendar Component with adjusted cell sizes and container height -->
				<VCalendar v-model="selectedDate" :attributes="attributes" @dayclick="onDayClick" expanded
					:style="customCalendarStyles" trim-weeks />
				<!-- Schedule Modal -->
				<ScheduleModal v-if="isModalVisible" :selectedDate="selectedDate" :events="selectedEvents"
					@close="closeModal" />
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import ScheduleModal from './components/ScheduleModal.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import Navigation from '@/components/layouts/Navigation.vue';

const router = useRouter();

const selectedDate = ref(null);
const isModalVisible = ref(false);
const props = defineProps({
	groupId: {
		type: String,
		required: true
	}
});

const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

// Sample events (will be populated with API data)
const events = ref([]); // Start with an empty array

// Fetch data from the API
const fetchData = async () => {
	try {
		const response = (await axios.get(`/schedule-service/api/study-schedule/scheduleGroup/${props.groupId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})).data;

		if (response.success) {
			console.log('일정 조회 성공');
			console.log(response.data);

			// Parse response data into the events array
			events.value = response.data.map(event => ({
				id: event.schedule_id,
				scheduledDate: new Date(event.schedule_start_time),  // Use the start time for the main event date
				startTime: new Date(event.schedule_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Parse time
				endTime: new Date(event.schedule_end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Parse time
				title: event.title,
				details: event.content,  // Map 'content' field to 'details'
				testStatus: event.test_status === 'Y',  // Convert 'Y'/'N' to boolean
				numProblemsPerParticipant: event.num_problems_per_participant || 0,  // Default to 0 if not provided
				numParticipants: event.num_participants || 0,  // Default to 0 if not provided
				test_average: event.test_average,
				test_standard_deviation: event.test_standard_deviation

			}));

			console.log('Transformed events:', events.value);
		}
	} catch (error) {
		console.log(`error fetching data: ${error}`);
	}
};

// Run fetchData on mounted
onMounted(() => {
	if (!accessToken) {
		alert('로그인을 해주세요');
		router.push('/');
		return;
	}
	fetchData();
});

// Calendar attributes for marking event dates
const attributes = computed(() => [
	{
		key: 'events',
		dates: events.value.map(event => event.scheduledDate),
		bar: {
			style: {
				backgroundColor: 'gray',
			},
		},
	},
]);

// Event handler for day click
const onDayClick = (day) => {
	selectedDate.value = day.date;
	isModalVisible.value = true;
};

// Filter events based on the selected date
const selectedEvents = computed(() => {
	if (!selectedDate.value) return [];
	return events.value.filter(event => isSameDate(event.scheduledDate, selectedDate.value));
});

// Close modal
const closeModal = () => {
	isModalVisible.value = false;
};

// Compare if two dates are the same
const isSameDate = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

// Custom styles for the calendar cells
const customCalendarStyles = {
	'--vc-day-content-height': '8rem', // Adjust the height of the date cell
	'--vc-day-content-width': '8rem',  // Adjust the width of the date cell
	'--vc-day-font-size': '1.5rem',    // Increase the font size of the date text
};
</script>

<style scoped>
.schedule-header {
	width: 100%;
	display: flex;
	justify-content: left;
	align-items: center;
	margin-top: 9.4rem;
}

.schedule-header>span {
	font-size: 4rem;
	font-weight: 900;
}

.schedule-container {
	width: 100%;
	margin-top: 5.3rem;
}

/* Custom styles for the v-calendar container */
.vc-container {
	height: 60vw !important;
	max-height: 60vh !important;
}

.vc-day {
	width: 8rem !important;
	height: 8rem !important;
}

.vc-day-content {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.5rem;
}

.vc-day:hover {
	background-color: #e0f7fa !important;
}
</style>
