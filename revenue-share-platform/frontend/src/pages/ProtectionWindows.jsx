import React, { useState, useEffect } from 'react';
import protectionWindowService from '../services/protectionWindow.service';
import partnerService from '../services/partner.service';
import contractService from '../services/contract.service';
import '../styles/Domain.css';

const emptyForm = {
  partnerId: '',
  contractId: '',
  startsAt: '',
  endsAt: '',
  reason: '',
};

const ProtectionWindows = () => {
  const [windows, setWindows] = useState([]);
  const [partners, setPartners] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [rows, partnersData, contractsData] = await Promise.all([
        protectionWindowService.getAll(),
        partnerService.getAll(),
        contractService.getAll(),
      ]);
      setWindows(rows);
      setPartners(partnersData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load protection windows');
    } finally {
      setLoading(false);
    }
  };

  const set = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  const openModal = (w = null) => {
    setError('');
    if (w) {
      setEditing(w);
      setFormData({
        partnerId: w.partner_id || '',
        contractId: w.contract_id || '',
        startsAt: w.starts_at?.split('T')[0] || '',
        endsAt: w.ends_at?.split('T')[0] || '',
        reason: w.reason || '',
      });
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, partnerId: partners[0]?.id || '' });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await protectionWindowService.update(editing.id, formData);
      else await protectionWindowService.create(formData);
      loadData();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save protection window');
    }
  };

  const act = async (fn, ...args) => {
    try { await fn(...args); loadData(); }
    catch (err) { setError(err.response?.data?.error || 'Action failed'); }
  };

  if (loading) return <div className="loading">Loading protection windows...</div>;

  return (
    <div className="protection-page domain-page">
      <div className="page-header">
        <h1>Protection Windows</h1>
        <button className="btn-primary" onClick={() => openModal()}>+ New Window</button>
      </div>
      <p className="hint">A dated window during which a partner's claim on a deal is protected. Expiry is derived from the end date; release is manual and final.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner</th><th>Contract</th><th>Starts</th>
              <th>Ends</th><th>Reason</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {windows.length === 0 && (
              <tr><td colSpan="7" className="empty-row">No protection windows yet.</td></tr>
            )}
            {windows.map((w) => {
              const status = w.effective_status || w.status;
              const active = w.status !== 'released';
              return (
                <tr key={w.id}>
                  <td>{w.partner_name || w.partner_id}</td>
                  <td>{w.contract_title || '—'}</td>
                  <td>{w.starts_at?.split('T')[0] || '—'}</td>
                  <td>{w.ends_at?.split('T')[0] || '—'}</td>
                  <td>{w.reason || '—'}</td>
                  <td><span className={`badge badge-${status}`}>{status}</span></td>
                  <td className="actions">
                    {active && <button className="btn-sm" onClick={() => openModal(w)}>Edit</button>}
                    {active && <button className="btn-sm btn-success" onClick={() => act(protectionWindowService.release, w.id)}>Release</button>}
                    {active && <button className="btn-sm btn-danger" onClick={() => { if (window.confirm('Delete this window?')) act(protectionWindowService.delete, w.id); }}>Delete</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Protection Window' : 'New Protection Window'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Partner</label>
                  <select value={formData.partnerId} onChange={(e) => set({ partnerId: e.target.value })} required>
                    <option value="">Select partner</option>
                    {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Contract (optional)</label>
                  <select value={formData.contractId} onChange={(e) => set({ contractId: e.target.value })}>
                    <option value="">None</option>
                    {contracts.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Starts At</label>
                  <input type="date" value={formData.startsAt} onChange={(e) => set({ startsAt: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Ends At</label>
                  <input type="date" value={formData.endsAt} onChange={(e) => set({ endsAt: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Reason</label>
                <textarea value={formData.reason} onChange={(e) => set({ reason: e.target.value })} rows="2"
                  placeholder="e.g., first-registrant protection" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectionWindows;
