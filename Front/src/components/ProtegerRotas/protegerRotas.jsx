import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const protegerRotas = ({ children }) => {
  const token = Cookies.get('token');

  if (!token) {
   
    return <Navigate to="/Auth" replace />;
  }

  return children; 
};

export default protegerRotas;