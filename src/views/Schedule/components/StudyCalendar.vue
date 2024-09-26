<template>
	<VDatePicker :attributes="attrs" :rules="rules" hide-time-header expanded>
		<template #schedule-modal>
			<ScheduleModal />
		</template>
	</VDatePicker>

</template>

<script setup>
import { ref, computed } from 'vue'
import ScheduleModal from './ScheduleModal.vue';

const todos = ref([
	{
		description: 'Take Noah to basketball practice.',
		isComplete: false,
		dates: { repeat: { weekdays: 5 } }, // Every Friday
		color: 'red',
	},
]);
const attrs = computed(() => [
	// Attributes for todos
	...todos.value.map(todo => ({
		dates: todo.dates,
		dot: {
			color: todo.color,
			...(todo.isComplete && { class: 'opacity-75' }),
		},
		popover: {
			label: todo.description,
			visibility: 'click'
		},
	})),
]);

const rules = ref({
	minutes: [0, 30]
})
</script>

<style scoped></style>