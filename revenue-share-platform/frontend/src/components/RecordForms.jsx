import { useState } from 'react';
import { PartnerClaim, Partner, Agreement } from '../api/entities';
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
