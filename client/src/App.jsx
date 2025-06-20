import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Komponen umum
import Navbar from "./components/Navbar";
import ContentData from "./components/ContentData";
import WhyUs from "./components/Foot";
import PrivateRoute from "./components/PrivateRoute";

// Halaman
import HomeAdmin from "./pages/HomeAdmin";
import DetailCampaign from "./pages/DetailContents";
import AboutUs from "./pages/AboutUs";                
import VisionMissionPage from "./pages/VisiMisi"; 

// Context & API
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";

// Gambar background
import BackgroundImage from "./assests/icons/web amalsas.jpg";

// React Query client
const queryClient = new QueryClient();

function AppContent() {
  const [backgroundImage] = useState(`url(${BackgroundImage})`);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      const payload = {
        ...response.data.data,
        token: localStorage.token
      };
      dispatch({ type: 'USER_SUCCESS', payload });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR' });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!state.isLogin) {
        navigate("/");
      } else if (state.user.listAsRole === "Admin") {
        navigate("/home-admin");
      }
    }
  }, [state, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ backgroundImage, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <ContentData />
                <WhyUs />
              </main>
            </>
          }
        />
        
        <Route path="/campaigns/:id" element={<DetailCampaign />} />

        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/vision-mission" element={<VisionMissionPage />} /> 

        <Route path="/home-admin" element={<HomeAdmin />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/donations" element={<div>Donations Page</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
