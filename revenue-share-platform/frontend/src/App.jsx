import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SurfaceStub from './pages/SurfaceStub';
import { Brandmark } from './components/brand/Brandmark';
import {
  Partner,
  PartnerProgram,
  Agreement,
  PartnerClaim,
  EcosystemTouchpoint,
  PartnerStatement,
  Dispute,
  Decision,
  AuditEvent,
} from './api/entities';
import './styles/index.css';

function BrandLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <motion.div
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Brandmark size={42} />
      </motion.div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <BrandLoader />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const SURFACES = [
  {
    path: 'partners',
    kicker: 'Capture · Partners',
    title: 'Partner lifecycle',
    entity: Partner,
    statusField: 'lifecycle_status',
    description:
      'Intake, qualification, approval and onboarding — with payout-readiness tracked apart from activation.',
  },
  {
    path: 'programs',
    kicker: 'Capture · Programs',
    title: 'Partner programs',
    entity: PartnerProgram,
    statusField: 'status',
    description:
      'The programs partner economics run inside: objective, commercial model, attribution model and review cadence.',
  },
  {
    path: 'agreements',
    kicker: 'Capture · Agreements',
    title: 'Agreements & rules',
    entity: Agreement,
    statusField: 'status',
    description:
      'Terms turned into executable, versioned rules: rates, triggers, protection windows, caps and clawback conditions.',
  },
  {
    path: 'claims',
    kicker: 'Capture → Settle · Claims',
    title: 'The claim ledger',
    entity: PartnerClaim,
    statusField: 'claim_status',
    description:
      'The canonical claim: submission, preflight, one attribution of record, protection, eligibility and payout.',
  },
  {
    path: 'attribution',
    kicker: 'Attribute · Ecosystem',
    title: 'Attribution hub',
    entity: EcosystemTouchpoint,
    statusField: 'status',
    description:
      'The touchpoint graph behind the credit: contribution, journey stage, shadow influence and matching confidence.',
  },
  {
    path: 'statements',
    kicker: 'Settle · Statements',
    title: 'Partner statements',
    entity: PartnerStatement,
    statusField: 'status',
    description:
      'Per-partner statements: accepted claims, eligible and paid payout, adjustments and open disputes — finance-reviewable.',
  },
  {
    path: 'disputes',
    kicker: 'Attribute · Disputes',
    title: 'Disputes',
    entity: Dispute,
    statusField: 'status',
    description:
      'Contested attribution, payout and protection — routed, tracked to an SLA, and resolved with a rationale.',
  },
  {
    path: 'cadence',
    kicker: 'Operate · Cadence',
    title: 'Decisions & outcomes',
    entity: Decision,
    statusField: 'outcome_status',
    description:
      'The operating loop: investment decisions logged with an expected outcome, then measured against what happened.',
  },
  {
    path: 'audit',
    kicker: 'Operate · Audit',
    title: 'Audit log',
    entity: AuditEvent,
    statusField: 'severity',
    description:
      'Every state change as an event — who, what, when and why, including out-of-order and late anomalies.',
  },
];

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {SURFACES.map((s) => (
              <Route key={s.path} path={s.path} element={<SurfaceStub {...s} />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
