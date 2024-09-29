<template>
  <section class="profile-section">
    <h1>내 프로필</h1>
    <div class="profile-card">
      <div class="profile-left">
        <!-- 아바타 이미지 -->
        <img
          class="avatar"
          :src="user.profile_image || 'https://example.com/default-profile.png'"
          alt="프로필 이미지"
        />
        <div class="profile-info">
          <!-- 사용자 이름과 아이디를 표시합니다 -->
          <div class="name">{{ user.user_name }}</div>
          <p class="user-id">{{ user.user_auth_id }}</p>
        </div>
      </div>
      <div class="profile-buttons">
        <button class="profile-edit-btn"  @click="editProfile">프로필 수정</button>
        <button class="password-change-btn" @click="openPasswordChange">비밀번호 변경</button>
      </div>
    </div>
    <div class="profile-details">
      <div class="profile-field">
        <span>닉네임</span><span>{{ user.nickname }}</span>
      </div>
      <div class="profile-field">
        <span>회원가입 구분</span><span>{{ user.signup_path }}</span>
      </div>
      <div class="profile-field">
        <span>이메일</span><span>{{ user.email }}</span>
      </div>
      <button class="btn primary-btn">내가 가입한 스터디 그룹 가기</button>
    </div>
<!-- 탈퇴하기 버튼 클릭 시 탈퇴 모달 표시 이벤트 방출 -->
<button class="danger-btn" @click="confirmDeactivation">SGMA <br />탈퇴하기</button>
  </section>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { getUserById } from '@/api/user';


const emit = defineEmits(['edit-profile', 'open-deactivation-modal','open-password-change-modal']); // 부모에게 edit-profile 이벤트를 방출

const token = inject('token');
const user = ref({}); // 사용자 정보를 저장하는 객체
const loading = ref(true);
const error = ref(false);

// 사용자 프로필 데이터를 불러오는 함수
const fetchUserProfile = async () => {
  try {
    loading.value = true;
    error.value = false;
    const response = await getUserById(token.userId, token.accessToken);
    user.value = response.data; // API 응답 데이터를 user 상태에 할당
  } catch (err) {
    console.error('사용자 프로필 조회 오류:', err);
    error.value = true; // 오류 발생 시 상태 업데이트
  } finally {
    loading.value = false; // 로딩 종료
  }
};

// 컴포넌트가 마운트될 때 사용자 프로필 데이터를 불러옴
onMounted(fetchUserProfile);


// 프로필 수정 버튼 클릭 시 호출
const editProfile = () => {
  emit('edit-profile'); // 부모 컴포넌트로 edit-profile 이벤트 방출
};

// 회원 탈퇴 버튼 클릭 시 호출
const confirmDeactivation = () => {
  emit('open-deactivation-modal'); // 부모 컴포넌트로 탈퇴 모달 표시 이벤트 방출
};

// 비밀번호 변경 버튼 클릭 시 호출
const openPasswordChange = () => {
  emit('open-password-change-modal'); // 비밀번호 변경 모달 열기
};


</script>

<style scoped>
/* 프로필 섹션 스타일 */
.profile-section {
  flex: 1; /* 나머지 공간을 차지 */
  overflow-y: auto; /* 내용이 많을 때 스크롤 */
  height: 420px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  margin-bottom: 2rem; /* 댓글 섹션과의 간격 */
  display: flex; /* flex 레이아웃 사용 */
  flex-direction: column; /* 수직 배치 */
  justify-content: space-between; /* 상하 요소 사이의 공간을 자동으로 설정 */
}

/* 프로필 카드 */
.profile-card {
  display: flex;
  justify-content: space-between; /* 프로필 정보와 버튼을 좌우 배치 */
  align-items: center;
  border-radius: 10px;
  padding: 2rem;
}

/* 프로필 좌측 섹션 */
.profile-left {
  display: flex;
  align-items: center;
}

/* 아바타 스타일 */
.avatar {
  width: 10rem;
  height: 10rem;
  background-color: #cccccc;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 1.5rem;
}

/* 프로필 정보 */
.profile-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 3rem;
  color: #202020;
  font-weight: 600;
  margin: 0;
}

.user-id {
  font-weight: 600;
  font-size: 1.6rem;
  color: #202020;
  margin: 0.5rem 0 0 0;
}

/* 프로필 수정 버튼 섹션 */
.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 수정 및 변경 버튼 스타일 */
.profile-edit-btn {
  padding: 0.6rem 1.2rem;
  background-color: #f0ad4e;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
}

.password-change-btn {
  padding: 0.6rem 1.2rem;
  background-color: #a1b872;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
}

/* 프로필 세부 정보 */
.profile-details {
  background-color: #f9f9f9;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 2rem;
  margin-bottom: 2rem;
  height: auto
}

.profile-field {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 2rem;
  color: #a6a6a6;
}

.profile-field span:first-child {
  color: #525150;
  font-weight: 600;
  font-size: 2rem;
}

/* 큰 버튼 스타일 */
.primary-btn {
  background-color: #a1b872;
  font-size: 2rem;
  width: 100%;
  height: 30%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.danger-btn {
  width: fit-content; /* 버튼 길이를 내용에 맞게 조정 */
  align-self: flex-end; /* 버튼을 오른쪽으로 정렬 */
  padding: 1rem 3rem;
  background-color: #f35757;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  margin-right: 16px;
}
</style>
