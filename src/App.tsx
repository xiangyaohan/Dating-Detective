import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Investigation from './pages/Investigation';
import DatingInvestigation from './pages/DatingInvestigation';
import ReportGeneration from './pages/ReportGeneration';
import DatingReport from './pages/DatingReport';
import SearchResults from './pages/SearchResults';
import Report from './pages/Report';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import DataSources from './pages/DataSources';
import Compliance from './pages/Compliance';
import GamePlaza from './pages/GamePlaza';
import { ToastProvider } from './components/Toast';
import { useAppStore } from './stores/appStore';

function App() {
  const loadFromLocalStorage = useAppStore(state => state.loadFromLocalStorage);

  useEffect(() => {
    // 应用启动时加载localStorage中的数据
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/investigation/new" element={<Investigation />} />
              <Route path="/investigation/dating" element={<DatingInvestigation />} />
              <Route path="/investigation/:id" element={<SearchResults />} />
              <Route path="/report-generation/:id" element={<ReportGeneration />} />
              <Route path="/dating-report/:id" element={<DatingReport />} />
              <Route path="/report/:id" element={<Report />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/datasources" element={<DataSources />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/game-plaza" element={<GamePlaza />} />
            </Routes>
          </Layout>
        </div>
        <ToastProvider />
      </Router>
    </ErrorBoundary>
  );
}

export default App;