import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth() as { isAuthenticated: boolean };
    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;