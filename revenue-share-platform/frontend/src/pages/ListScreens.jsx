import { useState } from 'react';
import DataScreen, { NameCell } from '../components/DataScreen';
import {
  PartnerProgram,
  Agreement,
  PartnerStatement,
  Dispute,
  EcosystemTouchpoint,
} from '../api/entities';
import { StatusTag, Money, Button, humanize } from '../components/ui/kit';
import {
  AgreementForm,
  ProgramForm,
  StatementForm,
  DisputeForm,
  TouchpointForm,
} from '../components/RecordForms';
import { useAuth } from '../context/AuthContext';
import { Select } from '../components/ui/form';

const mono = (v) => <span className="mono tnum">{v ?? 0}</span>;
const dash = (v) => (v == null || v === '' ? '—' : v);
const asText = (v) => (v ? humanize(v) : '—');

function StatusEditor({ record, entity, options, canWrite, onUpdated }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (!canWrite) return <StatusTag status={record.status} />;

  const change = async (event) => {
    setBusy(true);
    setError('');
    try {
      await entity.update(record._id, { status: event.target.value }, record.version);
      onUpdated?.();
    } catch (caught) {
      setError(caught?.message || 'Could not update status.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cellstack">
      <Select
        aria-label={`Status for ${record.name || record.partner_name || 'record'}`}
        options={options}
        value={record.status || options[0]}
        disabled={busy}
        onChange={change}
      />
      {error && <span className="cellsub" role="alert">{error}</span>}
    </div>
  );
}

/* ----------------------------------------------------------------- Programs */
export function Programs() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const filters = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'active', label: 'Active', test: (p) => p.status === 'active' },
    { key: 'draft', label: 'Draft', test: (p) => p.status === 'draft' },
    { key: 'paused', label: 'Paused', test: (p) => p.status === 'paused' },
  ];
  const columns = [
    { header: 'Program', render: (p) => <NameCell name={p.name} sub={asText(p.program_type)} /> },
    { header: 'Model', render: (p) => asText(p.commercial_model) },
    { header: 'Attribution', render: (p) => asText(p.attribution_model) },
    { header: 'Partners', render: (p) => mono(p.active_partners) },
    { header: 'Revenue', render: (p) => <Money amount={p.total_revenue} compact /> },
    {
      header: 'Status',
      render: (p) => (
        <StatusEditor
          record={p}
          entity={PartnerProgram}
          options={['draft', 'active', 'paused']}
          canWrite={canWrite}
          onUpdated={() => setReload((value) => value + 1)}
        />
      ),
    },
  ];
  return (
    <>
      <DataScreen
        kicker="Capture · Programs"
        title="Partner"
        titleAccent="programs"
        sub="The programs partner economics run inside — objective, commercial model, attribution model and review cadence."
        entity={PartnerProgram}
        filters={filters}
        columns={columns}
        minWidth={820}
        reloadKey={reload}
        headerAction={canWrite ? (
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            New program
          </Button>
        ) : null}
      />
      {canWrite && (
        <ProgramForm
          open={showForm}
          onClose={() => setShowForm(false)}
          onCreated={() => setReload((value) => value + 1)}
        />
      )}
    </>
  );
}

/* --------------------------------------------------------------- Agreements */
export function Agreements() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const rate = (a) => {
    const r = a.revenue_share_rate ?? a.commission_rate;
    return r != null ? `${r}%` : '—';
  };
  const filters = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'active', label: 'Active', test: (a) => a.status === 'active' },
    { key: 'pending', label: 'Pending approval', test: (a) => a.status === 'pending_approval' },
    { key: 'expired', label: 'Expired', test: (a) => a.status === 'expired' },
  ];
  const columns = [
    { header: 'Partner', render: (a) => <NameCell name={a.partner_name} sub={asText(a.agreement_type)} /> },
    { header: 'Share', render: (a) => <span className="mono">{rate(a)}</span> },
    { header: 'Trigger', render: (a) => asText(a.payout_trigger) },
    { header: 'Protection', render: (a) => (a.protection_window_days ? `${a.protection_window_days}d` : '—') },
    { header: 'Currency', render: (a) => <span className="mono">{a.currency || 'USD'}</span> },
    { header: 'Expiry', render: (a) => <span className="mono">{dash(a.expiry_date)}</span> },
    {
      header: 'Status',
      render: (a) => (
        <StatusEditor
          record={a}
          entity={Agreement}
          options={['draft', 'pending_approval', 'active', 'expired', 'terminated']}
          canWrite={canWrite}
          onUpdated={() => setReload((value) => value + 1)}
        />
      ),
    },
  ];
  return (
    <>
      <DataScreen
        kicker="Capture · Agreements"
        title="Agreements &"
        titleAccent="rules"
        sub="Terms turned into executable, versioned rules — rates, triggers, protection windows, caps and clawback conditions."
        entity={Agreement}
        filters={filters}
        columns={columns}
        minWidth={880}
        reloadKey={reload}
        headerAction={canWrite ? (
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            New agreement
          </Button>
        ) : null}
      />
      {canWrite && (
        <AgreementForm
          open={showForm}
          onClose={() => setShowForm(false)}
          onCreated={() => setReload((r) => r + 1)}
        />
      )}
    </>
  );
}

