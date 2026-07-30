import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AuthService from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.getProfile();

      setUser(response.user);
    } catch (error) {
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await AuthService.login(credentials);

    localStorage.setItem(
      "access_token",
      response.access_token
    );

    setUser(response.user);

    return response;
  };

  const register = async (userData) => {
    return await AuthService.register(userData);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const updateProfile = async (data) => {
    const response = await AuthService.updateProfile(data);

    setUser(response.user);

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;