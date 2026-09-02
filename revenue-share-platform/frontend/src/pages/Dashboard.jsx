import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Partner, PartnerClaim, PartnerStatement, Decision } from '../api/entities';
import { useCollection } from '../hooks/useCollection';
import {
  Panel,
  Metric,
  Money,
  StatusTag,
  Kicker,
  Button,
  humanize,
} from '../components/ui/kit';
import '../styles/Dashboard.css';

const EASE = [0.22, 1, 0.36, 1];
const num = (v) => Number(v) || 0;
const isPaid = (c) => c.payment_status === 'paid';
const isEligible = (c) =>
  c.payout_eligibility_status === 'eligible' || c.payout_eligible === true;
const isAttributed = (c) =>
  ['accepted', 'partially_accepted'].includes(c.attribution_status);
const isException = (c) =>
  ['needs_information', 'duplicate_risk', 'agreement_gap', 'protection_conflict', 'manual_review'].includes(
    c.preflight_status
  ) ||
  ['needs_information', 'needs_evidence', 'finance_review_required'].includes(c.claim_status);

function DriverTile({ label, children, sub }) {
  return (
    <Panel className="driver">
      <span className="driver__label label">{label}</span>
      <div className="driver__value">{children}</div>
      {sub && <span className="driver__sub">{sub}</span>}
    </Panel>
  );
}

