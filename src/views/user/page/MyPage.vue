<template>
    <div class="mypage">
      <!-- 상단 네비게이션 -->
      <Navigation />
      <!-- 사이드 바-->
      <SideBar />
  
      <!-- 메인 컨텐츠 영역 -->
      <div class="content">
        <!-- 내 프로필 섹션 -->
        <section class="profile-section">
          <h1>내 프로필</h1>
          <div class="profile-card">
            <div class="avatar"></div>
            <div class="profile-info">
              <h2>조이름님</h2>
              <p class="username">아이디: changuk0308</p>
              <p>회원가입 구분: KAKAO</p>
              <p>이메일: chanu****@n****.com</p>
              <button class="edit-btn">프로필 수정</button>
              <button class="edit-btn">비밀번호 변경</button>
            </div>
          </div>
          <button class="btn primary-btn">내가 가입한 스터디 그룹 가기</button>
          <button class="btn danger-btn">SGMA 탈퇴하기</button>
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
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
          </div>
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
          </div>
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
          </div>
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
          </div>
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
          </div>
          <div class="comment-card">
            <h3>토익이 안되면 토이크에크 스터디</h3>
            <p>팩트 폭행으로 3년 동안 감옥 갔다가...</p>
            <span class="tag">모집중</span>
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
  </script>
  
  <style scoped>
  /* 전체 페이지 레이아웃 설정 */
  .mypage {
    display: flex;
    height: 100vh; /* 전체 높이를 차지 */
  }
  
  /* 메인 컨텐츠 영역 */
  .content {
    display: flex;
    padding: 2rem;
    width: calc(100% - 42rem); /* 사이드바를 제외한 너비 */
    margin-left: 42rem; /* 사이드바 너비 */
    background-color: #f8f9fa;
  }
  
  /* 프로필 섹션 스타일 */
  .profile-section {
    flex: 1; /* 나머지 공간을 차지 */
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    margin-right: 2rem; /* 우측 섹션과의 간격 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  }
  
  /* 프로필 카드 */
  .profile-card {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
  }
  
  /* 아바타 스타일 */
  .avatar {
    width: 8rem;
    height: 8rem;
    background-color: #cccccc;
    border-radius: 50%;
    margin-right: 2rem;
  }
  
  /* 프로필 정보 */
  .profile-info {
    display: flex;
    flex-direction: column;
  }
  
  .profile-info h2 {
    margin: 0;
  }
  
  .profile-info p {
    margin: 0.5rem 0;
  }
  
  .username {
    font-weight: bold;
    color: #666666;
  }
  
  .edit-btn {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #f0ad4e;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .primary-btn {
    background-color: #8bc34a;
  }
  
  .danger-btn {
    background-color: #f44336;
    color: #fff;
  }
  
  .btn {
    display: block;
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    font-size: 1.4rem;
    border-radius: 5px;
    cursor: pointer;
    border: none;
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
  