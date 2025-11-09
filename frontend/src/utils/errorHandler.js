/**
 * 에러 메시지 단순화 함수
 * @param {Error} err - 에러 객체
 * @returns {string} - 단순화된 에러 메시지
 */
export const getErrorMessage = (err) => {
  if (err.code === 'ECONNABORTED') {
    return '요청 시간 초과';
  }
  if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
    return '서버 연결 실패';
  }
  return err.response?.data?.error || err.message || '오류 발생';
};

