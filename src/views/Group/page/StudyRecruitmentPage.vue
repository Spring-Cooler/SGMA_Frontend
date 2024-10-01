<template>
    <div class="study-recruitment-page">
        <Navigation />
        <GroupSideBar />
        <main class="main">
            <div class="main-content">
                <div class="recruitment-container">
                    <Title>스터디 모집글</Title>
                    <div class="recruitment-header">
                        <nav class="recruitment-nav">
                            <ul class="recruitment-menu">
                                <li  v-for="(menu, menuIndex) in menuList" :key="menuIndex" 
                                    :class="{ active: selectedMenu === menuIndex }"
                                    @click="handleSelectMenu(menuIndex)"
                                >
                                    {{ menu }}
                                </li>
                            </ul>
                            <div class="line" :style="lineStyle"></div>
                        </nav>
                        <LargeButton label="모집글 작성하기" @click="goUploadPost" v-if="userId === ownerId"></LargeButton>
                    </div>
                    <div class="recruitment-body loading" v-if="loading">작성된 모집글이 없습니다.</div>
                    <div class="recruitment-body" v-for="(recruitment, recruitmentIndex) in recruitmentList" :key="recruitmentIndex">
                        <Recruitment :data="recruitment" @detail="goRecruitmentDetail"></Recruitment>
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
    import LargeButton from '@/components/common/LargeButton.vue';
    import Recruitment from '@/views/Recruitment/components/Recruitment.vue'
    import { ref, computed, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import axios from 'axios';

    // 메뉴 항목과 선택된 메뉴를 관리하는 상태 변수
    const menuList = ["전체", "모집중", "모집완료"];
    const selectedMenu = ref(0);

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const accessToken = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId: null;
    const ownerId =
        localStorage.getItem('groupData') ? JSON.parse(localStorage.getItem('groupData')).ownerId: null;

    const loading = ref(true);
    const allRecruitments = ref([]); // 전체 모집글 데이터 저장
    const recruitmentList = ref([]); // 필터된 모집글 데이터 저장
    const statusQuery = ref(''); // 필터에 사용한 Query

    const fetchRecruitmentData = async () => {
        try {
            const response = (await axios.get(`/recruitment-service/api/recruitment-board/group/${route.params.groupId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;

            if (response.success && response.data.length > 0) {
                allRecruitments.value = response.data;
                filterRecruitments(); // 데이터를 가져온 후 필터링을 적용
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // 메뉴 선택 함수
    const handleSelectMenu = (menuIndex) => {
        selectedMenu.value = menuIndex;
        switch (menuIndex) {
            case 0:
                statusQuery.value = '';
                break;
            case 1:
                statusQuery.value = 'active';
                break;
            case 2:
                statusQuery.value = 'inactive';
                break;
            default:
                statusQuery.value = '';
                break;
        }
        router.push({path: route.fullpath, query: {status: statusQuery.value}});
    };

    const filterRecruitments = () => {
        // 모집글을 먼저 필터링
        const activeRecruitments = allRecruitments.value.filter(item => item.active_status === 'ACTIVE');
        const inactiveRecruitments = allRecruitments.value.filter(item => item.active_status === 'INACTIVE');
        
        if (!route.query.status || route.query.status === '') {
            // "전체" 선택 시, 모집중 -> 모집완료 순서로 출력
            recruitmentList.value = [...activeRecruitments, ...inactiveRecruitments];
        } else if (route.query.status === 'active') {
            // "모집중"만 출력
            recruitmentList.value = activeRecruitments;
        } else if (route.query.status === 'inactive') {
            // "모집완료"만 출력
            recruitmentList.value = inactiveRecruitments;
        }
    };

    // 라인의 동적 스타일
    const lineStyle = computed(() => {
        return {
            width: 'calc(100% / ' + menuList.length + ')',
            transform: `translateX(${selectedMenu.value * 100}%)`,
            transition: 'transform 0.3s ease',
        };
    });

    const goUploadPost = () => {
        store.commit('setPostData', {
            post_type: 'recruitment',
        });
        router.push(`/study-groups/${route.params.groupId}/recruitments/upload`);
    }

    const goRecruitmentDetail = (recruitmentId) => {
        router.push(`/study-groups/${route.params.groupId}/recruitments/${recruitmentId}`);
    }

    // URL 쿼리 변경을 감지하여 필터링
    watch(() => route.query.status, () => {filterRecruitments();});

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchRecruitmentData();
    })
</script>

<style scoped>
    .recruitment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
    }

    .loading {
        align-items: center;
        font-size: 2rem;
        margin-top: 2rem;
    }

    .recruitment-header {
        display :flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 5.3rem;
        border-bottom: 1px solid #a6a6a6;
    }

    .recruitment-header .large-btn {
        font-size: 2rem;
    }

    .recruitment-body {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .recruitment-nav {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    .recruitment-menu {
        display: flex;
        font-size: 2.4rem;
        font-weight: 700;
        color: #a6a6a6;
    }

    .recruitment-menu li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 12rem;
        cursor: pointer;
    }

    .recruitment-menu li.active {
        color: #7F915B;
    }

    .line {
        margin-top: 2rem;
        height: 0.3rem;
        width: calc(100% / 3);
        background-color: #7F915B;
        transform: translateX(0%);
        transition: transform 0.6s ease-out;
    }
</style>
