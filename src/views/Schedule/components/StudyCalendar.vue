<template>
	<DatePicker v-model="date" mode="dateTime" hide-time-header is24hr expanded />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css'; import { useScreens } from 'vue-screen-utils';

const date = ref(new Date());

</script>

<style scoped></style>