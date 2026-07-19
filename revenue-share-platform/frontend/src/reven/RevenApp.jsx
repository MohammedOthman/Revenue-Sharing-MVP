import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import './theme.css';
import Login from './Login';
import Shell from './Shell';
import CommandCenter from './CommandCenter';
import Claims from './Claims';
import ClaimDetail from './ClaimDetail';
import Partners from './Partners';
import Agreements from './Agreements';

const Protected = ({ children }) => {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
};

export default function RevenApp() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Shell /></Protected>}>
            <Route index element={<CommandCenter />} />
            <Route path="claims" element={<Claims />} />
            <Route path="claims/:id" element={<ClaimDetail />} />
            <Route path="partners" element={<Partners />} />
            <Route path="agreements" element={<Agreements />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
