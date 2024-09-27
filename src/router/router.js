import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/user/page/Home.vue"; // 홈 화면 컴포넌트
import MyPage from "@/views/user/page/MyPage.vue"; // 마이페이지 컴포넌트
import FindStudyGroups from '@/views/Recruitment/FindStudyGroup.vue'; // 스터디 그룹 찾기 컴포넌트
// import CreateGroup from '@/views/CreateGroup.vue'; // 스터디 그룹 만들기 컴포넌트
import SchedulePage from "@/views/Schedule/SchedulePage.vue";
import ScheduleDetailPage from "@/views/Schedule/ScheduleDetailPage.vue";
import StudyNoticePage from "@/views/Group/page/StudyNoticePage.vue";
import StudyBoardPage from "@/views/Group/page/StudyBoardPage.vue";
import StudyMemberPage from "@/views/Group/page/StudyMemberPage.vue";
import StudyRecruitmentPage from "@/views/Group/page/StudyRecruitmentPage.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/mypage", name: "MyPage", component: MyPage },
  { path: '/study-groups', name: 'FindStudyGroups', component: FindStudyGroups },
  
  //   { path: '/create-group', name: 'CreateGroup', component: CreateGroup },
  {
    path: "/study-groups/1/schedules",
    component: SchedulePage,
  },
  {
    path: "/study-schedule/1/details",
    name: "ScheduleDetailPage",
    component: ScheduleDetailPage,
    props: true,
  },
  {
    path: "/study-groups/1/notices",
    name: "StudyNoticePage",
    component: StudyNoticePage
  },
  {
    path: "/study-groups/1/boards",
    name: "StudyBoardPage",
    component: StudyBoardPage
  },
  {
    path: "/study-groups/1/members",
    name: "StudyMemberPage",
    component: StudyMemberPage
  },
  {
    path: "/study-groups/1/recruitments",
    name: "StudyRecruitmentPage",
    component: StudyRecruitmentPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
