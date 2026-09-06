import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from './Components/ScrollToTop';  // adjust path as needed


// Admin Pages & Components
import LoginPage from './Admin/Pages/Login';
import AdminLayout from './Components/AdminLayout';
import SellerAuth from './Sellar/Sellerauth';
import SellerDashboard from './Sellar/sellardashboard';


// User Pages & Components
import UserLoginPage from './User/Pages/UserLogin';
import UserLayout from './User/UserLayout';
import HomePage from './User/Pages/HomePage';

// User Shell — visible on all user-side pages
import UserNavbar from './User/Components/Usernavbar';
import UserFooter from './User/Components/Userfooter';
import ResetPassword from './User/Pages/ResetPassword';  // ← add this import
import ForgotPassword from './User/Pages/ForgotPassword';


// driver
import DeliveryAgentApp from './Driver/Deliveryagentapp';



///////////////////////////

import ProductsPage from './User/Pages/Productspage';
import BlogPage from './User/Pages/Blogpage';
import ProductDetails from './User/Pages/Productdetails';
import ContactPage from './User/Pages/Contactpage';
import AboutUs from './User/Pages/Aboutus';
import TermsAndConditions from './User/Pages/Termsandconditions';
import PrivacyPolicy from './User/Pages/Privacypolicy';
import DeleteAccount from './User/Pages/Deleteaccount';


//////////////////////////////////////////////////////////////////////////////////

import CartToast from './User/Components/Carttoast'; // apna sahi path lagao


/////////////////////////////////////////////////////////////////////////////////

