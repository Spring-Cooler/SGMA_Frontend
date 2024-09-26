<template>
	<h1>스터디 일정</h1>

	<VCalendar v-model="selectedDate" :attributes="attributes" @dayclick="onDayClick" />
	<ScheduleModal v-if="isModalVisible" @close="closeModal" />
</template>

<script setup>
import { ref, computed } from 'vue';
import ScheduleModal from './components/ScheduleModal.vue';
const events = ref([
	{ id: 1, start: new Date(2024, 8, 5), title: 'Meeting w/ Chris', details: 'Discussion about project.' },
	{ id: 2, start: new Date(2024, 8, 10), title: 'Interview w/ Figma', details: 'UI/UX Interview.' },
	{ id: 3, start: new Date(2024, 8, 19), title: 'St. Patrick\'s Day!', details: 'Celebration day!' },
]);
const selectedDate = ref(null);
const isModalVisible = ref(false);
const attributes = computed(() => [
	{
		key: 'events',
		dates: events.value.map(event => event.start),
		popover: {
			label: (date) => {
				const event = events.value.find(e => isSameDate(e.start, date));
				return event ? event.title : '';
			},
		},
	},
]);
// Event handler for date click
const onDayClick = () => {
	console.log(`onDayClick called: ${isModalVisible.value}`); // Debug log
	isModalVisible.value = true;
};


const isSameDate = (date1, date2) => {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

const selectedEvents = computed(() => {
	if (!selectedDate.value) return [];
	return events.value.filter(event => isSameDate(event.start, selectedDate.value));
});

// Method to close the modal
const closeModal = () => {
	isModalVisible.value = false;
};
</script>

<style scoped>
template {
	position: relative
}
</style>