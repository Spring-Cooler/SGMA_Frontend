import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/user/page/Home.vue"; // 홈 화면 컴포넌트
import MyPage from "@/views/user/page/MyPage.vue"; // 마이페이지 컴포넌트
import FindStudyGroups from "@/views/Recruitment/FindStudyGroup.vue"; // 스터디 그룹 찾기 컴포넌트
import SchedulePage from "@/views/Schedule/SchedulePage.vue";
import ScheduleDetailPage from "@/views/Schedule/ScheduleDetailPage.vue";
import StudyNoticePage from "@/views/Group/page/StudyNoticePage.vue";
import StudyBoardPage from "@/views/Group/page/StudyBoardPage.vue";
import StudyMemberPage from "@/views/Group/page/StudyMemberPage.vue";
import StudyRecruitmentPage from "@/views/Group/page/StudyRecruitmentPage.vue";
import StudyMemberManagePage from "@/views/Group/page/StudyMemberManagePage.vue";
import CreateGroupPage from "@/views/Group/page/CreateGroupPage.vue";
import ExamPage from "@/views/Problem/ExamPage.vue";
import StudyBoardDetailPage from "@/views/Group/page/StudyBoardDetailPage.vue";
import StudyNoticeDetailPage from "@/views/Group/page/StudyNoticeDetailPage.vue";
import StudyPostModifyPage from "@/views/Group/page/StudyPostModifyPage.vue";
import StudyPostUploadPage from "@/views/Group/page/StudyPostUploadPage.vue";
import Applicant from "@/views/Recruitment/Applicant.vue";
import RecruitmentDetailPage from "@/views/Recruitment/RecruitmentDetailPage.vue";
import MyStudyGroupsPage from "@/views/user/page/MyStudyGroupsPage.vue";
import KakaoCallback from '@/views/user/components/KakaoCallback.vue'; // 콜백 처리용 컴포넌트
import NaverCallback from '@/views/user/components/NaverCallback.vue'; // 콜백 처리용 컴포넌트

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/mypage", name: "MyPage", component: MyPage },
  { path: '/study-groups', name: 'FindStudyGroups', component: FindStudyGroups },
  { path: '/create-group', name: 'CreateGroupPage', component: CreateGroupPage },
  { path: '/applicant', name: 'Applicant', component: Applicant },
  { path: '/recruitments/:recruitmentId', name: 'RecruitmentDetailPage', component: RecruitmentDetailPage},
  { path: "/study-groups", name: "FindStudyGroups", component: FindStudyGroups },
  { path: "/my-study-groups", name: "MyStudyGroupsPage", component: MyStudyGroupsPage },
  {
    path: "/study-groups/:groupId/schedules",
    component: SchedulePage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/schedules/:scheduleId",
    name: "ScheduleDetailPage",
    component: ScheduleDetailPage,
    props: route => ({
      scheduleId: route.params.scheduleId,
      groupId: route.params.groupId,
      schedule: route.query.schedule ? JSON.parse(route.query.schedule) : null,
    }),
  },
  {
    path: "/study-groups/:groupId/notices",
    name: "StudyNoticePage",
    component: StudyNoticePage,
  },
  {
    path: "/study-groups/:groupId/boards",
    name: "StudyBoardPage",
    component: StudyBoardPage,
  },
  {
    path: "/study-groups/:groupId/members",
    name: "StudyMemberPage",
    component: StudyMemberPage,
  },
  {
    path: "/study-groups/:groupId/recruitments",
    name: "StudyRecruitmentPage",
    component: StudyRecruitmentPage,
  },
  {
    path: "/study-groups/:groupId/members/management",
    name: "StudyMemberManagePage",
    component: StudyMemberManagePage,
  },
  {
    path: `/study-problems/schedules/:scheduleId`,
    name: "ExamPage",
    component: ExamPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/boards/:boardId",
    name: "StudyBoardDetailPage",
    component: StudyBoardDetailPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/notices/:noticeId",
    name: "StudyNoticeDetailPage",
    component: StudyNoticeDetailPage,
    props: true,
  },
  {
    path: "/study-groups",
    name: "StudyGroups",
    component: () => import("@/views/Recruitment/FindStudyGroup.vue"), // 페이지 컴포넌트 경로
  },
  {
    path: "/study-groups/:groupId/boards/:boardId/modify",
    name: "StudyBoardModifyPage",
    component: StudyPostModifyPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/notices/:noticeId/modify",
    name: "StudyNoticeModifyPage",
    component: StudyPostModifyPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/boards/upload",
    name: "StudyBoardUploadPage",
    component: StudyPostUploadPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/notices/upload",
    name: "StudyNoticeUploadPage",
    component: StudyPostUploadPage,
    props: true,
  },
  {
    path: "/study-groups/:groupId/recruitments/upload",
    name: "StudyRecruitmentUploadPage",
    component: StudyPostUploadPage,
    props: true,
  },
  {
    path: '/kakaologin',
    name: 'KakaoCallback',
    component: KakaoCallback,
  },
  {
    path: '/naverlogin',
    name: 'NaverCallback',
    component: KakaoCallback,
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
