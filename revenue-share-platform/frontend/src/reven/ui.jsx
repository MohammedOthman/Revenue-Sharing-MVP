import React from 'react';

export const Icon = ({ name, size }) => (
  <span className="msym" style={size ? { fontSize: size } : undefined}>{name}</span>
);

export const label = (v) =>
  (v == null || v === '' ? '—' : String(v).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));

export const Money = ({ amount, currency = 'SAR' }) =>
  amount == null ? (
    <span className="muted">—</span>
  ) : (
    <>{currency} {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
  );

// Map a status value to a chip tone (green good / amber pending / red bad).
const TONE = {
  eligible: 'green', accepted: 'green', partial: 'green', closed_won: 'green', decided: 'green',
  active: 'green', pass: 'green', recognized: 'green', collected: 'green', invoiced: 'green',
  not_eligible: 'amber', finance_review_required: 'amber', preflight_review: 'amber',
  duplicate_risk: 'amber', protection_conflict: 'amber', agreement_gap: 'amber',
  missing_evidence: 'amber', needs_info: 'amber', in_attribution: 'amber', submitted: 'amber',
  rejected: 'red', duplicate: 'red', expired: 'red',
};
export const StatusChip = ({ value }) => {
  if (!value || ['none', 'not_started', 'not_evaluated', 'draft'].includes(value))
    return <span className="chip grey">{label(value)}</span>;
  return <span className={`chip ${TONE[value] || ''}`}>{label(value)}</span>;
};

export const Field = ({ label: lbl, children }) => (
  <div className="field"><label>{lbl}</label>{children}</div>
);

export const Modal = ({ title, onClose, children, footer }) => (
  <div className="overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-head">{title}</div>
      <div className="modal-body">{children}</div>
      {footer && <div className="modal-foot">{footer}</div>}
    </div>
  </div>
);
