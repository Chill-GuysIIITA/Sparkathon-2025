export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  role: 'admin' | 'worker';
  department?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock authentication functions - replace with real API calls
export const authService = {
  async signIn(email: string, password: string, userType: 'admin' | 'worker'): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      employeeId: 'WM001234',
      role: userType,
      department: userType === 'worker' ? 'Picking & Packing' : undefined,
      createdAt: new Date(),
      lastLogin: new Date()
    };

    // Store in localStorage (in real app, use secure storage)
    localStorage.setItem('auth_token', 'mock_jwt_token');
    localStorage.setItem('user_role', userType);
    localStorage.setItem('user_data', JSON.stringify(mockUser));

    return mockUser;
  },

  async signUp(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    role: 'admin' | 'worker';
    department?: string;
  }): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date()
    };

    // Store in localStorage
    localStorage.setItem('auth_token', 'mock_jwt_token');
    localStorage.setItem('user_role', userData.role);
    localStorage.setItem('user_data', JSON.stringify(newUser));

    return newUser;
  },

  async signOut(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  },

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};