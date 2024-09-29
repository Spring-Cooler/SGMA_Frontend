<template>
  <Navigation />
  <SideBar />
  <div class="list">
    <div class="header-container">
      <ListHeader />
      <CancelButton />
    </div>
    <div class="applicant-list">
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-else>
        <li v-for="applicant in applicants" :key="applicant?.user_id">
          <span class="comment-reply-author-icon"></span>
          <span class="nickname">{{ applicant?.nickname }}</span>
          <div class="button-container">
            <button class="approve-button" @click="approveApplicant(applicant.user_id, applicant.recruitment_board_id)">승인</button>
            <button class="reject-button" @click="rejectApplicant(applicant.user_id, applicant.recruitment_board_id)">거절</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios'; // axios 임포트
  import ListHeader from '@/views/Recruitment/ListHeader.vue'; // ListHeader 컴포넌트 임포트
  import CancelButton from '@/views/Recruitment/components/CancelButton.vue'; // CancelButton 컴포넌트 임포트
  import Navigation from '@/components/layouts/Navigation.vue';
  import SideBar from '@/components/layouts/SideBar.vue';

  const applicants = ref([]); // 지원자 데이터를 저장할 ref 변수
  const loading = ref(false); // 로딩 상태
  const error = ref(null); // 에러 상태

  const fetchApplicants = async () => {
    loading.value = true;
    try {
      const response = await axios.get('api/api/study-applicant/group/1'); // groupId에 맞게 수정
      applicants.value = response.data.data || []; // 지원자 데이터를 상태에 저장
      console.log(applicants.value); // 로그로 API 호출 결과 출력
    } catch (err) {
      error.value = 'Failed to fetch applicants'; // 에러 발생 시 메시지 저장
    } finally {
      loading.value = false; // 요청 완료 후 로딩 종료
    }
  };

  const approveApplicant = async (userId, recruitmentBoardId) => {
    try {
      const response = await axios.post(`api/api/study-applicant/${userId}/${recruitmentBoardId}`);
      alert("승인 완료");
      await fetchApplicants();
      const applicant = applicants.value.find(a => a.user_id === userId && a.recruitment_board_id === recruitmentBoardId);
      if (applicant) {
      applicant.application_status = 'accept';
      }
      // 필요한 후처리 (예: 리스트 갱신 등)
    } catch (err) {
      console.error("승인 실패", err);
      alert("승인 실패");
    }
  };

  const rejectApplicant = async (userId, recruitmentBoardId) => {
    try {
      const response = await axios.put(`api/api/study-applicant/${userId}/${recruitmentBoardId}`);
      alert("거절 완료");
      await fetchApplicants();
      // 필요한 후처리 (예: 리스트 갱신 등)
      const applicant = applicants.value.find(a => a.user_id === userId && a.recruitment_board_id === recruitmentBoardId);
      if (applicant) {
        applicant.application_status = 'reject'; // 상태를 'reject'로 변경
      }
    } catch (err) {
      console.error("거절 실패", err);
      alert("거절 실패");
    }
  };

  onMounted(() => {
    fetchApplicants();
  });
</script>

<style scoped>
.comment-reply-author-icon {
  z-index: -999;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1rem;
  flex-shrink: 0;
}

.applicant-list ul {
  z-index: -999;
  color: #202020;
  font-size: 20px;
  font-family: Noto Sans;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
  margin-top: 12rem;
}

.applicant-list li {
  z-index: -999;
  
  list-style: none;
  width: 110rem;
  border-bottom: 0.1rem solid #888;
  margin-bottom: 1.2rem;
  margin-top: 1.6rem;
  padding: 1rem 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nickname {
  z-index: -999;
  flex-grow: 1; /* 닉네임을 가능한 공간을 차지하게 하여 버튼과 아이콘 사이를 적절히 배치 */
}

.button-container {
  display: flex;
  gap: 1rem;
}

.approve-button {
  background-color: #a5d6a7;
  color: white;
  font-size: 24px;
  font-family: Noto Sans;
  font-weight: 600;
  word-wrap: break-word;
  width:8rem;
  height:4.8rem;
  border:none;
  white-space: nowrap;
}

.reject-button {
  background-color: #ef5350;
  color: white;
  font-size: 24px;
  font-family: Noto Sans;
  font-weight: 600;
  word-wrap: break-word;
  width:8rem;
  height:4.8rem;
  border:none;
  white-space: nowrap;
  
}
.cancel-button {
  
  margin-left: 50rem;
}

.approve-button:hover {
  background-color: #81c784;
  color: white;
  font-size: 24px;
  font-family: Noto Sans;
  font-weight: 600;
  word-wrap: break-word;
  width:8rem;
  height:4.8rem
}

.reject-button:hover {
  background-color: #e57373;
  color: white;
  font-size: 24px;
  font-family: Noto Sans;
  font-weight: 600;
  word-wrap: break-word;
  width:8rem;
  height:4.8rem
}

.list {
  position: absolute;
  top: 18.4rem;
  left: 62rem;
  right: 20rem;
}

.header-container {
  z-index: -9999;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #202020;
  font-size: 40px;
  font-family: Noto Sans;
  font-weight: 600;
  line-height: 60px;
  word-wrap: break-word;
}
</style>
