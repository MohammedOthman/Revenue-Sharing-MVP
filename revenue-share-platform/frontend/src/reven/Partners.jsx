import React, { useEffect, useState } from 'react';
import { reven } from './api';
import { Icon, Modal, Field } from './ui';

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const load = () => reven.listPartners().then(setPartners).catch(() => setErr('Failed to load partners.'));
  useEffect(() => { load(); }, []);

  const verify = async (p) => { await reven.verifyPartner(p.id, { bankVerified: true, taxVerified: true }); load(); };

  return (
    <>
      <div className="page-head"><h2>Partners</h2><button className="btn btn-primary" onClick={() => setOpen(true)}><Icon name="add" /> Add partner</button></div>
      {err && <div className="err">{err}</div>}
      <div className="card">
        {partners.length === 0 ? (
          <div className="center-note">No partners yet. A partner is a cross-tenant identity your workspace references.</div>
        ) : (
          <table className="data">
            <thead><tr><th>Partner</th><th>Type</th><th>Domain</th><th>Bank</th><th>Tax</th><th>Payout-ready</th><th></th></tr></thead>
            <tbody>
              {partners.map((p) => {
                const ready = p.bank_verified && p.tax_verified;
                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.display_name}</td>
                    <td>{p.partner_type || '—'}</td>
                    <td className="muted">{p.domain || '—'}</td>
                    <td>{p.bank_verified ? <Icon name="check_circle" /> : <span className="muted">—</span>}</td>
                    <td>{p.tax_verified ? <Icon name="check_circle" /> : <span className="muted">—</span>}</td>
                    <td>{ready ? <span className="chip green"><Icon name="check" size={16} /> Ready</span> : <span className="chip amber">Pending</span>}</td>
                    <td>{!ready && <button className="btn btn-ghost btn-sm" onClick={() => verify(p)}>Verify bank + tax</button>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {open && <PartnerModal onClose={() => setOpen(false)} onDone={() => { setOpen(false); load(); }} />}
    </>
  );
}

function PartnerModal({ onClose, onDone }) {
  const [f, setF] = useState({ displayName: '', legalName: '', domain: '', taxId: '', partnerType: 'reseller', country: 'SA' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => {
    setBusy(true); setErr('');
    try { await reven.createPartner(f); onDone(); }
    catch (e) { setErr(e.response?.data?.error || 'Failed'); setBusy(false); }
  };
  return (
    <Modal title="Add partner" onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn btn-primary" onClick={submit} disabled={busy}>Add partner</button></>}>
      {err && <div className="err">{err}</div>}
      <Field label="Display name"><input value={f.displayName} onChange={set('displayName')} required placeholder="Gulf Dealers" /></Field>
      <Field label="Legal entity name"><input value={f.legalName} onChange={set('legalName')} placeholder="Gulf Dealers LLC" /></Field>
      <div className="row">
        <Field label="Domain"><input value={f.domain} onChange={set('domain')} placeholder="gulfdealers.sa" /></Field>
        <Field label="Tax / CR id"><input value={f.taxId} onChange={set('taxId')} placeholder="3001234567" /></Field>
      </div>
      <Field label="Type">
        <select value={f.partnerType} onChange={set('partnerType')}>
          {['referral', 'reseller', 'strategic', 'affiliate', 'distributor', 'implementation'].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
    </Modal>
  );
}
