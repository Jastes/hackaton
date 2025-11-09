import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './DashboardPage.css';
import BacktestForm from '../components/BacktestForm';
import ResultsSummary from '../components/ResultsSummary';
import ChartDisplay from '../components/ChartDisplay';
import { useMarkets } from '../hooks/useMarkets';
import { runBacktest } from '../services/api';

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const { markets } = useMarkets();

  const handleBacktest = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const backtestResults = await runBacktest(formData);
      setResults(backtestResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTrades = () => {
    if (results) {
      navigate('/trades', { state: { results } });
    }
  };

  return (
    <div className="dashboard-page">
      <div className="window-header">
        <div className="window-controls">
          <div className="window-control close"></div>
          <div className="window-control minimize"></div>
          <div className="window-control maximize"></div>
        </div>
        <div className="window-title">암호화폐 포트폴리오 시뮬레이터</div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-left">
          <div className="section-card">
            <h2>백테스팅 설정</h2>
            <BacktestForm 
              markets={markets} 
              onBacktest={handleBacktest} 
              loading={loading}
            />
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-right">
          {results ? (
            <>
              <div className="section-card">
                <div className="results-header-section">
                  <h2>백테스팅 결과</h2>
                  <button onClick={handleViewTrades} className="action-btn trades-btn">
                    📋 거래 내역
                  </button>
                </div>
                <ResultsSummary results={results} />
              </div>
              <div className="section-card chart-card">
                <ChartDisplay results={results} />
              </div>
            </>
          ) : (
            <div className="section-card empty-card">
              <div className="empty-icon">📈</div>
              <h3>백테스팅을 실행하세요</h3>
              <p>왼쪽에서 설정을 입력하고 백테스팅을 실행하면 결과가 여기에 표시됩니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

