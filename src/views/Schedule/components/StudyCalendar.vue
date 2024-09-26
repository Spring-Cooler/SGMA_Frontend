<template>
	<VCalendar :attributes="attrs" v-model="selectedDate" @dayClick="onDayClick" hide-time-header expanded />



</template>

<script setup>
import { ref, computed } from 'vue'
const selectedDate = ref(null);
const isModalVisible = ref(false);
const attrs = computed(() => [

]);



const onDayClick = (day) => {
	console.log("onDayClick")
	selectedDate.value = day.date;
	isModalVisible.value = true;
	console.log(day.value);
}
</script>

<style scoped>
template {
	position: relative
}
</style>