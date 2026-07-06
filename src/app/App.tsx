import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LandingPage from './components/LandingPage';
import MarketCalendar from './components/MarketCalendar';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import BuyerDashboard from './components/BuyerDashboard';
import VendorDashboard from './components/VendorDashboard';
import AdminDashboard from './components/AdminDashboard';
import AuthPage from './components/AuthPage';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import ProductManagement from './components/ProductManagement';
import VendorList from './components/VendorList';
import UserManagement from './components/UserManagement';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { OrderProvider } from './context/OrderContext';
import { UserManagementProvider } from './context/UserManagementContext';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/markets" element={<MarketCalendar />} />
      <Route path="/products" element={<ProductCatalog />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/vendors" element={<VendorList />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['buyer', 'admin']}>
            <ShoppingCart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['buyer', 'admin']}>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['buyer', 'admin']}>
            <OrderTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buyer/dashboard"
        element={
          <ProtectedRoute allowedRoles={['buyer']}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/products"
        element={
          <ProtectedRoute allowedRoles={['vendor']}>
            <ProductManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <UserManagementProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <NotificationProvider>
                <div className="min-h-screen bg-background">
                  <AppRoutes />
                </div>
              </NotificationProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </UserManagementProvider>
    </BrowserRouter>
  );
}
