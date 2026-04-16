import { 
  createKPI, findKPIById, getAllKPIs, 
  updateKPI, deleteKPI, getKPIStats 
} from '../models/kpi.model.js';

export const createKPIController = async (req, res) => {
  try {
    const { contractId, name, description, targetValue, unit, periodType } = req.body;

    if (!contractId || !name || !targetValue) {
      return res.status(400).json({ error: 'Contract ID, name, and target value are required' });
    }

    const kpi = await createKPI({ contractId, name, description, targetValue, unit, periodType });
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
    const updates = req.body;

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
