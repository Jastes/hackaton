import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants';
import { getErrorMessage } from '../utils/errorHandler';

/**
 * API 클라이언트 설정
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT.SHORT,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 마켓 목록 조회
 * @returns {Promise<Array>} - 마켓 목록
 */
export const fetchMarkets = async () => {
  try {
    const response = await apiClient.get('/markets');
    return response.data?.markets || [];
  } catch (err) {
    console.error('마켓 목록 조회 실패:', err);
    throw err;
  }
};

/**
 * 백테스팅 실행
 * @param {Object} formData - 백테스팅 설정 데이터
 * @returns {Promise<Object>} - 백테스팅 결과
 */
export const runBacktest = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/backtest`, formData, {
      timeout: API_TIMEOUT.LONG,
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error || '백테스팅 실행 실패');
    }
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    throw new Error(errorMessage);
  }
};

