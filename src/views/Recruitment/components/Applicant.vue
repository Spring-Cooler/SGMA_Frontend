<template>
    <div class="applicant">
        <div class="applicant-info">
            <img src="../../../assets/images/default_profile.svg" alt="profile">
            <span>{{ props.data.nickname }}</span>
        </div>
        <div class="btn-container">
            <TinyButton label="승인" @click="accept"></TinyButton>
            <TinyButton class="sunset-orange" label="거절" @click="reject"></TinyButton>
        </div>
    </div>
</template>

<script setup>
import TinyButton from '@/components/common/TinyButton.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
});

const emit = defineEmits(['accept','reject']);

const accept = () => {
    emit('accept', props.data.user_id, props.data.recruitment_board_id);
}

const reject = () => {
    emit('reject', props.data.user_id, props.data.recruitment_board_id);
}

</script>

<style>
    .applicant {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 2rem;
        border-bottom: 1px solid #EAECEE;
        margin-top: 2rem;
    }

    .applicant-info {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .applicant-info img {
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 50%;
    }

    .applicant-info span {
        font-size: 2rem;
        padding-left: 1.2rem;
    }

    .btn-container {
        display: flex;
        gap: 2rem;
    }
</style>