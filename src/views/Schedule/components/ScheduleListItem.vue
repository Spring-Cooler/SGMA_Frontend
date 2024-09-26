<template>
	<li class="event-list-item">
		<!-- Event Time and Details -->
		<div class="event-details">
			<strong>{{ event.startTime }} - {{ event.endTime }}</strong><br />
			{{ event.title }} - {{ event.details }}
		</div>

		<!-- Action Buttons -->
		<div class="event-actions">
			<button class="btn modify" @click="modifyEvent">Modify</button>
			<button class="btn remove" @click="removeEvent">Remove</button>
		</div>
	</li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
	event: {
		type: Object,
		required: true,
	}
});

// Define emits
const emit = defineEmits(['modify', 'remove']);

// Modify event handler
const modifyEvent = () => {
	emit('modify', props.event);
};

// Remove event handler
const removeEvent = () => {
	emit('remove', props.event);
};
</script>

<style scoped>
.event-list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 0;
	border-bottom: 1px solid #ddd;
	margin-bottom: 1rem;
}

.event-details {
	flex: 1;
	margin-right: 1rem;
	font-size: 1.4rem;
}

.event-actions {
	display: flex;
	gap: 0.5rem;
}

.btn {
	padding: 6px 12px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 1rem;
}

.btn.modify {
	color: white;
}

.btn.modify:hover {
	background-color: #0069d9;
}

.btn.remove {
	background-color: orange;
	color: white;
}

.btn.remove:hover {
	background-color: #c82333;
}
</style>
