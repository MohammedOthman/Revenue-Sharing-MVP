import { getAuditEvents } from '../models/audit.model.js';

export const getAuditEventsController = async (req, res) => {
  try {
    const { entityType, entityId, actorUserId } = req.query;
    const events = await getAuditEvents({ entityType, entityId, actorUserId });
    res.json({ events });
  } catch (error) {
    console.error('Get audit events error:', error);
    res.status(500).json({ error: 'Failed to get audit events' });
  }
};
