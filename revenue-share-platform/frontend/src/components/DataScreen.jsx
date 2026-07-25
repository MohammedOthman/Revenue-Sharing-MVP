import { useMemo, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { Panel, Kicker } from './ui/kit';

/**
 * A config-driven list surface: header, optional stat strip, filter chips, a
 * table, and graceful loading/empty states. Screens supply columns + filters.
 */
export default function DataScreen({
  kicker,
  title,
  titleAccent,
  sub,
  entity,
  sort,
  filters = [],
  columns,
  stats,
  rowKey = (r) => r._id,
  onRowClick,
  minWidth = 760,
}) {
  const { data, loading } = useCollection(entity, sort ? { sort } : undefined);
  const [active, setActive] = useState(filters[0]?.key || 'all');

  const counts = useMemo(() => {
    const c = {};
    filters.forEach((f) => {
      c[f.key] = data.filter(f.test).length;
    });
    return c;
  }, [data, filters]);

  const rows = useMemo(() => {
    const f = filters.find((x) => x.key === active);
    return f ? data.filter(f.test) : data;
  }, [data, active, filters]);

  const statList = stats ? stats(data) : null;

  return (
    <div className="screen">
      <header className="screen__head">
        <div>
          <Kicker>{kicker}</Kicker>
          <h1 className="screen__title serif">
            {title}
            {titleAccent ? (
              <>
                {' '}
                <em>{titleAccent}</em>
              </>
            ) : null}
          </h1>
          {sub && <p className="screen__sub">{sub}</p>}
        </div>
        <span className="screen__count">{data.length} total</span>
      </header>

      {statList && (
        <div className="stagestrip">
          {statList.map((s) => (
            <div className="stagechip" key={s.label}>
              <span className="stagechip__n">{s.value}</span>
              <span className="stagechip__label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {filters.length > 0 && (
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className="chip"
              data-active={active === f.key}
              onClick={() => setActive(f.key)}
            >
              {f.label}
              <span className="chip__n">{counts[f.key]}</span>
            </button>
          ))}
        </div>
      )}

      <Panel className="tablewrap">
        {loading ? (
          <div className="skerows rv-pad">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="rv-shimmer" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="rv-empty">
            <span className="serif">Nothing here yet.</span>
            <span className="label">Records appear as they're created in Base44.</span>
          </div>
        ) : (
          <table className="rv-table" style={{ minWidth }}>
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={i}>{c.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={onRowClick ? 'rowlink' : undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((c, i) => (
                    <td key={i}>{c.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}

/* Small shared cell helpers for config screens. */
export function NameCell({ name, sub }) {
  return (
    <div className="cellstack">
      <span className="cellname">{name || '—'}</span>
      {sub != null && <span className="cellsub">{sub}</span>}
    </div>
  );
}
