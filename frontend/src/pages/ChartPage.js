import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import './ChartPage.css';
import ChartDisplay from '../components/ChartDisplay';

function ChartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results;

  if (!results) {
    return (
      <div className="chart-page">
        <div className="page-container">
          <div className="no-data-card">
            <div className="no-data-icon">📊</div>
            <h2>차트 데이터가 없습니다</h2>
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
    <div className="chart-page">
      <div className="page-container">
        <div className="page-header">
          <button onClick={() => navigate('/')} className="back-button">
            ← 대시보드
          </button>
          <h1>차트 분석</h1>
        </div>
        <div className="chart-container">
          <ChartDisplay results={results} />
        </div>
      </div>
    </div>
  );
}

export default ChartPage;

