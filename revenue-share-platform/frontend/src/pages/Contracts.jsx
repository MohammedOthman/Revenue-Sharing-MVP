import React, { useState, useEffect } from 'react';
import contractService from '../services/contract.service';
import partnerService from '../services/partner.service';
import { getApiError } from '../services/api';
import '../styles/Contracts.css';

const emptyForm = {
  partnerId: '',
  title: '',
  startDate: '',
  endDate: '',
  revenueSharePercentage: 10,
  minimumPayout: 100,
  paymentTerms: 'monthly',
  status: 'draft',
};

const toDateInput = (value) => (value ? String(value).slice(0, 10) : '');

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contractsData, partnersData] = await Promise.all([
        contractService.getAll(),
        partnerService.getAll(),
      ]);
      setContracts(contractsData || []);
      setPartners(partnersData || []);
      setError('');
    } catch (err) {
      setError(getApiError(err, 'Failed to load data'));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (contract = null) => {
    if (contract) {
      setEditingContract(contract);
      setFormData({
        partnerId: contract.partner_id || '',
        title: contract.title || '',
        startDate: toDateInput(contract.start_date),
        endDate: toDateInput(contract.end_date),
        revenueSharePercentage: Number(contract.revenue_share_percentage) || 0,
        minimumPayout: Number(contract.minimum_payout) || 0,
        paymentTerms: contract.payment_terms || 'monthly',
        status: contract.status || 'draft',
      });
    } else {
      setEditingContract(null);
      setFormData({ ...emptyForm, partnerId: partners[0]?.id || '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContract(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        partnerId: Number(formData.partnerId),
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        revenueSharePercentage: Number(formData.revenueSharePercentage),
        minimumPayout: Number(formData.minimumPayout),
        paymentTerms: formData.paymentTerms,
        status: formData.status,
      };

      if (editingContract) {
        await contractService.update(editingContract.id, payload);
      } else {
        await contractService.create(payload);
      }
      await loadData();
      handleCloseModal();
    } catch (err) {
      setError(getApiError(err, 'Failed to save contract'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract? Its revenue records, KPIs, and documents will be removed too.')) {
      try {
        await contractService.delete(id);
        await loadData();
      } catch (err) {
        setError(getApiError(err, 'Failed to delete contract'));
      }
    }
  };

  if (loading) return <div className="loading">Loading contracts...</div>;

  return (
    <div className="contracts-page">
      <div className="page-header">
        <h1>Contract Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()} disabled={partners.length === 0}>
          + Create Contract
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {partners.length === 0 && (
        <div className="error-message">Add a partner first — contracts are always linked to a partner.</div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Partner</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Revenue Share %</th>
              <th>Min Payout</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-state">No contracts yet.</td>
              </tr>
            )}
            {contracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.title}</td>
                <td>{contract.partner_name || 'N/A'}</td>
                <td>{contract.start_date ? new Date(contract.start_date).toLocaleDateString() : '—'}</td>
                <td>{contract.end_date ? new Date(contract.end_date).toLocaleDateString() : '—'}</td>
                <td>{Number(contract.revenue_share_percentage)}%</td>
                <td>${Number(contract.minimum_payout || 0).toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${contract.status}`}>{contract.status}</span>
                </td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleOpenModal(contract)}>
                    Edit
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(contract.id)}>
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
            <h2>{editingContract ? 'Edit Contract' : 'Create Contract'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Partner</label>
                <select
                  value={formData.partnerId}
                  onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
                  required
                  disabled={!!editingContract}
                >
                  <option value="">Select Partner</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}{partner.company ? ` - ${partner.company}` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Contract Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date (optional)</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Revenue Share %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={formData.revenueSharePercentage}
                    onChange={(e) => setFormData({ ...formData, revenueSharePercentage: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Minimum Payout ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.minimumPayout}
                    onChange={(e) => setFormData({ ...formData, minimumPayout: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Terms</label>
                  <select
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="on-demand">On Demand</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingContract ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
