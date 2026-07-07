import React, { useState, useEffect } from 'react';
import revenueService from '../services/revenue.service';
import contractService from '../services/contract.service';
import { getApiError } from '../services/api';
import '../styles/Revenue.css';

const money = (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });

// 'YYYY-MM' -> first and last day of that month
const monthBounds = (month) => {
  const [year, m] = month.split('-').map(Number);
  const lastDay = new Date(year, m, 0).getDate();
  return {
    periodStart: `${month}-01`,
    periodEnd: `${month}-${String(lastDay).padStart(2, '0')}`,
  };
};

const Revenue = () => {
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    contractId: '',
    amount: '',
    period: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [revenueData, contractsData] = await Promise.all([
        revenueService.getAll(),
        contractService.getAll(),
      ]);
      setRevenueRecords(revenueData || []);
      setContracts(contractsData || []);
      setError('');
    } catch (err) {
      setError(getApiError(err, 'Failed to load data'));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      contractId: contracts[0]?.id || '',
      amount: '',
      period: new Date().toISOString().slice(0, 7),
      notes: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { periodStart, periodEnd } = monthBounds(formData.period);
      // Share % and amount are computed by the API from the contract terms.
      await revenueService.create({
        contractId: Number(formData.contractId),
        periodStart,
        periodEnd,
        totalRevenue: Number(formData.amount),
        notes: formData.notes || null,
      });
      await loadData();
      handleCloseModal();
    } catch (err) {
      setError(getApiError(err, 'Failed to create revenue record'));
    }
  };

  const handleProcessPayment = (record) => {
    setSelectedRecord(record);
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    try {
      await revenueService.processPayment(selectedRecord.id);
      await loadData();
      setShowPaymentModal(false);
      setSelectedRecord(null);
    } catch (err) {
      setError(getApiError(err, 'Failed to process payment'));
      setShowPaymentModal(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await revenueService.exportCsv();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'revenue-share-statement.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(getApiError(err, 'Failed to export statement'));
    }
  };

  const totalRevenue = revenueRecords.reduce((sum, r) => sum + Number(r.total_revenue || 0), 0);
  const pendingAmount = revenueRecords
    .filter((r) => r.status === 'pending')
    .reduce((sum, r) => sum + Number(r.share_amount || 0), 0);
  const paidAmount = revenueRecords
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + Number(r.share_amount || 0), 0);

  if (loading) return <div className="loading">Loading revenue data...</div>;

  return (
    <div className="revenue-page">
      <div className="page-header">
        <h1>Revenue Management</h1>
        <div className="header-buttons">
          <button
            className="btn-secondary"
            onClick={handleExport}
            disabled={revenueRecords.length === 0}
            title="Download a settlement statement CSV"
          >
            ⬇ Export CSV
          </button>
          <button className="btn-primary" onClick={handleOpenModal} disabled={contracts.length === 0}>
            + Record Revenue
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {contracts.length === 0 && (
        <div className="error-message">Create a contract first — revenue is always recorded against a contract.</div>
      )}

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="amount">${money(totalRevenue)}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Payments</h3>
          <p className="amount pending">${money(pendingAmount)}</p>
        </div>
        <div className="summary-card">
          <h3>Paid Out</h3>
          <p className="amount paid">${money(paidAmount)}</p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Partner</th>
              <th>Period</th>
              <th>Total Revenue</th>
              <th>Share %</th>
              <th>Partner Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenueRecords.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-state">No revenue records yet.</td>
              </tr>
            )}
            {revenueRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.contract_title || 'N/A'}</td>
                <td>{record.partner_name || 'N/A'}</td>
                <td>
                  {record.period_start ? String(record.period_start).slice(0, 10) : '—'}
                  {' → '}
                  {record.period_end ? String(record.period_end).slice(0, 10) : '—'}
                </td>
                <td>${money(record.total_revenue)}</td>
                <td>{Number(record.share_percentage)}%</td>
                <td>${money(record.share_amount)}</td>
                <td>
                  <span className={`badge badge-${record.status}`}>{record.status}</span>
                </td>
                <td className="actions">
                  {record.status === 'pending' && (
                    <button
                      className="btn-sm btn-success"
                      onClick={() => handleProcessPayment(record)}
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Record Revenue</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contract</label>
                <select
                  value={formData.contractId}
                  onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
                  required
                >
                  <option value="">Select Contract</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.title}{contract.partner_name ? ` - ${contract.partner_name}` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Period (month)</label>
                <input
                  type="month"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Revenue Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
                <small>The partner share is calculated automatically from the contract terms.</small>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPaymentModal && selectedRecord && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Payment</h2>
            <div className="payment-details">
              <p><strong>Contract:</strong> {selectedRecord.contract_title || 'N/A'}</p>
              <p><strong>Partner:</strong> {selectedRecord.partner_name || 'N/A'}</p>
              <p><strong>Amount:</strong> ${money(selectedRecord.share_amount)}</p>
              <p>
                <strong>Period:</strong>{' '}
                {String(selectedRecord.period_start).slice(0, 10)} → {String(selectedRecord.period_end).slice(0, 10)}
              </p>
            </div>
            <p className="confirmation-text">Are you sure you want to mark this payout as paid?</p>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={confirmPayment}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
