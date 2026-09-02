import { useEffect, useState } from 'react';
import { normalizeList } from '../services/normalize';

/**
 * Load a Reven API entity collection with loading/error state. Data is always an
 * array. Returns `refetch()` to reload after a write, and accepts `reloadKey`
 * so a parent can trigger a reload by changing it.
 */
export function useCollection(entity, { sort = '-created_date', limit = 200, reloadKey = 0 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

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
  }, [entity, sort, limit, reloadKey, nonce]);

  return { data, loading, error, refetch: () => setNonce((n) => n + 1) };
}
