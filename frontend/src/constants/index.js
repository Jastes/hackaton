// API 설정
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5001/api' 
  : '/api';

// 기본 마켓 목록
export const DEFAULT_MARKETS = [
  { code: 'KRW-BTC', name: '비트코인 (BTC)' },
  { code: 'KRW-ETH', name: '이더리움 (ETH)' },
  { code: 'KRW-XRP', name: '리플 (XRP)' },
  { code: 'KRW-ADA', name: '에이다 (ADA)' },
  { code: 'KRW-DOT', name: '폴카닷 (DOT)' },
  { code: 'KRW-LINK', name: '체인링크 (LINK)' },
  { code: 'KRW-LTC', name: '라이트코인 (LTC)' },
  { code: 'KRW-BCH', name: '비트코인 캐시 (BCH)' }
];

// API 타임아웃 설정
export const API_TIMEOUT = {
  SHORT: 5000,
  LONG: 300000
};

