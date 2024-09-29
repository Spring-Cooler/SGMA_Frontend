<template>
  <div class="mypage">
    <Navigation />
    <SideBar />
    <div class="content">
      <!-- 내 프로필 컴포넌트, 프로필 수정 이벤트를 받음 -->
      <UserProfile 
      @edit-profile="openProfileEditModal" 
      @open-deactivation-modal="openDeactivationModal" />
      <!-- 내가 쓴 댓글 목록 컴포넌트 -->
      <UserComments />

       <!-- 프로필 수정 모달 -->
       <ProfileEditModal v-if="isProfileEditModalVisible" @close="closeProfileEditModal" />
       <!-- 회원 탈퇴 모달 -->
      <AccountDeactivationModal v-if="isDeactivationModalVisible" @close="closeDeactivationModal" />
       
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import UserProfile from '@/views/user/components/UserProfile.vue';
import UserComments from '@/views/user/components/UserComments.vue';
import ProfileEditModal from '@/views/user/components/ProfileEditModal.vue'; // 프로필 수정 모달 컴포넌트
import AccountDeactivationModal from '@/views/user/components/AccountDeactivationModal.vue'; // 회원 탈퇴 모달 컴포넌트

// 프로필 수정 모달 상태 관리
const isProfileEditModalVisible = ref(false);

// 회원 탈퇴 모달 상태 관리
const isDeactivationModalVisible = ref(false);

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

</script>

<style scoped>
/* 전체 페이지 레이아웃 설정 */
.mypage {
  display: flex;
  height: 100vh; /* 전체 높이를 차지 */
}

/* 메인 컨텐츠 영역 */
.content {
  position: relative;
  top: 9rem;
  display: flex;
  flex-direction: row; /* 수직 배치 */
  padding: 2rem;
  width: calc(100% - 42rem); /* 사이드바를 제외한 너비 */
  margin-left: 42rem; /* 사이드바 너비 */
  background-color: #f8f9fa;
  gap: 2rem;
}
</style>
