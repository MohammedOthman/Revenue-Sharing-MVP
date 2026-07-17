import React, { useState, useEffect } from 'react';
import revenueService from '../services/revenue.service';
import contractService from '../services/contract.service';
import '../styles/Revenue.css';

const emptyForm = {
  contractId: '',
  periodStart: '',
  periodEnd: '',
  totalRevenue: 0,
  sharePercentage: 10,
  notes: '',
};

const Revenue = () => {
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [revenueData, contractsData] = await Promise.all([
        revenueService.getAll(),
        contractService.getAll(),
      ]);
      setRevenueRecords(revenueData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Phase 1 previews the share amount client-side; it is not a payment.
  const shareAmount = (Number(formData.totalRevenue) * Number(formData.sharePercentage)) / 100;

  const handleOpenModal = () => {
    const firstContract = contracts[0];
    setFormData({
      ...emptyForm,
      contractId: firstContract?.id || '',
      sharePercentage: firstContract?.revenue_share_percentage ?? 10,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleContractChange = (contractId) => {
    const contract = contracts.find((c) => String(c.id) === String(contractId));
    setFormData((prev) => ({
      ...prev,
      contractId,
      sharePercentage: contract?.revenue_share_percentage ?? prev.sharePercentage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await revenueService.create({
        contractId: formData.contractId,
        periodStart: formData.periodStart,
        periodEnd: formData.periodEnd,
        totalRevenue: Number(formData.totalRevenue),
        sharePercentage: Number(formData.sharePercentage),
        shareAmount,
        notes: formData.notes,
      });
      loadData();
      handleCloseModal();
    } catch (err) {
      setError('Failed to create revenue record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this revenue record?')) {
      try {
        await revenueService.delete(id);
        loadData();
      } catch (err) {
        setError('Failed to delete revenue record');
      }
    }
  };

  // Manual status change only — records payout readiness, never moves money.
  const handleToggleStatus = async (record) => {
    const nextStatus = record.status === 'paid' ? 'pending' : 'paid';
    try {
      await revenueService.update(record.id, {
        status: nextStatus,
        paidAt: nextStatus === 'paid' ? new Date().toISOString() : null,
      });
      loadData();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const num = (v) => Number(v || 0);
  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');

  const totalRecorded = revenueRecords.reduce((sum, r) => sum + num(r.total_revenue), 0);
  const pendingShare = revenueRecords
    .filter((r) => r.status !== 'paid')
    .reduce((sum, r) => sum + num(r.share_amount), 0);
  const paidShare = revenueRecords
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + num(r.share_amount), 0);

  if (loading) return <div className="loading">Loading revenue data...</div>;

  return (
    <div className="revenue-page">
      <div className="page-header">
        <h1>Revenue Share Records</h1>
        <button className="btn-primary" onClick={handleOpenModal}>
          + Record Revenue Share
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Recorded Revenue</h3>
          <p className="amount">${totalRecorded.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Share (eligibility)</h3>
          <p className="amount pending">${pendingShare.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Recorded as Paid</h3>
          <p className="amount paid">${paidShare.toLocaleString()}</p>
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
              <th>Share Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenueRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.contract_title || 'N/A'}</td>
                <td>{record.partner_name || 'N/A'}</td>
                <td>{formatDate(record.period_start)} – {formatDate(record.period_end)}</td>
                <td>${num(record.total_revenue).toLocaleString()}</td>
                <td>{record.share_percentage}%</td>
                <td>${num(record.share_amount).toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${record.status}`}>
                    {record.status === 'paid' ? 'recorded as paid' : record.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleToggleStatus(record)}>
                    {record.status === 'paid' ? 'Mark Pending' : 'Mark Recorded-Paid'}
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Record Revenue Share</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contract</label>
                <select
                  value={formData.contractId}
                  onChange={(e) => handleContractChange(e.target.value)}
                  required
                >
                  <option value="">Select Contract</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.title} - {contract.partner_name || 'N/A'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Period Start</label>
                  <input
                    type="date"
                    value={formData.periodStart}
                    onChange={(e) => setFormData({ ...formData, periodStart: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Period End</label>
                  <input
                    type="date"
                    value={formData.periodEnd}
                    onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Total Revenue ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.totalRevenue}
                    onChange={(e) => setFormData({ ...formData, totalRevenue: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Share %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.sharePercentage}
                    onChange={(e) => setFormData({ ...formData, sharePercentage: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Share Amount (preview)</label>
                <input type="text" value={`$${shareAmount.toLocaleString()}`} readOnly />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="2"
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
    </div>
  );
};

export default Revenue;
