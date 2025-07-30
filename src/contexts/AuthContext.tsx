import { createContext, useContext, useState, ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const hasToken = !!localStorage.getItem("accessToken");
    console.log('🔍 AuthProvider init - isAuthenticated:', hasToken);
    return hasToken;
  });

  const login = async (email: string, password: string) => {
    console.log('🔐 AuthContext login attempt:', email);
    try {
      const response = await apiLogin(email, password);
      console.log('📨 Login API response:', response);
      
      if (response?.refreshToken || response?.accessToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("accessToken", response.accessToken);
        setIsAuthenticated(true);
        console.log('✅ Login successful, tokens stored');
      } else {
        console.log('❌ Login response missing tokens');
        throw new Error('Login failed - no tokens received');
      }
    } catch (error) {
      console.log('💥 Login error:', error);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      throw new Error(error?.message || 'Login failed');
    }
  };

  const register = async (email: string, password: string) => {
    console.log('📝 AuthContext register attempt:', email);
    try {
      const response = await apiRegister(email, password);
      console.log('📨 Register API response:', response);
      console.log('✅ Registration successful');
    } catch (error) {
      console.log('💥 Register error:', error);
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      throw new Error(error?.message || 'Registration failed');
    }
  };

  const logout = () => {
    console.log('🚪 AuthContext logout');
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}