<template>
	<aside class="side-nav">
		<div class="menu-container">
			<SideBarMenu class="now">{{ "홈" }}</SideBarMenu>
			<SideBarMenu>{{ "스터디 그룹 찾기" }}</SideBarMenu>
			<SideBarMenu>{{ "스터디 그룹 만들기" }}</SideBarMenu>
			<SideBarMenu>{{ "마이페이지" }}</SideBarMenu>
		</div>
	</aside>
</template>

<script setup>
import SideBarMenu from './SideBarMenu.vue';
</script>

<style scoped>
.side-nav {
	position: fixed;
	left: 0px;
	bottom: 0px;
	display: flex;
	flex-direction: column;
	width: 42rem;
	height: calc(100% - 9rem);
	background-color: #ffffff;
	border-right: 1px solid #8c8c8c;
}

.menu-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 5rem;
}


.menu {
	display: flex;
	height: 7.6rem;
	width: 38rem;
	align-items: center;
	font-size: 2.8rem;
	font-weight: 700;
	color: #a6a6a6;
	border-radius: 0 1.5rem 1.5rem 0;
	cursor: pointer;
}



.menu:hover:not(.now) {
	background-color: #f1f1f1;
}

.now {
	background-color: #a1b872;
	color: #202020;
}
</style>