import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import './TradeHistoryPage.css';
import { formatCurrency } from '../utils/formatters';

function TradeHistoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results;

  const trades = useMemo(() => {
    if (!results?.trades) return [];
    return results.trades;
  }, [results]);

  const tradeStats = useMemo(() => {
    if (trades.length === 0) return null;
    
    const buyTrades = trades.filter(t => t.type === 'BUY');
    const sellTrades = trades.filter(t => t.type === 'SELL');
    
    let totalProfit = 0;
    let winCount = 0;
    let lossCount = 0;
    
    for (let i = 0; i < Math.min(buyTrades.length, sellTrades.length); i++) {
      const profit = sellTrades[i].price - buyTrades[i].price;
      totalProfit += profit;
      if (profit > 0) winCount++;
      else lossCount++;
    }
    
    return {
      totalTrades: trades.length,
      buyCount: buyTrades.length,
      sellCount: sellTrades.length,
      totalProfit,
      winCount,
      lossCount,
      winRate: winCount + lossCount > 0 ? (winCount / (winCount + lossCount)) * 100 : 0
    };
  }, [trades]);

  if (!results) {
    return (
      <div className="trade-history-page">
        <div className="page-container">
          <div className="no-data-card">
            <div className="no-data-icon">📋</div>
            <h2>거래 내역이 없습니다</h2>
            <p>백테스팅을 먼저 실행해주세요</p>
            <button onClick={() => navigate('/')} className="primary-button">
              대시보드로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trade-history-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate('/')} className="back-button">
            ← 대시보드
          </button>
          <h1>거래 내역</h1>
        </div>

        {tradeStats && (
          <div className="trade-stats">
            <div className="stat-card">
              <div className="stat-label">총 거래</div>
              <div className="stat-value">{tradeStats.totalTrades}회</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">매수</div>
              <div className="stat-value buy">{tradeStats.buyCount}회</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">매도</div>
              <div className="stat-value sell">{tradeStats.sellCount}회</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">승률</div>
              <div className="stat-value">{tradeStats.winRate.toFixed(2)}%</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">승리</div>
              <div className="stat-value positive">{tradeStats.winCount}회</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">손실</div>
              <div className="stat-value negative">{tradeStats.lossCount}회</div>
            </div>
          </div>
        )}

        <div className="trades-table-container">
          {trades.length > 0 ? (
            <div className="trades-table-wrapper">
              <table className="trades-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>유형</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>총 자산 가치</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <tr key={index} className={trade.type === 'BUY' ? 'buy-row' : 'sell-row'}>
                    <td>{trade.date}</td>
                    <td>
                      <span className={`trade-type ${trade.type.toLowerCase()}`}>
                        {trade.type === 'BUY' ? '매수' : '매도'}
                      </span>
                    </td>
                    <td>{formatCurrency(trade.price)}</td>
                    <td>{trade.amount.toFixed(8)}</td>
                    <td>{formatCurrency(trade.total_value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="no-trades">
              <p>거래 내역이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TradeHistoryPage;

