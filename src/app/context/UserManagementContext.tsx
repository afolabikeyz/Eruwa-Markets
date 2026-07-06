import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'buyer' | 'vendor' | 'admin';
  joinDate: Date;
  status: 'active' | 'suspended';
  location?: string;
  totalOrders?: number;
  totalSales?: number;
  vendorDetails?: {
    businessName?: string;
    categories: string[];
    productsToSell: string[];
    marketLocation?: string;
  };
}

interface UserManagementContextType {
  allUsers: User[];
  addUser: (user: Omit<User, 'id' | 'joinDate' | 'status'>) => User;
  removeUser: (userId: string) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  toggleUserStatus: (userId: string) => void;
  getUserByEmail: (email: string) => User | undefined;
  getUserByPhone: (phone: string) => User | undefined;
  resetPassword: (identifier: string, newPassword: string) => boolean;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

const SEED_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@marketday.ng',
    phone: '+234 800 000 0000',
    password: 'admin123',
    role: 'admin',
    joinDate: new Date('2024-01-01'),
    status: 'active'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    password: 'buyer123',
    role: 'buyer',
    joinDate: new Date('2024-01-15'),
    status: 'active',
    location: 'Eruwa, Oyo',
    totalOrders: 24
  },
  {
    id: '3',
    name: 'Adebayo Tunde',
    email: 'adebayo@example.com',
    phone: '+234 802 345 6789',
    password: 'vendor123',
    role: 'vendor',
    joinDate: new Date('2024-02-20'),
    status: 'active',
    location: 'Maya Market',
    totalSales: 156,
    vendorDetails: {
      businessName: 'Adebayo Fresh Foods',
      categories: ['Fresh Produce', 'Vegetables'],
      productsToSell: ['Tomatoes', 'Peppers', 'Onions'],
      marketLocation: 'Maya Market'
    }
  }
];

function loadUsers(): User[] {
  try {
    const stored = localStorage.getItem('eruwa_users');
    if (!stored) return SEED_USERS;
    const parsed = JSON.parse(stored) as User[];
    // Revive Date objects that JSON.parse returns as strings
    return parsed.map(u => ({ ...u, joinDate: new Date(u.joinDate) }));
  } catch {
    return SEED_USERS;
  }
}

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<User[]>(loadUsers);

  useEffect(() => {
    try {
      localStorage.setItem('eruwa_users', JSON.stringify(allUsers));
    } catch {
      // localStorage unavailable — silently skip
    }
  }, [allUsers]);

  const addUser = (userData: Omit<User, 'id' | 'joinDate' | 'status'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      joinDate: new Date(),
      status: 'active',
      totalOrders: userData.role === 'buyer' ? 0 : undefined,
      totalSales: userData.role === 'vendor' ? 0 : undefined
    };

    setAllUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const removeUser = (userId: string) => {
    setAllUsers(prev => prev.filter(u => u.id !== userId));
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setAllUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, ...updates } : u))
    );
  };

  const toggleUserStatus = (userId: string) => {
    setAllUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
  };

  const getUserByEmail = (email: string) => {
    return allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  };

  const normalizePhone = (phone: string) => phone.replace(/\D/g, '').slice(-10);

  const getUserByPhone = (phone: string) => {
    const normalized = normalizePhone(phone);
    return allUsers.find(u => normalizePhone(u.phone) === normalized);
  };

  const resetPassword = (identifier: string, newPassword: string) => {
    const user = getUserByEmail(identifier) || getUserByPhone(identifier);
    if (user) {
      updateUser(user.id, { password: newPassword });
      return true;
    }
    return false;
  };

  return (
    <UserManagementContext.Provider
      value={{
        allUsers,
        addUser,
        removeUser,
        updateUser,
        toggleUserStatus,
        getUserByEmail,
        getUserByPhone,
        resetPassword
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
}
