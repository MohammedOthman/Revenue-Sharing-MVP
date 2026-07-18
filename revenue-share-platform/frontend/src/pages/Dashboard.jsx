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

  // Postgres COUNT/SUM come back as strings — coerce before use.
  const num = (v) => Number(v || 0);
  const partners = overview?.partners || {};
  const contracts = overview?.contracts || {};
  const revenue = overview?.revenue || {};
  const amendments = overview?.amendments || {};

  const totalContracts = num(contracts.total_contracts);
  const pct = (part) => (totalContracts ? Math.round((num(part) / totalContracts) * 100) : 0);
  const activePct = pct(contracts.active_contracts);
  const draftPct = pct(contracts.draft_contracts);
  const expiredPct = pct(contracts.expired_contracts);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Control Center</h1>
        <p>Partner revenue capture &amp; governance overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon partners">🤝</div>
          <div className="stat-info">
            <h3>{num(partners.total_partners)}</h3>
            <p>Total Partners</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon contracts">📄</div>
          <div className="stat-info">
            <h3>{num(contracts.active_contracts)}</h3>
            <p>Active Contracts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>${num(revenue.total_revenue).toLocaleString()}</h3>
            <p>Total Recorded Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <h3>{num(revenue.pending_count)}</h3>
            <p>Pending Revenue Records</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amendments">📝</div>
          <div className="stat-info">
            <h3>{num(amendments.ready_to_notify)}</h3>
            <p>Amendments Ready to Notify</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h2>Contract Status Distribution</h2>
          <div className="chart-placeholder">
            <div className="status-bar">
              <div className="status-segment active" style={{ width: `${activePct}%` }}>
                Active ({activePct}%)
              </div>
              <div className="status-segment pending" style={{ width: `${draftPct}%` }}>
                Draft ({draftPct}%)
              </div>
              <div className="status-segment expired" style={{ width: `${expiredPct}%` }}>
                Expired ({expiredPct}%)
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Program Snapshot</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📄</span>
              <span>{totalContracts} contracts on record</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">💵</span>
              <span>${num(revenue.total_share_amount).toLocaleString()} total partner share recorded</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📈</span>
              <span>{num(overview?.kpis?.total_kpis)} KPIs tracked</span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <span>{num(amendments.total_amendments)} amendment journeys · {num(amendments.notified_amendments)} notices sent · {num(amendments.acknowledged_amendments)} acknowledged</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/partners" className="action-btn">Manage Partners</Link>
          <Link to="/contracts" className="action-btn">View Contracts</Link>
          <Link to="/revenue" className="action-btn">Record Revenue</Link>
          <Link to="/kpis" className="action-btn">Track KPIs</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
