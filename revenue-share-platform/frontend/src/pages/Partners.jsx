import React, { useState, useEffect } from 'react';
import partnerService from '../services/partner.service';
import '../styles/Partners.css';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: 'referral',
    sharePercentage: 10,
    status: 'active',
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await partnerService.getAll();
      setPartners(data);
    } catch (err) {
      setError('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        email: partner.email,
        company: partner.company,
        type: partner.type,
        sharePercentage: partner.sharePercentage,
        status: partner.status,
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        email: '',
        company: '',
        type: 'referral',
        sharePercentage: 10,
        status: 'active',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPartner(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await partnerService.update(editingPartner._id, formData);
      } else {
        await partnerService.create(formData);
      }
      loadPartners();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save partner');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await partnerService.delete(id);
        loadPartners();
      } catch (err) {
        setError('Failed to delete partner');
      }
    }
  };

  if (loading) return <div className="loading">Loading partners...</div>;

  return (
    <div className="partners-page">
      <div className="page-header">
        <h1>Partner Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Add Partner
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Type</th>
              <th>Share %</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner._id}>
                <td>{partner.name}</td>
                <td>{partner.company}</td>
                <td>{partner.email}</td>
                <td>
                  <span className={`badge badge-${partner.type}`}>{partner.type}</span>
                </td>
                <td>{partner.sharePercentage}%</td>
                <td>
                  <span className={`badge badge-${partner.status}`}>{partner.status}</span>
                </td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleOpenModal(partner)}>
                    Edit
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(partner._id)}>
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
            <h2>{editingPartner ? 'Edit Partner' : 'Add Partner'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="referral">Referral</option>
                  <option value="affiliate">Affiliate</option>
                  <option value="strategic">Strategic</option>
                  <option value="reseller">Reseller</option>
                </select>
              </div>
              <div className="form-group">
                <label>Share Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.sharePercentage}
                  onChange={(e) => setFormData({ ...formData, sharePercentage: Number(e.target.value) })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingPartner ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
