// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { UserContext } from '../ContextApi/UserContext';

import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const { userId, businessId } = useContext(UserContext);
//   // console.log("User Context:", { userId, businessId });
//   // const role = userId?.role || businessId?.role;

//   if (!userId?.userId && !businessId?.businessId) {
//     return <Navigate to="/splash" />;
//   }

//   // if (role && !allowedRoles.includes(role)) {
//   //   return <Navigate to="/unauthorized" />;
//   // }

//   return <Outlet />;
// };
// PrivateRoute.propTypes = {
//   allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

// export default PrivateRoute;

function CustomerPrivateRoute({ children }) {
  const customerId = localStorage.getItem("customerid");

  if (!customerId) {
    return <Navigate to="/splash" />; // Redirect to login page if no customer ID found
  }

  return children ? children : <Outlet />;
}
export default CustomerPrivateRoute
