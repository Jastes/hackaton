import React, { useState, memo } from 'react';
import './ResultsSummary.css';
import { formatCurrency, formatPercent } from '../utils/formatters';

const ResultsSummary = memo(function ResultsSummary({ results }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!results) {
    return null;
  }
  
  const { metrics = {}, data_period = {}, market = 'N/A', signals = {} } = results;

  return (
    <div className="results-summary">
      <div className="summary-header" onClick={() => setExpanded(!expanded)}>
        <div className="summary-title">
          <h3>{market}</h3>
          <span className="summary-period">
            {data_period.start || 'N/A'} ~ {data_period.end || 'N/A'}
          </span>
        </div>
        <div className="summary-main-metric">
          <span className="metric-label">총 수익률</span>
          <span className={`metric-value ${(metrics.total_return || 0) >= 0 ? 'positive' : 'negative'}`}>
            {formatPercent(metrics.total_return || 0)}
          </span>
        </div>
        <div className="expand-icon">{expanded ? '▼' : '▶'}</div>
      </div>

      {expanded && (
        <div className="summary-details">
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">초기 자본</span>
              <span className="metric-value">{formatCurrency(metrics.initial_capital || 0)}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">최종 자산</span>
              <span className="metric-value">{formatCurrency(metrics.final_value || 0)}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Buy & Hold</span>
              <span className={`metric-value ${(metrics.buy_hold_return || 0) >= 0 ? 'positive' : 'negative'}`}>
                {formatPercent(metrics.buy_hold_return || 0)}
              </span>
            </div>
            <div className="metric-item">
              <span className="metric-label">거래 횟수</span>
              <span className="metric-value">{metrics.num_trades || 0}회</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">승률</span>
              <span className="metric-value">{metrics.win_rate != null ? metrics.win_rate.toFixed(2) : '0.00'}%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">MDD</span>
              <span className="metric-value negative">{formatPercent(metrics.max_drawdown || 0)}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Sharpe Ratio</span>
              <span className="metric-value">{metrics.sharpe_ratio != null ? metrics.sharpe_ratio.toFixed(2) : '0.00'}</span>
            </div>
          </div>
          <div className="signals-summary">
            <div className="signal-badge buy">
              매수 신호: {signals.buy_count || 0}개
            </div>
            <div className="signal-badge sell">
              매도 신호: {signals.sell_count || 0}개
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ResultsSummary;

