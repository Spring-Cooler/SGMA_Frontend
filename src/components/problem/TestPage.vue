<template>
	<header class="top-nav">
		<div class="test-title">
			<p>올림픽 문제 스터디</p>
		</div>
		<div class="timer-wrapper">
			<div class="timer">
				<i class="fa-regular fa-clock"></i>
				<p class="time-left">00:14:29</p>
			</div>
		</div>
	</header>
	<main class="main">
		<section class="main-content">
			<div class="problem-container">
				<div class="problem-content">
					<p>8. 오륜기에 들어가는 색깔이 아닌 것은?</p>
				</div>
				<form class="problem-choice">
					<label for="option1">
						<input type="radio" id="option1" name="chk_ans" value="빨강">
						<p>(1) 빨강</p>
					</label>
					<label for="option2">
						<input type="radio" id="option2" name="chk_ans" value="노랑">
						<p>(2) 노랑</p>
					</label>
					<label for="option3">
						<input type="radio" id="option3" name="chk_ans" value="파랑">
						<p>(3) 파랑</p>
					</label>
					<label for="option4">
						<input type="radio" id="option4" name="chk_ans" value="보라">
						<p>(4) 보라</p>
					</label>
				</form>
			</div>
		</section>
	</main>

	<aside class="side-nav">
		<div class="info">문제 리스트</div>
		<div class="menu-container">
			<div class="top-menu-container">
				<button type="button" id="btn1" class="btn problem-btn">1</button>
				<button type="button" id="btn2" class="btn problem-btn">2</button>
				<button type="button" id="btn3" class="btn problem-btn">3</button>
				<button type="button" id="btn4" class="btn problem-btn">4</button>
				<button type="button" id="btn5" class="btn problem-btn">5</button>
				<button type="button" id="btn6" class="btn problem-btn">6</button>
				<button type="button" id="btn7" class="btn problem-btn">7</button>
				<button type="button" id="btn8" class="btn problem-btn">8</button>
				<button type="button" id="btn9" class="btn problem-btn">9</button>
				<button type="button" id="btn10" class="btn problem-btn">10</button>
			</div>
			<div class="bottom-menu-container">
				<button type="button" id="prev" class="btn move-btn">이전 문제</button>
				<button type="button" id="next" class="btn move-btn">다음 문제</button>
				<button type="button" id="submit" class="btn submit-btn">제출하기</button>
			</div>
		</div>
	</aside>
</template>

<script setup>

</script>

<style scoped>
body,
html {
	height: 100%;
	margin: 0;
	padding: 0;
}

ul,
li,
dl,
dt,
dd,
p,
span {
	margin: 0;
	padding: 0;
}

a {
	text-decoration: none;
}

li {
	list-style: none;
}

*,
:after,
:before {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

:root {
	font-size: 10px;
	font-family: 'Noto Sans';
	color: #202020;
}

.root-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
}

.top-nav {
	position: fixed;
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 16rem;
	background-color: #A1B872;
	font-size: 6rem;
	font-weight: 600;
	color: #FFFFFF;
}

.test-title {
	display: flex;
	height: 100%;
	align-items: center;
	margin-left: 14rem;
}

.timer-wrapper {
	display: flex;
	height: 100%;
	width: 45rem;
	justify-content: center;
	align-items: center;
	margin-right: 1.4rem;
}

.timer {
	display: flex;
	height: 11.5rem;
	width: 100%;
	border-radius: 1rem;
	background-color: #7F915B;
	justify-content: space-evenly;
	align-items: center;
}

.timer i {
	font-size: 7.2rem;
}

.main {
	display: flex;
	justify-content: center;
	width: calc(100% - 48rem);
	height: 100%;
	/* margin-top: 16rem; */
}

.main-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70%;
	background-color: #FFFFFF;
}

.side-nav {
	position: fixed;
	right: 0px;
	bottom: 0px;
	display: flex;
	flex-direction: column;
	width: 48rem;
	height: calc(100% - 16rem);
	background-color: #E0E9C8;
}

.info {
	display: flex;
	width: 100%;
	height: 10.8rem;
	justify-content: center;
	align-items: center;
	background-color: #7F915B;
	font-size: 3.2rem;
	font-weight: 700;
	color: #FFFFFF;
}

.menu-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: calc(100% - 10.8rem);
}

.top-menu-container {
	display: flex;
	flex-wrap: wrap;
	width: 40rem;
	gap: 2rem;
	margin-top: 4.6rem;
}

.bottom-menu-container {
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	justify-content: center;
	margin-bottom: 4rem;
}

.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	border: none;
	box-shadow: 0rem 0.2rem 0.4rem #8c8c8c;
	border-radius: 1rem;
	font-size: 2rem;
	font-weight: 600;
	cursor: pointer;
}

.problem-btn {
	height: 6rem;
	width: 6rem;
}

.problem-btn:hover {
	background-color: #f1f1f1;
	transition: 0.2s ease-in;
}

.move-btn {
	height: 8rem;
	width: 18rem;
}

.move-btn:hover {
	background-color: #f1f1f1;
	transition: 0.2s ease-in;
}

.submit-btn {
	height: 8rem;
	width: 38rem;
	color: #FFFFFF;
	background-color: #FFE083;
	border: none;
}

.submit-btn:hover {
	background-color: #ffda6c;
	transition: 0.2s ease-in;
}

.problem-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 15rem;
}

.problem-content {
	display: flex;
	font-size: 4rem;
	font-weight: 600;
}

.problem-choice {
	display: flex;
	flex-direction: column;
	font-size: 3.6rem;
	font-weight: 400;
}

.problem-choice label {
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: 1em;
	margin-top: 4.8rem;
	cursor: pointer;
}

/* 기본스타일 제거, 버튼 모양 재설정 */
input[type='radio'] {
	flex-shrink: 0;
	-webkit-appearance: none;
	/* 웹킷 브라우저에서 기본 스타일 제거*/
	-moz-appearance: none;
	/* 모질라 브라우저에서 기본 스타일 제거*/
	appearance: none;
	/*기본 브라우저에서 기본 스타일 제거*/
	width: 3.6rem;
	height: 3.6rem;
	border: 1px solid #8c8c8c;
	/*체크되지 않았을 때의 테두리 색상*/
	border-radius: 50%;
	outline: none;
	/*focus 시에 나타나는 기본 스타일 제거*/
	cursor: pointer;
	margin-top: 0.9rem;
}

/* 체크 시 버튼 모양 스타일*/
input[type='radio']:checked {
	background-color: #A1B872;
	/*체크 시 내부 원 색상*/
	border: none;
}

/* 노트북 */
@media screen and (max-width: 1683px) {
	:root {
		font-size: 8px;
	}
}

@media screen and (max-width: 1439px) {
	:root {
		font-size: 7px;
	}
}

/* 태블릿 */
@media screen and (max-width: 1023px) {
	:root {
		font-size: 6px;
	}
}

/* 모바일 */
@media screen and (max-width: 767px) {
	:root {
		font-size: 4.5px;
	}
}

@media screen and (max-width: 600px) {
	:root {
		font-size: 3.2px;
	}
}

@media screen and (max-width: 424px) {
	:root {
		font-size: 2.5px;
	}
}

@media screen and (max-width: 374px) {
	:root {
		font-size: 2px;
	}
}

@media screen and (max-width: 319px) {
	:root {
		font-size: 1.8px;
	}
}
</style>