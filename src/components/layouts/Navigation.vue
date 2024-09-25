<template>
	<header class="top-nav">
		<div class="top-left-menu-container">
			<img class="logo hide-text" src="@/assets/logo.svg" alt="logo" />
			<span>SGMA</span>
		</div>
		<div class="top-right-menu-container">
			<div class="search-bar">
				<i class="fa-solid fa-magnifying-glass"></i>
				<span>스터디 그룹 찾아보기</span>
			</div>
			<div class="login-btn-wrapper">
				<button type="button" id="login-btn" class="btn login-btn">로그인</button>
			</div>
		</div>
	</header>
</template>

<script setup>

</script>

<style scoped>
.top-nav {
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 9rem;
	background-color: #ffffff;
	border-bottom: 1px solid #8c8c8c;
}

.top-left-menu-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin-left: 3.4rem;
	cursor: pointer;
}

.top-left-menu-container img {
	height: 100%;
	width: 10.25rem;
}

.top-left-menu-container span {
	color: #a1b872;
	font-size: 3.5rem;
	font-weight: 700;
}

.top-right-menu-container {
	display: flex;
	gap: 4rem;
	margin-right: 5rem;
}

.search-bar {
	display: flex;
	align-items: center;
	height: 4.8rem;
	width: 29rem;
	background-color: #e3e4e5;
	border-radius: 10px;
	color: #888888;
	font-size: 2.4rem;
	font-weight: 500;
	gap: 1rem;
	cursor: pointer;
}

.search-bar i {
	margin-left: 1rem;
}

.login-btn-wrapper {
	display: flex;
	align-items: center;
	gap: 4rem;
}

.login-btn-wrapper::before {
	font-size: 2.4rem;
	color: #a6a6a6;
	content: "|";
}

.login-btn {
	height: 4.8rem;
	width: 10rem;
}
</style>