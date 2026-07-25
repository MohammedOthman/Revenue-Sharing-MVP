import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PartnerClaim } from '../api/entities';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker, StatusTag, Money, Button, humanize } from '../components/ui/kit';
import { ClaimForm } from '../components/RecordForms';
import '../styles/Claims.css';

const EASE = [0.22, 1, 0.36, 1];
const isTerminal = (c) => ['paid', 'rejected', 'expired', 'duplicate'].includes(c.claim_status);
const isException = (c) =>
  ['needs_information', 'duplicate_risk', 'agreement_gap', 'protection_conflict', 'manual_review'].includes(
    c.preflight_status
  ) ||
  ['needs_information', 'needs_evidence', 'finance_review_required'].includes(c.claim_status);

const FILTERS = [
  { key: 'all', label: 'All', test: () => true },
  { key: 'attention', label: 'Needs attention', test: isException },
  {
    key: 'attribution',
    label: 'In attribution',
    test: (c) => ['pending', 'needs_evidence', 'disputed'].includes(c.attribution_status) && !isTerminal(c),
  },
  { key: 'eligible', label: 'Eligible', test: (c) => c.payout_eligibility_status === 'eligible' },
  { key: 'paid', label: 'Paid', test: (c) => c.payment_status === 'paid' },
];

const pct = (v) => (v == null || v === '' ? '—' : `${Math.round(Number(v))}%`);

function DefRow({ label, children }) {
  return (
    <div className="def">
      <span className="def__k label">{label}</span>
      <span className="def__v">{children}</span>
    </div>
  );
}

