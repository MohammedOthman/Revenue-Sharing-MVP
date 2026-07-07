import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import Contracts from './pages/Contracts';
import Revenue from './pages/Revenue';
import KPIs from './pages/KPIs';
import LegalDocuments from './pages/LegalDocuments';
import './styles/index.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  // Wait for the stored session to load before deciding — otherwise a
  // page refresh bounces logged-in users to /login.
  if (loading) return <div className="loading">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
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
              <Route path="contracts" element={<Contracts />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="kpis" element={<KPIs />} />
              <Route path="legal" element={<LegalDocuments />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
