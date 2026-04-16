import React, { useState, useEffect } from 'react';
import legalDocumentService from '../services/legalDocument.service';
import contractService from '../services/contract.service';
import '../styles/LegalDocuments.css';

const LegalDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [formData, setFormData] = useState({
    contractId: '',
    title: '',
    type: 'agreement',
    status: 'draft',
    expiryDate: '',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [docsData, contractsData] = await Promise.all([
        legalDocumentService.getAll(),
        contractService.getAll(),
      ]);
      setDocuments(docsData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (doc = null) => {
    if (doc) {
      setEditingDoc(doc);
      setFormData({
        contractId: doc.contractId?._id || doc.contractId,
        title: doc.title,
        type: doc.type,
        status: doc.status,
        expiryDate: doc.expiryDate?.split('T')[0] || '',
        notes: doc.notes || '',
      });
    } else {
      setEditingDoc(null);
      setFormData({
        contractId: contracts[0]?._id || '',
        title: '',
        type: 'agreement',
        status: 'draft',
        expiryDate: '',
        notes: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDoc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
      };
      
      if (editingDoc) {
        await legalDocumentService.update(editingDoc._id, payload);
      } else {
        await legalDocumentService.create(payload);
      }
      loadData();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save document');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await legalDocumentService.delete(id);
        loadData();
      } catch (err) {
        setError('Failed to delete document');
      }
    }
  };

  if (loading) return <div className="loading">Loading documents...</div>;

  return (
    <div className="legal-documents-page">
      <div className="page-header">
        <h1>Legal Documents</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Add Document
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Contract</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.title}</td>
                <td>
                  <span className={`badge badge-${doc.type}`}>{doc.type}</span>
                </td>
                <td>{doc.contractId?.title || 'N/A'}</td>
                <td>
                  <span className={`badge badge-${doc.status}`}>{doc.status}</span>
                </td>
                <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                <td>{doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'N/A'}</td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleOpenModal(doc)}>
                    Edit
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(doc._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingDoc ? 'Edit Document' : 'Add Document'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Contract</label>
                <select
                  value={formData.contractId}
                  onChange={(e) => setFormData({ ...formData, contractId: e.target.value })}
                  required
                >
                  <option value="">Select Contract</option>
                  {contracts.map((contract) => (
                    <option key={contract._id} value={contract._id}>
                      {contract.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Document Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Revenue Share Agreement"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Document Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="agreement">Agreement</option>
                    <option value="amendment">Amendment</option>
                    <option value="addendum">Addendum</option>
                    <option value="nda">NDA</option>
                    <option value="termination">Termination</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="pending-review">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="signed">Signed</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                  placeholder="Additional notes or comments..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingDoc ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocuments;