function ClaimDrawer({ claim, onClose, onUpdated }) {
  const c = claim;
  const ccy = c.currency || 'USD';
  const [pct, setPct] = useState(c.attribution_percentage ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const decide = async (status) => {
    setErr('');
    setBusy(true);
    try {
      await PartnerClaim.update(c._id, {
        attribution_status: status,
        attribution_percentage: status === 'rejected' ? 0 : Number(pct || 0),
        attribution_decision_date: new Date().toISOString().slice(0, 10),
        attribution_version: c.attribution_version || 1,
        claim_status:
          status === 'accepted' ? 'accepted' : status === 'rejected' ? 'rejected' : c.claim_status,
      });
      onUpdated?.();
    } catch (e) {
      setErr(e?.message || 'Could not save the decision.');
    } finally {
      setBusy(false);
    }
  };

  // Single eligibility evaluation with an explanation (read/calculate/display —
  // Phase 1 moves no money). The verdict + explanation is the FR-10 core.
  const evaluate = async () => {
    setErr('');
    setBusy(true);
    try {
      let status;
      let explanation;
      let missing = [];
      let estPay = c.estimated_payout;
      if (!['accepted', 'partially_accepted'].includes(c.attribution_status)) {
        status = 'not_eligible';
        explanation = 'Attribution of record is not yet accepted, so no payout can be made eligible.';
        missing = ['Accept the attribution of record'];
      } else if (!['closed_won', 'invoiced', 'collected', 'recognized'].includes(c.revenue_status)) {
        status = 'missing_evidence';
        explanation =
          'Attribution is accepted, but no closed-won (or later) revenue event has been recorded yet.';
        missing = ['A closed-won, invoiced, collected or recognized revenue event'];
      } else {
        status = 'eligible';
        estPay = Math.round((Number(c.estimated_value) || 0) * (Number(c.attribution_percentage) || 0) / 100);
        explanation = `Attribution accepted at ${c.attribution_percentage || 0}% and revenue ${String(
          c.revenue_status
        ).replace(/_/g, ' ')}; eligible for payout on the attributed basis.`;
      }
      await PartnerClaim.update(c._id, {
        payout_eligibility_status: status,
        payout_eligible: status === 'eligible',
        eligibility_explanation: explanation,
        eligibility_missing_conditions: missing,
        eligibility_evaluated_date: new Date().toISOString(),
        estimated_payout: estPay,
        claim_status: status === 'eligible' ? 'payout_eligible' : c.claim_status,
      });
      onUpdated?.();
    } catch (e) {
      setErr(e?.message || 'Could not evaluate eligibility.');
    } finally {
      setBusy(false);
    }
  };

  // Record (not execute) the first-payout milestone.
  const recordPayout = async () => {
    setErr('');
    setBusy(true);
    try {
      const amt = Number(c.approved_payout || c.estimated_payout || 0);
      await PartnerClaim.update(c._id, {
        approved_payout: amt,
        paid_amount: amt,
        payment_status: 'paid',
        claim_status: 'paid',
      });
      onUpdated?.();
    } catch (e) {
      setErr(e?.message || 'Could not record the payout.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <motion.div
        className="drawer__scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.aside
        className="drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 38 }}
        role="dialog"
        aria-label="Claim detail"
      >
        <header className="drawer__head">
          <div className="cellstack">
            <span className="drawer__partner serif">{c.partner_name || 'Unassigned'}</span>
            <span className="drawer__cust">
              → {c.customer_account || '—'} · {humanize(c.claim_type)}
            </span>
          </div>
          <button className="drawer__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="drawer__body">
          <div className="drawer__topline">
            <div className="drawer__value">
              <span className="label">Deal value</span>
              <Money amount={c.estimated_value} currency={ccy} className="drawer__valuenum" />
            </div>
            <StatusTag status={c.claim_status} />
          </div>

          {/* Attribution of Record */}
          <section className="drawer__sec">
            <Kicker>Attribution of record</Kicker>
            <div className="attrib">
              <div className="attrib__col">
                <span className="attrib__num mono">{pct(c.attribution_recommended_percentage)}</span>
                <span className="label">Model · advisory</span>
              </div>
              <span className="attrib__arrow" aria-hidden="true">→</span>
              <div className="attrib__col attrib__col--decided">
                <span className="attrib__num mono">{pct(c.attribution_percentage)}</span>
                <span className="label">Human · decided</span>
              </div>
              <div className="attrib__meta">
                <StatusTag status={c.attribution_status} />
                {c.attribution_version ? (
                  <span className="attrib__ver mono">v{c.attribution_version}</span>
                ) : null}
              </div>
            </div>
            <div className="decide">
              <input
                className="rv-field decide__pct"
                type="number"
                min="0"
                max="100"
                value={pct}
                onChange={(e) => setPct(e.target.value)}
                placeholder="%"
                aria-label="Attribution percent"
              />
              <Button variant="primary" size="sm" disabled={busy} onClick={() => decide('accepted')}>
                {busy ? 'Saving…' : 'Accept'}
              </Button>
              <Button variant="quiet" size="sm" disabled={busy} onClick={() => decide('rejected')}>
                Reject
              </Button>
            </div>
            {err && <p className="drawer__note drawer__note--stop">{err}</p>}
            {c.attribution_recommendation_basis && (
              <p className="drawer__note">{c.attribution_recommendation_basis}</p>
            )}
            {c.attribution_rejection_reason && (
              <p className="drawer__note drawer__note--stop">{c.attribution_rejection_reason}</p>
            )}
          </section>

          {/* Eligibility — verdict + explanation + missing conditions (FR-10) */}
          <section className="drawer__sec">
            <div className="drawer__sechead">
              <Kicker>Payout eligibility</Kicker>
              <StatusTag status={c.payout_eligibility_status} />
            </div>
            {c.eligibility_explanation ? (
              <p className="drawer__explain">{c.eligibility_explanation}</p>
            ) : (
              <p className="drawer__note">No eligibility explanation recorded yet.</p>
            )}
            {Array.isArray(c.eligibility_missing_conditions) &&
              c.eligibility_missing_conditions.length > 0 && (
                <ul className="missing">
                  {c.eligibility_missing_conditions.map((m, i) => (
                    <li key={i} className="missing__item">
                      <span className="missing__dot" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            <div className="drawer__grid">
              <DefRow label="Estimated payout">
                <Money amount={c.estimated_payout} currency={ccy} brass />
              </DefRow>
              <DefRow label="Approved">
                <Money amount={c.approved_payout} currency={ccy} />
              </DefRow>
              <DefRow label="Paid">
                <Money amount={c.paid_amount} currency={ccy} />
              </DefRow>
              <DefRow label="Payment">
                <StatusTag status={c.payment_status} />
              </DefRow>
            </div>
            <div className="decide">
              <Button variant="ghost" size="sm" disabled={busy} onClick={evaluate}>
                Evaluate eligibility
              </Button>
              {c.payout_eligibility_status === 'eligible' && c.payment_status !== 'paid' && (
                <Button variant="primary" size="sm" disabled={busy} onClick={recordPayout}>
                  Record payout
                </Button>
              )}
            </div>
          </section>

          {/* Protection */}
          {(c.protection_window_active || c.protection_start_date) && (
            <section className="drawer__sec">
              <Kicker>Protection window</Kicker>
              <div className="drawer__grid">
                <DefRow label="Scope">{c.protection_scope || 'account'}</DefRow>
                <DefRow label="Active">{c.protection_window_active ? 'Yes' : 'No'}</DefRow>
                <DefRow label="From">{c.protection_start_date || '—'}</DefRow>
                <DefRow label="Until">{c.protection_end_date || '—'}</DefRow>
              </div>
              {c.protection_override_reason && (
                <p className="drawer__note drawer__note--stop">
                  Override: {c.protection_override_reason}
                  {c.protection_override_approver ? ` — ${c.protection_override_approver}` : ''}
                </p>
              )}
            </section>
          )}

          {/* Revenue + provenance */}
          <section className="drawer__sec">
            <Kicker>Revenue &amp; provenance</Kicker>
            <div className="drawer__grid">
              <DefRow label="Revenue status">
                <StatusTag status={c.revenue_status} />
              </DefRow>
              <DefRow label="Actual revenue">
                <Money amount={c.actual_revenue} currency={ccy} />
              </DefRow>
              <DefRow label="CRM match">{c.crm_match_confidence || 'unmatched'}</DefRow>
              <DefRow label="Preflight">
                <StatusTag status={c.preflight_status} />
              </DefRow>
            </div>
            {c.evidence_description && (
              <p className="drawer__note">Evidence: {c.evidence_description}</p>
            )}
          </section>
        </div>
      </motion.aside>
    </>
  );
}

export default function Claims() {
  const { data: claims, loading, refetch } = useCollection(PartnerClaim);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get('new') !== null) {
      setShowForm(true);
      params.delete('new');
      setParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const counts = useMemo(() => {
    const c = {};
    for (const f of FILTERS) c[f.key] = claims.filter(f.test).length;
    return c;
  }, [claims]);

  const rows = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter) || FILTERS[0];
    return claims.filter(f.test);
  }, [claims, filter]);

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>Capture → Settle · Claims</Kicker>
          <h1 className="screen__title serif">
            The claim <em>ledger</em>
          </h1>
          <p className="screen__sub">
            One canonical claim per contribution — submission, preflight, attribution of record,
            eligibility with an explanation, and payout.
          </p>
        </div>
        <div className="screen__headright">
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            Register claim
          </Button>
          <span className="screen__count">{claims.length} claims</span>
        </div>
      </header>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className="chip"
            data-active={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="chip__n">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      <Panel className="tablewrap">
        {loading ? (
          <div className="skerows rv-pad">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="rv-shimmer" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rv-empty">
            <span className="serif">No claims here.</span>
            <span className="label">Registered claims will appear in the ledger.</span>
          </div>
        ) : (
          <table className="rv-table claims-table">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Value</th>
                <th>Attribution</th>
                <th>Eligibility</th>
                <th>Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c._id} onClick={() => setSelected(c)} className="claims-row">
                  <td>
                    <div className="cellstack">
                      <span className="cellname">{c.partner_name || 'Unassigned'}</span>
                      <span className="cellsub">→ {c.customer_account || '—'}</span>
                    </div>
                  </td>
                  <td>
                    <Money amount={c.estimated_value} compact currency={c.currency || 'USD'} />
                  </td>
                  <td>
                    <div className="claims-attrib">
                      <span className="mono">{pct(c.attribution_percentage)}</span>
                      <StatusTag status={c.attribution_status} />
                    </div>
                  </td>
                  <td>
                    <StatusTag status={c.payout_eligibility_status} />
                  </td>
                  <td>
                    <Money amount={c.estimated_payout} compact brass currency={c.currency || 'USD'} />
                  </td>
                  <td>
                    <StatusTag status={c.claim_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>

      <AnimatePresence>
        {selected && (
          <ClaimDrawer
            claim={selected}
            onClose={() => setSelected(null)}
            onUpdated={() => {
              refetch();
              setSelected(null);
            }}
          />
        )}
      </AnimatePresence>

      <ClaimForm open={showForm} onClose={() => setShowForm(false)} onCreated={refetch} />
    </div>
  );
}
