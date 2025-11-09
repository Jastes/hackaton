import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

// Lazy loading으로 성능 최적화
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ChartPage = lazy(() => import('./pages/ChartPage'));
const TradeHistoryPage = lazy(() => import('./pages/TradeHistoryPage'));

function App() {
  return (
    <Router>
      <div className="App">
        <main className="app-main">
          <Suspense fallback={<div className="loading-spinner">로딩 중...</div>}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/chart" element={<ChartPage />} />
              <Route path="/trades" element={<TradeHistoryPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
