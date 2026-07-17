import React, { useState, useEffect } from 'react';
import kpiService from '../services/kpi.service';
import contractService from '../services/contract.service';
import '../styles/KPIs.css';

const emptyForm = {
  contractId: '',
  name: '',
  description: '',
  targetValue: 100,
  actualValue: 0,
  unit: '%',
  periodType: 'monthly',
  status: 'on-track',
};

const KPIs = () => {
  const [kpis, setKpis] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingKpi, setEditingKpi] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [kpisData, contractsData] = await Promise.all([
        kpiService.getAll(),
        contractService.getAll(),
      ]);
      setKpis(kpisData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (kpi = null) => {
    if (kpi) {
      setEditingKpi(kpi);
      setFormData({
        contractId: kpi.contract_id || '',
        name: kpi.name || '',
        description: kpi.description || '',
        targetValue: kpi.target_value,
        actualValue: kpi.actual_value,
        unit: kpi.unit || '',
        periodType: kpi.period_type || 'monthly',
        status: kpi.status || 'on-track',
      });
    } else {
      setEditingKpi(null);
      setFormData({ ...emptyForm, contractId: contracts[0]?.id || '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingKpi(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingKpi) {
        await kpiService.update(editingKpi.id, formData);
      } else {
        await kpiService.create(formData);
      }
      loadData();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save KPI');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this KPI?')) {
      try {
        await kpiService.delete(id);
        loadData();
      } catch (err) {
        setError('Failed to delete KPI');
      }
    }
  };

  const handleUpdateValue = async (kpi, value) => {
    try {
      await kpiService.update(kpi.id, { actualValue: value });
      loadData();
    } catch (err) {
      setError('Failed to update KPI value');
    }
  };

  const ratio = (kpi) => {
    const target = Number(kpi.target_value);
    if (!target) return 0;
    return (Number(kpi.actual_value) / target) * 100;
  };

  const progressClass = (kpi) => {
    const r = ratio(kpi);
    if (r >= 100) return 'achieved';
    if (r >= 70) return 'on-track';
    if (r >= 40) return 'at-risk';
    return 'off-track';
  };

  if (loading) return <div className="loading">Loading KPIs...</div>;

  return (
    <div className="kpis-page">
      <div className="page-header">
        <h1>KPI Tracking</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Add KPI
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="kpis-grid">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="kpi-card">
            <div className="kpi-header">
              <h3>{kpi.name}</h3>
              <span className={`badge badge-${kpi.status}`}>{kpi.status}</span>
            </div>
            <p className="kpi-contract">{kpi.contract_title || 'N/A'}</p>
            <p className="kpi-description">{kpi.description}</p>

            <div className="kpi-progress">
              <div className="progress-info">
                <span>Progress: {kpi.actual_value} / {kpi.target_value} {kpi.unit}</span>
                <span>{Math.round(ratio(kpi))}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${progressClass(kpi)}`}
                  style={{ width: `${Math.min(ratio(kpi), 100)}%` }}
                />
              </div>
            </div>

            <div className="kpi-actions">
              <input
                type="number"
                placeholder="Update value"
                onBlur={(e) => e.target.value && handleUpdateValue(kpi, Number(e.target.value))}
                className="value-input"
              />
              <button className="btn-sm" onClick={() => handleOpenModal(kpi)}>Edit</button>
              <button className="btn-sm btn-danger" onClick={() => handleDelete(kpi.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingKpi ? 'Edit KPI' : 'Add KPI'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contract</label>
                <select
                  value={formData.contractId}
                  onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
                  required
                  disabled={!!editingKpi}
                >
                  <option value="">Select Contract</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>KPI Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Monthly Revenue Target"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="2"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Period Type</label>
                  <select
                    value={formData.periodType}
                    onChange={(e) => setFormData({ ...formData, periodType: e.target.value })}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g., %, $, units"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Target Value</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Current Value</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.actualValue}
                    onChange={(e) => setFormData({ ...formData, actualValue: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="on-track">On Track</option>
                  <option value="at-risk">At Risk</option>
                  <option value="off-track">Off Track</option>
                  <option value="achieved">Achieved</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingKpi ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIs;
