<template>
    <div class="find-study-group-page">
        <Navigation />
        <SideBar />
        <main class="main">
            <div class="main-content">
                <div class="recruitment-container loading" v-if="loading">Loading...</div>
                <div class="recruitment-container" v-else>
                    <Title>스터디 그룹 찾기</Title>
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
                    </div>
                    <div class="search-type-container">
                        <SearchBar path="/study-groups"></SearchBar>
                        <div class="tag-container">
                            <div class="tag-title">인기 태그</div>
                            <div class="tags">
                                <div class="btn-container">
                                    <button
                                        class="tag-btn"
                                        v-for="(tag, tagIndex) in tagList"
                                        :key="tagIndex"
                                        @click="handleClickTag(tagIndex)"
                                        :class="{selected: selectedTag === tagIndex}"
                                    >
                                        {{ tag.tagName }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="recruitment-body" v-for="(recruitment, recruitmentIndex) in recruitmentList" :key="recruitmentIndex">
                        <Recruitment :data="recruitment"></Recruitment>
                    </div>
                    <!-- 페이지네이션 들어갈 위치 -->
                    <div class="mb-6"></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import SideBar from '@/components/layouts/SideBar.vue';
    import Title from '@/components/common/Title.vue';
    import Recruitment from '@/views/Group/components/Recruitment.vue'
    import SearchBar from './components/SearchBar.vue';
    import { ref, computed, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import axios from 'axios';


    // 메뉴 항목과 선택된 메뉴를 관리하는 상태 변수
    const menuList = ['최신순', '좋아요순', '모집중', '모집완료'];
    const tagList = [
        { tagId: 3, tagName:'자격증' },
        { tagId: 2, tagName: '취업' }, 
        { tagId: 5, tagName: 'IT' },
        { tagId: 6, tagName: '금융/경제' },
        { tagId: 1, tagName: '어학' },
        { tagId: 9, tagName: '공학' }
    ];
    const selectedMenu = ref(0);
    const selectedTag = ref(null);

    const route = useRoute();
    const router = useRouter();

    const loading = ref(true);
    const allRecruitments = ref([]); // 전체 모집글 데이터 저장
    const recruitmentList = ref([]); // 필터된 모집글 데이터 저장
    const statusQuery = ref(''); // 필터에 사용한 Query

    const fetchRecruitmentData = async () => {
        try {
            let response;
            if (typeof route.query.title === 'undefined') {
                response = (await axios.get(`/recruitment-service/api/recruitment-board/all`)).data;
            } else {
                response = (await axios.get(`/recruitment-service/api/recruitment-board/title/${route.query.title}`)).data;
            }

            if (response.success) {
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
                statusQuery.value = 'likes'
                break;
            case 2:
                statusQuery.value = 'active';
                break;
            case 3:
                statusQuery.value = 'inactive';
                break;
            default:
                statusQuery.value = '';
                break;
        }
        router.push({path: route.fullPath, query: {status: statusQuery.value}});
    };

    const handleClickTag = (index) => {
        if (selectedTag.value === index) {
            filterRecruitments();
        } else {
            filterRecruitments();

            selectedTag.value = index;
            recruitmentList.value = recruitmentList.value.filter(item => item.study_group_category_id === tagList[index].tagId);

            const activeRecruitments = recruitmentList.value.filter(item => item.active_status === 'ACTIVE');
            const inactiveRecruitments = recruitmentList.value.filter(item => item.active_status === 'INACTIVE');

            recruitmentList.value = [...activeRecruitments, ...inactiveRecruitments];
        }
    };

    const filterRecruitments = () => {
        // 모집글을 먼저 필터링
        const activeRecruitments = allRecruitments.value.filter(item => item.active_status === 'ACTIVE');
        const inactiveRecruitments = allRecruitments.value.filter(item => item.active_status === 'INACTIVE');
        // 좋아요순으로 정렬하되, 모집중을 우선으로 함
        const likesRecruitments = [...allRecruitments.value].sort((a, b) => {
            if (a.active_status === 'ACTIVE' && b.active_status !== 'ACTIVE') {
                return -1; // 모집중인 글을 우선으로
            }
            if (a.active_status !== 'ACTIVE' && b.active_status === 'ACTIVE') {
                return 1; // 모집중 아닌 글은 뒤로
            }
            return b.likes - a.likes; // 모집 상태가 같으면 좋아요순으로 정렬
        });
        
        if (!route.query.status || route.query.status === '') {
            // "전체" 선택 시, 모집중 -> 모집완료 순서로 출력
            recruitmentList.value = [...activeRecruitments, ...inactiveRecruitments];
        } else if (route.query.status === 'active') {
            // "모집중"만 출력
            recruitmentList.value = activeRecruitments;
        } else if (route.query.status === 'inactive') {
            // "모집완료"만 출력
            recruitmentList.value = inactiveRecruitments;
        } else if (route.query.status === 'likes') {
            // "좋아요순" 출력
            recruitmentList.value = likesRecruitments;
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

    const setSelectedMenuFromQuery = () => {
        // URL의 status 값을 확인하고, 해당하는 메뉴 인덱스를 설정
        const status = route.query.status || '';  // 기본 값은 빈 문자열로 설정
        switch (status) {
            case 'likes':
                selectedMenu.value = 1;
                break;
            case 'active':
                selectedMenu.value = 2;
                break;
            case 'inactive':
                selectedMenu.value = 3;
                break;
            default:
                selectedMenu.value = 0; // 기본값은 '최신순'
                break;
        }
    };

    // URL 쿼리 변경을 감지하여 필터링
    watch(() => route.query.status, () => {filterRecruitments();});

    watch(() => route.query.title, () => {
        fetchRecruitmentData();
    });

    onMounted(() => {
        setSelectedMenuFromQuery();
        fetchRecruitmentData();
    })
</script>

<style scoped>
    .recruitment-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 4rem;
    }

    .search-type-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
    }

    .tag-container {
        display: flex;
        flex-direction: column;
        height: 22rem;
        width: 20rem;
        border: 1px solid #a6a6a6;
        border-radius: 1rem;
        margin-top: 5.3rem;
    }

    .tag-title {
        display: flex;
        width: 100%;
        font-size: 1.6rem;
        font-weight: 700;
        padding: 1rem;
    }

    .tags {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .btn-container {
        display: flex;
        flex-wrap: wrap;
        width: 18rem;
        gap: 1rem;
    }

    .tag-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 6rem;
        height: 3rem;
        font-size: 1.6rem;
        color: #202020;
        background-color: #E9EFF4;
        border: none;
        border-radius: 1rem;
        transition: 0.3s ease-out;
    }

    .tag-btn:hover {
        background-color: #DDE4EA;
    }

    .tag-btn.selected {
        background-color: #A1B872;
        color: #FFFFFF;
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

    .mb-6 {
        margin-bottom: 12rem;
    }
</style>
