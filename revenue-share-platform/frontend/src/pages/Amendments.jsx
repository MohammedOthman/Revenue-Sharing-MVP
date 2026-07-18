import React, { useState, useEffect } from 'react';
import amendmentService from '../services/amendment.service';
import contractService from '../services/contract.service';
import '../styles/Amendments.css';

// Human-readable labels for the readiness requirement keys returned by the API.
const REQUIREMENT_LABELS = {
  contract: 'Contract',
  article_reference: 'Article reference',
  amendment_type: 'Amendment type',
  reason: 'Reason',
  public_interest_basis: 'Public interest / actual need basis',
  necessity_confirmed: 'Necessity confirmation',
  no_new_contract_confirmed: 'No-new-contract guardrail',
  no_nature_change_confirmed: 'No-change-of-nature guardrail',
  notice_period_days: 'Notice period',
  authority_source: 'Authority source',
  partner_impact: 'Partner impact',
  calculation_method: 'Calculation method',
  amendment_letter_reference: 'Amendment letter reference',
  notice_message: 'Notice message',
  notice_channels: 'Notice channels',
};

const CHANNELS = ['platform', 'email'];

const emptyForm = {
  contractId: '',
  articleReference: '',
  amendmentType: 'scope',
  amendmentMechanism: 'amendment_letter',
  reason: '',
  publicInterestBasis: '',
  necessityConfirmed: false,
  noNewContractConfirmed: false,
  noNatureChangeConfirmed: false,
  noticePeriodDays: 30,
  authoritySource: '',
  decisionDate: '',
  effectiveDate: '',
  partnerImpact: '',
  calculationMethod: '',
  amendmentLetterReference: '',
  noticeChannels: ['platform'],
  noticeMessage: '',
  noticeMessageLanguage: 'ar',
};

