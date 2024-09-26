<template>
  <div class="mypage">
    <!-- 상단 네비게이션 -->
    <Navigation />
    <!-- 사이드 바-->
    <SideBar />

    <!-- 메인 컨텐츠 영역 -->
    <div class="content">
      <section class="profile-section">
        <h1>내 프로필</h1>
        <div class="profile-card">
          <!-- 1. 프로필 정보 섹션 -->
          <div class="profile-left">
            <div class="avatar"></div>
            <div class="profile-info">
              <div class="name">{{ userName }}</div>
              <p class="user-id">{{ userId }}</p>
            </div>
          </div>

          <!-- 2. 수정 버튼 섹션 -->
          <div class="profile-buttons">
            <button class="profile-edit-btn">프로필 수정</button>
            <button class="password-change-btn">비밀번호 변경</button>
          </div>
        </div>

        <!-- 3. 프로필 정보 섹션 및 하단 버튼 -->
        <div class="profile-details">
          <div class="profile-field">
            <span>닉네임</span><span>{{ userNickname }}</span>
          </div>
          <div class="profile-field">
            <span>회원가입 구분</span><span>KAKAO</span>
          </div>
          <div class="profile-field">
            <span>이메일</span><span>{{ userEmail }}</span>
          </div>
          <!-- 하단 큰 버튼들 -->
          <button class="btn primary-btn">내가 가입한 스터디 그룹 가기</button>
        </div>

        <!-- 탈퇴하기 버튼을 오른쪽 정렬 -->
        <button class="danger-btn">SGMA <br> 탈퇴하기</button>
      </section>

      <!-- 내가 모집글에 쓴 댓글 목록 섹션 -->
      <section class="comments-section">
        <h1>내가 모집글에 쓴 댓글 목록</h1>
        <div class="comment-card">
          <h3>콜럼버스 코테 스터디</h3>
          <p>내가 작성한 댓글 내용</p>
          <span class="tag">모집종료</span>
        </div>
        <div class="comment-card">
          <h3>코테 스터디원 구합니다~~</h3>
          <p>내가 작성한 댓글 내용</p>
          <span class="tag">모집종료</span>
        </div>
        <div class="comment-card">
          <h3>코테로 KAKAO 장원급제</h3>
          <p>안녕하세요! 코테 스터디 모집합니다...</p>
          <span class="tag">모집종료</span>
        </div>
        <div class="comment-card">
          <h3>토익이 안되면 토이크에크 스터디</h3>
          <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
          <span class="tag">모집중</span>
        </div>
        <!-- 더 많은 댓글 카드 추가 가능 -->
      </section>
    </div>
  </div>
</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';

// 이 값들은 추후 Vuex에서 가져올 예정
const userName = '조이름님';
const userId = 'changuk0308';
const userNickname = '조찬국';
const userEmail = 'chanu****@n****.com';
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
}

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
  margin-right: 2rem; /* 댓글 섹션과의 간격 */
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
  font-weight: 600; /* 잘못된 폰트 웨이트 수정 */
  margin: 0;
}

.user-id {
  font-weight: 600; /* 잘못된 폰트 웨이트 수정 */
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
  font-weight: 600; /* 잘못된 폰트 웨이트 수정 */
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
  font-weight: 600; /* 잘못된 폰트 웨이트 수정 */
}

/* 프로필 세부 정보 */
.profile-details {
  background-color: #f9f9f9;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  padding: 2rem;
  margin-bottom: 2rem;
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

.btn {
  display: block;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  margin-top: 3rem;
  font-size: 2.2rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-weight: 600; 
  text-align: center;
}
  
  /* 댓글 목록 섹션 */
  .comments-section {
    flex: 1; /* 나머지 공간을 차지 */
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    overflow-y: auto; /* 내용이 많을 때 스크롤 */
  }
  
  .comment-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .comment-card h3 {
    margin: 0;
    font-size: 1.6rem;
  }
  
  .comment-card p {
    margin: 0.5rem 0;
    color: #666;
  }
  
  .tag {
    align-self: flex-end;
    background-color: #ffeb3b;
    padding: 0.3rem 0.6rem;
    font-size: 1.2rem;
    border-radius: 5px;
  }
  </style>
  