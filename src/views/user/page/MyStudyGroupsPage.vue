<template>
    <div class="my-study-groups-page">
        <Navigation />
        <SideBar />
        <main class="main">
            <div class="main-content">
                <Title>가입한 스터디 그룹 목록</Title>
                <div class="group-info">
                    <div class="group-name">스터디 그룹명</div>
                    <div class="group-category">카테고리</div>
                    <div class="group-signup-time">가입일</div>
                </div>
                <div class="group-list" v-if="loading">Loading...</div>
                <div class="group-list" v-else>
                    <div v-for="(group, groupIndex) in groupList" :key="groupIndex">
                        <Group :data="group" @go-group-home="goGroupHome(group.group_id, group.group_name)"></Group>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import SideBar from '@/components/layouts/SideBar.vue';
    import Title from '@/components/common/Title.vue';
    import Group from '../components/Group.vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';

    const router = useRouter();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;

    const loading = ref(true);
    const groupList = ref([]);

    const fetchGroupData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-groups/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                groupList.value = response.data;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const goGroupHome = (groupId, groupName) => {
        localStorage.setItem('groupData', JSON.stringify({
            group_id: groupId,
            group_name: groupName,
        }));
        router.push(`/study-groups/${groupId}/notices`);
    }

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchGroupData();
    })
</script>

<style scoped>
    .group-info {
        display: flex;
        height: 7.2rem;
        width: 100%;
        align-items: center;
        font-size: 1.8rem;
        font-weight: 700;
        margin-top: 5.3rem;
        border-bottom: 4px solid #a6a6a6;
    }

    .group-name {
        display: flex;
        height: 100%;
        width: 50%;
        justify-content: left;
        align-items: center;
        margin-left: 2rem;
    }

    .group-category {
        display: flex;
        height: 100%;
        width: 20%;
        justify-content: left;
        align-items: center;
    }


    .group-signup-time {
        display: flex;
        height: 100%;
        width: 30%;
        justify-content: left;
        align-items: center;
    }

    .group-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>