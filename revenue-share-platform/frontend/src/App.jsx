import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Brandmark } from './components/brand/Brandmark';
import './styles/index.css';

const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Partners = lazy(() => import('./pages/Partners'));
const Claims = lazy(() => import('./pages/Claims'));
const Cadence = lazy(() => import('./pages/Cadence'));
const Audit = lazy(() => import('./pages/Audit'));
const Settings = lazy(() => import('./pages/Settings'));
const listScreen = (name) =>
  lazy(() => import('./pages/ListScreens').then((module) => ({ default: module[name] })));
const Programs = listScreen('Programs');
const Agreements = listScreen('Agreements');
const Statements = listScreen('Statements');
const Disputes = listScreen('Disputes');
const Attribution = listScreen('Attribution');

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
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  if (loading) return <BrandLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.mustChangePassword && location.pathname !== '/settings') {
    return <Navigate to="/settings" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<BrandLoader />}>
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
              <Route path="partners" element={<Partners />} />
              <Route path="programs" element={<Programs />} />
              <Route path="agreements" element={<Agreements />} />
              <Route path="claims" element={<Claims />} />
              <Route path="attribution" element={<Attribution />} />
              <Route path="statements" element={<Statements />} />
              <Route path="disputes" element={<Disputes />} />
              <Route path="cadence" element={<Cadence />} />
              <Route path="audit" element={<Audit />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
