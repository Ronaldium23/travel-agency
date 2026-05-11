import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Catalog from './pages/Catalog';
import AdminDashboard from './pages/AdminDashboard';
import ReservationHistory from './pages/ReservationHistory';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <ReservationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/catalog" />} />
      </Routes>
    </BrowserRouter>
  );
}

