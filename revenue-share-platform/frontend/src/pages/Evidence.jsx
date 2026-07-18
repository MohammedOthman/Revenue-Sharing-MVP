import React, { useState, useEffect } from 'react';
import evidenceService from '../services/evidence.service';
import claimService from '../services/claim.service';
import amendmentService from '../services/amendment.service';
import '../styles/Domain.css';

const ITEM_TYPES = ['document_link', 'email', 'screenshot', 'note', 'calculation', 'contract_reference'];

const emptyPack = { title: '', description: '', claimId: '' };
const emptyItem = { name: '', type: 'document_link', description: '', fileUrl: '', claimId: '', amendmentId: '', packId: '' };

const Evidence = () => {
  const [packs, setPacks] = useState([]);
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [amendments, setAmendments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [packModal, setPackModal] = useState(false);
  const [packForm, setPackForm] = useState(emptyPack);
  const [itemModal, setItemModal] = useState(false);
  const [itemForm, setItemForm] = useState(emptyItem);
  const [viewing, setViewing] = useState(null); // pack detail (with items)
  const [addForm, setAddForm] = useState({ name: '', type: 'document_link', fileUrl: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [packsData, itemsData, claimsData, amendmentsData] = await Promise.all([
        evidenceService.getPacks(),
        evidenceService.getItems(),
        claimService.getAll(),
        amendmentService.getAll(),
      ]);
      setPacks(packsData);
      setItems(itemsData);
      setClaims(claimsData);
      setAmendments(amendmentsData);
    } catch (err) {
      setError('Failed to load evidence');
    } finally {
      setLoading(false);
    }
  };

  const act = async (fn, ...args) => {
    try { await fn(...args); await loadData(); return true; }
    catch (err) { setError(err.response?.data?.error || 'Action failed'); return false; }
  };

  // --- packs ---
  const submitPack = async (e) => {
    e.preventDefault();
    if (await act(evidenceService.createPack, packForm)) { setPackModal(false); setPackForm(emptyPack); }
  };

  const openPack = async (pack) => {
    setError('');
    try { setViewing(await evidenceService.getPack(pack.id)); }
    catch { setError('Failed to open pack'); }
  };

  const submitAddItem = async (e) => {
    e.preventDefault();
    try {
      await evidenceService.addItemToPack(viewing.id, addForm);
      setAddForm({ name: '', type: 'document_link', fileUrl: '' });
      setViewing(await evidenceService.getPack(viewing.id));
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add item');
    }
  };

  const finalize = async (pack) => {
    if (!window.confirm('Finalize this pack? It becomes read-only.')) return;
    if (await act(evidenceService.finalizePack, pack.id) && viewing?.id === pack.id) {
      setViewing(await evidenceService.getPack(pack.id));
    }
  };

  // --- items ---
  const submitItem = async (e) => {
    e.preventDefault();
    const payload = { ...itemForm };
    ['claimId', 'amendmentId', 'packId'].forEach((k) => { if (!payload[k]) delete payload[k]; });
    if (await act(evidenceService.createItem, payload)) { setItemModal(false); setItemForm(emptyItem); }
  };

  const setItem = (patch) => setItemForm((prev) => ({ ...prev, ...patch }));

  if (loading) return <div className="loading">Loading evidence...</div>;

  return (
    <div className="evidence-page domain-page">
      <div className="page-header">
        <h1>Evidence</h1>
        <div className="actions">
          <button className="btn-secondary" onClick={() => { setError(''); setItemForm(emptyItem); setItemModal(true); }}>+ New Item</button>
          <button className="btn-primary" onClick={() => { setError(''); setPackForm(emptyPack); setPackModal(true); }}>+ New Pack</button>
        </div>
      </div>
      <p className="hint">Evidence items are reference records (a link, an email, a note) — no files are stored. A pack bundles them for finance/legal; finalizing locks it.</p>

      {error && <div className="error-message">{error}</div>}

      <div className="section-subhead"><h2>Evidence Packs</h2></div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Claim</th><th>Items</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {packs.length === 0 && <tr><td colSpan="5" className="empty-row">No evidence packs yet.</td></tr>}
            {packs.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.claim_id || '—'}</td>
                <td className="amount">{p.item_count ?? 0}</td>
                <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => openPack(p)}>View</button>
                  {p.status === 'draft' && <button className="btn-sm btn-success" onClick={() => finalize(p)}>Finalize</button>}
                  {p.status === 'draft' && <button className="btn-sm btn-danger" onClick={() => { if (window.confirm('Delete this pack?')) act(evidenceService.deletePack, p.id); }}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-subhead"><h2>Evidence Items</h2></div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Type</th><th>Claim</th><th>Amendment</th><th>Pack</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan="6" className="empty-row">No evidence items yet.</td></tr>}
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.file_url ? <a href={it.file_url} target="_blank" rel="noreferrer">{it.name}</a> : it.name}</td>
                <td>{it.type || '—'}</td>
                <td>{it.claim_id || '—'}</td>
                <td>{it.amendment_id || '—'}</td>
                <td>{it.pack_title || (it.pack_id ? `#${it.pack_id}` : '—')}</td>
                <td className="actions">
                  {it.pack_status !== 'finalized'
                    ? <button className="btn-sm btn-danger" onClick={() => { if (window.confirm('Delete this item?')) act(evidenceService.deleteItem, it.id); }}>Delete</button>
                    : <span className="muted">locked</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {packModal && (
        <div className="modal-overlay" onClick={() => setPackModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New Evidence Pack</h2>
            <form onSubmit={submitPack}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={packForm.title} onChange={(e) => setPackForm({ ...packForm, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Claim (optional)</label>
                <select value={packForm.claimId} onChange={(e) => setPackForm({ ...packForm, claimId: e.target.value })}>
                  <option value="">None</option>
                  {claims.map((c) => <option key={c.id} value={c.id}>#{c.id} — {c.partner_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={packForm.description} onChange={(e) => setPackForm({ ...packForm, description: e.target.value })} rows="2" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setPackModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemModal && (
        <div className="modal-overlay" onClick={() => setItemModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>New Evidence Item</h2>
            <form onSubmit={submitItem}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={itemForm.name} onChange={(e) => setItem({ name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select value={itemForm.type} onChange={(e) => setItem({ type: e.target.value })}>
                    {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Reference URL (optional — a link, not an upload)</label>
                <input type="url" value={itemForm.fileUrl} onChange={(e) => setItem({ fileUrl: e.target.value })} placeholder="https://…" />
              </div>
              <p className="hint">Attach to at least one of a claim, an amendment, or a pack.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Claim</label>
                  <select value={itemForm.claimId} onChange={(e) => setItem({ claimId: e.target.value })}>
                    <option value="">None</option>
                    {claims.map((c) => <option key={c.id} value={c.id}>#{c.id} — {c.partner_name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Amendment</label>
                  <select value={itemForm.amendmentId} onChange={(e) => setItem({ amendmentId: e.target.value })}>
                    <option value="">None</option>
                    {amendments.map((a) => <option key={a.id} value={a.id}>#{a.id} — {a.contract_title || a.article_reference}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Pack</label>
                  <select value={itemForm.packId} onChange={(e) => setItem({ packId: e.target.value })}>
                    <option value="">None</option>
                    {packs.filter((p) => p.status === 'draft').map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={itemForm.description} onChange={(e) => setItem({ description: e.target.value })} rows="2" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setItemModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewing && (
        <div className="modal-overlay" onClick={() => setViewing(null)}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
            <h2>{viewing.title} <span className={`badge badge-${viewing.status}`}>{viewing.status}</span></h2>
            {viewing.description && <p className="muted">{viewing.description}</p>}
            <h3>Items ({viewing.items?.length || 0})</h3>
            {viewing.items?.length ? (
              <ul className="pack-items">
                {viewing.items.map((it) => (
                  <li key={it.id}>{it.name}{it.type ? ` · ${it.type}` : ''}{it.file_url ? ' · linked' : ''}</li>
                ))}
              </ul>
            ) : <p className="muted">No items in this pack yet.</p>}

            {viewing.status === 'draft' && (
              <form onSubmit={submitAddItem} className="add-item-form">
                <div className="section-subhead"><h2>Add an item</h2></div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select value={addForm.type} onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}>
                      {ITEM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Reference URL (optional)</label>
                  <input type="url" value={addForm.fileUrl} onChange={(e) => setAddForm({ ...addForm, fileUrl: e.target.value })} placeholder="https://…" />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">Add to pack</button>
                </div>
              </form>
            )}

            <div className="modal-actions">
              {viewing.status === 'draft' && <button className="btn-success" onClick={() => finalize(viewing)}>Finalize pack</button>}
              <button className="btn-secondary" onClick={() => setViewing(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evidence;
