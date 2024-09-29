<template>
    <div class="find-study-group">
        <Navigation />
        <SideBar />
        
        <div class="status-container">
        <!-- 각 상태 버튼 -->
            <div class="status" :class="{ active: activeStatus === '전체' }" @click="setActive('전체')">전체</div>
            <div class="status" :class="{ active: activeStatus === '모집중' }" @click="setActive('모집중')">모집중</div>
            <div class="status" :class="{ active: activeStatus === '모집완료' }" @click="setActive('모집완료')">모집완료</div>
            
            <div class="board-search-bar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" v-model="searchText" placeholder="관심스터디를 검색해 보세요!" />
            </div>
            <button class="search-btn olive" @click="searchRecruitment">검색</button>
            
            <div class="tag-search-bar" @click="toggleTagDropdown">
                <i class="fa-light fa-hashtag"></i>
                <span>{{ selectedTag || '태그로 검색해 보세요!' }}</span>
                <i1 class="fa-solid fa-caret-down" style="color: #a1b868;"></i1>
            </div>
            <div class="tag-dropdown" v-if="isDropdownOpen">
                <div class="tag-item" v-for="tag in tags" :key="tag" @click="selectTag(tag)">
                    {{ tag }}
                </div>
            </div>
            <button class="reset-btn" @click="resetTag">
                <i class="fa-solid fa-rotate"></i>
                초기화
            </button>
        </div>
    </div>
    <div class ="board-context" v-if="recruitmentBoardDetail.length > 0">
      <div class ="board-content" v-for="(board, index) in recruitmentBoardDetail" :key="index"  @click="goToDetail(board.recruitment_board_id)" >
        <div class="board-info">
          <h3>{{ board.title }}</h3>
        </div>
        <div class="board-contents">
          {{ board.content }}
        </div>
        <div class ="board-writer">방장: {{ board.user_nickname }}</div>
      </div>
    </div>
    <div v-else>
      <p>게시글이 없습니다.</p>
    </div>
    <div class="pagination">
      <button :class="{ active: currentPage === 1 }" @click="goToPage(1)">1</button>
      <button :class="{ active: currentPage === 2 }" @click="goToPage(2)">2</button>
    </div>

</template>

<script setup>
import Navigation from '@/components/layouts/Navigation.vue';
import SideBar from '@/components/layouts/SideBar.vue';
import {onMounted, ref} from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter();

const goToDetail = (id) => {
  router.push({ name: 'SingleBoard', params: { id } });  // 해당 모집글 상세 페이지로 이동
};
// 현재 활성화된 상태를 관리
const activeStatus = ref('전체');
const currentPage = ref(1);

// 클릭 시 상태를 변경하는 함수
const setActive = (status) => {
activeStatus.value = status;
};
const isDropdownOpen = ref(false);
const tags = ref(['어학', '취업', '자격증', 'IT']);
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

const resetTag = () => {
    selectedTag.value = ''; // 선택된 태그 초기화
    isDropdownOpen.value = false; // 드롭다운 닫기
};

const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
  getRecruitmentBoardList();  // 페이지 번호에 맞는 데이터를 다시 가져오기
};


/*
 API 요청 - Recruitment Page
 */

// Props 파라미터 설정
const props = defineProps({
  page: {
    type: String,
    required: false, // 필수가 아닌 경우
    default: '1', // 기본값 설정
  }
});

const recruitmentBoardDetail = ref([]); // 여러 게시글 데이터를 배열로 저장
const searchText = ref(''); // 검색어 입력 상태

// API 호출 함수
const getRecruitmentBoardList = async () => {
  try {
    // 요청할 때 쿼리스트링을 사용하여 page 파라미터 전달
    const response = await axios.get(`/api/api/recruitment-board/all`, {
      params: {
        page: props.page // props.page를 쿼리스트링으로 전달
      }
    });
    console.log("=======response", response)

    if (response.data.success) {
      recruitmentBoardDetail.value = response.data.data.data; // API 응답 데이터를 상태에 저장
      
    } else {
      console.error('API 요청 실패:', response.data);
    }
  } catch (error) {
    console.error('게시글 조회 중 오류 발생:', error);
  }
};
const searchRecruitment = async () => {
  try {
    // 검색어가 없을 경우 기본 게시글 목록을 가져옴
    if (searchText.value.trim() === '') {
      getRecruitmentBoardList();
      return;
    }
    console.log(searchText.value);
    // 검색 API 호출
    const response = await axios.get(`/api/api/recruitment-board/title/${searchText.value}`);
    if (response.data.success) {
      recruitmentBoardDetail.value = response.data.data; // 검색 결과 저장

      recruitmentBoardDetail.value = Array.isArray(resultData) ? resultData : [];
    } else {
      console.error('검색 요청 실패:', response.data.error);
    }
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
  }
};

