import { Navigate, Outlet } from "react-router-dom";

function BusinessPrivateRoute({ children }) {
    const businessId = localStorage.getItem("businessid");
  
    if (!businessId) {
      return <Navigate to="/splash" />; // Redirect to business login page if no business ID found
    }
  
    return children ? children : <Outlet />;
  }
  
  export default BusinessPrivateRoute
  