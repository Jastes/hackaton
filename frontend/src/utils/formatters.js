/**
 * 통화 포맷팅
 * @param {number} value - 포맷팅할 숫자
 * @returns {string} - 포맷팅된 통화 문자열
 */
export const formatCurrency = (value) => {
  if (!value && value !== 0) return '';
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * 퍼센트 포맷팅
 * @param {number} value - 포맷팅할 숫자
 * @returns {string} - 포맷팅된 퍼센트 문자열
 */
export const formatPercent = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