const Amendments = () => {
  const [amendments, setAmendments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [amendmentsData, contractsData] = await Promise.all([
        amendmentService.getAll(),
        contractService.getAll(),
      ]);
      setAmendments(amendmentsData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load amendment journeys');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (a = null) => {
    setError('');
    if (a) {
      setEditing(a);
      setFormData({
        contractId: a.contract_id || '',
        articleReference: a.article_reference || '',
        amendmentType: a.amendment_type || 'scope',
        amendmentMechanism: a.amendment_mechanism || 'amendment_letter',
        reason: a.reason || '',
        publicInterestBasis: a.public_interest_basis || '',
        necessityConfirmed: !!a.necessity_confirmed,
        noNewContractConfirmed: !!a.no_new_contract_confirmed,
        noNatureChangeConfirmed: !!a.no_nature_change_confirmed,
        noticePeriodDays: a.notice_period_days || 30,
        authoritySource: a.authority_source || '',
        decisionDate: a.decision_date?.split('T')[0] || '',
        effectiveDate: a.effective_date?.split('T')[0] || '',
        partnerImpact: a.partner_impact || '',
        calculationMethod: a.calculation_method || '',
        amendmentLetterReference: a.amendment_letter_reference || '',
        noticeChannels: Array.isArray(a.notice_channels) ? a.notice_channels : ['platform'],
        noticeMessage: a.notice_message || '',
        noticeMessageLanguage: a.notice_message_language || 'ar',
      });
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, contractId: contracts[0]?.id || '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const set = (patch) => setFormData((prev) => ({ ...prev, ...patch }));

  const toggleChannel = (channel) => {
    setFormData((prev) => ({
      ...prev,
      noticeChannels: prev.noticeChannels.includes(channel)
        ? prev.noticeChannels.filter((c) => c !== channel)
        : [...prev.noticeChannels, channel],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await amendmentService.update(editing.id, formData);
      } else {
        await amendmentService.create(formData);
      }
      loadData();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save amendment journey');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this amendment journey?')) {
      try {
        await amendmentService.delete(id);
        loadData();
      } catch (err) {
        setError('Failed to delete amendment journey');
      }
    }
  };

  const handleSendNotice = async (a) => {
    try {
      await amendmentService.sendNotice(a.id);
      loadData();
    } catch (err) {
      const missing = err.response?.data?.missing;
      if (missing?.length) {
        setError(`Notice blocked — still missing: ${missing.map((k) => REQUIREMENT_LABELS[k] || k).join(', ')}`);
      } else {
        setError(err.response?.data?.error || 'Failed to send notice');
      }
    }
  };

  const handleAcknowledge = async (a) => {
    const note = window.prompt('Acknowledgment note (optional):', '');
    if (note === null) return;
    try {
      await amendmentService.acknowledge(a.id, note);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to acknowledge notice');
    }
  };

  if (loading) return <div className="loading">Loading amendment journeys...</div>;

  return (
    <div className="amendments-page">
      <div className="page-header">
        <h1>Amendment Journeys</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + New Amendment Journey
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Article</th>
              <th>Type</th>
              <th>Status</th>
              <th>Readiness</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {amendments.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">No amendment journeys yet.</td>
              </tr>
            )}
            {amendments.map((a) => {
              const readiness = a.readiness || { ready: false, missing: [], satisfied: 0, total: 0 };
              const isTerminal = a.status === 'notified' || a.status === 'acknowledged';
              return (
                <tr key={a.id}>
                  <td>{a.contract_title || 'N/A'}</td>
                  <td>{a.article_reference || '—'}</td>
                  <td>{a.amendment_type || '—'}</td>
                  <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                  <td>
                    <span className={`readiness ${readiness.ready ? 'ready' : 'incomplete'}`}>
                      {readiness.satisfied}/{readiness.total}
                    </span>
                    {!readiness.ready && readiness.missing?.length > 0 && (
                      <span className="readiness-hint" title={readiness.missing.map((k) => REQUIREMENT_LABELS[k] || k).join(', ')}>
                        &nbsp;⚠
                      </span>
                    )}
                  </td>
                  <td className="actions">
                    {!isTerminal && (
                      <button className="btn-sm" onClick={() => handleOpenModal(a)}>Edit</button>
                    )}
                    {a.status !== 'notified' && a.status !== 'acknowledged' && (
                      <button
                        className="btn-sm btn-success"
                        disabled={!readiness.ready}
                        title={readiness.ready ? 'Send notice' : 'Complete all readiness requirements first'}
                        onClick={() => handleSendNotice(a)}
                      >
                        Send Notice
                      </button>
                    )}
                    {a.status === 'notified' && (
                      <button className="btn-sm" onClick={() => handleAcknowledge(a)}>Acknowledge</button>
                    )}
                    {!isTerminal && (
                      <button className="btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Amendment Journey' : 'New Amendment Journey'}</h2>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <legend>1. Contract &amp; Article</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contract</label>
                    <select
                      value={formData.contractId}
                      onChange={(e) => set({ contractId: e.target.value })}
                      required
                      disabled={!!editing}
                    >
                      <option value="">Select Contract</option>
                      {contracts.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Article Reference</label>
                    <input
                      type="text"
                      value={formData.articleReference}
                      onChange={(e) => set({ articleReference: e.target.value })}
                      placeholder="e.g., Article 12"
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>2. Classification</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Amendment Type</label>
                    <select value={formData.amendmentType} onChange={(e) => set({ amendmentType: e.target.value })}>
                      <option value="scope">Scope</option>
                      <option value="value">Value</option>
                      <option value="duration">Duration</option>
                      <option value="pricing">Pricing</option>
                      <option value="terms">Terms</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mechanism</label>
                    <select value={formData.amendmentMechanism} onChange={(e) => set({ amendmentMechanism: e.target.value })}>
                      <option value="amendment_letter">Amendment Letter</option>
                      <option value="addendum">Addendum</option>
                      <option value="annex">Annex</option>
                      <option value="board_resolution">Board Resolution</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>3. Legal Guardrails</legend>
                <div className="form-group">
                  <label>Reason</label>
                  <textarea value={formData.reason} onChange={(e) => set({ reason: e.target.value })} rows="2" />
                </div>
                <div className="form-group">
                  <label>Public Interest / Actual Need Basis</label>
                  <textarea value={formData.publicInterestBasis} onChange={(e) => set({ publicInterestBasis: e.target.value })} rows="2" />
                </div>
                <label className="checkbox">
                  <input type="checkbox" checked={formData.necessityConfirmed} onChange={(e) => set({ necessityConfirmed: e.target.checked })} />
                  The amendment is necessary
                </label>
                <label className="checkbox">
                  <input type="checkbox" checked={formData.noNewContractConfirmed} onChange={(e) => set({ noNewContractConfirmed: e.target.checked })} />
                  Does not create a new contract
                </label>
                <label className="checkbox">
                  <input type="checkbox" checked={formData.noNatureChangeConfirmed} onChange={(e) => set({ noNatureChangeConfirmed: e.target.checked })} />
                  Does not change the nature of the contract
                </label>
              </fieldset>

              <fieldset>
                <legend>4. Decision &amp; Authority</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label>Notice Period (days)</label>
                    <input type="number" min="1" value={formData.noticePeriodDays} onChange={(e) => set({ noticePeriodDays: Number(e.target.value) })} />
                  </div>
                  <div className="form-group">
                    <label>Authority Source</label>
                    <input type="text" value={formData.authoritySource} onChange={(e) => set({ authoritySource: e.target.value })} placeholder="e.g., Board Resolution 2026/14" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Decision Date</label>
                    <input type="date" value={formData.decisionDate} onChange={(e) => set({ decisionDate: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Effective Date</label>
                    <input type="date" value={formData.effectiveDate} onChange={(e) => set({ effectiveDate: e.target.value })} />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>5. Partner Impact &amp; Calculation</legend>
                <div className="form-group">
                  <label>Partner Impact</label>
                  <textarea value={formData.partnerImpact} onChange={(e) => set({ partnerImpact: e.target.value })} rows="2" />
                </div>
                <div className="form-group">
                  <label>Calculation Method</label>
                  <textarea value={formData.calculationMethod} onChange={(e) => set({ calculationMethod: e.target.value })} rows="2" />
                </div>
              </fieldset>

              <fieldset>
                <legend>6. Evidence &amp; Notice</legend>
                <div className="form-group">
                  <label>Amendment Letter Reference</label>
                  <input type="text" value={formData.amendmentLetterReference} onChange={(e) => set({ amendmentLetterReference: e.target.value })} placeholder="e.g., AL-2026-014" />
                </div>
                <div className="form-group">
                  <label>Notice Channels</label>
                  <div className="channel-options">
                    {CHANNELS.map((channel) => (
                      <label key={channel} className="checkbox inline">
                        <input type="checkbox" checked={formData.noticeChannels.includes(channel)} onChange={() => toggleChannel(channel)} />
                        {channel}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Notice Message (Arabic / RTL supported)</label>
                  <textarea
                    dir={formData.noticeMessageLanguage === 'ar' ? 'rtl' : 'ltr'}
                    value={formData.noticeMessage}
                    onChange={(e) => set({ noticeMessage: e.target.value })}
                    rows="3"
                    placeholder="نص الإشعار…"
                  />
                </div>
                <div className="form-group">
                  <label>Notice Language</label>
                  <select value={formData.noticeMessageLanguage} onChange={(e) => set({ noticeMessageLanguage: e.target.value })}>
                    <option value="ar">Arabic (RTL)</option>
                    <option value="en">English (LTR)</option>
                  </select>
                </div>
              </fieldset>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amendments;
