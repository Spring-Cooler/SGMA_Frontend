<template>
	<aside class="side-nav">
		<div class="menu-container">
			<SideBarMenu to="/">홈</SideBarMenu>
			<SideBarMenu to="/study-groups">스터디 그룹 찾기</SideBarMenu>
			<SideBarMenu to="/create-group">스터디 그룹 만들기</SideBarMenu>
			<SideBarMenu to="/mypage">마이페이지</SideBarMenu>
			<!-- 라우터 확인용 테스트 버트임(지울 예정) -->
			<SideBarMenu to="/study-schedule">스터디 일정</SideBarMenu>
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
</style>