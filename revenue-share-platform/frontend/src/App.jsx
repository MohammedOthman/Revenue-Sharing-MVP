import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import Claims from './pages/Claims';
import Cadence from './pages/Cadence';
import Audit from './pages/Audit';
import {
  Programs,
  Agreements,
  Statements,
  Disputes,
  Attribution,
} from './pages/ListScreens';
import { Brandmark } from './components/brand/Brandmark';
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
            <Route path="partners" element={<Partners />} />
            <Route path="programs" element={<Programs />} />
            <Route path="agreements" element={<Agreements />} />
            <Route path="claims" element={<Claims />} />
            <Route path="attribution" element={<Attribution />} />
            <Route path="statements" element={<Statements />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="cadence" element={<Cadence />} />
            <Route path="audit" element={<Audit />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
