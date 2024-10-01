<template>
    <div class="mypage">
        <Navigation />
        <SideBar />
        <main class="main">
            <div class="content">
                <!-- 내 프로필 컴포넌트, 프로필 수정 이벤트를 받음 -->
                <UserProfile 
                @edit-profile="openProfileEditModal" 
                @open-deactivation-modal="openDeactivationModal"
                @open-password-change-modal="openPasswordChangeModal"
                @open-my-study-groups="openMyStudyGroups" />
                <!-- 내가 쓴 댓글 목록 컴포넌트 -->
                <UserComments />

                 <!-- 프로필 수정 모달 -->
                 <ProfileEditModal v-if="isProfileEditModalVisible" @close="closeProfileEditModal" />
                 <!-- 회원 탈퇴 모달 -->
                <AccountDeactivationModal v-if="isDeactivationModalVisible" @close="closeDeactivationModal" />
                <!-- 비밀번호 변경 모달 -->
                <ChangePasswordModal v-if="isPasswordChangeModalVisible" @close="closePasswordChangeModal" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import UserProfile from '@/views/user/components/UserProfile.vue';
import UserComments from '@/views/user/components/UserComments.vue';
import ProfileEditModal from '@/views/user/components/ProfileEditModal.vue'; // 프로필 수정 모달 컴포넌트
import AccountDeactivationModal from '@/views/user/components/AccountDeactivationModal.vue'; // 회원 탈퇴 모달 컴포넌트
import ChangePasswordModal from '@/views/user/components/ChangePasswordModal.vue';

const router = useRouter();

const accessToken = 
    localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).accessToken : null;

// 프로필 수정 모달 상태 관리
const isProfileEditModalVisible = ref(false);

// 회원 탈퇴 모달 상태 관리
const isDeactivationModalVisible = ref(false);

// 비밀번호 변경 모달 상태 관리
const isPasswordChangeModalVisible = ref(false); // 비밀번호 변경 모달 상태 관리

// 프로필 수정 모달 열기 함수
const openProfileEditModal = () => {
  isProfileEditModalVisible.value = true;
};

// 프로필 수정 모달 닫기 함수
const closeProfileEditModal = () => {
  isProfileEditModalVisible.value = false;
};

// 회원 탈퇴 모달 열기 함수
const openDeactivationModal = () => {
  isDeactivationModalVisible.value = true;
};

// 회원 탈퇴 모달 닫기 함수
const closeDeactivationModal = () => {
  isDeactivationModalVisible.value = false;
};
// 비밀번호 변경 모달 열기 함수
const openPasswordChangeModal = () => {
  isPasswordChangeModalVisible.value = true;
};

// 비밀번호 변경 모달 닫기 함수
const closePasswordChangeModal = () => {
  isPasswordChangeModalVisible.value = false;
};

const openMyStudyGroups = () => {
    router.push(`/my-study-groups`);
}

onMounted(() => {
  if(accessToken === null) {
      alert("로그인을 해주세요.");
      router.push(`/`);
  }
})

</script>

<style scoped>

/* 메인 컨텐츠 영역 */
.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 9rem);
  padding: 2rem;
  background-color: #f8f9fa;
  gap: 2rem;
}
</style>