// 검색 버튼 클릭 시 실행되는 함수
// const searchRecruitment = () => {
//   console.log('검색어:', searchText.value);
//   // 여기에 검색어를 기반으로 API 요청을 수행하는 로직을 추가할 수 있음
// };

// 컴포넌트가 마운트될 때 게시글 목록 불러오기
onMounted(() => {
  getRecruitmentBoardList();
});
</script>

<style scoped>
  /* 상태 컨테이너 스타일 */
.board-info{
  white-space: nowrap;
  margin-left: 48rem;

}

.pagination {
  font-size:1rem;
  margin-top: 40rem;
  margin-left: 15rem;
  display: flex;
  justify-content: center;
  gap: 0.1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  border: none;
  background-color: white;
  cursor: pointer;
}

.pagination button.active {
  color: black
}

.pagination button:hover {
  background-color: #e0e0e0;
}
.board-contents{
  font-size: 2rem;
  color: #888888;
  font-weight: 700;
  word-wrap: break-word;
  white-space: nowrap;
  padding-bottom: 4rem;
  margin-left: 58rem;
}
.board-context h3{
  color: #202020;
  font-size: 4rem;
  margin: 3rem 0 1rem 10rem; /* 텍스트의 왼쪽 여백 조정 */
  font-weight: 700;
  position: relative;
  word-wrap: break-word;
}

.board-writer{
  width: 90rem;
  border-bottom: 0.2rem solid #ddd;
  color: #888888;
  font-size: 1.5rem;
  white-space: nowrap;
  margin-left: 58rem;
  justify-content: left;
}


.board-content{
  margin-top: 40rem;
  margin-bottom: -43rem;
}

.board-context{
  padding: 2rem;
  max-width: 80rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0);
  width: 20rem;
  
}

.status-container {
  height: 3.9rem;
  width: 101.2rem;
  margin-top: 15.2rem;
  margin-left: 57.1rem;
  position: absolute;
  display: flex; /* 플렉스 박스를 사용해 가로 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 4.8rem; /* 상태 버튼 사이의 간격 */
  padding: 1rem 0 ; /* 상하좌우 패딩 추가 */
  border-bottom: 0.1rem solid #ddd; /* 아래에 구분선 추가 */
}



  /* 상태 버튼 스타일 */
.status {
font-size: 2.4rem;
font-family: Noto Sans;
font-weight: 700;
gap:4.8rem;
color: #888; /* 비활성화 상태의 색상 */
cursor: pointer; /* 클릭 가능한 커서 */
position: relative; /* ::after 위치 설정을 위한 기준 */
padding-bottom: 0.8rem; /* 텍스트와 줄 사이의 간격 */
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
height: 0.1rem;
background-color: #003E19; /* 줄 색상 */
}
.board-search-bar{
position:absolute;
display: flex; /* 플렉스 박스를 사용해 내부 아이템 정렬 */
align-items: center; /* 세로 중앙 정렬 */
padding-left: 2rem; /* 왼쪽 패딩 */
margin-top: 19rem; /* 위아래 간격 */
background: white;
border-radius: 1rem;
border: 0.1rem #CACACA solid;
width:84rem;
height:8.9rem;
color: #CACACA;
font-size: 2.4rem;
font-family: Noto Sans;
font-weight: 700;
word-wrap: break-word
}
.reset-btn
{
position:absolute;
display: flex; /* 플렉스 박스를 사용해 내부 아이템 정렬 */
align-items: center; /* 세로 중앙 정렬 */
padding-left: 2rem; /* 왼쪽 패딩 */
margin-top: 38.8rem; /* 위아래 간격 */
margin-left: 86rem; /* 위아래 간격 */
background: white;
border-radius: 1rem;
border: #CACACA solid;
width: 14rem;
height: 8.9rem;
color: #202020;
font-size: 2.4rem;
font-family: Noto Sans;
font-weight: 700;
word-wrap: break-word
}
.board-search-bar i {
    width: 5rem;
    font-size: 4rem; /* 아이콘의 크기 조정 */
    color:black;
    margin-left:1rem;
}

