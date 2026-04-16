import { 
  createPartner, findPartnerById, getAllPartners, 
  updatePartner, deletePartner, getPartnerStats 
} from '../models/partner.model.js';

export const createPartnerController = async (req, res) => {
  try {
    const { name, email, company, type, contactPerson, phone, address, notes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const partner = await createPartner({ name, email, company, type, contactPerson, phone, address, notes });
    res.status(201).json({ message: 'Partner created successfully', partner });
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).json({ error: 'Failed to create partner' });
  }
};

export const getAllPartnersController = async (req, res) => {
  try {
    const { status, type } = req.query;
    const partners = await getAllPartners({ status, type });
    res.json({ partners });
  } catch (error) {
    console.error('Get all partners error:', error);
    res.status(500).json({ error: 'Failed to get partners' });
  }
};

export const getPartnerController = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await findPartnerById(id);
    
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    
    res.json({ partner });
  } catch (error) {
    console.error('Get partner error:', error);
    res.status(500).json({ error: 'Failed to get partner' });
  }
};

export const updatePartnerController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const partner = await updatePartner(id, updates);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found or no updates provided' });
    }

    res.json({ message: 'Partner updated successfully', partner });
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).json({ error: 'Failed to update partner' });
  }
};

export const deletePartnerController = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePartner(id);
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).json({ error: 'Failed to delete partner' });
  }
};

export const getPartnerStatsController = async (req, res) => {
  try {
    const stats = await getPartnerStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get partner stats error:', error);
    res.status(500).json({ error: 'Failed to get partner stats' });
  }
};
