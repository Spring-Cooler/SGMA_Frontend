import axios from 'axios';

/**
 * 사용자 ID로 사용자 정보를 조회하는 함수
 * @param {Number} userId - 조회할 사용자의 ID
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} 사용자 정보 데이터
 */
export const getUserById = async (userId, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/user-id/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API에서 받은 데이터를 반환
  } catch (error) {
    console.error('getUserById 에러:', error);
    throw error; // 에러를 상위로 전달
  }
};

/**
 * 닉네임으로 사용자 정보를 조회하는 함수
 * @param {String} nickname - 조회할 사용자의 닉네임
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} 사용자 정보 데이터
 */
export const getUserByNickname = async (nickname, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/nickname/${nickname}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('getUserByNickname 에러:', error);
    throw error;
  }
};

/**
 * 사용자 식별자로 사용자 정보를 조회하는 함수
 * @param {String} userIdentifier - 조회할 사용자의 식별자
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} 사용자 정보 데이터
 */
export const getUserByIdentifier = async (userIdentifier, accessToken) => {
  try {
    const response = await axios.get('/user-service/api/users/identifier', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
      params: { 
        user_identifier: userIdentifier 
      }
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('getUserByIdentifier 에러:', error);
    throw error;
  }
};

/**
 * 닉네임과 이메일로 사용자의 인증 ID를 조회하는 함수
 * @param {String} nickname - 조회할 사용자의 닉네임
 * @param {String} email - 조회할 사용자의 이메일
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} 사용자 정보 데이터
 */
export const getUserAuthIdByNicknameAndEmail = async (nickname, email, accessToken) => {
  try {
    const response = await axios.get('/user-service/api/users/auth-id', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
      params: {
        nickname: nickname,
        email: email
      }
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('getUserAuthIdByNicknameAndEmail 에러:', error);
    throw error;
  }
};

/**
 * 회원이 작성한 댓글 목록 조회 함수
 * @param {Number} userId - 조회할 사용자의 ID
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} 댓글 목록 데이터
 */
export const getUserComments = async (userId, accessToken) => {
  try {
    const response = await axios.get(`/user-service/api/users/comments/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('getUserComments 에러:', error);
    throw error;
  }
};

/**
 * 닉네임 중복 확인 함수
 * @param {String} nickname - 확인할 닉네임
 * @returns {Object} 중복 여부 데이터
 */
export const validateNickname = async (nickname) => {
  try {
    const response = await axios.post('/user-service/api/users/nickname/validate', {
      nickname: nickname
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('validateNickname 에러:', error);
    throw error;
  }
};

/**
 * 사용자 인증 ID 중복 확인 함수
 * @param {String} userAuthId - 확인할 사용자 인증 ID
 * @returns {Object} 중복 여부 데이터
 */
export const validateUserAuthId = async (userAuthId) => {
  try {
    const response = await axios.post('/user-service/api/users/user-id/validate', 
      {
        user_auth_id: userAuthId
      },
    );
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('validateUserAuthId 에러:', error);
    throw error;
  }
};

/**
 * 회원가입 시 인증번호 이메일 전송 함수
 * @param {String} email - 인증번호를 받을 이메일 주소
 * @returns {Object} API 응답 데이터
 */
export const sendSignupVerificationEmail = async (email) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/signup', {
      email: email
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('sendSignupVerificationEmail 에러:', error);
    throw error;
  }
};

/**
 * 아이디 찾기 시 인증번호 이메일 전송 함수
 * @param {String} nickname - 닉네임
 * @param {String} email - 인증번호를 받을 이메일 주소
 * @returns {Object} API 응답 데이터
 */
export const sendAuthIdVerificationEmail = async (nickname, email) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/auth-id', {
      nickname: nickname,
      email: email
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('sendAuthIdVerificationEmail 에러:', error);
    throw error;
  }
};


/**
 * 비밀번호 찾기 시 인증번호 이메일 전송 함수
 * @param {String} userAuthId - 사용자 인증 ID
 * @param {String} email - 인증번호를 받을 이메일 주소
 * @returns {Object} API 응답 데이터
 */
export const sendPasswordResetVerificationEmail = async (userAuthId, email) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/user-password', {
      user_auth_id: userAuthId,
      email: email
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('sendPasswordResetVerificationEmail 에러:', error);
    throw error;
  }
};


/**
 * 인증번호 확인 함수
 * @param {String} email - 인증번호가 전송된 이메일 주소
 * @param {String} code - 입력한 인증번호
 * @returns {Object} API 응답 데이터
 */
export const confirmVerificationCode = async (email, code) => {
  try {
    const response = await axios.post('/user-service/api/users/verification-email/confirmation', {
      email: email,
      code: code
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('confirmVerificationCode 에러:', error);
    throw error;
  }
};


/**
 * 일반 회원가입 함수
 * @param {Object} userData - 회원가입 데이터 (user_auth_id, user_name, password, nickname, email, signup_path)
 * @returns {Object} API 응답 데이터
 */
export const signupUser = async (userData) => {
  try {
    const response = await axios.post('/user-service/api/users/signup/normal', userData);
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('signupUser 에러:', error);
    throw error;
  }
};

/**
 * 카카오 로그인 함수
 * @param {String} code - 카카오 OAuth 인증 코드
 * @returns {Object} API 응답 데이터
 */
export const kakaoLogin = async (code) => {
  try {
    const response = await axios.post('/user-service/api/users/oauth2/kakao', {
      code: code
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('kakaoLogin 에러:', error);
    throw error;
  }
};

/**
 * 네이버 로그인 함수
 * @param {String} code - 네이버 OAuth 인증 코드
 * @returns {Object} API 응답 데이터
 */
export const naverLogin = async (code) => {
  try {
    const response = await axios.post('/user-service/api/users/oauth2/naver', {
      code: code
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('naverLogin 에러:', error);
    throw error;
  }
};


/**
 * 회원 탈퇴 함수
 * @param {Number} userId - 탈퇴할 사용자의 ID
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} API 응답 데이터
 */
export const deactivateUser = async (userId, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/deactivate`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('deactivateUser 에러:', error);
    throw error;
  }
};

/**
 * 회원 재활성화 함수
 * @param {Number} userId - 재활성화할 사용자의 ID
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} API 응답 데이터
 */
export const reactivateUser = async (userId, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/activate`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('reactivateUser 에러:', error);
    throw error;
  }
};

/**
 * 회원 프로필 정보 변경 함수
 * @param {Number} userId - 프로필 정보를 변경할 사용자의 ID
 * @param {Object} profileData - 변경할 프로필 데이터 (nickname, profile_image)
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} API 응답 데이터
 */
export const updateUserProfile = async (userId, profileData, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('updateUserProfile 에러:', error);
    throw error; // 에러를 상위로 전달
  }
};


/**
 * 비밀번호 재설정 함수
 * @param {Number} userId - 비밀번호를 재설정할 사용자의 ID
 * @param {String} newPassword - 새 비밀번호
 * @param {String} accessToken - 인증 토큰
 * @returns {Object} API 응답 데이터
 */
export const resetUserPassword = async (userId, newPassword, accessToken) => {
  try {
    const response = await axios.patch(`/user-service/api/users/${userId}/password`, {
      password: newPassword
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
      },
    });
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error('resetUserPassword 에러:', error);
    throw error;
  }
};
