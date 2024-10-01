<template>
    <div class="study-group-applicant-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <Title>스터디 참가 신청자 관리</Title>
                <div class="button-container">
                    <TinyButton class="light-gray" label="취소" @click="goMember"></TinyButton>
                </div>
                <div class="applicant-container">
                    <div class="applicant-list loading" v-if="loading">참가 신청자가 없습니다.</div>
                    <div class="applicant-list" v-else>
                        <div v-for="(applicant, applicantIndex) in applicantList" :key="applicantIndex">
                            <Applicant :data="applicant" :management="true" @accept="handleAccept" @reject="handleReject"></Applicant>
                        </div>
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
    import Applicant from '../components/Applicant.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const applicantList = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const route = useRoute();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

    const fetchApplicantData = async () => {
        try {
            const response = (await axios.get(`/recruitment-service/api/study-applicant/group/${route.params.groupId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                applicantList.value = response.data;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleAccept = async (userId, recruitmentId) => {
        try {
            const response = (await axios.post(`/recruitment-service/api/study-applicant/${userId}/${recruitmentId}`,null,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                if (response.success) {
                    applicantList.value = applicantList.value.filter(applicant => applicant.userId !== userId);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleReject = async (userId, recruitmentId) => {
        try {
            const response = (await axios.put(`/recruitment-service/api/study-applicant/${userId}/${recruitmentId}`,null,{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                if (response.success) {
                    applicantList.value = applicantList.value.filter(applicant => applicant.userId !== userId);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    function goMember() {
    	router.push(`/study-groups/${route.params.groupId}/members`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchApplicantData();
    });
</script>

<style scoped>
    .button-container {
        display: flex;
        width: 100%;
        justify-content: right;
        height: 4.8rem;
        gap: 2rem;
    }

    .applicant-container {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-top: 2rem;
    }

    .applicant-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .applicant-list div:last-child div {
        border: none;
    }
</style>
