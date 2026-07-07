import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../services/dashboard.service';
import { getApiError } from '../services/api';
import '../styles/Dashboard.css';

const formatMoney = (value) => Number(value || 0).toLocaleString();

const describeActivity = (item) => {
  const verbs = { POST: 'Created', PUT: 'Updated', PATCH: 'Updated', DELETE: 'Deleted' };
  const entities = {
    partners: 'partner',
    contracts: 'contract',
    revenue: 'revenue share',
    kpis: 'KPI',
    'legal-documents': 'legal document',
    documents: 'legal document',
    auth: 'user account',
  };
  const verb = verbs[item.method] || item.method;
  const entity = entities[item.entity] || item.entity || 'record';
  const who = item.user_email ? ` by ${item.user_email}` : '';
  return `${verb} ${entity}${item.entity_id ? ` #${item.entity_id}` : ''}${who}`;
};

const timeAgo = (dateString) => {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [overviewData, activityData] = await Promise.all([
        dashboardService.getOverview(),
        dashboardService.getRecentActivity(5).catch(() => []),
      ]);
      setOverview(overviewData);
      setActivity(activityData);
    } catch (err) {
      setError(getApiError(err, 'Failed to load dashboard data'));
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
            <h3>{overview?.totalPartners ?? 0}</h3>
            <p>Total Partners</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon contracts">📄</div>
          <div className="stat-info">
            <h3>{overview?.activeContracts ?? 0}</h3>
            <p>Active Contracts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>${formatMoney(overview?.totalRevenue)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <h3>${formatMoney(overview?.pendingPayments)}</h3>
            <p>Pending Payments</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Contract Status Distribution</h2>
          <div className="chart-placeholder">
            {overview?.totalContracts > 0 ? (
              <div className="status-bar">
                {overview?.contractStatus?.active > 0 && (
                  <div className="status-segment active" style={{ width: `${overview.contractStatus.active}%` }}>
                    Active ({overview.contractStatus.active}%)
                  </div>
                )}
                {overview?.contractStatus?.pending > 0 && (
                  <div className="status-segment pending" style={{ width: `${overview.contractStatus.pending}%` }}>
                    Draft ({overview.contractStatus.pending}%)
                  </div>
                )}
                {overview?.contractStatus?.expired > 0 && (
                  <div className="status-segment expired" style={{ width: `${overview.contractStatus.expired}%` }}>
                    Expired ({overview.contractStatus.expired}%)
                  </div>
                )}
              </div>
            ) : (
              <p className="empty-state">No contracts yet. <Link to="/contracts">Create your first contract</Link>.</p>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activity.length === 0 && <p className="empty-state">No activity recorded yet.</p>}
            {activity.map((item) => (
              <div className="activity-item" key={item.id}>
                <span className="activity-icon">
                  {item.method === 'DELETE' ? '🗑️' : item.method === 'POST' ? '➕' : '✏️'}
                </span>
                <span>{describeActivity(item)}</span>
                <span className="activity-time">{timeAgo(item.created_at)}</span>
              </div>
            ))}
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
