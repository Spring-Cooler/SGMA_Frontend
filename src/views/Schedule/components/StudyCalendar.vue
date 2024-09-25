<template>
	<Calendar :attributes="attrs" hide-time-header is24hr expanded />
</template>

<script setup>
import { ref } from 'vue'
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

const attrs = ref([{
	key: 'today',
	dates: new Date(),

}])
</script>

<style scoped></style>