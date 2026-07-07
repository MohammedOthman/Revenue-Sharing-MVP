import {
  createKPI, findKPIById, getAllKPIs,
  updateKPI, deleteKPI, getKPIStats,
} from '../models/kpi.model.js';
import { toSnakeCaseKeys } from '../utils/normalize.js';

export const createKPIController = async (req, res) => {
  try {
    const { contractId, name, description, targetValue, actualValue, unit, periodType, status } = req.body;

    const kpi = await createKPI({ contractId, name, description, targetValue, actualValue, unit, periodType, status });
    res.status(201).json({ message: 'KPI created successfully', kpi });
  } catch (error) {
    console.error('Create KPI error:', error);
    res.status(500).json({ error: 'Failed to create KPI' });
  }
};

export const getAllKPIsController = async (req, res) => {
  try {
    const { status, contractId } = req.query;
    const kpis = await getAllKPIs({ status, contractId });
    res.json({ kpis });
  } catch (error) {
    console.error('Get all KPIs error:', error);
    res.status(500).json({ error: 'Failed to get KPIs' });
  }
};

export const getKPIsByContractController = async (req, res) => {
  try {
    const kpis = await getAllKPIs({ contractId: req.params.contractId });
    res.json({ kpis });
  } catch (error) {
    console.error('Get KPIs by contract error:', error);
    res.status(500).json({ error: 'Failed to get KPIs' });
  }
};

export const getKPIController = async (req, res) => {
  try {
    const { id } = req.params;
    const kpi = await findKPIById(id);

    if (!kpi) {
      return res.status(404).json({ error: 'KPI not found' });
    }

    res.json({ kpi });
  } catch (error) {
    console.error('Get KPI error:', error);
    res.status(500).json({ error: 'Failed to get KPI' });
  }
};

export const updateKPIController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = toSnakeCaseKeys(req.body);

    const kpi = await updateKPI(id, updates);
    if (!kpi) {
      return res.status(404).json({ error: 'KPI not found or no updates provided' });
    }

    res.json({ message: 'KPI updated successfully', kpi });
  } catch (error) {
    console.error('Update KPI error:', error);
    res.status(500).json({ error: 'Failed to update KPI' });
  }
};

export const updateKPIValueController = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const kpi = await updateKPI(id, { actual_value: value });
    if (!kpi) {
      return res.status(404).json({ error: 'KPI not found' });
    }

    res.json({ message: 'KPI value updated successfully', kpi });
  } catch (error) {
    console.error('Update KPI value error:', error);
    res.status(500).json({ error: 'Failed to update KPI value' });
  }
};

export const deleteKPIController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteKPI(id);
    res.json({ message: 'KPI deleted successfully' });
  } catch (error) {
    console.error('Delete KPI error:', error);
    res.status(500).json({ error: 'Failed to delete KPI' });
  }
};

export const getKPIStatsController = async (req, res) => {
  try {
    const stats = await getKPIStats();
    res.json({ stats });
  } catch (error) {
    console.error('Get KPI stats error:', error);
    res.status(500).json({ error: 'Failed to get KPI stats' });
  }
};
