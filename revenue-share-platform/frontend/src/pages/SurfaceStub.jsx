import { motion } from 'motion/react';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker, StatusTag, humanize } from '../components/ui/kit';
import '../styles/Stub.css';

const labelOf = (r) =>
  r.partner_name ||
  r.legal_name ||
  r.trade_name ||
  r.name ||
  r.title ||
  r.record_label ||
  r.claim_label ||
  r.statement_period ||
  humanize(r.claim_type || r.event_type || r.agreement_type || r.dispute_type || '') ||
  r._id;

/**
 * A surface still being built. It is honest, not a dead prop: it reads the real
 * Base44 collection and shows the live count + most-recent records. Replaced by
 * the full screen in a later build pass.
 */
export default function SurfaceStub({ kicker, title, description, entity, statusField }) {
  const { data, loading } = useCollection(entity, { limit: 8 });

  return (
    <motion.div
      className="stub"
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="stub__head">
        <Kicker>{kicker}</Kicker>
        <h1 className="stub__title serif">{title}</h1>
        <p className="stub__desc">{description}</p>
      </header>

      <Panel className="rv-pad stub__panel">
        <div className="stub__meta">
          <div className="stub__count">
            <span className="stub__countnum mono">{loading ? '—' : data.length}</span>
            <span className="label">live records</span>
          </div>
          <span className="stub__wip label">Full surface in progress</span>
        </div>

        {!loading && data.length > 0 && (
          <ul className="stub__list">
            {data.map((r) => (
              <li className="stub__row" key={r._id}>
                <span className="stub__label">{labelOf(r)}</span>
                {statusField && r[statusField] && (
                  <StatusTag status={r[statusField]} />
                )}
              </li>
            ))}
          </ul>
        )}

        {!loading && data.length === 0 && (
          <div className="rv-empty">
            <span className="serif stub__empty">Nothing here yet.</span>
            <span className="label">Records created in Base44 will appear on this surface.</span>
          </div>
        )}
      </Panel>
    </motion.div>
  );
}
