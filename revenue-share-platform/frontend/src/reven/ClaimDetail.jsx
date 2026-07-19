import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reven } from './api';
import { Icon, StatusChip, Money, Modal, Field, label } from './ui';

const EVENT_ICON = {
  'claim.submitted': 'add_task', 'claim.preflight': 'rule', 'protection.granted': 'shield',
  'attribution.decided': 'verified', 'revenue.recorded': 'attach_money', 'eligibility.evaluated': 'calculate',
  'ledger.accrued': 'account_balance', 'ledger.eligible': 'account_balance', 'payment.recorded': 'payments',
};

export default function ClaimDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [modal, setModal] = useState(null); // 'attribution' | 'revenue' | 'payment'
  const [busy, setBusy] = useState(false);

  const load = () => reven.getClaim(id).then(setD).catch(() => setErr('Failed to load claim.'));
  useEffect(() => { load(); }, [id]);

  const evaluate = async () => { setBusy(true); try { await reven.evaluateEligibility(id); await load(); } finally { setBusy(false); } };

  if (err) return <div className="err">{err}</div>;
  if (!d) return <div className="center-note">Loading…</div>;
  const { claim, attribution, eligibility, protection, events } = d;
  const eligible = eligibility?.verdict === 'eligible';

  return (
    <>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }} onClick={() => nav('/claims')}><Icon name="arrow_back" size={18} /> Claims</button>

      <div className="page-head">
        <div>
          <h2>{claim.customer_account_name}</h2>
          <div className="muted" style={{ marginTop: 4 }}>{claim.product || 'Claim'} · <Money amount={claim.estimated_deal_value} currency={claim.currency} /></div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <StatusChip value={claim.status} />
          <StatusChip value={claim.attribution_status} />
          <StatusChip value={claim.revenue_status} />
          <StatusChip value={claim.eligibility_status} />
        </div>
      </div>

      <div className="grid cols-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Eligibility preview */}
          <div className={`preview ${eligibility ? (eligible ? 'eligible' : 'blocked') : ''}`}>
            <div className="section-title">Payout-readiness preview</div>
            {!eligibility ? (
              <p className="muted" style={{ margin: '6px 0 14px' }}>Not evaluated yet. Run the eligibility check to calculate the preview.</p>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="money"><Money amount={eligibility.estimated_net} currency={eligibility.currency} /></span>
                  <StatusChip value={eligibility.verdict} />
                </div>
                {eligibility.estimated_gross != null && (
                  <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                    Gross <Money amount={eligibility.estimated_gross} currency={eligibility.currency} /> · WHT <Money amount={eligibility.estimated_wht} currency={eligibility.currency} />
                  </div>
                )}
                <div className="explain">{eligibility.explanation}</div>
                {Array.isArray(eligibility.missing_conditions) && eligibility.missing_conditions.length > 0 && (
                  <ul className="missing" style={{ margin: '12px 0 0', paddingLeft: 18 }}>
                    {eligibility.missing_conditions.map((mc, i) => <li key={i}>{mc}</li>)}
                  </ul>
                )}
              </>
            )}
            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={evaluate} disabled={busy}><Icon name="calculate" size={18} /> {busy ? 'Evaluating…' : 'Evaluate eligibility'}</button>
              {eligible && <button className="btn btn-ghost btn-sm" onClick={() => setModal('payment')}><Icon name="payments" size={18} /> Record payout</button>}
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 12 }}>Preview only — Phase 1 moves no money.</div>
          </div>

          {/* Actions */}
          <div className="card card-pad">
            <div className="section-title">Actions</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal('attribution')}><Icon name="verified" size={18} /> Decide attribution</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal('revenue')}><Icon name="attach_money" size={18} /> Record revenue</button>
            </div>
            {attribution && (
              <div style={{ marginTop: 14, fontSize: 13 }} className="muted">
                Attribution of record v{attribution.version}: <strong style={{ color: 'var(--ink)' }}>{label(attribution.decision)}</strong> · {attribution.credit_percentage}% credit
                {attribution.reason ? ` — "${attribution.reason}"` : ''}
              </div>
            )}
          </div>

          {/* Facts */}
          <div className="card card-pad">
            <div className="section-title">Claim facts</div>
            <Facts rows={[
              ['Partner role', label(claim.partner_role)],
              ['Account domain', claim.customer_domain || '—'],
              ['CRM opportunity', claim.opportunity_id || '—'],
              ['Preflight', label(claim.preflight_result)],
              ['Protection window', protection ? `${protection.starts_on} → ${protection.ends_on} (${label(protection.status)})` : '—'],
            ]} />
          </div>
        </div>

        {/* Timeline */}
        <div className="card card-pad">
          <div className="section-title">Immutable timeline</div>
          <ul className="timeline">
            {events.map((e, i) => (
              <li key={i}>
                <span className="dot"><Icon name={EVENT_ICON[e.event_type] || 'radio_button_checked'} size={18} /></span>
                <div>
                  <div className="ev">{label(e.event_type.replace('.', ' '))}</div>
                  <div className="meta">{new Date(e.created_at).toLocaleString()}{e.reason ? ` · ${e.reason}` : ''}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {modal === 'attribution' && <AttributionModal id={id} onClose={() => setModal(null)} onDone={() => { setModal(null); load(); }} />}
      {modal === 'revenue' && <RevenueModal id={id} onClose={() => setModal(null)} onDone={() => { setModal(null); load(); }} />}
      {modal === 'payment' && <PaymentModal id={id} net={eligibility?.estimated_net} onClose={() => setModal(null)} onDone={() => { setModal(null); load(); }} />}
    </>
  );
}

const Facts = ({ rows }) => (
  <table style={{ width: '100%', fontSize: 13.5 }}>
    <tbody>
      {rows.map(([k, v]) => (
        <tr key={k}><td className="muted" style={{ padding: '6px 0', width: '42%' }}>{k}</td><td style={{ padding: '6px 0', fontWeight: 500 }}>{v}</td></tr>
      ))}
    </tbody>
  </table>
);

function AttributionModal({ id, onClose, onDone }) {
  const [f, setF] = useState({ decision: 'accepted', creditPercentage: 100, basis: 'reseller', reason: '' });
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => {
    setBusy(true); setErr('');
    try { await reven.decideAttribution(id, { ...f, creditPercentage: Number(f.creditPercentage) }); onDone(); }
    catch (e) { setErr(e.response?.data?.error || 'Failed'); setBusy(false); }
  };
  return (
    <Modal title="Decide attribution of record" onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn btn-primary" onClick={submit} disabled={busy}>Record decision</button></>}>
      {err && <div className="err">{err}</div>}
      <p className="muted" style={{ marginTop: 0, fontSize: 13 }}>A human decides; the model only advises. A re-decision creates a new version and never overwrites.</p>
      <Field label="Decision">
        <select value={f.decision} onChange={set('decision')}>
          {['accepted', 'partial', 'rejected', 'duplicate'].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </Field>
      <div className="row">
        <Field label="Credit %"><input type="number" min="0" max="100" value={f.creditPercentage} onChange={set('creditPercentage')} /></Field>
        <Field label="Basis"><input value={f.basis} onChange={set('basis')} placeholder="sourced / influenced" /></Field>
      </div>
      <Field label="Reason"><textarea rows="2" value={f.reason} onChange={set('reason')} placeholder="Why this partner gets credit" /></Field>
    </Modal>
  );
}

function RevenueModal({ id, onClose, onDone }) {
  const [f, setF] = useState({ amount: '', status: 'closed_won', invoiceReference: '' });
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => {
    setBusy(true); setErr('');
    try { await reven.recordRevenue(id, { ...f, amount: Number(f.amount) }); onDone(); }
    catch (e) { setErr(e.response?.data?.error || 'Failed'); setBusy(false); }
  };
  return (
    <Modal title="Record revenue event" onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn btn-primary" onClick={submit} disabled={busy}>Record</button></>}>
      {err && <div className="err">{err}</div>}
      <p className="muted" style={{ marginTop: 0, fontSize: 13 }}>A validated fact that attributed pipeline became real revenue. Manual entry or import only.</p>
      <Field label="Amount"><input type="number" min="0" value={f.amount} onChange={set('amount')} placeholder="120000" /></Field>
      <Field label="Status">
        <select value={f.status} onChange={set('status')}>
          {['closed_won', 'invoiced', 'collected', 'recognized', 'pipeline'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Invoice reference (optional)"><input value={f.invoiceReference} onChange={set('invoiceReference')} placeholder="INV-2044" /></Field>
    </Modal>
  );
}

function PaymentModal({ id, net, onClose, onDone }) {
  const [f, setF] = useState({ amount: net || '', paidDate: '', externalRef: '' });
  const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async () => {
    setBusy(true); setErr('');
    try { await reven.recordPayment(id, { ...f, amount: f.amount ? Number(f.amount) : null }); onDone(); }
    catch (e) { setErr(e.response?.data?.error || 'Failed'); setBusy(false); }
  };
  return (
    <Modal title="Record payout milestone" onClose={onClose}
      footer={<><button className="btn btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn btn-primary" onClick={submit} disabled={busy}>Record milestone</button></>}>
      {err && <div className="err">{err}</div>}
      <p className="muted" style={{ marginTop: 0, fontSize: 13 }}>Records that a payout happened out-of-band. Phase 1 never executes a payment or touches a rail.</p>
      <Field label="Amount paid"><input type="number" min="0" value={f.amount} onChange={set('amount')} /></Field>
      <div className="row">
        <Field label="Paid date"><input type="date" value={f.paidDate} onChange={set('paidDate')} /></Field>
        <Field label="External ref"><input value={f.externalRef} onChange={set('externalRef')} placeholder="BANK-8841" /></Field>
      </div>
    </Modal>
  );
}