.board-search-bar input::placeholder {
    color: #CACACA; /* 텍스트 색상 */
}

.board-search-bar input {
    flex: 1; /* 입력 필드가 남은 공간을 채우도록 설정 */
    border: none; /* 테두리 제거 */
    outline: none; /* 포커스 시 생기는 외곽선 제거 */
    font-size: 2.4rem;
    font-family: Noto Sans;
    font-weight: 700;
    padding: 0 1rem; /* 입력 필드의 패딩 조정 */
    color: #CACACA; /* 텍스트 색상 */
}
.board-search-bar input {
    flex: 1; /* 입력 필드가 남은 공간을 채우도록 설정 */
    border: none; /* 테두리 제거 */
    outline: none; /* 포커스 시 생기는 외곽선 제거 */
    font-size: 2.4rem;
    font-family: Noto Sans;
    font-weight: 700;
    padding: 0 1rem; /* 입력 필드의 패딩 조정 */
    color: #CACACA; /* 텍스트 색상 */
}

.fa-solid .fas{
    width :2.1rem;
}
.fa-caret-down:before {
    content: "\f0d7";
    margin-left: 46.5rem;
    font-size: 6rem;
}

.search-btn{
    cursor:pointer;
    margin-left: 49.7rem;
    margin-top: 18.4rem;
    width: 14rem;
    height: 8.9rem;
    /* background: #A1B872; */
    border:#A1B872; 
    border-radius: 1rem;
    color: white; 
    font-size: 2.4rem;
    font-family: Noto Sans;
    font-weight: 700;
    word-wrap: break-word
}

.search-btn{
    margin-left: 49.7rem;
    margin-top: 18.4rem;
    width: 14rem;
    height: 8.9rem;
    /* background: #A1B872; */
    border:#A1B872; 
    border-radius: 1rem;
    color: white; 
    font-size: 2.4rem;
    font-family: Noto Sans;
    font-weight: 700;
    word-wrap: break-word
}

.tag-search-bar{
position:absolute;
display: flex; /* 플렉스 박스를 사용해 내부 아이템 정렬 */
align-items: center; /* 세로 중앙 정렬 */
justify-content: space-between;
padding-left: 2rem; /* 왼쪽 패딩 */
margin-top: 38.8rem; /* 위아래 간격 */
background: white;
border-radius: 1rem;
border: 0.1rem #CACACA solid;
width:84rem;
height:8.9rem;
color: #CACACA;
font-size: 2.4rem;
font-family: Noto Sans;
font-weight: 700;
word-wrap: break-word;
cursor: pointer;
padding-right: 2rem; /* 오른쪽 패딩 추가 */
white-space: nowrap; /* 줄바꿈 방지 */
}
.fa-caret-down{
    margin-left:1rem;
}

.tag-search-bar i {
    font-size: 4.8rem; /* 아이콘의 크기 조정 */
    color:black;
    margin-right: 1.5rem; /* 아이콘과 텍스트 사이의 간격 제거 */
    margin-left:1rem;
}
.tag-search-bar i1 {
    font-size: 4.8rem; /* 아이콘의 크기 조정 */
    color:black;
    margin-right: 2rem; /* 아이콘과 텍스트 사이의 간격 제거 */
    margin-left: -1rem
}

.tag-search-bar span {
    flex: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
    text-align: left;
    white-space: nowrap; /* 텍스트가 한 줄로 유지되도록 설정 */
    /* 텍스트가 넘치면 숨김 */
    text-overflow: ellipsis; /* 넘칠 경우 생략부호 표시 */
    margin-left: 2rem; /* 아이콘과 텍스트 사이의 간격 추가 */
}


.tag-search-bar:hover {
    background-color: #f0f0f0; /* 호버 시 배경색 */
}
.tag-dropdown {
    position: absolute;
    top: 25.7rem; /* 태그 검색 바 아래에 위치하도록 설정 */ /* 상태 컨테이너의 위치와 동일하게 설정 */
    width: 84rem;
    background: white;
    border: 0.1rem solid #CACACA;
    border-radius: 1rem;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
    z-index: 10; /* 다른 요소들 위에 표시 */
}

/* 드롭다운 항목 스타일 */
.tag-item {
    padding: 1.5rem 2rem;
    cursor: pointer;
    font-size: 2rem;
    color: #333;
    margin-left:0rem;
}

.tag-item:hover {
    background-color: #f0f0f0; /* 호버 시 배경색 */
}
</style>