// ─────────────────────────────────────────
// Full-Page Loader Component
// ─────────────────────────────────────────
const PageLoader = ({ fading }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 9999,
    opacity: fading ? 0 : 1,
    transition: 'opacity 2s ease',
  }}>

    <style>{`
      @keyframes gk-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes gk-letter  { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(-8px);opacity:0.7} }
      @keyframes gk-cart    { 0%{transform:translateX(-60px);opacity:0} 60%{transform:translateX(4px);opacity:1} 75%{transform:translateX(-2px)} 100%{transform:translateX(0);opacity:1} }
      @keyframes gk-pulse   { 0%{transform:scale(0.8);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
      @keyframes gk-bar     { 0%{width:0%} 100%{width:100%} }
      @keyframes gk-dot     { 0%,100%{opacity:0.2;transform:scale(0.6)} 50%{opacity:1;transform:scale(1)} }
      @keyframes gk-wheel   { to{transform:rotate(360deg)} }
    `}</style>

    {/* Floating cart icon with pulse rings */}
    <div style={{ position: 'relative', marginBottom: 8 }}>
      <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '2px solid #4CAF5033', animation: 'gk-pulse 1.8s ease-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '2px solid #FF6B2B33', animation: 'gk-pulse 1.8s ease-out 0.6s infinite', pointerEvents: 'none' }} />

      <svg width="72" height="72" viewBox="0 0 72 72" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'gk-float 2.4s ease-in-out infinite', display: 'block' }}>
        <circle cx="36" cy="36" r="34" fill="#f0faf0" stroke="#4CAF50" strokeWidth="1.5" />
        <g style={{ animation: 'gk-cart 0.7s cubic-bezier(.22,.61,.36,1) 0.2s both' }}>
          <path d="M18 24h4l5 16h16l4-12H26" stroke="#4CAF50" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="31" cy="44" r="3" fill="#FF6B2B" />
          <circle cx="43" cy="44" r="3" fill="#FF6B2B" />
          <path d="M38 32l4-6" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M41 26l2 0 0 4" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>

    {/* Animated letters */}
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 0, margin: '16px 0 6px' }}>
      {"Gramin".split("").map((ch, i) => (
        <span key={i} style={{
          fontSize: 38, fontWeight: 700, color: '#4CAF50',
          fontFamily: 'Georgia, serif', display: 'inline-block',
          animation: `gk-letter 1.6s ease-in-out ${i * 0.08}s infinite`,
        }}>{ch}</span>
      ))}
      {"Cart".split("").map((ch, i) => (
        <span key={i} style={{
          fontSize: 38, fontWeight: 700, color: '#FF6B2B',
          fontFamily: 'Georgia, serif', display: 'inline-block',
          animation: `gk-letter 1.6s ease-in-out ${(6 + i) * 0.08}s infinite`,
        }}>{ch}</span>
      ))}
    </div>

    {/* Progress bar */}
    <div style={{ width: 180, height: 3, background: '#eee', borderRadius: 99, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{
        height: '100%', borderRadius: 99,
        background: 'linear-gradient(90deg, #4CAF50, #FF6B2B)',
        animation: 'gk-bar 2s ease-in-out infinite alternate',
      }} />
    </div>

    {/* Trailing dots */}
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: i % 2 === 0 ? '#4CAF50' : '#FF6B2B',
          animation: `gk-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
    </div>

    <p style={{ marginTop: 14, fontSize: 12, color: '#bbb', letterSpacing: '1.5px', fontFamily: 'sans-serif' }}>
      FRESH PICKS LOADING...
    </p>
  </div>
);








// ─────────────────────────────────────────
// Admin Protected Route — checks adminToken
// If no token → redirect to /admin/login
// ─────────────────────────────────────────
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};


const SellerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('sellerToken');
  if (!token) return <Navigate to="/seller/auth" replace />;
  return children;
};

// ─────────────────────────────────────────
// User Protected Route — checks userToken
// If no token → redirect to /user/login
// ─────────────────────────────────────────
const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};


// ─────────────────────────────────────────
// Layout wrapper — shows navbar & footer
// only on non-admin routes
// ─────────────────────────────────────────
const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  const isDriverRoute = pathname.startsWith('/driver');   // ← add this
    const isSellerRoute = pathname.startsWith('/seller');  // ← ADD



  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdminRoute && !isDriverRoute && !isSellerRoute && <UserNavbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && !isDriverRoute && !isSellerRoute && <UserFooter />}
    </div>
  );
};


function App() {
  const [appReady, setAppReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulates waiting for fonts, tokens, configs, etc.
    // Replace this with real async calls if needed
    const timer = setTimeout(() => {
      setFadeOut(true);                           // trigger fade animation
      setTimeout(() => setAppReady(true), 1000);  // unmount loader after fade
    }, 500); // small intentional delay so loader doesn't flash for fast loads

    return () => clearTimeout(timer);
  }, []);

  // Show loader until app is ready
  if (!appReady) return <PageLoader fading={fadeOut} />;

  return (
    <AppLayout>
      <CartToast />
      <Routes>

        <Route path="/" element={<HomePage />} />


        {/* 1. Default Route → redirect to home page */}

        {/* ──────────────────────────────── */}
        {/*         ADMIN ROUTES             */}
        {/* ──────────────────────────────── */}

        {/* 2. Public Route — Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* 3. Protected Admin Routes
            - Any path under /admin/* is protected
            - No token → goes back to /admin/login automatically */}
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        />

        {/* ──────────────────────────────── */}
        {/*         USER ROUTES              */}
        {/* ──────────────────────────────── */}

        {/* 4. Public Routes — no token required */}
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/product" element={<ProductsPage />} />
        <Route path="/user/blog" element={<BlogPage />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/user/contect" element={<ContactPage />} />
        <Route path="/user/about" element={<AboutUs />} />
        <Route path="/user/termcondition" element={<TermsAndConditions />} />
        <Route path="/user/privacy" element={<PrivacyPolicy />} />
        <Route path="/user/deleteaccount" element={<DeleteAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />









        {/* /////////////////// driver /////////////////////////////////// */}


        <Route path="/driver/*" element={<DeliveryAgentApp />} />

        {/* /////////////////// driver /////////////////////////////////// */}

        {/* ──────────────────────────────── */}
{/*        SELLER ROUTES             */}
{/* ──────────────────────────────── */}

{/* Public — Login & Register */}
<Route path="/seller/auth" element={<SellerAuth />} />

{/* Protected — Dashboard */}
<Route
  path="/seller/*"
  element={
    <SellerProtectedRoute>
      <SellerDashboard />
    </SellerProtectedRoute>
  }
/>


        {/* 5. Protected User Routes
            - Any path under /user/* is protected
            - No token → goes back to /user/login automatically */}
        <Route
          path="/user/*"
          element={
            <UserProtectedRoute>
              <UserLayout />
            </UserProtectedRoute>
          }
        />

        {/* 6. 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen font-bold text-2xl text-slate-400">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
    </AppLayout>
  );
}

export default App;