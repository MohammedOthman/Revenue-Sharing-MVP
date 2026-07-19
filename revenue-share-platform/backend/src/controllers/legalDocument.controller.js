import {
  createLegalDocument, findLegalDocumentById, getAllLegalDocuments,
  updateLegalDocument, deleteLegalDocument, getLegalDocumentStats,
} from '../models/legalDocument.model.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';

export const createLegalDocumentController = async (req, res) => {
  try {
    // The web client sends {title, type}; API clients send {documentName, documentType}.
    const {
      contractId, filePath, fileUrl, version, expiryDate, notes, status,
    } = req.body;
    const documentName = req.body.documentName ?? req.body.title;
    const documentType = req.body.documentType ?? req.body.type ?? 'agreement';

    const document = await createLegalDocument({
      contractId, documentType, documentName, filePath, fileUrl, version,
      expiryDate, notes, status,
      uploadedBy: req.user.id,
    });

    res.status(201).json({ message: 'Legal document created successfully', document });
  } catch (error) {
    console.error('Create legal document error:', error);
    res.status(500).json({ error: 'Failed to create legal document' });
  }
};

export const getAllLegalDocumentsController = async (req, res) => {
  try {
    const { status, contractId, documentType } = req.query;
    const documents = await getAllLegalDocuments({ status, contractId, documentType });
    res.json({ documents });
  } catch (error) {
    console.error('Get all legal documents error:', error);
    res.status(500).json({ error: 'Failed to get legal documents' });
  }
};

export const getLegalDocumentsByContractController = async (req, res) => {
  try {
    const documents = await getAllLegalDocuments({ contractId: req.params.contractId });
    res.json({ documents });
  } catch (error) {
    console.error('Get legal documents by contract error:', error);
    res.status(500).json({ error: 'Failed to get legal documents' });
  }
};

export const getLegalDocumentController = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await findLegalDocumentById(id);

    if (!document) {
      return res.status(404).json({ error: 'Legal document not found' });
    }

    res.json({ document });
  } catch (error) {
    console.error('Get legal document error:', error);
    res.status(500).json({ error: 'Failed to get legal document' });
  }
};

export const updateLegalDocumentController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    // Map web-client aliases onto the real columns.
    if (body.title !== undefined && body.documentName === undefined) body.documentName = body.title;
    if (body.type !== undefined && body.documentType === undefined) body.documentType = body.type;
    delete body.title;
    delete body.type;
    const updates = toSnakeCaseKeys(body);

    const document = await updateLegalDocument(id, updates);
    if (!document) {
      return res.status(404).json({ error: 'Legal document not found or no updates provided' });
    }

    res.json({ message: 'Legal document updated successfully', document });
  } catch (error) {
    console.error('Update legal document error:', error);
    res.status(500).json({ error: 'Failed to update legal document' });
  }
};

export const deleteLegalDocumentController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteLegalDocument(id);
    res.json({ message: 'Legal document deleted successfully' });
  } catch (error) {
    console.error('Delete legal document error:', error);
    res.status(500).json({ error: 'Failed to delete legal document' });
  }
};

export const getLegalDocumentStatsController = async (req, res) => {
  try {
    const stats = await getLegalDocumentStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get legal document stats error:', error);
    res.status(500).json({ error: 'Failed to get legal document stats' });
  }
};
