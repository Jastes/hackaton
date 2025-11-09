import { useState, useEffect } from 'react';
import { fetchMarkets } from '../services/api';
import { DEFAULT_MARKETS } from '../constants';

/**
 * 마켓 목록 조회 훅
 * @returns {Object} - { markets, loading, error }
 */
export const useMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        setLoading(true);
        const data = await fetchMarkets();
        setMarkets(data.length > 0 ? data : DEFAULT_MARKETS);
        setError(null);
      } catch (err) {
        console.error('마켓 목록 로드 실패:', err);
        setMarkets(DEFAULT_MARKETS);
        setError(null); // 기본 마켓 사용 시 에러로 표시하지 않음
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, []);

  return { markets, loading, error };
};

