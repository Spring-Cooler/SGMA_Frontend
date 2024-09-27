<template class="root-container">
  <router-view /> <!-- 여기에 라우터가 활성화된 컴포넌트를 렌더링 -->
</template>

<script>
import { reactive, provide, onMounted } from 'vue';

export default {
  setup() {
    // 사용자 토큰 상태 관리
    const token = reactive({
      accessToken: null,
      accessTokenExpiry: null,
      refreshToken: null,
      refreshTokenExpiry: null,
    });

    // 사용자 정보 상태 관리
    const user = reactive({
      userId: null,
      userAuthId: null,
      userIdentifier: null,
      userName: null,
      nickname: null,
      email: null,
      userStatus: null,
      createdAt: null,
      withdrawnAt: null,
      profileImage: null,
      acceptStatus: null,
      signupPath: null,
    });

    // 사용자 토큰 저장 메서드 (로그인 성공 시 토큰 저장)
    const setTokenData = (tokenData) => {
      token.accessToken = tokenData.access_token;
      token.accessTokenExpiry = tokenData.access_token_expiry;
      token.refreshToken = tokenData.refresh_token;
      token.refreshTokenExpiry = tokenData.refresh_token_expiry;

      // 토큰 정보 localStorage에 저장
      localStorage.setItem('token', JSON.stringify(token));
      console.log('로그인 성공! 토큰 정보:', {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    };

    // 사용자 정보 저장 메서드 (실제 사용자 정보 저장)
    const setUserData = (userData) => {
      user.userId = userData.user_id;
      user.userAuthId = userData.user_auth_id;
      user.userIdentifier = userData.user_identifier;
      user.userName = userData.user_name;
      user.nickname = userData.nickname;
      user.email = userData.email;
      user.userStatus = userData.user_status;
      user.createdAt = userData.created_at;
      user.withdrawnAt = userData.withdrawn_at;
      user.profileImage = userData.profile_image;
      user.acceptStatus = userData.accept_status;
      user.signupPath = userData.signup_path;

      // 사용자 정보 localStorage에 저장
      localStorage.setItem('user', JSON.stringify(user));
      console.log('사용자 정보 조회 성공! 사용자 정보:', user);
    };

    // 애플리케이션 초기화 시 localStorage에서 데이터 복원
    const initializeState = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        Object.assign(token, parsedToken); // 복원된 토큰 상태 설정
      }

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        Object.assign(user, parsedUser); // 복원된 사용자 상태 설정
      }
    };

    // 초기화 함수 호출 (마운트 시 실행)
    onMounted(() => {
      initializeState();
    });

    // 사용자 상태 제공
    provide('token', token);
    provide('user', user);
    provide('setTokenData', setTokenData); // setTokenData 메서드도 제공
    provide('setUserData', setUserData); // setUserData 메서드도 제공

    return {
      token,
      user,
      setTokenData,
      setUserData,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

body {
  font-family: 'Noto Sans', sans-serif;
}
</style>
