import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../services/dashboard.service';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardService.getOverview();
      setOverview(data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome to your Revenue Share Management Platform</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon partners">🤝</div>
          <div className="stat-info">
            <h3>{overview?.totalPartners || 0}</h3>
            <p>Total Partners</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon contracts">📄</div>
          <div className="stat-info">
            <h3>{overview?.totalContracts || 0}</h3>
            <p>Active Contracts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>${overview?.totalRevenue?.toLocaleString() || '0'}</h3>
            <p>Total Revenue (MTD)</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <h3>${overview?.pendingPayments?.toLocaleString() || '0'}</h3>
            <p>Pending Payments</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Contract Status Distribution</h2>
          <div className="chart-placeholder">
            <div className="status-bar">
              <div className="status-segment active" style={{ width: `${overview?.contractStatus?.active || 0}%` }}>
                Active ({overview?.contractStatus?.active || 0}%)
              </div>
              <div className="status-segment pending" style={{ width: `${overview?.contractStatus?.pending || 0}%` }}>
                Pending ({overview?.contractStatus?.pending || 0}%)
              </div>
              <div className="status-segment expired" style={{ width: `${overview?.contractStatus?.expired || 0}%` }}>
                Expired ({overview?.contractStatus?.expired || 0}%)
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">➕</span>
              <span>New partner onboarded</span>
              <span className="activity-time">2 hours ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💵</span>
              <span>Revenue share calculated</span>
              <span className="activity-time">5 hours ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <span>Payment processed</span>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/partners" className="action-btn">Manage Partners</Link>
          <Link to="/contracts" className="action-btn">View Contracts</Link>
          <Link to="/revenue" className="action-btn">Process Revenue</Link>
          <Link to="/kpis" className="action-btn">Track KPIs</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
