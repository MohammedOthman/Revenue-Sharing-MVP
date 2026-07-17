import React, { useState, useEffect } from 'react';
import attributionService from '../services/attribution.service';
import partnerService from '../services/partner.service';
import claimService from '../services/claim.service';
import '../styles/Domain.css';

const emptyForm = {
  partnerId: '',
  claimId: '',
  contractId: '',
  outcome: 'credited',
  weight: 100,
  rationale: '',
};

const Attributions = () => {
  const [attributions, setAttributions] = useState([]);
  const [partners, setPartners] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [rows, partnersData, claimsData] = await Promise.all([
        attributionService.getAll(),
        partnerService.getAll(),
        claimService.getAll(),
      ]);
      setAttributions(rows);
      setPartners(partnersData);
      setClaims(claimsData);
    } catch (err) {
      setError('Failed to load attribution decisions');
    } finally {
      setLoading(false);
    }
  };

  const set = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  const openModal = (a = null) => {
    setError('');
    if (a) {
      setEditing(a);
      setFormData({
        partnerId: a.partner_id || '',
        claimId: a.claim_id || '',
        contractId: a.contract_id || '',
        outcome: a.outcome || 'credited',
        weight: a.weight ?? 100,
        rationale: a.rationale || '',
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
      if (editing) await attributionService.update(editing.id, formData);
      else await attributionService.create(formData);
      loadData();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save attribution decision');
    }
  };

  const act = async (fn, ...args) => {
    try { await fn(...args); loadData(); }
    catch (err) { setError(err.response?.data?.error || 'Action failed'); }
  };

  if (loading) return <div className="loading">Loading attribution decisions...</div>;

  return (
    <div className="attributions-page domain-page">
      <div className="page-header">
        <h1>Attribution Decisions</h1>
        <button className="btn-primary" onClick={() => openModal()}>+ New Decision</button>
      </div>
      <p className="hint">The human decision of record: who gets credit for a deal, and why. Confirming makes it final.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner</th><th>Claim</th><th>Outcome</th>
              <th>Weight</th><th>Rationale</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attributions.length === 0 && (
              <tr><td colSpan="7" className="empty-row">No attribution decisions yet.</td></tr>
            )}
            {attributions.map((a) => {
              const editable = a.status === 'proposed';
              return (
                <tr key={a.id}>
                  <td>{a.partner_name || a.partner_id}</td>
                  <td>{a.claim_id || '—'}</td>
                  <td><span className={`badge badge-${a.outcome}`}>{a.outcome}</span></td>
                  <td className="amount">{a.weight != null ? `${a.weight}%` : '—'}</td>
                  <td>{a.rationale || '—'}</td>
                  <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                  <td className="actions">
                    {editable && <button className="btn-sm" onClick={() => openModal(a)}>Edit</button>}
                    {editable && <button className="btn-sm btn-success" onClick={() => act(attributionService.confirm, a.id)}>Confirm</button>}
                    {editable && <button className="btn-sm btn-danger" onClick={() => { if (window.confirm('Delete this decision?')) act(attributionService.delete, a.id); }}>Delete</button>}
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
            <h2>{editing ? 'Edit Attribution Decision' : 'New Attribution Decision'}</h2>
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
                  <label>Claim (optional)</label>
                  <select value={formData.claimId} onChange={(e) => set({ claimId: e.target.value })}>
                    <option value="">None</option>
                    {claims.map((c) => <option key={c.id} value={c.id}>#{c.id} — {c.partner_name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Outcome</label>
                  <select value={formData.outcome} onChange={(e) => set({ outcome: e.target.value })}>
                    <option value="credited">Credited</option>
                    <option value="declined">Declined</option>
                    <option value="split">Split</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Weight (%)</label>
                  <input type="number" min="0" max="100" value={formData.weight}
                    onChange={(e) => set({ weight: Number(e.target.value) })} />
                </div>
              </div>
              <div className="form-group">
                <label>Rationale</label>
                <textarea value={formData.rationale} onChange={(e) => set({ rationale: e.target.value })} rows="3"
                  placeholder="Why this partner gets this credit" />
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

export default Attributions;
