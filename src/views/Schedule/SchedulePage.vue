<template>
	<Navigation />
	<StudySideBar />
	<div id="schedule-container">

		<!-- Calendar Component -->
		<VCalendar v-model="selectedDate" :attributes="attributes" @dayclick="onDayClick" />

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
	}, {
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
				backgroundColor: 'gray'
			}
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
</script>

<style scoped>
#schedule-container {
	position: fixed;
}
</style>
