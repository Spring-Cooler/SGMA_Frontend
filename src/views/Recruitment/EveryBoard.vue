<template>
    <div class="status-container">
    <!-- 각 상태 버튼 -->
        <div class="status" :class="{ active: activeStatus === '전체' }" @click="setActive('전체')">전체</div>
        <div class="status" :class="{ active: activeStatus === '모집중' }" @click="setActive('모집중')">모집중</div>
        <div class="status" :class="{ active: activeStatus === '모집완료' }" @click="setActive('모집완료')">모집완료</div>
        <div class="board-search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <span>관심스터디를 검색해 보세요!</span>
        </div>
        <button class="search-btn">검색</button>
        <div class="tag-search-bar" @click="toggleTagDropdown">
            <i class="fa-light fa-hashtag"></i>
            <span>{{ selectedTag || '태그로 검색해 보세요!' }}</span>
        </div>
        <div class="tag-dropdown" v-if="isDropdownOpen">
            <div class="tag-item" v-for="tag in tags" :key="tag" @click="selectTag(tag)">
                {{ tag }}
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';

// 현재 활성화된 상태를 관리
const activeStatus = ref('전체');

// 클릭 시 상태를 변경하는 함수
const setActive = (status) => {
activeStatus.value = status;
};
const isDropdownOpen = ref(false);
const tags = ref(['태그1', '태그2', '태그3', '태그4']);
const selectedTag = ref('');

// 드롭다운 토글 함수
const toggleTagDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// 태그 선택 함수
const selectTag = (tag) => {
    selectedTag.value = tag;
    isDropdownOpen.value = false; // 태그 선택 후 드롭다운 닫기
};
</script>

<style scoped>
  /* 상태 컨테이너 스타일 */
.status-container {
height: 39px;
width: 1012px;
margin-top: 152px;
margin-left: 571px;
position: absolute;
display: flex; /* 플렉스 박스를 사용해 가로 정렬 */
justify-content: flex-start; /* 왼쪽 정렬 */
align-items: center; /* 세로 중앙 정렬 */
gap: 48px; /* 상태 버튼 사이의 간격 */
padding: 10px 0 ; /* 상하좌우 패딩 추가 */
border-bottom: 1px solid #ddd; /* 아래에 구분선 추가 */
}

  /* 상태 버튼 스타일 */
.status {
font-size: 24px;
font-family: Noto Sans;
font-weight: 700;
gap:48px;
color: #888; /* 비활성화 상태의 색상 */
cursor: pointer; /* 클릭 가능한 커서 */
position: relative; /* ::after 위치 설정을 위한 기준 */
padding-bottom: 8px; /* 텍스트와 줄 사이의 간격 */
}

/* 활성화된 상태의 스타일 */
.status.active {
color: #003E19; /* 활성화 상태의 글자 색상 */
}

/* 활성화된 상태의 줄 스타일 */
.status.active::after {
content: '';
position: absolute;
bottom: 0; /* 텍스트 바로 아래에 줄을 위치 */
left: 0;
width: 100%;
height: 1px;
background-color: #003E19; /* 줄 색상 */
}
.board-search-bar{
position:absolute;
display: flex; /* 플렉스 박스를 사용해 내부 아이템 정렬 */
align-items: center; /* 세로 중앙 정렬 */
padding-left: 20px; /* 왼쪽 패딩 */
margin-top: 190px; /* 위아래 간격 */
background: white;
border-radius: 10px;
border: 1px #CACACA solid;
width:840px;
height:89px;
color: #CACACA;
font-size: 24px;
font-family: Noto Sans;
font-weight: 700;
word-wrap: break-word
}
.board-search-bar i {
    width: 50px;
    font-size: 32px; /* 아이콘의 크기 조정 */
    color:black
}
.fa-solid .fas{
    width :21px;
}
.search-btn{
    margin-left: 497px;
    margin-top: 184px;
    width: 140px;
    height: 89px;
    background: #A1B872;
    border:#A1B872; 
    border-radius: 10px;
    color: white; 
    font-size: 24px;
    font-family: Noto Sans;
    font-weight: 700;
    word-wrap: break-word
}

.tag-search-bar{
position:absolute;
display: flex; /* 플렉스 박스를 사용해 내부 아이템 정렬 */
align-items: center; /* 세로 중앙 정렬 */
padding-left: 20px; /* 왼쪽 패딩 */
margin-top: 388px; /* 위아래 간격 */
background: white;
border-radius: 10px;
border: 1px #CACACA solid;
width:840px;
height:89px;
color: #CACACA;
font-size: 24px;
font-family: Noto Sans;
font-weight: 700;
word-wrap: break-word
}
.tag-search-bar i {
    width: 50px;
    font-size: 48px; /* 아이콘의 크기 조정 */
    color:black
}
</style>