import { useMemo } from 'react';
import { Decision } from '../api/entities';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker, StatusTag, Money, Button, humanize } from '../components/ui/kit';

export default function Cadence() {
  const { data, loading, error, refetch } = useCollection(Decision, { sort: '-created_date' });

  const stats = useMemo(() => {
    const by = (s) => data.filter((d) => (d.outcome_status || 'pending') === s).length;
    return [
      { label: 'Logged', value: data.length },
      { label: 'On track', value: by('on_track') },
      { label: 'Achieved', value: by('achieved') },
      { label: 'Missed', value: by('missed') },
    ];
  }, [data]);

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>Operate · Cadence</Kicker>
          <h1 className="screen__title serif">
            Decisions &amp; <em>outcomes</em>
          </h1>
          <p className="screen__sub">
            The operating loop — investment decisions logged with an expected outcome, then measured
            against what actually happened.
          </p>
        </div>
        <span className="screen__count">{data.length} total</span>
      </header>

      <div className="stagestrip">
        {stats.map((s) => (
          <div className="stagechip" key={s.label}>
            <span className="stagechip__n">{s.value}</span>
            <span className="stagechip__label">{s.label}</span>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="deccards">
          {Array.from({ length: 4 }).map((_, i) => (
            <Panel key={i} className="deccard">
              <span className="rv-shimmer" style={{ height: 120 }} />
            </Panel>
          ))}
        </div>
      ) : error ? (
        <Panel className="rv-pad">
          <div className="rv-empty" role="alert">
            <span className="serif">Could not load decisions.</span>
            <span className="label">{error.message}</span>
            <Button variant="quiet" size="sm" onClick={refetch}>Try again</Button>
          </div>
        </Panel>
      ) : data.length === 0 ? (
        <Panel className="rv-pad">
          <div className="rv-empty">
            <span className="serif">No decisions logged yet.</span>
            <span className="label">Investment calls appear here with their measured outcomes.</span>
          </div>
        </Panel>
      ) : (
        <div className="deccards">
          {data.map((d) => (
            <Panel key={d._id} className="deccard">
              <div className="deccard__head">
                <span className="deccard__title">{d.title || humanize(d.decision_type)}</span>
                <StatusTag status={d.outcome_status || 'pending'} />
              </div>
              <Kicker>
                {humanize(d.decision_type)}
                {d.partner_name ? ` · ${d.partner_name}` : ''}
              </Kicker>
              {d.rationale && <p className="deccard__rationale">{d.rationale}</p>}
              <div className="deccard__outcomes">
                <div className="deccard__o">
                  <span className="label">Expected</span>
                  <span className="deccard__ovalue">{d.expected_outcome || '—'}</span>
                </div>
                <div className="deccard__o">
                  <span className="label">Actual</span>
                  <span className="deccard__ovalue">{d.actual_outcome || '—'}</span>
                </div>
              </div>
              {d.financial_impact != null && d.financial_impact !== 0 && (
                <div className="deccard__o">
                  <span className="label">Financial impact</span>
                  <Money amount={d.financial_impact} compact brass={d.financial_impact > 0} />
                </div>
              )}
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
