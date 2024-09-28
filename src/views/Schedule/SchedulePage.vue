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
import { ref, computed } from 'vue';
import ScheduleModal from './components/ScheduleModal.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import Navigation from '@/components/layouts/Navigation.vue';

const selectedDate = ref(null);
const isModalVisible = ref(false);

// Sample events
const events = ref([
	{
		id: 1,
		scheduledDate: new Date(2024, 8, 5),
		startTime: '09:00',
		endTime: '10:00',
		title: '올림픽스터디',
		details: '올림픽 내용 복습.',
		testStatus: true,
		numProblemsPerParticipant: 3,
		numParticipants: 2


	},
	{
		id: 2,
		scheduledDate: new Date(2024, 8, 10),
		startTime: '14:00',
		endTime: '15:30',
		title: '피그마스터디',
		details: '피그마 설계.',
		testStatus: false,
		numParticipants: 3


	},
	{
		id: 3,
		scheduledDate: new Date(2024, 8, 19),
		startTime: '13:00',
		endTime: '14:00',
		title: '코테스터디',
		details: '코테코테.',
		testStatus: true,
		numProblemsPerParticipant: 4,
		numParticipants: 2


	},
	{
		id: 4,
		scheduledDate: new Date(2024, 8, 19),
		startTime: '15:00',
		endTime: '16:00',
		title: '자바스터디',
		details: '자바.',
		testStatus: true,
		numProblemsPerParticipant: 2,
		numParticipants: 0


	},
]);

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
	// console.log(`onDayClick called: ${day.date}`);
	selectedDate.value = day.date;
	isModalVisible.value = true;
};

const selectedEvents = computed(() => {
	if (!selectedDate.value) return [];
	return events.value.filter(event => isSameDate(event.scheduledDate, selectedDate.value));
});

const closeModal = () => {
	isModalVisible.value = false;
};

// Compare dates
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
	/* Ensuring the container takes full height of the parent */
	max-height: 60vh !important;
	/* Remove any height restrictions */
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

	/* Optional: to make the cells rounded */
}

.vc-day:hover {
	background-color: #e0f7fa !important;
	/* Hover effect */
}
</style>
