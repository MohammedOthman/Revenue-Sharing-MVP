import React, { useState, useEffect } from 'react';
import legalDocumentService from '../services/legalDocument.service';
import contractService from '../services/contract.service';
import '../styles/LegalDocuments.css';

const emptyForm = {
  contractId: '',
  documentName: '',
  documentType: 'agreement',
  version: '1.0',
  fileUrl: '',
  status: 'draft',
};

const LegalDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

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
        contractId: doc.contract_id || '',
        documentName: doc.document_name || '',
        documentType: doc.document_type || 'agreement',
        version: doc.version || '1.0',
        fileUrl: doc.file_url || '',
        status: doc.status || 'draft',
      });
    } else {
      setEditingDoc(null);
      setFormData({ ...emptyForm, contractId: contracts[0]?.id || '' });
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
      if (editingDoc) {
        await legalDocumentService.update(editingDoc.id, formData);
      } else {
        await legalDocumentService.create(formData);
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

  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : '—');

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
              <th>Document</th>
              <th>Type</th>
              <th>Contract</th>
              <th>Version</th>
              <th>Status</th>
              <th>Link</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.document_name}</td>
                <td>
                  <span className={`badge badge-${doc.document_type}`}>{doc.document_type}</span>
                </td>
                <td>{doc.contract_title || 'N/A'}</td>
                <td>{doc.version || '—'}</td>
                <td>
                  <span className={`badge badge-${doc.status}`}>{doc.status}</span>
                </td>
                <td>
                  {doc.file_url ? (
                    <a href={doc.file_url} target="_blank" rel="noreferrer">View</a>
                  ) : (
                    '—'
                  )}
                </td>
                <td>{formatDate(doc.created_at)}</td>
                <td className="actions">
                  <button className="btn-sm" onClick={() => handleOpenModal(doc)}>
                    Edit
                  </button>
                  <button className="btn-sm btn-danger" onClick={() => handleDelete(doc.id)}>
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
                  disabled={!!editingDoc}
                >
                  <option value="">Select Contract</option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  value={formData.documentName}
                  onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
                  placeholder="e.g., Revenue Share Agreement"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Document Type</label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
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
                  <label>Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="e.g., 1.0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Document Link (URL)</label>
                <input
                  type="text"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://… (metadata reference — no upload in Phase 1)"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="signed">Signed</option>
                  <option value="expired">Expired</option>
                </select>
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
