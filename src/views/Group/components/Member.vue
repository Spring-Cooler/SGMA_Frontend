<template>
    <div class="member">
        <div class="member-info">
            <img src="../../../assets/images/default_profile.svg" alt="profile">
            <span>{{ props.data.nickname }}</span>
            <div v-if="isOwner">
                <i class="fa-solid fa-crown"></i>
            </div>
        </div>
        <div v-if="isManagement && !isOwner">
            <TinyButton class="sunset-orange" label="추방" @click="kick"></TinyButton>
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
    management: {
        type: Boolean,
        default: false
    }
});

const isOwner = props.data.group_role == 'ROLE_OWNER';
const isManagement = props.management;
const emit = defineEmits(['kick']);

const kick = () => {
    emit('kick', props.data.member_id);
}

</script>

<style>
    .member {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 2rem;
        border-bottom: 1px solid #EAECEE;
        margin-top: 2rem;
    }

    .member-info {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .member-info img {
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 50%;
    }

    .member-info span {
        font-size: 2rem;
        padding-left: 1.2rem;
    }

    .member-info i {
        font-size: 2rem;
        padding-left: 1rem;
    }
</style>