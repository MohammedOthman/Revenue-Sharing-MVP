import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reven } from './api';
import { Icon, StatusChip, Money, Modal, Field } from './ui';

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [partners, setPartners] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const load = () => {
    Promise.all([reven.listClaims(), reven.listPartners(), reven.listAgreements()])
      .then(([c, p, a]) => { setClaims(c); setPartners(p); setAgreements(a); })
      .catch(() => setErr('Failed to load claims.'));
  };
  useEffect(load, []);

  return (
    <>
      <div className="page-head">
        <h2>Claims</h2>
        <button className="btn btn-primary" onClick={() => setOpen(true)} disabled={partners.length === 0}>
          <Icon name="add" /> Register claim
        </button>
      </div>
      {err && <div className="err">{err}</div>}
      {partners.length === 0 && (
        <div className="card card-pad" style={{ marginBottom: 16 }}>
          <span className="muted">Add a partner first — a claim registers a partner's assertion of contribution.</span>
        </div>
      )}

      <div className="card">
        {claims.length === 0 ? (
          <div className="center-note">No claims yet.</div>
        ) : (
          <table className="data">
            <thead><tr><th>Customer</th><th>Partner</th><th>Value</th><th>Preflight</th><th>Attribution</th><th>Revenue</th><th>Eligibility</th></tr></thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c.id} onClick={() => nav(`/claims/${c.id}`)}>
                  <td style={{ fontWeight: 600 }}>{c.customer_account_name}</td>
                  <td>{c.partner_name}</td>
                  <td><Money amount={c.estimated_deal_value} currency={c.currency} /></td>
                  <td><StatusChip value={c.preflight_result} /></td>
                  <td><StatusChip value={c.attribution_status} /></td>
                  <td><StatusChip value={c.revenue_status} /></td>
                  <td><StatusChip value={c.eligibility_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {open && (
        <RegisterModal
          partners={partners}
          agreements={agreements}
          onClose={() => setOpen(false)}
          onDone={(claim) => { setOpen(false); nav(`/claims/${claim.id}`); }}
        />
      )}
    </>
  );
}

function RegisterModal({ partners, agreements, onClose, onDone }) {
  const [f, setF] = useState({
    tenantPartnerId: partners[0]?.id || '', agreementId: '', customerAccountName: '',
    customerDomain: '', opportunityId: '', product: '', estimatedDealValue: '', partnerRole: 'reseller',
  });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const partnerAgreements = agreements.filter((a) => !a.tenant_partner_id || a.tenant_partner_id === f.tenantPartnerId);

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setBusy(true);
    try {
      const r = await reven.registerClaim({
        ...f,
        estimatedDealValue: f.estimatedDealValue ? Number(f.estimatedDealValue) : null,
        agreementId: f.agreementId || null,
      });
      onDone(r.claim);
    } catch (e2) {
      setErr(e2.response?.data?.error || 'Failed to register claim');
      setBusy(false);
    }
  };

  return (
    <Modal
      title="Register a deal / claim"
      onClose={onClose}
      footer={<>
        <button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button>
        <button className="btn btn-primary" onClick={submit} disabled={busy}>{busy ? 'Registering…' : 'Register claim'}</button>
      </>}
    >
      {err && <div className="err">{err}</div>}
      <Field label="Partner">
        <select value={f.tenantPartnerId} onChange={set('tenantPartnerId')} required>
          {partners.map((p) => <option key={p.id} value={p.id}>{p.display_name}</option>)}
        </select>
      </Field>
      <Field label="Agreement (optional — a claim without one is captured but not payout-eligible)">
        <select value={f.agreementId} onChange={set('agreementId')}>
          <option value="">No agreement</option>
          {partnerAgreements.map((a) => <option key={a.id} value={a.id}>{a.name} · {(Number(a.share_rate) * 100).toFixed(1)}%</option>)}
        </select>
      </Field>
      <Field label="Customer / account name"><input value={f.customerAccountName} onChange={set('customerAccountName')} required placeholder="Riyadh Motors" /></Field>
      <div className="row">
        <Field label="Account domain (dedup key)"><input value={f.customerDomain} onChange={set('customerDomain')} placeholder="riyadhmotors.sa" /></Field>
        <Field label="CRM opportunity id"><input value={f.opportunityId} onChange={set('opportunityId')} placeholder="OPP-1024" /></Field>
      </div>
      <div className="row">
        <Field label="Product"><input value={f.product} onChange={set('product')} placeholder="Fleet SaaS" /></Field>
        <Field label="Estimated deal value"><input type="number" min="0" value={f.estimatedDealValue} onChange={set('estimatedDealValue')} placeholder="100000" /></Field>
      </div>
      <Field label="Partner role">
        <select value={f.partnerRole} onChange={set('partnerRole')}>
          {['source', 'influencer', 'co_seller', 'reseller', 'referral', 'implementation'].map((r) => <option key={r} value={r}>{r.replace('_', '-')}</option>)}
        </select>
      </Field>
    </Modal>
  );
}
