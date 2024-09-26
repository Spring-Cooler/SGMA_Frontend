<template>
	<VCalendar :attributes="attrs" :rules="rules" hide-time-header expanded>
		<template #day-popover>
			<div class="text-xs text-gray-700 dark:text-gray-300">
				using my own content now
			</div>
		</template>
	</VCalendar>

</template>

<script setup>
import { ref, computed } from 'vue'

const todos = ref([
	{
		description: 'Take Noah to basketball practice.',
		isComplete: false,
		dates: { repeat: { weekdays: 6 } }, // Every Friday
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
		popover: true,
		customData: true
	})),
]);

const rules = ref({
	minutes: [0, 30]
})
</script>

<style scoped></style>