export default function Dashboard() {
  const { data: partners, loading: lp, error: partnersError, refetch: refetchPartners } = useCollection(Partner);
  const { data: claims, loading: lc, error: claimsError, refetch: refetchClaims } = useCollection(PartnerClaim);
  const { data: statements } = useCollection(PartnerStatement, { limit: 100 });
  const { data: decisions } = useCollection(Decision, { limit: 6 });
  const loading = lp || lc;

  const m = useMemo(() => {
    const realized = claims
      .filter(isPaid)
      .reduce((s, c) => s + num(c.paid_amount || c.approved_payout || c.estimated_payout), 0);
    const eligible = claims
      .filter(isEligible)
      .reduce((s, c) => s + num(c.estimated_payout), 0);
    const credited = claims
      .filter(isAttributed)
      .reduce((s, c) => s + num(c.actual_revenue || c.estimated_value), 0);
    const activePartners = partners.filter((p) => p.lifecycle_status === 'active').length;
    const openClaims = claims.filter(
      (c) => !['paid', 'rejected', 'expired', 'duplicate'].includes(c.claim_status)
    ).length;
    const exceptions = claims.filter(isException);
    const funnel = [
      { label: 'Submitted', n: claims.length },
      {
        label: 'Preflight',
        n: claims.filter((c) => c.preflight_status === 'pass' || c.claim_status !== 'submitted').length,
      },
      { label: 'Attributed', n: claims.filter(isAttributed).length },
      { label: 'Eligible', n: claims.filter(isEligible).length },
      { label: 'Paid', n: claims.filter(isPaid).length },
    ];
    return { realized, eligible, credited, activePartners, openClaims, exceptions, funnel };
  }, [partners, claims]);

  const funnelMax = Math.max(1, m.funnel[0].n);
  const coreError = partnersError || claimsError;

  if (coreError) {
    return (
      <div className="screen">
        <header className="screen__head">
          <div>
            <Kicker>Command Center</Kicker>
            <h1 className="screen__title serif">The partner P&amp;L, <em>on the record</em></h1>
          </div>
        </header>
        <Panel className="rv-pad">
          <div className="rv-empty" role="alert">
            <span className="serif">Could not load the command center.</span>
            <span className="label">{coreError.message}</span>
            <Button variant="quiet" onClick={() => { refetchPartners(); refetchClaims(); }}>Try again</Button>
          </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="cc">
      <header className="cc__head">
        <div>
          <Kicker>Command Center</Kicker>
          <h1 className="cc__title serif">
            The partner P&amp;L, <em>on the record</em>
          </h1>
        </div>
        <div className="cc__headmeta">
          <span className="label">Period</span>
          <span className="mono cc__period">2026 · Q3</span>
        </div>
      </header>

      {/* North Star */}
      <motion.div
        initial={{ y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <Panel className="north" variant="flush">
          <div className="north__main">
            <Kicker>North Star · trusted partner-attributed revenue realized</Kicker>
            <div className="north__figure">
              <span className="north__ccy">USD</span>
              <Metric
                value={m.realized}
                format={(n) => Math.round(n).toLocaleString()}
                className="north__num"
              />
            </div>
            <p className="north__note">
              Credited via a canonical attribution, made eligible with an explanation, and
              realized without dispute reversal.
            </p>
          </div>
          <div className="north__split">
            <div className="north__stat">
              <span className="label">Credited</span>
              <Money amount={m.credited} compact className="north__statnum" />
            </div>
            <div className="north__stat">
              <span className="label">Eligible</span>
              <Money amount={m.eligible} compact brass className="north__statnum" />
            </div>
            <div className="north__stat">
              <span className="label">Realized</span>
              <Money amount={m.realized} compact className="north__statnum" />
            </div>
          </div>
        </Panel>
      </motion.div>

      {/* Drivers */}
      <section className="cc__drivers">
        <DriverTile label="Active partners">
          <Metric value={m.activePartners} className="mono" />
        </DriverTile>
        <DriverTile label="Open claims">
          <Metric value={m.openClaims} className="mono" />
        </DriverTile>
        <DriverTile label="Eligible now" sub="awaiting settlement">
          <Money amount={m.eligible} compact brass />
        </DriverTile>
        <DriverTile label="Exception queue" sub="needs a human">
          <Metric value={m.exceptions.length} className="mono" />
        </DriverTile>
      </section>

      {/* Funnel */}
      <Panel className="funnel rv-pad">
        <div className="funnel__head">
          <Kicker>Claim ledger · capture to settle</Kicker>
          <Button to="/claims" variant="quiet" size="sm" arrow>
            Open ledger
          </Button>
        </div>
        <div className="funnel__stages">
          {m.funnel.map((s, i) => (
            <div className="stage" key={s.label}>
              <div className="stage__top">
                <span className="stage__label">{s.label}</span>
                <span className="stage__n mono tnum">{s.n}</span>
              </div>
              <div className="rv-meter stage__meter">
                <motion.div
                  className="rv-meter__fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.n / funnelMax) * 100}%` }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Lower split */}
      <div className="cc__lower">
        <Panel className="rv-pad attn">
          <div className="attn__head">
            <Kicker>Needs attention</Kicker>
            <span className="label attn__count">{m.exceptions.length}</span>
          </div>
          {loading ? (
            <div className="attn__loading">
              <span className="rv-shimmer" />
              <span className="rv-shimmer" />
              <span className="rv-shimmer" />
            </div>
          ) : m.exceptions.length === 0 ? (
            <div className="rv-empty">
              <span className="serif attn__empty">The queue is clear.</span>
              <span className="label">No claims are waiting on a human.</span>
            </div>
          ) : (
            <ul className="attn__list">
              {m.exceptions.slice(0, 6).map((c) => (
                <li className="attn__row" key={c._id}>
                  <div className="attn__who">
                    <span className="attn__partner">{c.partner_name || 'Unassigned'}</span>
                    <span className="attn__cust">{c.customer_account || '—'}</span>
                  </div>
                  <Money amount={c.estimated_value} compact className="attn__val" />
                  <StatusTag
                    status={c.preflight_status !== 'pass' ? c.preflight_status : c.claim_status}
                  />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="rv-pad decisions">
          <div className="attn__head">
            <Kicker>Cadence · recent decisions</Kicker>
            <Button to="/cadence" variant="quiet" size="sm" arrow>
              All
            </Button>
          </div>
          {decisions.length === 0 ? (
            <div className="rv-empty">
              <span className="serif attn__empty">No decisions logged yet.</span>
              <span className="label">Investment calls appear here with their outcomes.</span>
            </div>
          ) : (
            <ul className="dec__list">
              {decisions.slice(0, 5).map((d) => (
                <li className="dec__row" key={d._id}>
                  <span className="dec__dot" data-status={d.outcome_status || 'pending'} />
                  <div className="dec__body">
                    <span className="dec__title">{d.title || humanize(d.decision_type)}</span>
                    <span className="dec__meta">
                      {humanize(d.decision_type)}
                      {d.partner_name ? ` · ${d.partner_name}` : ''}
                    </span>
                  </div>
                  <StatusTag status={d.outcome_status || 'pending'} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
