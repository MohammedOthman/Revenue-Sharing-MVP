import React, { useState, useEffect } from 'react';
import contractService from '../services/contract.service';
import partnerService from '../services/partner.service';
import '../styles/Contracts.css';

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState({
    partnerId: '',
    title: '',
    startDate: '',
    endDate: '',
    revenueSharePercentage: 10,
    minimumPayout: 100,
    paymentTerms: 'monthly',
    status: 'draft',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contractsData, partnersData] = await Promise.all([
        contractService.getAll(),
        partnerService.getAll(),
      ]);
      setContracts(contractsData);
      setPartners(partnersData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (contract = null) => {
    if (contract) {
      setEditingContract(contract);
      setFormData({
        partnerId: contract.partnerId?._id || contract.partnerId,
        title: contract.title,
        startDate: contract.startDate?.split('T')[0],
        endDate: contract.endDate?.split('T')[0],
        revenueSharePercentage: contract.revenueSharePercentage,
        minimumPayout: contract.minimumPayout,
        paymentTerms: contract.paymentTerms,
        status: contract.status,
      });
    } else {
      setEditingContract(null);
      setFormData({
        partnerId: partners[0]?._id || '',
        title: '',
        startDate: '',
        endDate: '',
        revenueSharePercentage: 10,
        minimumPayout: 100,
        paymentTerms: 'monthly',
        status: 'draft',
      });
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
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };
      
      if (editingContract) {
        await contractService.update(editingContract._id, payload);
      } else {
        await contractService.create(payload);
      }
      loadData();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save contract');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await contractService.delete(id);
        loadData();
      } catch (err) {
        setError('Failed to delete contract');
      }
    }
  };

  if (loading) return <div className="loading">Loading contracts...</div>;

  return (
    <div className="contracts-page">
      <div className="page-header">
        <h1>Contract Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Create Contract
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

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
            {contracts.map((contract) => (
              <tr key={contract._id}>
                <td>{contract.title}</td>
                <td>{contract.partnerId?.name || 'N/A'}</td>
                <td>{new Date(contract.startDate).toLocaleDateString()}</td>
                <td>{new Date(contract.endDate).toLocaleDateString()}</td>
                <td>{contract.revenueSharePercentage}%</td>
                <td>${contract.minimumPayout}</td>
                <td>
                  <span className={`badge badge-${contract.status}`}>{contract.status}</span>
                </td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleOpenModal(contract)}>
                    Edit
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(contract._id)}>
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
                >
                  <option value="">Select Partner</option>
                  {partners.map((partner) => (
                    <option key={partner._id} value={partner._id}>
                      {partner.name} - {partner.company}
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
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
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
                    value={formData.revenueSharePercentage}
                    onChange={(e) => setFormData({ ...formData, revenueSharePercentage: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Minimum Payout ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minimumPayout}
                    onChange={(e) => setFormData({ ...formData, minimumPayout: Number(e.target.value) })}
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
