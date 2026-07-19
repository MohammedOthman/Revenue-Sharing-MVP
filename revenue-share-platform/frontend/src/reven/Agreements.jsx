import React, { useEffect, useState } from 'react';
import { reven } from './api';
import { Icon, Money, Modal, Field } from './ui';

export default function Agreements() {
  const [items, setItems] = useState([]);
  const [partners, setPartners] = useState([]);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const load = () =>
    Promise.all([reven.listAgreements(), reven.listPartners()])
      .then(([a, p]) => { setItems(a); setPartners(p); })
      .catch(() => setErr('Failed to load.'));
  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="page-head"><h2>Agreements</h2><button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="add" /> New agreement</button></div>
      {err && <div className="err">{err}</div>}
      <div className="card">
        {items.length === 0 ? (
          <div className="center-note">No agreements yet. The rules here are what the eligibility preview reads to calculate a payout amount.</div>
        ) : (
          <table className="data">
            <thead><tr><th>Name</th><th>Type</th><th>Share</th><th>WHT</th><th>Cap</th><th>Protection</th></tr></thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td>{a.agreement_type || '—'}</td>
                  <td>{(Number(a.share_rate) * 100).toFixed(2)}%</td>
                  <td>{(Number(a.wht_rate) * 100).toFixed(2)}%</td>
                  <td>{a.cap_amount ? <Money amount={a.cap_amount} currency={a.currency} /> : '—'}</td>
                  <td>{a.protection_window_days ? `${a.protection_window_days}d` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {open && <AgreementModal partners={partners} onClose={() => setOpen(false)} onDone={() => { setOpen(false); load(); }} />}
    </>
  );
}

function AgreementModal({ partners, onClose, onDone }) {
  const [f, setF] = useState({ name: '', tenantPartnerId: '', agreementType: 'reseller', shareRate: 10, whtRate: 5, capAmount: '', protectionWindowDays: 90 });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => {
    setBusy(true); setErr('');
    try {
      await reven.createAgreement({
        name: f.name, tenantPartnerId: f.tenantPartnerId || null, agreementType: f.agreementType,
        shareBasis: 'revenue_share', shareRate: Number(f.shareRate) / 100, whtRate: Number(f.whtRate) / 100,
        capAmount: f.capAmount ? Number(f.capAmount) : null, protectionWindowDays: Number(f.protectionWindowDays),
      });
      onDone();
    } catch (e) { setErr(e.response?.data?.error || 'Failed'); setBusy(false); }
  };
  return (
    <Modal title="New agreement" onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn btn-primary" onClick={submit} disabled={busy}>Create</button></>}>
      {err && <div className="err">{err}</div>}
      <p className="muted" style={{ marginTop: 0, fontSize: 13 }}>Rule terms only — read to preview eligibility, never to move money in Phase 1.</p>
      <Field label="Name"><input value={f.name} onChange={set('name')} required placeholder="Gulf Reseller 2026" /></Field>
      <Field label="Partner (blank = program-level)">
        <select value={f.tenantPartnerId} onChange={set('tenantPartnerId')}>
          <option value="">Program-level</option>
          {partners.map((p) => <option key={p.id} value={p.id}>{p.display_name}</option>)}
        </select>
      </Field>
      <div className="row">
        <Field label="Share %"><input type="number" step="0.1" value={f.shareRate} onChange={set('shareRate')} /></Field>
        <Field label="WHT %"><input type="number" step="0.1" value={f.whtRate} onChange={set('whtRate')} /></Field>
      </div>
      <div className="row">
        <Field label="Cap (optional)"><input type="number" value={f.capAmount} onChange={set('capAmount')} placeholder="none" /></Field>
        <Field label="Protection days"><input type="number" value={f.protectionWindowDays} onChange={set('protectionWindowDays')} /></Field>
      </div>
    </Modal>
  );
}
