import { useEffect, useState } from 'react';
import { normalizeList } from '../services/normalize';

/**
 * Load a Base44 entity collection with loading/error state. Data is always an
 * array (never undefined), so screens can render empty states without guards.
 */
export function useCollection(entity, { sort = '-created_date', limit = 200 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    (async () => {
      try {
        const rows = await entity.list(sort, limit);
        if (active) {
          setData(normalizeList(rows));
          setError(null);
        }
      } catch (e) {
        if (active) {
          setData([]);
          setError(e);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [entity, sort, limit]);

  return { data, loading, error };
}
