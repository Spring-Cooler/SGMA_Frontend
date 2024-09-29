<template>
    <div class="study-recruitment-page">
        <!-- 상단 네비게이션 -->
        <Navigation />
        <!-- 사이드 바-->
        <GroupSideBar />
  
        <!-- 메인 컨텐츠 -->
        <main class="main">
            <div class="main-content">
                <Title>스터디 모집글</Title>
                <div class="recruitment-header">
                    <nav class="recruitment-nav">
                        <ul class="recruitment-menu">
                            <li  v-for="(menu, index) in menuItems" :key="index" 
                                :class="{ active: selectedMenu === index }"
                                @click="selectMenu(index)"
                            >
                                {{ menu }}
                            </li>
                        </ul>
                        <div class="line" :style="lineStyle"></div>
                    </nav>
                    <LargeButton label="모집글 작성하기"></LargeButton>
                </div>
                <div class="recruitment-body" v-for="(recruitment, index) in recruitmentList" :key="index">
                    <Recruitment :data="recruitment"></Recruitment>
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
    import Recruitment from '@/views/Group/components/Recruitment.vue'
    import { ref, computed, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';

    // 메뉴 항목과 선택된 메뉴를 관리하는 상태 변수
    const menuItems = ["전체", "모집중", "모집완료"];
    const selectedMenu = ref(0);

    const route = useRoute();
    const router = useRouter();

    const allRecruitments = ref([]); // 전체 모집글 데이터 저장
    const recruitmentList = ref([]);
    const statusQuery = ref('');

    const fetchData = async () => {
        try {
            let response = (await axios.get(`/api/recruitment-board/group/${route.params.groupId}`)).data;
            allRecruitments.value = response.data;
            filterRecruitments(); // 데이터를 가져온 후 필터링을 적용
        } catch (error) {
            console.error(error);
        }
    }

    // 메뉴 선택 함수
    const selectMenu = (index) => {
        selectedMenu.value = index;
        if (index === 0) {
            statusQuery.value = '';
        } else if (index === 1) {
            statusQuery.value = 'active';
        } else if (index === 2) {
            statusQuery.value = 'inactive';
        }
        router.push({path: route.fullpath, query: {status: statusQuery.value}});
    };

    // 모집글 리스트를 필터링하는 함수
    const filterRecruitments = () => {
        if (!route.query.status || route.query.status === '') {
            recruitmentList.value = allRecruitments.value;
        } else if (route.query.status === 'active') {
            recruitmentList.value = allRecruitments.value.filter(item => item.active_status === 'ACTIVE');
        } else if (route.query.status === 'inactive') {
            recruitmentList.value = allRecruitments.value.filter(item => item.active_status === 'INACTIVE');
        }
    };

    // 라인의 동적 스타일
    const lineStyle = computed(() => {
        return {
            width: 'calc(100% / ' + menuItems.length + ')',
            transform: `translateX(${selectedMenu.value * 100}%)`,
            transition: 'transform 0.3s ease',
        };
    });

    // URL 쿼리 변경을 감지하여 필터링
    watch(() => route.query.status, () => {
        filterRecruitments();
    });

    onMounted(() => {
        fetchData();
    })
</script>

<style scoped>
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
