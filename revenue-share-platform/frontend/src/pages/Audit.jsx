import { useMemo } from 'react';
import { AuditEvent } from '../api/entities';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker, StatusTag, Button, humanize } from '../components/ui/kit';

const fmtWhen = (s) => {
  if (!s) return '—';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function Audit() {
  const { data, loading, error, refetch } = useCollection(AuditEvent, { sort: '-event_date' });
  const anomalies = useMemo(
    () => data.filter((e) => e.is_out_of_order || e.is_late).length,
    [data]
  );

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>Operate · Audit</Kicker>
          <h1 className="screen__title serif">
            Audit <em>log</em>
          </h1>
          <p className="screen__sub">
            Every state change as an event — who, what, when and why, including out-of-order and late
            anomalies.
          </p>
        </div>
        <span className="screen__count">
          {data.length} events · {anomalies} flagged
        </span>
      </header>

      <Panel className="rv-pad">
        {loading ? (
          <div className="skerows">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="rv-shimmer" />
            ))}
          </div>
        ) : error ? (
          <div className="rv-empty" role="alert">
            <span className="serif">Could not load the audit log.</span>
            <span className="label">{error.message}</span>
            <Button variant="quiet" size="sm" onClick={refetch}>Try again</Button>
          </div>
        ) : data.length === 0 ? (
          <div className="rv-empty">
            <span className="serif">No events recorded yet.</span>
            <span className="label">State changes stream into the log as they happen.</span>
          </div>
        ) : (
          <div className="timeline">
            {data.map((e) => (
              <div className="tevent" key={e._id}>
                <span className="tevent__dot" data-sev={e.severity || 'info'} />
                <div className="tevent__body">
                  <div className="tevent__top">
                    <span className="tevent__type">{humanize(e.event_type)}</span>
                    {e.record_label && <span className="tevent__meta">{e.record_label}</span>}
                    {(e.is_out_of_order || e.is_late) && (
                      <div className="tevent__flags">
                        {e.is_out_of_order && <StatusTag tone="warn" label="Out of order" />}
                        {e.is_late && <StatusTag tone="warn" label="Late" />}
                      </div>
                    )}
                  </div>
                  {e.details && <span className="tevent__details">{e.details}</span>}
                  {e.actor && <span className="tevent__meta">by {e.actor}</span>}
                </div>
                <span className="tevent__when">{fmtWhen(e.event_date || e.recorded_date)}</span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
