import React, { useState, useEffect } from 'react';
import kpiService from '../services/kpi.service';
import contractService from '../services/contract.service';
import { getApiError } from '../services/api';
import '../styles/KPIs.css';

const emptyForm = {
  contractId: '',
  name: '',
  description: '',
  targetValue: 100,
  actualValue: 0,
  unit: '%',
  periodType: 'monthly',
  status: 'active',
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
      setKpis(kpisData || []);
      setContracts(contractsData || []);
      setError('');
    } catch (err) {
      setError(getApiError(err, 'Failed to load data'));
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
        targetValue: Number(kpi.target_value) || 0,
        actualValue: Number(kpi.actual_value) || 0,
        unit: kpi.unit || '',
        periodType: kpi.period_type || 'monthly',
        status: kpi.status || 'active',
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
      const payload = {
        contractId: Number(formData.contractId),
        name: formData.name,
        description: formData.description || null,
        targetValue: Number(formData.targetValue),
        actualValue: Number(formData.actualValue),
        unit: formData.unit || null,
        periodType: formData.periodType,
        status: formData.status,
      };
      if (editingKpi) {
        await kpiService.update(editingKpi.id, payload);
      } else {
        await kpiService.create(payload);
      }
      await loadData();
      handleCloseModal();
    } catch (err) {
      setError(getApiError(err, 'Failed to save KPI'));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this KPI?')) {
      try {
        await kpiService.delete(id);
        await loadData();
      } catch (err) {
        setError(getApiError(err, 'Failed to delete KPI'));
      }
    }
  };

  const handleUpdateValue = async (id, value) => {
    try {
      await kpiService.updateValue(id, value);
      await loadData();
    } catch (err) {
      setError(getApiError(err, 'Failed to update KPI value'));
    }
  };

  const progressPct = (kpi) => {
    const target = Number(kpi.target_value);
    const actual = Number(kpi.actual_value);
    if (!target) return 0;
    return Math.round((actual / target) * 100);
  };

  if (loading) return <div className="loading">Loading KPIs...</div>;

  return (
    <div className="kpis-page">
      <div className="page-header">
        <h1>KPI Tracking</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()} disabled={contracts.length === 0}>
          + Add KPI
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {contracts.length === 0 && (
        <div className="error-message">Create a contract first — KPIs are tracked per contract.</div>
      )}
      {kpis.length === 0 && contracts.length > 0 && (
        <p className="empty-state">No KPIs yet. Add one to start tracking performance against targets.</p>
      )}

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
                <span>
                  Progress: {Number(kpi.actual_value).toLocaleString()} / {Number(kpi.target_value).toLocaleString()} {kpi.unit || ''}
                </span>
                <span>{progressPct(kpi)}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${kpi.status}`}
                  style={{ width: `${Math.min(progressPct(kpi), 100)}%` }}
                />
              </div>
            </div>

            <div className="kpi-actions">
              <input
                type="number"
                placeholder="Update value"
                onBlur={(e) => e.target.value !== '' && handleUpdateValue(kpi.id, Number(e.target.value))}
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
                  <label>Period</label>
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
                    placeholder="e.g., %, USD, leads"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Target Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Current Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.actualValue}
                    onChange={(e) => setFormData({ ...formData, actualValue: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="at-risk">At Risk</option>
                  <option value="achieved">Achieved</option>
                  <option value="paused">Paused</option>
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
