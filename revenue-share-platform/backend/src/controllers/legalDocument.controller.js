import { 
  createLegalDocument, findLegalDocumentById, getAllLegalDocuments, 
  updateLegalDocument, deleteLegalDocument, getLegalDocumentStats 
} from '../models/legalDocument.model.js';

export const createLegalDocumentController = async (req, res) => {
  try {
    const { contractId, documentType, documentName, filePath, fileUrl, version } = req.body;

    if (!contractId || !documentType || !documentName) {
      return res.status(400).json({ error: 'Contract ID, document type, and document name are required' });
    }

    const document = await createLegalDocument({ 
      contractId, documentType, documentName, filePath, fileUrl, version, 
      uploadedBy: req.user.id 
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
    const updates = req.body;

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
