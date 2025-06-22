import React, { useEffect, useState, useContext, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import Navbar from "./components/Navbar";
import ContentData from "./components/ContentData";
import Footer from "./components/Foot"; // Renamed from WhyUs to Footer for clarity
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute"; // New component for admin-only routes
import Loading from "./components/Loading"; // Better loading component

// Pages
import HomeAdmin from "./pages/HomeAdmin";
import DetailCampaign from "./pages/DetailContents";
import AboutUs from "./pages/AboutUs";                
import VisionMissionPage from "./pages/VisiMisi"; 
import Profile from "./pages/Profile";
import ContactUsPage from "./pages/ContactUs";
import AddCampaign from "./pages/AddCampaign";
import EditCampaign from "./pages/EditCampaign";
import NotFound from "./pages/NotFound";

// Context & API
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";

// Assets
import BackgroundImage from "./assests/icons/web amalsas.jpg";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Wrap dengan useCallback
  const checkUser = useCallback(async () => {
    try {
      const response = await API.get('/check-auth');
      
      if (!response.data.data) {
        throw new Error("Invalid user data");
      }

      const payload = {
        ...response.data.data,
        token: localStorage.token
      };
      
      dispatch({ type: 'USER_SUCCESS', payload });
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch({ type: 'AUTH_ERROR' });
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, [checkUser]);

  useEffect(() => {
    if (!isLoading && state.isLogin) {
      if (state.user.listAsRole === "Admin") {
        if (!window.location.pathname.startsWith('/admin')) {
          navigate("/admin/dashboard");
        }
      } else {
        if (window.location.pathname.startsWith('/admin')) {
          navigate("/profile");
        }
      }
    }
  }, [state, isLoading, navigate]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div style={{ 
      backgroundImage: `url(${BackgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      backgroundPosition: 'center',
    }}>
      <Navbar />
      
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ContentData />} />
          <Route path="/campaigns/:id" element={<DetailCampaign />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/vision-mission" element={<VisionMissionPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          
          {/* Authenticated User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/donations" element={<div>Donations Page</div>} />
            <Route path="/history" element={<div>History Page</div>} />
          </Route>
          
          {/* Admin Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<HomeAdmin />} />
            <Route path="/admin/campaigns/add" element={<AddCampaign />} />
            <Route path="/admin/campaigns/edit/:id" element={<EditCampaign />} />
          </Route>
          
          {/* Error Handling */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
