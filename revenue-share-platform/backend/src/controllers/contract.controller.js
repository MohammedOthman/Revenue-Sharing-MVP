import {
  createContract, findContractById, getAllContracts,
  updateContract, deleteContract, getContractStats,
} from '../models/contract.model.js';
import { findPartnerById } from '../models/partner.model.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';

export const createContractController = async (req, res) => {
  try {
    const {
      partnerId, title, description, startDate, endDate,
      revenueSharePercentage, minimumPayout, paymentTerms, status,
    } = req.body;

    const partner = await findPartnerById(partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    const contract = await createContract({
      partnerId, title, description, startDate, endDate,
      revenueSharePercentage, minimumPayout, paymentTerms, status,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Contract created successfully', contract });
  } catch (error) {
    console.error('Create contract error:', error);
    res.status(500).json({ error: 'Failed to create contract' });
  }
};

export const getAllContractsController = async (req, res) => {
  try {
    const { status, partnerId } = req.query;
    const contracts = await getAllContracts({ status, partnerId });
    res.json({ contracts });
  } catch (error) {
    console.error('Get all contracts error:', error);
    res.status(500).json({ error: 'Failed to get contracts' });
  }
};

export const getContractsByPartnerController = async (req, res) => {
  try {
    const contracts = await getAllContracts({ partnerId: req.params.partnerId });
    res.json({ contracts });
  } catch (error) {
    console.error('Get contracts by partner error:', error);
    res.status(500).json({ error: 'Failed to get contracts' });
  }
};

export const getContractController = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await findContractById(id);

    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    res.json({ contract });
  } catch (error) {
    console.error('Get contract error:', error);
    res.status(500).json({ error: 'Failed to get contract' });
  }
};

export const updateContractController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = toSnakeCaseKeys(req.body);

    const contract = await updateContract(id, updates);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found or no updates provided' });
    }

    res.json({ message: 'Contract updated successfully', contract });
  } catch (error) {
    console.error('Update contract error:', error);
    res.status(500).json({ error: 'Failed to update contract' });
  }
};

export const deleteContractController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContract(id);
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Delete contract error:', error);
    res.status(500).json({ error: 'Failed to delete contract' });
  }
};

export const getContractStatsController = async (req, res) => {
  try {
    const stats = await getContractStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get contract stats error:', error);
    res.status(500).json({ error: 'Failed to get contract stats' });
  }
};
