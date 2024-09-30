<template>
	<li class="event-list-item" @click="goToDetail">
		<!-- Event Time and Details -->
		<div class="event-details">
			<strong>{{ event.startTime }} - {{ event.endTime }}</strong><br />
			{{ event.title }} - {{ event.details }}
		</div>

		<!-- Action Buttons -->
		<div class="event-actions">
			<button class="btn popsicle" @click.stop="modifyEvent">Modify</button>
			<button class="btn sunset-orange" @click.stop="removeEvent">Remove</button>
		</div>
	</li>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Vue Router 사용을 위해 import

// Define props
const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
});
onMounted(() => {
	console.log(props.event);
})
// Define emits
const emit = defineEmits(['modify', 'remove']);

// Vue Router 사용 설정
const router = useRouter();

// 상세 페이지 이동 함수
const goToDetail = () => {
	console.log(props.event.id);
	router.push({
		name: "ScheduleDetailPage",
		params: { scheduleId: props.event.id },
		query: { schedule: JSON.stringify(props.event) },
	});
};

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
	cursor: pointer;
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
	background-color: #007bff;
}

.btn.modify:hover {
	background-color: #0069d9;
}

.btn.remove {
	background-color: red;
	color: white;
}

.btn.remove:hover {
	background-color: #c82333;
}
</style>
