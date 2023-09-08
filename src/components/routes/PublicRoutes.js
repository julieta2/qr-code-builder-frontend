import {Navigate} from "react-router-dom";

const PublicRoute = ({ element, isAuthenticated }) => {
  return !isAuthenticated ? element : <Navigate to="/list" />;
};

export default PublicRoute