/* --------------------------------------------------------------- Statements */
export function Statements() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const filters = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'draft', label: 'Draft', test: (s) => s.status === 'draft' },
    { key: 'issued', label: 'Issued', test: (s) => s.status === 'issued' },
    { key: 'acknowledged', label: 'Acknowledged', test: (s) => s.status === 'acknowledged' },
    { key: 'finalized', label: 'Finalized', test: (s) => s.status === 'finalized' },
  ];
  const ccy = (s) => s.currency || 'USD';
  const columns = [
    { header: 'Partner', render: (s) => <NameCell name={s.partner_name} sub={s.statement_period} /> },
    { header: 'Eligible', render: (s) => <Money amount={s.pending_payout} compact brass currency={ccy(s)} /> },
    { header: 'Approved', render: (s) => <Money amount={s.approved_payout} compact currency={ccy(s)} /> },
    { header: 'Paid', render: (s) => <Money amount={s.paid_payout} compact currency={ccy(s)} /> },
    { header: 'Disputes', render: (s) => mono(s.open_disputes) },
    {
      header: 'Finance',
      render: (s) => (
        <StatusTag
          status={s.finance_approved ? 'approved' : 'pending'}
          label={s.finance_approved ? 'Approved' : 'Pending'}
        />
      ),
    },
    {
      header: 'Status',
      render: (s) => (
        <StatusEditor
          record={s}
          entity={PartnerStatement}
          options={['draft', 'issued', 'acknowledged', 'finalized']}
          canWrite={canWrite}
          onUpdated={() => setReload((value) => value + 1)}
        />
      ),
    },
  ];
  return (
    <>
      <DataScreen
        kicker="Settle · Statements"
        title="Partner"
        titleAccent="statements"
        sub="Per-partner statements — accepted claims, eligible and paid payout, adjustments and open disputes, finance-reviewable."
        entity={PartnerStatement}
        filters={filters}
        columns={columns}
        minWidth={900}
        reloadKey={reload}
        headerAction={canWrite ? (
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            New statement
          </Button>
        ) : null}
      />
      {canWrite && (
        <StatementForm
          open={showForm}
          onClose={() => setShowForm(false)}
          onCreated={() => setReload((value) => value + 1)}
        />
      )}
    </>
  );
}

/* ----------------------------------------------------------------- Disputes */
export function Disputes() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const filters = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'open', label: 'Open', test: (d) => d.status === 'open' },
    { key: 'review', label: 'Under review', test: (d) => d.status === 'under_review' },
    { key: 'escalated', label: 'Escalated', test: (d) => d.status === 'escalated' },
    { key: 'resolved', label: 'Resolved', test: (d) => /resolved|closed/.test(d.status || '') },
  ];
  const columns = [
    { header: 'Partner', render: (d) => <NameCell name={d.partner_name} sub={asText(d.dispute_type)} /> },
    { header: 'Contests', render: (d) => asText(d.disputed_object) },
    { header: 'Priority', render: (d) => <StatusTag status={d.priority} label={humanize(d.priority || 'medium')} /> },
    { header: 'SLA due', render: (d) => <span className="mono">{dash(d.sla_due_date)}</span> },
    {
      header: 'Status',
      render: (d) => (
        <StatusEditor
          record={d}
          entity={Dispute}
          options={['open', 'under_review', 'escalated', 'resolved', 'closed']}
          canWrite={canWrite}
          onUpdated={() => setReload((value) => value + 1)}
        />
      ),
    },
  ];
  return (
    <>
      <DataScreen
        kicker="Attribute · Disputes"
        title="Disputes"
        sub="Contested attribution, payout and protection — routed, tracked to an SLA, and resolved with a rationale."
        entity={Dispute}
        filters={filters}
        columns={columns}
        minWidth={780}
        reloadKey={reload}
        headerAction={canWrite ? (
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            Open dispute
          </Button>
        ) : null}
      />
      {canWrite && (
        <DisputeForm
          open={showForm}
          onClose={() => setShowForm(false)}
          onCreated={() => setReload((value) => value + 1)}
        />
      )}
    </>
  );
}

/* -------------------------------------------------------------- Attribution */
export function Attribution() {
  const { user } = useAuth();
  const canWrite = ['admin', 'operator'].includes(user?.role);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(0);
  const filters = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'captured', label: 'Captured', test: (t) => t.status === 'captured' },
    { key: 'review', label: 'Review needed', test: (t) => t.status === 'review_needed' },
    { key: 'linked', label: 'Linked', test: (t) => t.status === 'linked_to_claim' },
    { key: 'strategic', label: 'Strategic', test: (t) => t.status === 'strategic_influence' },
  ];
  const columns = [
    { header: 'Partner', render: (t) => <NameCell name={t.partner_name} sub={t.customer_account} /> },
    { header: 'Touchpoint', render: (t) => asText(t.touchpoint_type) },
    { header: 'Journey', render: (t) => asText(t.journey_stage) },
    { header: 'Category', render: (t) => asText(t.contribution_category) },
    { header: 'Confidence', render: (t) => <StatusTag status={t.matching_confidence} label={humanize(t.matching_confidence || 'medium')} /> },
    {
      header: 'Status',
      render: (t) => (
        <StatusEditor
          record={t}
          entity={EcosystemTouchpoint}
          options={['captured', 'review_needed', 'linked_to_claim', 'strategic_influence']}
          canWrite={canWrite}
          onUpdated={() => setReload((value) => value + 1)}
        />
      ),
    },
  ];
  return (
    <>
      <DataScreen
        kicker="Attribute · Ecosystem"
        title="Attribution"
        titleAccent="hub"
        sub="The touchpoint graph behind the credit — contribution, journey stage, shadow influence and matching confidence."
        entity={EcosystemTouchpoint}
        filters={filters}
        columns={columns}
        minWidth={860}
        reloadKey={reload}
        headerAction={canWrite ? (
          <Button variant="primary" size="sm" arrow onClick={() => setShowForm(true)}>
            Capture touchpoint
          </Button>
        ) : null}
      />
      {canWrite && (
        <TouchpointForm
          open={showForm}
          onClose={() => setShowForm(false)}
          onCreated={() => setReload((value) => value + 1)}
        />
      )}
    </>
  );
}
