import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Splash from "./Components/Splash/Splash.jsx";
import Login from "./Components/Auth/Login.jsx";
import Signup from "./Components/Auth/Signup.jsx";
import RateReview from "./Components/RateReview/RateReview.jsx";
import SuccessScreen from "./Components/SuccessScreen/SuccessScreen.jsx";
import WorkComplete from "./Components/WorkComplete/WorkComplete.jsx";
import CustomerProfile from "./Components/CustomerProfile/CustomerProfile.jsx";
import Messages from "./Components/Messages/Messages.jsx";
import Home from "./Components/Home/Home.jsx";
import ServicePage from "./Components/ServiceDetail/ServicePage.jsx";
import ServiceDetails from "./Components/ServicesDetails/ServiceDetails.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Unauthorized from "./Components/Unauthorized/Unauthorized.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Calendar from "./Components/Calender/Calender.jsx";
import { useEffect } from "react";
import { UserProvider } from "./Components/ContextApi/UserContext.jsx";



// Sarim imports
import CustomerPrivateRoute from './Components/PrivateRoutes/PrivateRoute.jsx'
import BusinessPrivateRoute from "./Components/PrivateRoutes/BusinessPriveRoute.jsx";
import BusinessLogin from "./Components/BusinessSide/Business/BusinessAuth/BusinessLogin.jsx";
import BusinessSignup from "./Components/BusinessSide/Business/BusinessAuth/BusinessSignup.jsx";
import CustomerJobDetails from "./Components/Calender/CustomerJobDetails.jsx";
import BusinessLayout from "./Components/BusinessSide/Business/BusinessLayout/BusinessLayout.jsx";
import AddService from "./Components/BusinessSide/Business/AddService/AddService.jsx";
import EditService from "./Components/BusinessSide/Business/EditService/EditService.jsx";
import BusinessProfile from "./Components/BusinessSide/Business/BusinessProfile/BusinessProfile.jsx";
import Subscriptions from "./Components/BusinessSide/Business/Subscriptions/Subscriptions.jsx";
import BusinessChat from "./Components/BusinessSide/Business/BusinessChat/BusinessChat.jsx";
import MyBusinessServices from "./Components/BusinessSide/Business/MyServices/MyServicesOthers.jsx";
import JobDetails from "./Components/BusinessSide/Business/Jobs/Jobs/JobDetails.jsx";
import BusinessHome from "./Components/BusinessSide/Business/BusinessHome/BusinessHome/BusinessHome.jsx";
import AllJobs from "./Components/BusinessSide/Business/Jobs/Jobs/JobsCompleted.jsx";






function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const customerId = localStorage.getItem("customerid");
    const businessId = localStorage.getItem("businessid");
    const loginTime = localStorage.getItem("loginTime");

    if (loginTime) {
      const currentTime = Date.now();
      const threeHours = 3 * 60 * 60 * 1000; // Updated to three hours

      if (currentTime - loginTime > threeHours) {
        // Clear local storage after 3 hours
        localStorage.clear();
        navigate("/splash"); 
      } else if (window.location.pathname === "/splash") {
        // Redirect to appropriate page only when on splash route
        if (customerId) {
          navigate("/");
        } else if (businessId) {
          navigate("/businesshome");
        }
      }
    } else {
      // Handle case where loginTime is not set
      if (window.location.pathname === "/splash") {
        if (customerId) {
          navigate("/");
        } else if (businessId) {
          navigate("/businesshome");
        }
      }
    }
  }, [navigate]);

  return null; // This component does not render anything
}




function App() {
  return (
    <Router>
      <UserProvider>
        <RedirectHandler />
        <Routes>
          {/* Abubakar Routes */}
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/businesslogin" element={<BusinessLogin />} />
          <Route path="/businesssignup" element={<BusinessSignup />} />
         

          {/* Customer Protected Routes */}
          <Route
            path="/"
            element={
              <CustomerPrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/rate-review"
            element={
              <CustomerPrivateRoute>
                <RateReview />
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/Calendar"
            element={
              <CustomerPrivateRoute>
                  <Layout>
                <Calendar />
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/job-details/:id"
            element={
              <CustomerPrivateRoute>
                  <Layout>
                <CustomerJobDetails/>
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/success"
            element={
              <CustomerPrivateRoute>
                <SuccessScreen />
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/work-complete"
            element={
              <CustomerPrivateRoute>
                <WorkComplete />
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <CustomerPrivateRoute>
                <Layout>
                  <CustomerProfile />
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <CustomerPrivateRoute>
                <Layout>
                  <Messages />
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/services/:serviceId"
            element={
              <CustomerPrivateRoute>
                <Layout>
                  <ServicePage />
                </Layout>
              </CustomerPrivateRoute>
            }
          />
          <Route
            path="/service/:serviceId"
            element={
              <CustomerPrivateRoute>
                <Layout>
                  <ServiceDetails />
                </Layout>
              </CustomerPrivateRoute>
            }
          />

          {/* Abubakar Routes End */}

                    {/* Sarim Routes Start */}
          {/* Business Protected Routes */}
          <Route
            path="/myservices"
            element={
                <BusinessLayout>
                  <MyBusinessServices />
                </BusinessLayout>
            }
          />
          
          <Route
            path="/myservices/addservice"
            element={

                <BusinessLayout>
                  <AddService />
                </BusinessLayout>

            }
          />
          <Route
            path="/myservices/editservice/:id"
            element={

                <BusinessLayout>
                  <EditService />
                </BusinessLayout>
            }
          />
        
          <Route
            path="/myservices/business-profile"
            element={
                <BusinessLayout>
                  <BusinessProfile />
                </BusinessLayout>
            }
          />
          <Route
            path="/myservices/business-profile/subscriptions"
            element={
    
                <BusinessLayout>
                  <Subscriptions />
                </BusinessLayout>
    
            }
          />
          <Route
            path="/businesshome"
            element={

                <BusinessLayout>
                  <BusinessHome />
                </BusinessLayout>
  
            }
          />
          
          <Route
            path="/jobs"
            element={
                <BusinessLayout>
                  <AllJobs />
                </BusinessLayout>

            }
          />
          <Route
            path="/business-chat"
            element={
                <BusinessLayout>
                  <BusinessChat />
                </BusinessLayout>
  
            }
          />
          <Route
            path="/jobs/jobdetails/:id"
            element={
    
                <BusinessLayout>
                  <JobDetails />
                </BusinessLayout>
        
            }
          />

          <Route
            path="/myservices/subscriptions"
            element={
    
                <BusinessLayout>
                  <Subscriptions />
                </BusinessLayout>

            }
          />
          {/* Sarim Routes End */}

        </Routes>
        <ToastContainer autoClose={1000} />
      </UserProvider>
    </Router>
  );
}

export default App;

