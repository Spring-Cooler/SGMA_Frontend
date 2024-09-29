<template>
    <div class="study-member-manage-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <Title>스터디 그룹원</Title>
                <div class="button-container">
                    <TinyButton class="light-gray" label="취소" @click="goMember"></TinyButton>
                </div>
                <div class="member-container">
                    <div class="member-list" v-if="loading">Loading...</div>
                    <div class="member-list" v-else>
                        <div v-for="(member, memberIndex) in memberList" :key="memberIndex">
                            <Member :data="member" :management="true" @kick="handleKick"></Member>
                        </div>
                    </div>
                </div>
                <DeleteModal 
                    :isVisible="modalVisibility" 
                    @confirm="handleConfirm" 
                    @cancel="handleCancel"
                >
                    해당 회원을 추방하시겠습니까?
                </DeleteModal>
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
    import { useRouter, useRoute } from 'vue-router';

    const memberList = ref([]);
    const kickMemberId = ref();
    const loading = ref(true);
    const router = useRouter();
    const route = useRoute();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const modalVisibility = ref(false);

    const fetchMemberData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/members/group-id/${route.params.groupId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            memberList.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }

    const handleKick = (memberId) => {
        modalVisibility.value = true;
        kickMemberId.value = memberId;
    }

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`/study-group-service/api/study-group/members/${kickMemberId.value}`,
            {
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

    const handleCancel = () => {
        modalVisibility.value = false;
    }

    function goMember() {
    	router.push(`/study-groups/${route.params.groupId}/members`);
    }

    onMounted(() => {
        if(accessToken === null) {
                alert("로그인을 해주세요.");
                router.push(`/`);
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

