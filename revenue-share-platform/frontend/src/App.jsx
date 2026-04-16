import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
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
            <Route path="contracts" element={<Contracts />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="kpis" element={<KPIs />} />
            <Route path="legal" element={<LegalDocuments />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
