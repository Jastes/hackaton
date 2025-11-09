import React from 'react';
import './ResultsDisplay.css';
import { formatCurrency, formatPercent } from '../utils/formatters';

function ResultsDisplay({ results }) {
  const { metrics, data_period, signals, market } = results;

  return (
    <div className="results-display-container">
      <h2>백테스팅 결과</h2>
      
      <div className="results-header">
        <div className="market-info">
          <h3>{market}</h3>
          <p>
            분석 기간: {data_period.start} ~ {data_period.end} ({data_period.days}일)
          </p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">초기 자본금</div>
          <div className="metric-value">{formatCurrency(metrics.initial_capital)}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">최종 자산</div>
          <div className="metric-value">{formatCurrency(metrics.final_value)}</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-label">총 수익률</div>
          <div className={`metric-value ${metrics.total_return >= 0 ? 'positive' : 'negative'}`}>
            {formatPercent(metrics.total_return)}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Buy & Hold 수익률</div>
          <div className={`metric-value ${metrics.buy_hold_return >= 0 ? 'positive' : 'negative'}`}>
            {formatPercent(metrics.buy_hold_return)}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">거래 횟수</div>
          <div className="metric-value">{metrics.num_trades}회</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">승률</div>
          <div className="metric-value">{metrics.win_rate.toFixed(2)}%</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">최대 낙폭 (MDD)</div>
          <div className="metric-value negative">{formatPercent(metrics.max_drawdown)}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Sharpe Ratio</div>
          <div className="metric-value">{metrics.sharpe_ratio.toFixed(2)}</div>
        </div>
      </div>

      <div className="signals-info">
        <div className="signal-item">
          <span className="signal-label">매수 신호:</span>
          <span className="signal-count buy">{signals.buy_count}개</span>
        </div>
        <div className="signal-item">
          <span className="signal-label">매도 신호:</span>
          <span className="signal-count sell">{signals.sell_count}개</span>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;

