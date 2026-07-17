import React, { useState, useEffect } from 'react';
import claimService from '../services/claim.service';
import partnerService from '../services/partner.service';
import contractService from '../services/contract.service';
import '../styles/Domain.css';

const TERMINAL = ['approved', 'rejected'];

const emptyForm = {
  partnerId: '',
  contractId: '',
  periodStart: '',
  periodEnd: '',
  basis: '',
  claimedAmount: '',
  currency: 'SAR',
};

const Claims = () => {
  const [claims, setClaims] = useState([]);
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
      const [claimsData, partnersData, contractsData] = await Promise.all([
        claimService.getAll(),
        partnerService.getAll(),
        contractService.getAll(),
      ]);
      setClaims(claimsData);
      setPartners(partnersData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  const set = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  const openModal = (c = null) => {
    setError('');
    if (c) {
      setEditing(c);
      setFormData({
        partnerId: c.partner_id || '',
        contractId: c.contract_id || '',
        periodStart: c.period_start?.split('T')[0] || '',
        periodEnd: c.period_end?.split('T')[0] || '',
        basis: c.basis || '',
        claimedAmount: c.claimed_amount ?? '',
        currency: c.currency || 'SAR',
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
      if (editing) await claimService.update(editing.id, formData);
      else await claimService.create(formData);
      loadData();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save claim');
    }
  };

  const act = async (fn, ...args) => {
    try { await fn(...args); loadData(); }
    catch (err) { setError(err.response?.data?.error || 'Action failed'); }
  };

  const handleApprove = (c) => {
    const input = window.prompt('Approved amount (blank = claimed amount):', c.claimed_amount ?? '');
    if (input === null) return;
    const amount = input.trim() === '' ? undefined : Number(input);
    act(claimService.approve, c.id, amount, window.prompt('Decision note (optional):', '') || undefined);
  };

  const handleReject = (c) => {
    const note = window.prompt('Reason for rejection (optional):', '');
    if (note === null) return;
    act(claimService.reject, c.id, note || undefined);
  };

  const handleDelete = (c) => {
    if (window.confirm('Delete this claim?')) act(claimService.delete, c.id);
  };

  const money = (v, ccy) => (v == null ? '—' : `${Number(v).toLocaleString()} ${ccy || ''}`.trim());

  if (loading) return <div className="loading">Loading claims...</div>;

  return (
    <div className="claims-page domain-page">
      <div className="page-header">
        <h1>Partner Revenue Claims</h1>
        <button className="btn-primary" onClick={() => openModal()}>+ New Claim</button>
      </div>
      <p className="hint">A partner's claim to a share of revenue. Amounts are recorded and reviewed only — no money moves.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Partner</th><th>Contract</th><th>Basis</th>
              <th>Claimed</th><th>Approved</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.length === 0 && (
              <tr><td colSpan="7" className="empty-row">No claims yet.</td></tr>
            )}
            {claims.map((c) => {
              const terminal = TERMINAL.includes(c.status);
              const reviewable = !terminal;
              return (
                <tr key={c.id}>
                  <td>{c.partner_name || c.partner_id}</td>
                  <td>{c.contract_title || '—'}</td>
                  <td>{c.basis || '—'}</td>
                  <td className="amount">{money(c.claimed_amount, c.currency)}</td>
                  <td className="amount">{money(c.approved_amount, c.currency)}</td>
                  <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                  <td className="actions">
                    {!terminal && <button className="btn-sm" onClick={() => openModal(c)}>Edit</button>}
                    {reviewable && (
                      <>
                        <button className="btn-sm btn-success" onClick={() => handleApprove(c)}>Approve</button>
                        <button className="btn-sm btn-danger" onClick={() => handleReject(c)}>Reject</button>
                      </>
                    )}
                    {!terminal && <button className="btn-sm btn-danger" onClick={() => handleDelete(c)}>Delete</button>}
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
            <h2>{editing ? 'Edit Claim' : 'New Claim'}</h2>
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
                  <label>Period Start</label>
                  <input type="date" value={formData.periodStart} onChange={(e) => set({ periodStart: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Period End</label>
                  <input type="date" value={formData.periodEnd} onChange={(e) => set({ periodEnd: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Claimed Amount</label>
                  <input type="number" min="0" step="0.01" value={formData.claimedAmount}
                    onChange={(e) => set({ claimedAmount: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <input type="text" maxLength="3" value={formData.currency}
                    onChange={(e) => set({ currency: e.target.value.toUpperCase() })} />
                </div>
              </div>
              <div className="form-group">
                <label>Basis</label>
                <textarea value={formData.basis} onChange={(e) => set({ basis: e.target.value })} rows="2"
                  placeholder="e.g., Q1 referrals for merchant onboarding" />
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

export default Claims;
