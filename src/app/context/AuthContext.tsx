import { createContext, useContext, useState, ReactNode } from 'react';
import { useUserManagement, User as FullUser } from './UserManagementContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'vendor' | 'admin';
  avatar?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'buyer' | 'vendor' | 'admin';
  location?: string;
  vendorDetails?: {
    businessName?: string;
    categories: string[];
    productsToSell: string[];
    marketLocation?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: 'buyer' | 'vendor' | 'admin' }>;
  register: (data: RegisterData) => Promise<{ success: boolean; role?: 'buyer' | 'vendor' | 'admin' }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { getUserByEmail, addUser } = useUserManagement();

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = getUserByEmail(email);

    if (!foundUser) {
      return { success: false };
    }

    if (foundUser.password !== password) {
      return { success: false };
    }

    if (foundUser.status === 'suspended') {
      return { success: false };
    }

    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role
    });

    return { success: true, role: foundUser.role };
  };

  const register = async (data: RegisterData) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = getUserByEmail(data.email);
    if (existingUser) {
      return { success: false };
    }

    const newUser = addUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role,
      location: data.location,
      vendorDetails: data.vendorDetails
    });

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    return { success: true, role: newUser.role };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
