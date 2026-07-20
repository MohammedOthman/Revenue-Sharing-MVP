import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reven } from './api';
import { Icon, StatusChip, Money } from './ui';

export default function CommandCenter() {
  const [m, setM] = useState(null);
  const [claims, setClaims] = useState([]);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    Promise.all([reven.metrics(), reven.listClaims()])
      .then(([mm, cc]) => { setM(mm); setClaims(cc); })
      .catch(() => setErr('Failed to load the command center.'));
  }, []);

  if (err) return <div className="err">{err}</div>;
  if (!m) return <div className="center-note">Loading…</div>;

  const tiles = [
    { icon: 'receipt_long', label: 'Claims captured', value: `${m.claims.count}`, sub: `Phase-1 gate: ${m.claims.target}` },
    { icon: 'verified', label: 'Accepted attributions', value: `${m.accepted_claims}` },
    { icon: 'payments', label: 'Payout-ready previews', value: `${m.eligible_previews}` },
    { icon: 'timer', label: 'Time to first claim', value: m.time_to_first_claim_days == null ? '—' : `${m.time_to_first_claim_days}d`, sub: `Target < ${m.time_to_first_claim_target_days}d` },
  ];

  return (
    <>
      <div className="page-head">
        <h2>Command Center</h2>
        <button className="btn btn-primary" onClick={() => nav('/claims')}><Icon name="add" /> Register claim</button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 24 }}>
        {tiles.map((t) => (
          <div className="tile" key={t.label}>
            <div className="label"><Icon name={t.icon} size={18} /> {t.label}</div>
            <div className="value">{t.value}</div>
            {t.sub && <div className="sub">{t.sub}</div>}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-pad" style={{ borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Recent claims</h3>
          <span className="muted" style={{ fontSize: 13 }}>{claims.length} total</span>
        </div>
        {claims.length === 0 ? (
          <div className="center-note">No claims yet. Register your first deal to start capturing.</div>
        ) : (
          <table className="data">
            <thead><tr><th>Customer</th><th>Partner</th><th>Value</th><th>Attribution</th><th>Eligibility</th></tr></thead>
            <tbody>
              {claims.slice(0, 8).map((c) => (
                <tr key={c.id} onClick={() => nav(`/claims/${c.id}`)}>
                  <td style={{ fontWeight: 600 }}>{c.customer_account_name}</td>
                  <td>{c.partner_name}</td>
                  <td><Money amount={c.estimated_deal_value} currency={c.currency} /></td>
                  <td><StatusChip value={c.attribution_status} /></td>
                  <td><StatusChip value={c.eligibility_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
