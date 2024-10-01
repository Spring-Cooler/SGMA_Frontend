<template>
    <div class="study-member-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <Title>스터디 그룹원</Title>
                <div class="button-container" v-if="isOwner">
                    <MediumButton label="신청자 관리" @click="goApplicant"></MediumButton>
                    <MediumButton label="그룹원 관리" @click="goMemberManagement"></MediumButton>
                </div>
                <div class="member-container">
                    <div class="member-list" v-if="loading">Loading...</div>
                    <div class="member-list" v-else>
                        <div v-for="(member, memberIndex) in memberList" :key="memberIndex">
                            <Member :data="member"></Member>
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
    import MediumButton from '@/components/common/MediumButton.vue';
    import Member from '../components/Member.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const memberList = ref([]);
    const loading = ref(true);
    const router = useRouter();
    const route = useRoute();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;
    const ownerId = 
        localStorage.getItem('groupData') ? JSON.parse(localStorage.getItem('groupData')).ownerId : null;
    const isOwner = ref(false);

    const fetchMemberData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/members/group-id/${route.params.groupId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                memberList.value = response.data;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }

    const goMemberManagement = () => {
    	router.push(`/study-groups/${route.params.groupId}/members/management`);
    }

    const goApplicant = () => {
        router.push(`/study-groups/${route.params.groupId}/applicant`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        } else {
            (userId === ownerId) ? isOwner.value = true : isOwner.value = false;
        }
        fetchMemberData();
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

