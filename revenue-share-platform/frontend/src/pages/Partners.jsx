import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Partner } from '../api/entities';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker, StatusTag, Money, Button, humanize } from '../components/ui/kit';
import { PartnerForm } from '../components/RecordForms';
import { useAuth } from '../context/AuthContext';
import { Select } from '../components/ui/form';

const STAGES = ['intake', 'qualifying', 'approved', 'onboarding', 'active', 'at_risk', 'dormant'];
const EASE = [0.22, 1, 0.36, 1];

function ScoreCell({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="scorecell">
      <div className="rv-meter">
        <motion.div
          className="rv-meter__fill"
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </div>
      <span className="scorecell__n">{v || '—'}</span>
    </div>
  );
}

export default function Partners() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const { data: partners, loading, error, refetch } = useCollection(Partner);
  const [stage, setStage] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState('');

  const changeStage = async (partner, lifecycleStatus) => {
    setActionError('');
    try {
      await Partner.update(partner._id, { lifecycle_status: lifecycleStatus }, partner.version);
      await refetch();
    } catch (caught) {
      setActionError(caught?.message || 'Could not update the partner lifecycle.');
    }
  };

  const counts = useMemo(() => {
    const c = Object.fromEntries(STAGES.map((s) => [s, 0]));
    partners.forEach((p) => {
      if (c[p.lifecycle_status] != null) c[p.lifecycle_status] += 1;
    });
    return c;
  }, [partners]);

  const rows = useMemo(
    () => (stage === 'all' ? partners : partners.filter((p) => p.lifecycle_status === stage)),
    [partners, stage]
  );

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>Capture · Partners</Kicker>
          <h1 className="screen__title serif">Partner lifecycle</h1>
          <p className="screen__sub">
            Intake through activation — with payout-readiness tracked apart from onboarding.
          </p>
        </div>
        <div className="screen__headright">
          {canWrite && (
            <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
              Add partner
            </Button>
          )}
          <span className="screen__count">{partners.length} partners</span>
        </div>
      </header>

      <div className="stagestrip">
        <button
          className="stagechip"
          data-active={stage === 'all'}
          onClick={() => setStage('all')}
        >
          <span className="stagechip__n">{partners.length}</span>
          <span className="stagechip__label">All</span>
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            className="stagechip"
            data-active={stage === s}
            onClick={() => setStage(s)}
          >
            <span className="stagechip__n">{counts[s]}</span>
            <span className="stagechip__label">{humanize(s)}</span>
          </button>
        ))}
      </div>

      {actionError && <div className="formerror" role="alert">{actionError}</div>}

      <Panel className="tablewrap">
        {loading ? (
          <div className="skerows rv-pad">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="rv-shimmer" />
            ))}
          </div>
        ) : error ? (
          <div className="rv-empty" role="alert">
            <span className="serif">Could not load partners.</span>
            <span className="label">{error.message}</span>
            <Button variant="quiet" size="sm" onClick={refetch}>Try again</Button>
          </div>
        ) : rows.length === 0 ? (
          <div className="rv-empty">
            <span className="serif">No partners in this stage.</span>
            <span className="label">They appear here as they move through the lifecycle.</span>
          </div>
        ) : (
          <table className="rv-table">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Type</th>
                <th>Tier</th>
                <th>Stage</th>
                <th>Sourced</th>
                <th>Influenced</th>
                <th>Health</th>
                {canWrite && <th>Move stage</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="cellstack">
                      <span className="cellname">
                        {p.trade_name || p.legal_name || 'Unnamed partner'}
                      </span>
                      <span className="cellsub">
                        {[p.country, p.industry].filter(Boolean).join(' · ') || '—'}
                      </span>
                    </div>
                  </td>
                  <td>{p.partner_type ? humanize(p.partner_type) : '—'}</td>
                  <td>{p.tier ? humanize(p.tier) : '—'}</td>
                  <td>
                    <StatusTag status={p.lifecycle_status} />
                  </td>
                  <td>
                    <Money amount={p.sourced_revenue} compact currency={p.reporting_currency || 'USD'} />
                  </td>
                  <td>
                    <Money amount={p.influenced_revenue} compact currency={p.reporting_currency || 'USD'} />
                  </td>
                  <td>
                    <ScoreCell value={p.health_score} />
                  </td>
                  {canWrite && (
                    <td>
                      <Select
                        aria-label={`Lifecycle stage for ${p.trade_name || p.legal_name}`}
                        options={STAGES}
                        value={p.lifecycle_status || 'intake'}
                        onChange={(event) => changeStage(p, event.target.value)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>

      {canWrite && <PartnerForm open={showForm} onClose={() => setShowForm(false)} onCreated={refetch} />}
    </div>
  );
}
