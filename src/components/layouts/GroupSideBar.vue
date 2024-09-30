<template>
	<aside class="side-nav">
		<div class="group-name"><span>콜럼버스 코테 스터디</span></div>
		<div class="menu-container">
			<SideBarMenu to="/study-groups/1/notices">스터디 공지사항</SideBarMenu>
			<SideBarMenu to="/study-groups/2/schedules">스터디 그룹 일정</SideBarMenu>
			<SideBarMenu to="/study-groups/1/boards">스터디 자유게시판</SideBarMenu>
			<SideBarMenu to="/study-groups/1/members">스터디 그룹원</SideBarMenu>
			<SideBarMenu to="/study-groups/1/recruitments">스터디 모집글</SideBarMenu>
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

.group-name {
	display: flex;
	align-items: center;
	height: 12rem;
	width: 100%;
	color: #ffffff;
	background-color: #A1B872;
	font-size: 3.2rem;
	font-weight: 700;
}

.group-name span {
	padding-left: 3rem;
	/* 왼쪽 패딩 적용 */
}

.menu-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 5rem;
}
</style>