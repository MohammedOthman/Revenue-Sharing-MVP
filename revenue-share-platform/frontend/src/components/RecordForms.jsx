import { useState } from 'react';
import {
  PartnerClaim,
  Partner,
  Agreement,
  PartnerProgram,
  EcosystemTouchpoint,
  PartnerStatement,
  Dispute,
  Decision,
} from '../api/entities';
import {
  Modal,
  FormGrid,
  FormField,
  TextInput,
  NumberInput,
  DateInput,
  Textarea,
  Select,
  FormError,
} from './ui/form';
import { Button } from './ui/kit';

const CURRENCIES = ['USD', 'SAR', 'AED', 'EUR', 'GBP', 'KWD', 'QAR', 'BHD', 'OMR'];
const today = () => new Date().toISOString().slice(0, 10);

const CLAIM_TYPES = [
  'partner_sourced_lead',
  'partner_sourced_opportunity',
  'partner_influenced_opportunity',
  'co_sell_opportunity',
  'reseller_transaction',
  'distributor_transaction',
  'referral_claim',
  'implementation_contribution',
  'marketplace_claim',
  'renewal_influence',
  'expansion_influence',
  'strategic_alliance_influence',
];
const PARTNER_TYPES = [
  'source_referrer',
  'influencer',
  'co_seller',
  'reseller',
  'distributor',
  'implementation',
  'marketplace',
  'strategic_alliance',
  'affiliate',
  'white_label',
  'franchise',
  'service_delivery',
  'technology_integration',
  'advisory_consultant',
  'ecosystem_platform',
];
const SOURCES = [
  'founder_executive',
  'sales_introduction',
  'inbound_application',
  'event_conference',
  'customer_referral',
  'ecosystem_mapping',
  'agency_consultant',
  'reseller_distributor',
  'marketplace',
  'system_integrator',
  'bank_financial',
  'government_institutional',
  'regional_strategic',
];
const LIFECYCLE = ['intake', 'qualifying', 'approved', 'onboarding', 'active', 'at_risk', 'dormant'];
const TIERS = ['tier_1', 'tier_2', 'tier_3', 'strategic'];
const AGREEMENT_TYPES = [
  'referral_agreement',
  'reseller_agreement',
  'distribution_agreement',
  'co_sell_agreement',
  'implementation_agreement',
  'strategic_alliance',
  'affiliate_agreement',
  'marketplace_agreement',
  'nda',
  'custom',
];
const TRIGGERS = ['closed_won', 'invoiced', 'collected', 'recognized', 'net_revenue'];

function FormFooter({ onClose, saving, label }) {
  return (
    <>
      <Button variant="quiet" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={label.submit} disabled={saving}>
        {saving ? label.saving : label.idle}
      </Button>
    </>
  );
}

