import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
    exp: number;
    user: any;
}

const AuthContext = createContext<{
    user: any;
    token: string | null;
    login: (newToken: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}>({
    user: null,
    token: null,
    login: () => Promise.resolve(),
    logout: () => { },
    isAuthenticated: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode<JWTPayload>(token);
                    if (decoded.exp * 1000 < Date.now()) {
                        logout();
                    } else {
                        setUser(decoded.user);
                    }
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        };

        validateToken();
    }, [token]);

    const login = async (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        const decoded = jwtDecode<JWTPayload>(newToken);
        setUser(decoded.user);
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);