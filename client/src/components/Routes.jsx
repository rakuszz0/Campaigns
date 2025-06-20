// import React, { useEffect, useState, useContext } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import Home from "../pages/Home";
// import CampaignsPage from "../pages/DetailContents";
// import PrivateRoute from "./PrivateRoute";
// // import AddCampaign from "../pages/AddCampaign";
// // import EditCampaign from "../pages/EditCampaign";
// import HomeAdmin from "../pages/HomeAdmin";

// export default function RoutesPage() {
//   const navigate = useNavigate();
//   const [state, dispatch] = useContext(AuthContext);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkUser = async () => {
//     try {
//       const response = await fetch("/api/auth/check", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${state?.user?.token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         dispatch({ type: "SET_USER", payload: data });
//       } else {
//         dispatch({ type: "LOGOUT" });
//       }
//     } catch (error) {
//       console.error("Error checking user:", error);
//       dispatch({ type: "LOGOUT" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.token) {
//       setAuthToken(localStorage.token);
//       checkUser();
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isLoading && !state.isLogin) {
//       navigate("/");
//     } else if (!isLoading) {
//       if (state.user.listAsRole === "Admin") {
//         navigate("/home-admin");
//       }
//       // Donor case is handled by the default route
//     }
//   }, [state, isLoading]);

//   if (isLoading) return null;

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/campaigns/:id" element={<CampaignsPage />} />
//       <Route path="/dashboard" element={<div>Dashboard Page</div>} />
//       <Route path="/profile" element={<div>Profile Page</div>} />
//       <Route path="/campaigns" element={<div>Campaigns Page</div>} />
//       <Route path="/add-donations" element={<div>AddDonation</div>} />
//       <Route path="/contact-us" element={<div>Contact Us</div>} />
//       <Route path="/home-admin" element={<HomeAdmin />} />
//       <Route element={<PrivateRoute />}>
//         {/* <Route path="/add-campaigns" element={<AddCampaign />} /> */}
//         {/* <Route path="/edit-campaigns/:id" element={<EditCampaign />} /> */}
//         <Route path="/donations" element={<div>Donations Page</div>} />
//       </Route>
//       <Route path="*" element={<Navigate to="/" />} /> {/* 404 fallback */}
//     </Routes>
//   );
// }