<template>
	<Navigation />
	<StudySideBar />
	<div id="schedule-header">
		<span>스터디 일정</span>
	</div>
	<div id="schedule-container">
		<!-- Calendar Component with adjusted cell sizes and container height -->
		<VCalendar v-model="selectedDate" :attributes="attributes" @dayclick="onDayClick" expanded
			:style="customCalendarStyles" trim-weeks />
		<!-- Schedule Modal -->
		<ScheduleModal v-if="isModalVisible" :selectedDate="selectedDate" :events="selectedEvents"
			@close="closeModal" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ScheduleModal from './components/ScheduleModal.vue';
import StudySideBar from './components/StudySideBar.vue';
import Navigation from '@/components/layouts/Navigation.vue';

const selectedDate = ref(null);
const isModalVisible = ref(false);

// Sample events
const events = ref([
	{
		id: 1,
		start: new Date(2024, 8, 5),
		startTime: '09:00',
		endTime: '10:00',
		title: 'Meeting w/ Chris',
		details: 'Discussion about project.',
	},
	{
		id: 2,
		start: new Date(2024, 8, 10),
		startTime: '14:00',
		endTime: '15:30',
		title: 'Interview w/ Figma',
		details: 'UI/UX Interview.',
	},
	{
		id: 3,
		start: new Date(2024, 8, 19),
		startTime: '13:00',
		endTime: '14:00',
		title: 'St. Patrick\'s Day Celebration',
		details: 'Celebration day activities.',
	},
	{
		id: 4,
		start: new Date(2024, 8, 19),
		startTime: '15:00',
		endTime: '16:00',
		title: 'St. Patrick\'s Day Celebration',
		details: 'Celebration day activities.',
	},
]);

const attributes = computed(() => [
	{
		key: 'events',
		dates: events.value.map(event => event.start),
		bar: {
			style: {
				backgroundColor: 'gray',
			},
		},
	},
]);

// Event handler for day click
const onDayClick = (day) => {
	console.log(`onDayClick called: ${day.date}`);
	selectedDate.value = day.date;
	isModalVisible.value = true;
};

const selectedEvents = computed(() => {
	if (!selectedDate.value) return [];
	return events.value.filter(event => isSameDate(event.start, selectedDate.value));
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
#schedule-header {
	position: absolute;
	width: 100%;
	height: 10%;
	left: 10%;
	display: flex;
	justify-content: left;
	align-items: center;
}

#schedule-header>span {
	font-size: 3rem;
	font-weight: 900;
}

#schedule-container {
	position: absolute;
	top: 10%;
	width: 60vw;
	height: 60vh;
	/* Increased height to fit the calendar */
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
