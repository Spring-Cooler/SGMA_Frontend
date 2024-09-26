<template>
	<dialog :open="isDialogOpen">
		<article>
			<h2>모달제목</h2>
			<!-- slot 들어갈 자리{{모달 내용}} -->
			<footer>
				<button @click.stop="closeModal(event)">버튼1</button>
				<button @click.stop="closeModal(event)">버튼2</button>
			</footer>
		</article>
	</dialog>

</template>

<script setup>
import "@picocss/pico";
import { ref } from 'vue';
let isDialogOpen = ref(true);
const closeModal = (modal) => {
	console.log(`modal button clicked, isDialogOpen: ${isDialogOpen.value}`);
	isDialogOpen.value = false;
}
</script>

<style scoped>
dialog {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #00000048;
	/* display: grid; */
}
</style>