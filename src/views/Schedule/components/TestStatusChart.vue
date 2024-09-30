<template>
	<div class="chart-container">
		<!-- Only render the Bar chart if chartData and its labels are defined and non-empty -->
		<Bar v-if="chartData && chartData && chartData.labels.length > 0" :data="chartData" :options="chartOptions" />
		<p v-else>데이터가 없습니다.</p> <!-- Display a message if there is no data -->
	</div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering the required chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
	participants: {
		type: Array,
		default: () => []
	},
	currentUser: {
		type: Object,
		default: () => null
	}
});

const chartData = ref({
	labels: [], // Participant names or IDs
	datasets: [{
		label: 'Test Scores',
		backgroundColor: [], // Custom colors to highlight user
		data: []  // Test scores
	}]
});

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		y: {
			beginAtZero: true,
			title: {
				display: true,
				text: 'Score'
			}
		},
		x: {
			title: {
				display: true,
				text: 'Participants'
			}
		}
	},
	plugins: {
		tooltip: {
			callbacks: {
				label: function (context) {
					const rank = context.dataIndex + 1;
					const score = context.raw;
					return `Rank: ${rank}, Score: ${score}`;
				}
			}
		}
	}
};

// Watch for changes in participants and update the chart data
watch(() => props.participants, (newVal) => {
	console.log("Participants received:", newVal);
	if (newVal && newVal.length > 0) {
		// Filter and sort participants by test score in descending order
		const rankedParticipants = newVal
			.filter(p => p.test_score !== null && p.test_score !== undefined)
			.sort((a, b) => b.test_score - a.test_score);

		// Log the ranked participants after filtering
		console.log("Ranked Participants:", rankedParticipants);

		// Update labels (participant names or member IDs) and test scores
		chartData.value.labels = rankedParticipants.map(p => p.name || `User ${p.member_id}`);
		chartData.value.datasets[0].data = rankedParticipants.map(p => p.test_score);

		// Highlight current user with a different color (red), others green
		chartData.value.datasets[0].backgroundColor = rankedParticipants.map(p =>
			p.member_id === props.currentUser?.member_id ? '#FF5252' : '#4CAF50'
		);
	} else {
		// Clear the chart data if there are no participants
		console.warn('No valid participants found');
		chartData.value.labels = [];
		chartData.value.datasets[0].data = [];
		chartData.value.datasets[0].backgroundColor = [];
	}
}, { immediate: true });
</script>

<style scoped>
.chart-container {
	width: 100%;
	height: 400px;
	/* Ensure the chart container has proper height */
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
