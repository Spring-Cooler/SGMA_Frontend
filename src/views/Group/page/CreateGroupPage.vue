<template>
    <div class="create-group-page">
        <Navigation />
        <SideBar />
        <main class="main">
            <div class="main-content">
                <div class="create-group-container loading" v-if="loading">Loading...</div>
                <div class="create-group-container" v-else>
                    <Title>스터디 그룹 만들기</Title>
                    <form @submit.prevent="submitNewGroup">
                        <div class="upload-category">
                            <label for="category">카테고리</label>
                            <select id="category" class="category-input" v-model="postData.category" required>
                                <option value="" disabled selected>카테고리 선택</option>
                                <option v-for="(category, categoryIndex) in categoryList" 
                                    :key="categoryIndex" 
                                    :value="category.category_id">
                                    {{ category.category_name }}
                                </option>
                            </select>
                        </div>
                        <div class="upload-group-name">
                            <span>그룹명</span>
                            <input type="text" v-model="postData.group_name" placeholder="제목을 입력해주세요." required/>
                        </div>
                        <div class="btn-container">
                            <MediumButton label="만들기" type="submit"></MediumButton>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import Navigation from '@/components/layouts/Navigation.vue';
    import SideBar from '@/components/layouts/SideBar.vue';
    import Title from '@/components/common/Title.vue';
    import MediumButton from '@/components/common/MediumButton.vue';
    import { computed, onMounted, ref, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import axios from 'axios';

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const accessToken = 
          localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;
    const userId = 
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).userId : null;
    const loading = ref(true);

    const categoryList = ref([]);

    const postData = computed(() => store.getters.getPostData);

    const groupData = reactive({
        user_id: userId,
        category_id: postData.value.category,
        group_name: postData.value.group_name,
    })

    const fetchCategoryData = async () => {
        try {
            const response = (await axios.get(`/study-group-service/api/study-group/categories`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                categoryList.value = response.data;
                loading.value = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const submitNewGroup = async () => {
        try {
            groupData.category_id = postData.value.category;
            groupData.group_name = postData.value.group_name;
            const response = (await axios.post(`/study-group-service/api/study-groups`,groupData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })).data;
            if(response.success) {
                alert("스터디 그룹이 생성되었습니다!");
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const resetPostData = () => {
        postData.value.title = '';
        postData.value.content = '';
        postData.value.category = '';
        postData.value.start_time = '';
        postData.value.end_time = '';
        postData.value.id = '';
        postData.value.group_id = '';
        postData.value.group_name = '';
    };

    onMounted(() => {
        if(accessToken === null) {
            alert("로그인을 해주세요.");
            router.push(`/`);
        }
        fetchCategoryData();
        resetPostData();
    });
</script>

<style scoped>
    .create-group-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        gap: 5.3rem;
        font-size: 2.4rem;
        font-weight: 700;
    }
    
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 4rem;
        font-weight: 500;
    }
    
    .create-group-container form {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5.3rem;
    }
    
    .upload-category {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }
    
    .category-input {
        font-family: 'Noto Sans';
        font-size: 2rem;
        padding: 0.5rem;
        height: 5rem;
        width: 25rem;
        border: 1px solid #8c8c8c;
        border-radius: 1rem;
    }
    
    .upload-group-name {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1rem;
    }
    
    .upload-group-name input {
        font-size: 2rem;
        padding: 1rem;
        height: 5rem;
        border: 1px solid #8c8c8c;
        border-radius: 1rem;
    }
    
    .btn-container {
        display: flex;
        justify-content: right;
        width: 100%;
        margin-bottom: 4rem;
    }
</style>