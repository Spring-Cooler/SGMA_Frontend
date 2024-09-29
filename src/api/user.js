import axios from 'axios';

// 인증 헤더가 필요한 요청에 대해 헤더 추가
const headersWithAuth = (accessToken) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  }
});

/**
 * 사용자 ID로 사용자 정보를 조회하는 함수
 */
export const getUserById = async (userId, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/user-id/${userId}`, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('getUserById 에러:', error);
    throw error;
  }
};

/**
 * 닉네임으로 사용자 정보를 조회하는 함수
 */
export const getUserByNickname = async (nickname, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/nickname/${nickname}`, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('getUserByNickname 에러:', error);
    throw error;
  }
};

/**
 * 사용자 식별자로 사용자 정보를 조회하는 함수
 */
export const getUserByIdentifier = async (userIdentifier, accessToken) => {
  try {
    const response = await axios.get('/user-service/api/users/identifier', {
      ...headersWithAuth(accessToken),
      params: { user_identifier: userIdentifier }
    });
    return response.data;
  } catch (error) {
    console.error('getUserByIdentifier 에러:', error);
    throw error;
  }
};

/**
 * 닉네임과 이메일로 사용자의 인증 ID를 조회하는 함수
 */
export const getUserAuthIdByNicknameAndEmail = async (nickname, email, accessToken) => {
  try {
    const response = await axios.get('/user-service/api/users/auth-id', {
      ...headersWithAuth(accessToken),
      params: { nickname, email }
    });
    return response.data;
  } catch (error) {
    console.error('getUserAuthIdByNicknameAndEmail 에러:', error);
    throw error;
  }
};

/**
 * 회원이 작성한 댓글 목록 조회 함수
 */
export const getUserComments = async (userId, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/comments/${userId}`, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('getUserComments 에러:', error);
    throw error;
  }
};

/**
 * 닉네임 중복 확인 함수
 */
export const validateNickname = async (nickname) => {
  try {
    const response = await axios.post('/user-service/api/users/nickname/validate', {
      nickname: nickname
    });
    return response.data;
  } catch (error) {
    console.error('validateNickname 에러:', error);
    throw error;
  }
};

/**
 * 사용자 인증 ID 중복 확인 함수
 */
export const validateUserAuthId = async (userAuthId) => {
  try {
    const response = await axios.post('/user-service/api/users/user-id/validate', {
      user_auth_id: userAuthId
    });
    return response.data;
  } catch (error) {
    console.error('validateUserAuthId 에러:', error);
    throw error;
  }
};

/**
 * 회원가입 시 인증번호 이메일 전송 함수
 */
export const sendSignupVerificationEmail = async (email) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/signup', {
      email: email
    });
    return response.data;
  } catch (error) {
    console.error('sendSignupVerificationEmail 에러:', error);
    throw error;
  }
};

/**
 * 아이디 찾기 시 인증번호 이메일 전송 함수
 */
export const sendAuthIdVerificationEmail = async (nickname, email, accessToken) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/auth-id', {
      nickname: nickname,
      email: email
    }, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('sendAuthIdVerificationEmail 에러:', error);
    throw error;
  }
};

/**
 * 비밀번호 찾기 시 인증번호 이메일 전송 함수
 */
export const sendPasswordResetVerificationEmail = async (userAuthId, email) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/user-password', {
      user_auth_id: userAuthId,
      email: email
    });
    return response.data;
  } catch (error) {
    console.error('sendPasswordResetVerificationEmail 에러:', error);
    throw error;
  }
};

/**
 * 인증번호 확인 함수
 */
export const confirmVerificationCode = async (email, code) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/confirmation', {
      email: email,
      code: code
    });
    return response.data;
  } catch (error) {
    console.error('confirmVerificationCode 에러:', error);
    throw error;
  }
};

/**
 * 일반 회원가입 함수
 */
export const signupUser = async (userData) => {
  try {
    const response = await axios.post('/user-service/api/users/signup/normal', userData);
    return response.data;
  } catch (error) {
    console.error('signupUser 에러:', error);
    throw error;
  }
};

/**
 * 카카오 로그인 함수
 */
export const kakaoLogin = async (code) => {
  try {
    const response = await axios.post('/user-service/api/users/oauth2/kakao', {
      code: code
    });
    return response.data;
  } catch (error) {
    console.error('kakaoLogin 에러:', error);
    throw error;
  }
};

/**
 * 네이버 로그인 함수
 */
export const naverLogin = async (code) => {
  try {
    const response = await axios.post('/user-service/api/users/oauth2/naver', {
      code: code
    });
    return response.data;
  } catch (error) {
    console.error('naverLogin 에러:', error);
    throw error;
  }
};

/**
 * 회원 탈퇴 함수
 */
export const deactivateUser = async (userId, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/deactivate`, {}, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('deactivateUser 에러:', error);
    throw error;
  }
};

/**
 * 회원 재활성화 함수
 */
export const reactivateUser = async (userId, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/activate`, {}, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('reactivateUser 에러:', error);
    throw error;
  }
};

/**
 * 회원 프로필 정보 변경 함수
 */
export const updateUserProfile = async (userId, profileData, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/profile`, profileData, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('updateUserProfile 에러:', error);
    throw error;
  }
};

/**
 * 비밀번호 재설정 함수
 */
export const resetUserPassword = async (userId, newPassword, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/password`, {
      password: newPassword
    }, headersWithAuth(accessToken));
    return response.data;
  } catch (error) {
    console.error('resetUserPassword 에러:', error);
    throw error;
  }
};
