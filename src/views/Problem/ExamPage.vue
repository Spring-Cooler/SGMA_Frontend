<template>
	<div id="exam-header" class="olive">
		<h1>올림픽 문제 스터디</h1>
	</div>
</template>

<script setup>
</script>

<style scoped>
#exam-header {
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 20rem;
	z-index: 1000;
}

#exam-header>h1 {
	margin-left: 8rem;
	font-size: 8rem;
	color: white;
}
</style>