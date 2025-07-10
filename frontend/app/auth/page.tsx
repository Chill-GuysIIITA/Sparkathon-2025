'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User, Shield, Eye, EyeOff, Mail, Lock, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'admin' | 'worker'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    department: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard after successful auth
      router.push('/');
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      employeeId: '',
      department: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-walmart-blue/5 via-background to-walmart-yellow/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-walmart-blue rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-walmart-blue">Walmart</h1>
              <p className="text-sm text-muted-foreground">Warehouse Optimization</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {isLogin 
              ? 'Sign in to access your warehouse dashboard' 
              : 'Join the warehouse optimization platform'
            }
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            {/* User Type Selection */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={userType === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('admin')}
                className={userType === 'admin' ? 'bg-walmart-blue hover:bg-walmart-blue/90' : ''}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
              <Button
                variant={userType === 'worker' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserType('worker')}
                className={userType === 'worker' ? 'bg-walmart-blue hover:bg-walmart-blue/90' : ''}
              >
                <User className="w-4 h-4 mr-2" />
                Worker
              </Button>
            </div>

            {/* Login/Signup Toggle */}
            <Tabs value={isLogin ? 'login' : 'signup'} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="login" 
                  onClick={() => {
                    setIsLogin(true);
                    resetForm();
                  }}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  onClick={() => {
                    setIsLogin(false);
                    resetForm();
                  }}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sign Up Fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="WM001234"
                      required
                    />
                  </div>

                  {userType === 'worker' && (
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Picking & Packing"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@walmart.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-walmart-blue hover:bg-walmart-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4" />
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </div>
                )}
              </Button>

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className="text-center">
                  <Button variant="link" className="text-sm text-muted-foreground">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Role Information */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Admin: Full system access</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>Worker: Task management</span>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-muted/30">
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">Admin</Badge>
                  <p>admin@walmart.com</p>
                  <p>admin123</p>
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs">Worker</Badge>
                  <p>worker@walmart.com</p>
                  <p>worker123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}