/* --------------------------------------------------------------- ClaimForm */
export function ClaimForm({ open, onClose, onCreated }) {
  const blank = {
    claim_type: 'partner_sourced_opportunity',
    partner_name: '',
    customer_account: '',
    product_service: '',
    estimated_value: '',
    currency: 'USD',
    expected_close_date: '',
    notes: '',
  };
  const [f, setF] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const s = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = async () => {
    setErr('');
    if (!f.claim_type || !f.partner_name.trim() || !f.customer_account.trim() || !f.estimated_value) {
      setErr('Claim type, partner, customer and value are required.');
      return;
    }
    setSaving(true);
    try {
      await PartnerClaim.create({
        ...f,
        estimated_value: Number(f.estimated_value),
        submission_date: today(),
        claim_status: 'submitted',
        preflight_status: 'pending',
        attribution_status: 'pending',
        payout_eligibility_status: 'pending',
        revenue_status: 'pipeline',
        payment_status: 'pending',
      });
      setF(blank);
      onCreated?.();
      onClose();
    } catch (e) {
      setErr(e?.message || 'Could not register the claim.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker="Capture"
      title="Register a claim"
      footer={<FormFooter onClose={onClose} saving={saving} label={{ submit, saving: 'Registering…', idle: 'Register claim' }} />}
    >
      <FormGrid>
        <FormError>{err}</FormError>
        <FormField label="Claim type" required>
          <Select value={f.claim_type} onChange={s('claim_type')} options={CLAIM_TYPES} />
        </FormField>
        <FormField label="Currency">
          <Select value={f.currency} onChange={s('currency')} options={CURRENCIES} />
        </FormField>
        <FormField label="Partner" required>
          <TextInput value={f.partner_name} onChange={s('partner_name')} placeholder="Partner name" />
        </FormField>
        <FormField label="Customer" required>
          <TextInput value={f.customer_account} onChange={s('customer_account')} placeholder="Customer account" />
        </FormField>
        <FormField label="Product / service">
          <TextInput value={f.product_service} onChange={s('product_service')} />
        </FormField>
        <FormField label="Estimated value" required>
          <NumberInput value={f.estimated_value} onChange={s('estimated_value')} min="0" placeholder="0" />
        </FormField>
        <FormField label="Expected close">
          <DateInput value={f.expected_close_date} onChange={s('expected_close_date')} />
        </FormField>
        <FormField label="Notes" full>
          <Textarea value={f.notes} onChange={s('notes')} />
        </FormField>
      </FormGrid>
    </Modal>
  );
}

/* ------------------------------------------------------------- PartnerForm */
export function PartnerForm({ open, onClose, onCreated }) {
  const blank = {
    legal_name: '',
    trade_name: '',
    partner_type: 'reseller',
    source: 'inbound_application',
    lifecycle_status: 'intake',
    tier: 'tier_2',
    country: '',
    contact_name: '',
    contact_email: '',
    expected_contribution: '',
    reporting_currency: 'USD',
    notes: '',
  };
  const [f, setF] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const s = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  const submit = async () => {
    setErr('');
    if (!f.legal_name.trim() || !f.source || !f.partner_type) {
      setErr('Legal name, source and partner type are required.');
      return;
    }
    setSaving(true);
    try {
      await Partner.create({
        ...f,
        expected_contribution: f.expected_contribution ? Number(f.expected_contribution) : undefined,
      });
      setF(blank);
      onCreated?.();
      onClose();
    } catch (e) {
      setErr(e?.message || 'Could not add the partner.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker="Capture"
      title="Add a partner"
      footer={<FormFooter onClose={onClose} saving={saving} label={{ submit, saving: 'Adding…', idle: 'Add partner' }} />}
    >
      <FormGrid>
        <FormError>{err}</FormError>
        <FormField label="Legal name" required>
          <TextInput value={f.legal_name} onChange={s('legal_name')} />
        </FormField>
        <FormField label="Trade name">
          <TextInput value={f.trade_name} onChange={s('trade_name')} />
        </FormField>
        <FormField label="Partner type" required>
          <Select value={f.partner_type} onChange={s('partner_type')} options={PARTNER_TYPES} />
        </FormField>
        <FormField label="Source" required>
          <Select value={f.source} onChange={s('source')} options={SOURCES} />
        </FormField>
        <FormField label="Lifecycle stage">
          <Select value={f.lifecycle_status} onChange={s('lifecycle_status')} options={LIFECYCLE} />
        </FormField>
        <FormField label="Tier">
          <Select value={f.tier} onChange={s('tier')} options={TIERS} />
        </FormField>
        <FormField label="Country">
          <TextInput value={f.country} onChange={s('country')} />
        </FormField>
        <FormField label="Reporting currency">
          <Select value={f.reporting_currency} onChange={s('reporting_currency')} options={CURRENCIES} />
        </FormField>
        <FormField label="Contact name">
          <TextInput value={f.contact_name} onChange={s('contact_name')} />
        </FormField>
        <FormField label="Contact email">
          <TextInput type="email" value={f.contact_email} onChange={s('contact_email')} />
        </FormField>
        <FormField label="Expected contribution">
          <NumberInput value={f.expected_contribution} onChange={s('expected_contribution')} min="0" />
        </FormField>
        <FormField label="Notes" full>
          <Textarea value={f.notes} onChange={s('notes')} />
        </FormField>
      </FormGrid>
    </Modal>
  );
}

/* ----------------------------------------------------------- AgreementForm */
export function AgreementForm({ open, onClose, onCreated }) {
  const blank = {
    partner_name: '',
    agreement_type: 'referral_agreement',
    status: 'draft',
    effective_date: today(),
    expiry_date: '',
    revenue_share_rate: '',
    commission_rate: '',
    payout_trigger: 'closed_won',
    protection_window_days: '',
    currency: 'USD',
    notes: '',
  };
  const [f, setF] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const s = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const num = (v) => (v === '' || v == null ? undefined : Number(v));

  const submit = async () => {
    setErr('');
    if (!f.partner_name.trim() || !f.agreement_type || !f.effective_date) {
      setErr('Partner, agreement type and effective date are required.');
      return;
    }
    setSaving(true);
    try {
      await Agreement.create({
        ...f,
        revenue_share_rate: num(f.revenue_share_rate),
        commission_rate: num(f.commission_rate),
        protection_window_days: num(f.protection_window_days),
      });
      setF(blank);
      onCreated?.();
      onClose();
    } catch (e) {
      setErr(e?.message || 'Could not create the agreement.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker="Capture"
      title="New agreement"
      footer={<FormFooter onClose={onClose} saving={saving} label={{ submit, saving: 'Saving…', idle: 'Create agreement' }} />}
    >
      <FormGrid>
        <FormError>{err}</FormError>
        <FormField label="Partner" required>
          <TextInput value={f.partner_name} onChange={s('partner_name')} placeholder="Partner name" />
        </FormField>
        <FormField label="Agreement type" required>
          <Select value={f.agreement_type} onChange={s('agreement_type')} options={AGREEMENT_TYPES} />
        </FormField>
        <FormField label="Effective date" required>
          <DateInput value={f.effective_date} onChange={s('effective_date')} />
        </FormField>
        <FormField label="Expiry date">
          <DateInput value={f.expiry_date} onChange={s('expiry_date')} />
        </FormField>
        <FormField label="Revenue share %">
          <NumberInput value={f.revenue_share_rate} onChange={s('revenue_share_rate')} min="0" max="100" />
        </FormField>
        <FormField label="Commission %">
          <NumberInput value={f.commission_rate} onChange={s('commission_rate')} min="0" max="100" />
        </FormField>
        <FormField label="Payout trigger">
          <Select value={f.payout_trigger} onChange={s('payout_trigger')} options={TRIGGERS} />
        </FormField>
        <FormField label="Protection window (days)">
          <NumberInput value={f.protection_window_days} onChange={s('protection_window_days')} min="0" />
        </FormField>
        <FormField label="Currency">
          <Select value={f.currency} onChange={s('currency')} options={CURRENCIES} />
        </FormField>
        <FormField label="Notes" full>
          <Textarea value={f.notes} onChange={s('notes')} />
        </FormField>
      </FormGrid>
    </Modal>
  );
}

function WorkflowRecordForm({
  open,
  onClose,
  onCreated,
  entity,
  initial,
  fields,
  required,
  kicker,
  title,
  submitLabel,
}) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    const missing = required.filter((key) => form[key] === '' || form[key] == null);
    if (missing.length) {
      setError('Complete all required fields before saving.');
      return;
    }
    setSaving(true);
    try {
      const payload = Object.fromEntries(
        fields.map((field) => {
          const raw = form[field.key];
          if (field.type === 'number') return [field.key, raw === '' ? undefined : Number(raw)];
          if (field.type === 'boolean') return [field.key, raw === 'true'];
          return [field.key, raw];
        }),
      );
      await entity.create(payload);
      setForm(initial);
      onCreated?.();
      onClose();
    } catch (caught) {
      setError(caught?.message || 'Could not save this record.');
    } finally {
      setSaving(false);
    }
  };

  const control = (field) => {
    const props = {
      value: form[field.key],
      onChange: (event) => setForm((current) => ({ ...current, [field.key]: event.target.value })),
    };
    if (field.type === 'select' || field.type === 'boolean') {
      return <Select {...props} options={field.options} />;
    }
    if (field.type === 'number') {
      return <NumberInput {...props} min={field.min ?? '0'} max={field.max} />;
    }
    if (field.type === 'date') return <DateInput {...props} />;
    if (field.type === 'textarea') return <Textarea {...props} />;
    return <TextInput {...props} type={field.type || 'text'} />;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker={kicker}
      title={title}
      footer={
        <FormFooter
          onClose={onClose}
          saving={saving}
          label={{ submit, saving: 'Saving…', idle: submitLabel }}
        />
      }
    >
      <FormGrid>
        <FormError>{error}</FormError>
        {fields.map((field) => (
          <FormField
            key={field.key}
            label={field.label}
            required={required.includes(field.key)}
            full={field.full}
          >
            {control(field)}
          </FormField>
        ))}
      </FormGrid>
    </Modal>
  );
}

export function ProgramForm(props) {
  return (
    <WorkflowRecordForm
      {...props}
      entity={PartnerProgram}
      kicker="Capture"
      title="New partner program"
      submitLabel="Create program"
      required={['name']}
      initial={{
        name: '',
        program_type: 'referral',
        commercial_model: 'percentage',
        attribution_model: 'sourced',
        review_cadence: 'quarterly',
        status: 'draft',
        description: '',
      }}
      fields={[
        { key: 'name', label: 'Program name' },
        { key: 'program_type', label: 'Program type', type: 'select', options: ['referral', 'reseller', 'co_sell', 'implementation', 'strategic_alliance'] },
        { key: 'commercial_model', label: 'Commercial model', type: 'select', options: ['percentage', 'fixed_fee', 'tiered', 'hybrid'] },
        { key: 'attribution_model', label: 'Attribution model', type: 'select', options: ['sourced', 'influenced', 'multi_touch', 'custom'] },
        { key: 'review_cadence', label: 'Review cadence', type: 'select', options: ['monthly', 'quarterly', 'semiannual', 'annual'] },
        { key: 'status', label: 'Status', type: 'select', options: ['draft', 'active', 'paused'] },
        { key: 'description', label: 'Description', type: 'textarea', full: true },
      ]}
    />
  );
}

export function TouchpointForm(props) {
  return (
    <WorkflowRecordForm
      {...props}
      entity={EcosystemTouchpoint}
      kicker="Attribute"
      title="Capture a touchpoint"
      submitLabel="Capture touchpoint"
      required={['partner_name', 'customer_account', 'touchpoint_type']}
      initial={{
        partner_name: '',
        customer_account: '',
        touchpoint_type: 'introduction',
        journey_stage: 'consideration',
        contribution_category: 'influenced',
        matching_confidence: 'medium',
        status: 'captured',
        touchpoint_date: today(),
        notes: '',
      }}
      fields={[
        { key: 'partner_name', label: 'Partner' },
        { key: 'customer_account', label: 'Customer account' },
        { key: 'touchpoint_type', label: 'Touchpoint', type: 'select', options: ['introduction', 'meeting', 'demo', 'proposal', 'implementation', 'renewal', 'expansion'] },
        { key: 'journey_stage', label: 'Journey stage', type: 'select', options: ['awareness', 'consideration', 'evaluation', 'purchase', 'adoption', 'renewal', 'expansion'] },
        { key: 'contribution_category', label: 'Contribution', type: 'select', options: ['sourced', 'influenced', 'co_sell', 'delivery'] },
        { key: 'matching_confidence', label: 'Matching confidence', type: 'select', options: ['low', 'medium', 'high'] },
        { key: 'touchpoint_date', label: 'Date', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['captured', 'review_needed', 'linked_to_claim', 'strategic_influence'] },
        { key: 'notes', label: 'Notes', type: 'textarea', full: true },
      ]}
    />
  );
}

export function StatementForm(props) {
  return (
    <WorkflowRecordForm
      {...props}
      entity={PartnerStatement}
      kicker="Settle"
      title="Draft a partner statement"
      submitLabel="Create statement"
      required={['partner_name', 'statement_period']}
      initial={{
        partner_name: '',
        statement_period: new Date().toISOString().slice(0, 7),
        currency: 'SAR',
        pending_payout: '',
        approved_payout: '',
        paid_payout: '',
        open_disputes: '0',
        finance_approved: 'false',
        status: 'draft',
      }}
      fields={[
        { key: 'partner_name', label: 'Partner' },
        { key: 'statement_period', label: 'Statement period' },
        { key: 'currency', label: 'Currency', type: 'select', options: CURRENCIES },
        { key: 'pending_payout', label: 'Eligible payout', type: 'number' },
        { key: 'approved_payout', label: 'Approved payout', type: 'number' },
        { key: 'paid_payout', label: 'Paid payout', type: 'number' },
        { key: 'open_disputes', label: 'Open disputes', type: 'number' },
        { key: 'finance_approved', label: 'Finance approved', type: 'boolean', options: [{ value: 'false', label: 'Pending' }, { value: 'true', label: 'Approved' }] },
        { key: 'status', label: 'Status', type: 'select', options: ['draft', 'issued', 'acknowledged', 'finalized'] },
      ]}
    />
  );
}

export function DisputeForm(props) {
  return (
    <WorkflowRecordForm
      {...props}
      entity={Dispute}
      kicker="Operate"
      title="Open a dispute"
      submitLabel="Open dispute"
      required={['partner_name', 'dispute_type']}
      initial={{
        partner_name: '',
        dispute_type: 'attribution',
        disputed_object: 'claim',
        priority: 'medium',
        sla_due_date: '',
        status: 'open',
        rationale: '',
      }}
      fields={[
        { key: 'partner_name', label: 'Partner' },
        { key: 'dispute_type', label: 'Dispute type', type: 'select', options: ['attribution', 'payout', 'protection', 'agreement', 'evidence'] },
        { key: 'disputed_object', label: 'Contested object', type: 'select', options: ['claim', 'touchpoint', 'statement', 'agreement'] },
        { key: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high', 'urgent'] },
        { key: 'sla_due_date', label: 'SLA due', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['open', 'under_review', 'escalated', 'resolved'] },
        { key: 'rationale', label: 'Rationale', type: 'textarea', full: true },
      ]}
    />
  );
}

export function DecisionForm(props) {
  return (
    <WorkflowRecordForm
      {...props}
      entity={Decision}
      kicker="Operate"
      title="Log an operating decision"
      submitLabel="Log decision"
      required={['title']}
      initial={{
        title: '',
        decision_type: 'partner_investment',
        partner_name: '',
        expected_outcome: '',
        actual_outcome: '',
        outcome_status: 'pending',
        financial_impact: '',
        rationale: '',
      }}
      fields={[
        { key: 'title', label: 'Decision title', full: true },
        { key: 'decision_type', label: 'Decision type', type: 'select', options: ['partner_investment', 'claim_exception', 'program_change', 'commercial_policy', 'risk_response'] },
        { key: 'partner_name', label: 'Partner' },
        { key: 'outcome_status', label: 'Outcome status', type: 'select', options: ['pending', 'on_track', 'achieved', 'missed'] },
        { key: 'expected_outcome', label: 'Expected outcome', type: 'textarea', full: true },
        { key: 'actual_outcome', label: 'Actual outcome', type: 'textarea', full: true },
        { key: 'financial_impact', label: 'Financial impact', type: 'number', min: '-999999999999' },
        { key: 'rationale', label: 'Rationale', type: 'textarea', full: true },
      ]}
    />
  );
}
