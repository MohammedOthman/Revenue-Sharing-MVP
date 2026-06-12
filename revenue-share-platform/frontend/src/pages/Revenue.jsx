import React, { useState, useEffect } from 'react';
import revenueService from '../services/revenue.service';
import contractService from '../services/contract.service';
import '../styles/Revenue.css';

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
      setRevenueRecords(revenueData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      contractId: contracts[0]?._id || '',
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
      await revenueService.create(formData);
      loadData();
      handleCloseModal();
    } catch (err) {
      setError('Failed to create revenue record');
    }
  };

  const handleProcessPayment = (record) => {
    setSelectedRecord(record);
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    try {
      await revenueService.processPayment(selectedRecord._id);
      loadData();
      setShowPaymentModal(false);
      setSelectedRecord(null);
    } catch (err) {
      setError('Failed to process payment');
    }
  };

  if (loading) return <div className="loading">Loading revenue data...</div>;

  return (
    <div className="revenue-page">
      <div className="page-header">
        <h1>Revenue Management</h1>
        <button className="btn-primary" onClick={handleOpenModal}>
          + Record Revenue
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="amount">
            ${revenueRecords.reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="summary-card">
          <h3>Pending Payments</h3>
          <p className="amount pending">
            ${revenueRecords.filter(r => r.status === 'pending').reduce((sum, r) => sum + (r.partnerAmount || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="summary-card">
          <h3>Paid Out</h3>
          <p className="amount paid">
            ${revenueRecords.filter(r => r.status === 'paid').reduce((sum, r) => sum + (r.partnerAmount || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Period</th>
              <th>Total Amount</th>
              <th>Partner Share %</th>
              <th>Partner Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenueRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.contractId?.title || 'N/A'}</td>
                <td>{record.period}</td>
                <td>${record.amount?.toLocaleString()}</td>
                <td>{record.partnerSharePercentage}%</td>
                <td>${record.partnerAmount?.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${record.status}`}>{record.status}</span>
                </td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td className="actions">
                  {record.status === 'pending' && (
                    <button 
                      className="btn-sm btn-success" 
                      onClick={() => handleProcessPayment(record)}
                    >
                      Pay
                    </button>
                  )}
                  <button className="btn-sm">View</button>
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
                    <option key={contract._id} value={contract._id}>
                      {contract.title} - {contract.partnerId?.name || 'N/A'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Period (YYYY-MM)</label>
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
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  required
                />
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
              <p><strong>Contract:</strong> {selectedRecord.contractId?.title}</p>
              <p><strong>Partner:</strong> {selectedRecord.contractId?.partnerId?.name}</p>
              <p><strong>Amount:</strong> ${selectedRecord.partnerAmount?.toLocaleString()}</p>
              <p><strong>Period:</strong> {selectedRecord.period}</p>
            </div>
            <p className="confirmation-text">Are you sure you want to process this payment?</p>
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
