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
