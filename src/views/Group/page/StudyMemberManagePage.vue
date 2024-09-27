<template>
    <div class="study-member-manage-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />

        <!-- 메인 컨텐츠 -->
        <main class="main">
            <div class="main-content">
                <Title>스터디 그룹원</Title>
                <div class="button-container">
                    <TinyButton class="light-gray" label="취소" @click="goBack"></TinyButton>
                </div>
                <div class="member-container">
                    <div v-for="(item, index) in items" :key="index">
                        <!-- 데이터를 바탕으로 표시할 컴포넌트 -->
                        <Member :data="item" :management="true"></Member>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import GroupSideBar from '@/components/layouts/GroupSideBar.vue';
import Title from '@/components/common/Title.vue';
import TinyButton from '@/components/common/TinyButton.vue';
import Member from '../components/Member.vue';
import axios from 'axios';
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const items = ref([]);
const loading = ref(true);
const groupId = ref(1);
const router = useRouter();

const fetchData = async () => {
    try {
        let response; // response 변수를 미리 선언
        response = await axios.get(`/api/study-group/members/group-id/${groupId.value}`);
        items.value = response.data.data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

function goBack() {
	router.go(-1);
}

onMounted(() => {
    fetchData();
});
</script>

<style>
    .button-container {
        display: flex;
        width: 100%;
        justify-content: right;
        height: 4.8rem;
        gap: 2rem;
    }

    .member-container {
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .member-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .member-list div:last-child div {
        border: none;
    }
</style>

