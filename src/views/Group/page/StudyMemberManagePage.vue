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
                    <div class="member-list" v-if="loading">Loading...</div>
                    <div class="member-list" v-else>
                        <div v-for="(item, index) in items" :key="index">
                            <!-- 데이터를 바탕으로 표시할 컴포넌트 -->
                            <Member :data="item" :management="true" @kick="kick(item.member_id)"></Member>
                        </div>
                    </div>
                </div>
                <DeleteModal :isVisible="modalVisibility" @confirm="confirm" @cancel="cancel">해당 회원을 추방하시겠습니까?</DeleteModal>
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
import DeleteModal from '@/components/common/DeleteModal.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const items = ref([]);
const loading = ref(true);
const groupId = ref(1);
const router = useRouter();
const accessToken = JSON.parse(localStorage.getItem('token')).accessToken;
const modalVisibility = ref(false);
const memberId = ref(null);

const fetchData = async () => {
    try {
        let response; // response 변수를 미리 선언
        response = await axios.get(`/study-group-service/api/study-group/members/group-id/${groupId.value}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        items.value = response.data.data;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

const kick = (id) => {
    modalVisibility.value = true;
    memberId.value = id;
}

const confirm = async () => {
    try {
        let response; // response 변수를 미리 선언
        response = await axios.delete(`/study-group-service/api/study-group/members/${memberId.value}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    } catch (error) {
        console.error(error);
    }
    modalVisibility.value = false;
    fetchData();
}

const cancel = () => {
    modalVisibility.value = false;
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
        margin-top: 2rem;
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

