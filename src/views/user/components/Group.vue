<template>
    <div class="group-container">
        <div class="group-name-wrapper">
            <span>{{ props.data.group_name }}</span>
        </div>
        <div class="group-role-wrapper">
            <span :class="{
                'popsicle': props.data.group_role === 'ROLE_OWNER', 
                'olive': props.data.group_role !== 'ROLE_OWNER'
            }">
                {{ props.data.group_role === 'ROLE_OWNER' ? '그룹장' : '그룹원' }}
            </span>
        </div>
        <div class="group-category-wrapper">
            <span>{{ props.data.category_name }}</span>
        </div>
        <div class="group-signup-time-wrapper">
            <span>{{ formatDate(props.data.member_enrolled_at) }}</span>
        </div>
        <div class="move-btn-wrapper">
            <MediumButton label="이동하기" @click="goGroupHome"></MediumButton>
        </div>
    </div>
</template>

<script setup>
    import MediumButton from '@/components/common/MediumButton.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    const emit = defineEmits(['go-group-home'])

    const goGroupHome = () => {
        emit('go-group-home');
    }

    function formatDate(isoDateStr) {
        const date = new Date(isoDateStr);  // ISO 8601 날짜 문자열을 Date 객체로 변환
        const year = date.getFullYear();    // 연도 추출
        const month = String(date.getMonth() + 1).padStart(2, '0');  // 월 추출 (0부터 시작하므로 +1)
        const day = String(date.getDate()).padStart(2, '0');  // 일 추출

        return `${year}.${month}.${day}`;   // 원하는 형식으로 포맷팅
    }
</script>

<style scoped>
    .group-container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 8rem;
        font-size: 1.6rem; 
        border-bottom: 1px solid #EAECEE;
    }

    .group-name-wrapper {
        display: flex;
        width: 30%;
        padding-left: 2rem;
        font-size: 2rem;
    }

    .group-role-wrapper {
        display: flex;
        width: 20%;
    }

    .group-role-wrapper span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.4rem;
        height: 2.6rem;
        color: #ffffff;
        border-radius: 1rem;
    }

    .group-category-wrapper {
        display: flex;
        padding-left: 1rem;
        width: 20%;
    }

    .group-signup-time-wrapper {
        display: flex;
        padding-left: 0.5rem;
        width: 10%;
    }

    .move-btn-wrapper {
        display: flex;
        justify-content: right;
        padding-right: 2rem;
        width: 20%;
    }
</style>