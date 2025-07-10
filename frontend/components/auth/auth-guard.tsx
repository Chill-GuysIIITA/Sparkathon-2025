'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'worker';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'worker' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate auth check - in real app, this would check JWT token, session, etc.
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const role = localStorage.getItem('user_role') as 'admin' | 'worker';
      
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(role);
        
        // Check role permissions
        if (requiredRole && role !== requiredRole) {
          router.push('/unauthorized');
          return;
        }
      } else {
        router.push('/auth');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-walmart-blue border-t-transparent rounded-full animate-spin"></div>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to auth page
  }

  return <>{children}</>;
}