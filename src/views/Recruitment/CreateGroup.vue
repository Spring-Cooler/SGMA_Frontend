<template>
<div class="layout">
    <Navigation />
    <SideBar />
    <div class="create-study">
        <h2>스터디 그룹 만들기</h2>
        <!-- 등록 폼 예시 -->
        <form>
        <div class="form-group">
            <label for="category">카테고리</label>
            <p><select id="category" class="input">
            <option value="">카테고리 선택</option>
            <option value="study">스터디</option>
            <option value="project">프로젝트</option>
            </select></p>
        </div>
        <div class="form-group">
            <p>그룹명</p>
            <input id="title" type="text" placeholder="그룹명을 입력해 주세요" class="input"/>
        </div>

        <button class="create-btn">만들기</button>
        </form>
    </div>
</div>
</template>

<script setup>
  import Navigation from '@/components/layouts/Navigation.vue';
  import SideBar from '@/components/layouts/SideBar.vue';
</script>

<style scoped>
/* 기본 레이아웃 */
.layout {
    margin-top:94px;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* 네비게이션 스타일 */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 9rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 1000; /* 항상 맨 위에 표시 */
}

/* 메인 컨텐츠 스타일 */

/* 컨텐츠 영역 스타일 */
.create-study {
  margin-left: 62rem;
  margin-top:9.4rem;
}


.create-study h2 {
    margin-top: 0px;
    width: 34rem;
    height: 6.3rem;
    color: #202020;
    font-size: 4rem;
    font-family: Noto Sans;
    font-weight: 600;
    line-height: 6rem;
    word-wrap: break-word;
    margin-bottom: 5.3rem;
    white-space: nowrap;
}



/* 폼 스타일 */
form {
  display: flex;
  flex-direction: column;
}

label {
    color: #202020;
    font-size: 24px;
    font-family: Noto Sans;
    font-weight: 500;
    line-height: 36px;
    word-wrap: break-word;
    height:auto;
}

#category{
    padding: 1rem;
    font-size: 1.6rem;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    box-sizing: border-box;
    color: #A6A6A6;
    width: 180px;
    height: 48px;
    margin-bottom: 1.7rem;
} 


.input {
    padding: 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    width: 110rem;
    height:4.8rem;
    box-sizing: border-box;
    color: #A6A6A6;
    font-size: 1.6rem;
    font-family: Noto Sans;
    font-weight: 400;
    line-height: 2.4rem;
    word-wrap: break-word;
}


.form-group p{
    color: #202020;
    font-size: 24px;
    font-family: Noto Sans;
    font-weight: 500;
    line-height: 36px;
    word-wrap: break-word
}


.create-btn {
  padding: 1rem 2rem;
  background-color: #a1b872;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1.6rem;
  cursor: pointer;
  margin-top:48rem;
  width: 11.2rem;
  margin-left:98.8rem;
  height:5.6rem;
}

.submit-btn:hover {
  background-color: #8fa561;
}
</style>