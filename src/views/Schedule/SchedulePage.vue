<template>
	<div>
		<h1>스터디 일정</h1>
		<!-- Calendar Component -->
		<v-calendar v-model="selectedDate" :attributes="attributes" @dayclick="onDayClick" expanded />

		<!-- Schedule Modal -->
		<ScheduleModal v-if="isModalVisible" :selectedDate="selectedDate" :events="selectedEvents"
			@close="closeModal" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ScheduleModal from './components/ScheduleModal.vue';

const selectedDate = ref(null);
const isModalVisible = ref(false);

// Sample events
const events = ref([
	{ id: 1, start: new Date(2024, 8, 5), title: 'Meeting w/ Chris', details: 'Discussion about project.' },
	{ id: 2, start: new Date(2024, 8, 10), title: 'Interview w/ Figma', details: 'UI/UX Interview.' },
	{ id: 3, start: new Date(2024, 8, 19), title: 'St. Patrick\'s Day!', details: 'Celebration day!' },
]);

const attributes = computed(() => [
	{
		key: 'events',
		dates: events.value.map(event => event.start),
		dot: {
			style: {
				backgroundColor: 'green'
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
div {
	position: relative;
}
</style>
