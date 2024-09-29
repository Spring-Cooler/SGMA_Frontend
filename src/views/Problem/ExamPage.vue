<template>
	<div class="root-container">
		<header class="top-nav">
			<div class="test-title">
				<p>올림픽 문제 스터디</p>
			</div>
		</header>
		<main class="main">
			<section class="main-contents">
				<div class="problem-container">
					<!-- Add v-if to check if current_problem is defined -->
					<div class="problem-content" v-if="current_problem">
						<p>{{ problemIndex + 1 }}. {{ current_problem.content }}</p>
					</div>

					<!-- Similarly, add a v-if check before rendering the choices -->
					<form class="problem-choice" v-if="current_problem && current_problem.choices">
						<label v-for="(item, index) in current_problem.choices" :key="index">
							<input type="radio" name="chk_ans" :value="index + 1"
								v-model="current_problem.submitted_answer" />
							<p>{{ index + 1 }}. {{ item.content }}</p>
						</label>
					</form>
				</div>
			</section>
		</main>
		<aside class="side-nav">
			<div class="info">문제 리스트</div>
			<div class="menu-container">
				<div class="top-menu-container">
					<!-- Safeguard against undefined problemInfos -->
					<button v-for="(problem, idx) in problemInfos" class="btn problem-btn" :key="problem.problem_id"
						@click="problemIndex = idx">
						{{ idx + 1 }}
					</button>
				</div>
				<div class="bottom-menu-container">
					<button type="button" id="prev" @click="problemIndex = Math.max(0, problemIndex - 1)"
						:disabled="problemIndex < 1" class="btn move-btn">
						이전 문제
					</button>
					<button type="button" id="next"
						@click="problemIndex = Math.min(problemInfos.length - 1, problemIndex + 1)" class="btn move-btn"
						:disabled="problemIndex >= problemInfos.length - 1">
						다음 문제
					</button>
					<button type="button" id="submit" class="btn submit-btn">제출하기</button>
				</div>
			</div>
		</aside>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
	scheduleId: {
		type: String,
		required: true
	}
});

const router = useRouter();
const accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

let problemIndex = ref(0);
let problemInfos = ref([]);
let current_problem = ref(null);  // Initialize current_problem as null

// Watch for changes in problemIndex and update current_problem
watch(problemIndex, (newIndex) => {
	if (problemInfos.value.length > 0) {
		current_problem.value = problemInfos.value[newIndex];
	}
});

// Fetch data function
const fetchData = async () => {
	try {
		const response = (await axios.get(`/schedule-service/api/study-problems/schedules/${props.scheduleId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})).data;
		console.log(response)
		if (response.success) {
			problemInfos.value = response.data;
			console.log(problemInfos.value);
			// Set the current problem to the first one after fetching data
			current_problem.value = problemInfos.value[problemIndex.value];
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

onMounted(() => {
	if (!accessToken) {
		alert('로그인을 해주세요');
		router.push('/');
		return;
	}

	// Fetch data when the component is mounted
	fetchData();
});
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
	margin-top: 16rem;
	margin-left: 0;
}

.main-contents {
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
	color: black;
	height: 6rem;
	width: 6rem;
}

.problem-btn:hover {
	background-color: #f1f1f1;
	transition: 0.2s ease-in;
}

.move-btn {
	color: black;
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
</style>