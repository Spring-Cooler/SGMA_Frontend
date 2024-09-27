<template class="root-container">
  <router-view /> 여기에 라우터가 활성화된 컴포넌트를 렌더링
   <!-- <SingleBoard/> -->
</template>

<script>
import { reactive, provide } from 'vue';
import SingleBoard from './views/Recruitment/SingleBoard.vue';

export default {
  setup() {
    // 사용자 정보 상태 관리
    const user = reactive({
      userIdentifier: null,
      accessToken: null,
      accessTokenExpiry: null,
      refreshToken: null,
      refreshTokenExpiry: null
    });

    // 사용자 정보 저장 메서드
    const setUserData = (userData) => {
      user.userIdentifier = userData.user_identifier;
      user.accessToken = userData.access_token;
      user.accessTokenExpiry = userData.access_token_expiry;
      user.refreshToken = userData.refresh_token;
      user.refreshTokenExpiry = userData.refresh_token_expiry;

      // 사용자 정보 콘솔에 출력
      console.log('로그인 성공! 사용자 정보:', user);
    };

    // 사용자 상태 제공
    provide('user', user);
    provide('setUserData', setUserData); // setUserData 메서드도 제공

    return {
      user,
      setUserData
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

body {
  font-family: 'Noto Sans', sans-serif;
}
</style>
