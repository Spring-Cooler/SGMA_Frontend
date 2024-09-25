<template>
	<DatePicker v-model="date" mode="dateTime" hide-time-header is24hr />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar';
import { useScreens } from 'vue-screen-utils';
import 'v-calendar/style.css';
const date = ref(new Date());

</script>

<style scoped></style>