import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useUserManagement } from '../context/UserManagementContext';
import { User, Mail, Lock, UserCircle, Phone, MapPin, Building, Package, X } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer',
    location: '',
    businessName: '',
    categories: [] as string[],
    productsToSell: '',
    marketLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { login, register } = useAuth();
  const { resetPassword } = useUserManagement();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;

      if (isLogin) {
        result = await login(formData.email, formData.password);
        if (!result.success) {
          setError('Invalid email or password. Please check your credentials.');
          setLoading(false);
          return;
        }
      } else {
        const registerData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role as 'buyer' | 'vendor' | 'admin',
          location: formData.location || undefined,
          vendorDetails: formData.role === 'vendor' ? {
            businessName: formData.businessName || undefined,
            categories: formData.categories,
            productsToSell: formData.productsToSell.split(',').map(p => p.trim()).filter(p => p),
            marketLocation: formData.marketLocation || undefined
          } : undefined
        };

        result = await register(registerData);
        if (!result.success) {
          setError('Email already exists. Please use a different email or sign in.');
          setLoading(false);
          return;
        }
      }

      if (result.role === 'buyer') {
        navigate('/buyer/dashboard');
      } else if (result.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (result.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openResetModal = () => {
    setResetIdentifier('');
    setNewPassword('');
    setConfirmPassword('');
    setResetSuccess(false);
    setError('');
    setShowForgotPassword(true);
  };

  const closeResetModal = () => {
    setShowForgotPassword(false);
    setResetIdentifier('');
    setNewPassword('');
    setConfirmPassword('');
    setResetSuccess(false);
    setError('');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const success = resetPassword(resetIdentifier.trim(), newPassword);
      if (success) {
        setResetSuccess(true);
        setTimeout(() => {
          closeResetModal();
        }, 2500);
      } else {
        setError('No account found with that email or phone number.');
      }
    } catch (err) {
      console.error('Reset error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const availableCategories = [
    'Fresh Produce',
    'Vegetables',
    'Grains & Cereals',
    'Meat & Poultry',
    'Fish & Seafood',
    'Spices & Seasonings',
    'Traditional Fabrics',
    'Clothing',
    'Household Items'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to continue to MarketDay' : 'Join Eruwa\'s marketplace community'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+234 800 000 0000"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm mb-2">Account Type</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="buyer">Buyer - Shop from markets</option>
                <option value="vendor">Vendor - Sell products</option>
                <option value="admin">Admin - Manage platform</option>
              </select>
            </div>
          )}

          {!isLogin && formData.role === 'buyer' && (
            <div>
              <label className="block text-sm mb-2">Location (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Eruwa, Oyo"
                />
              </div>
            </div>
          )}

          {!isLogin && formData.role === 'vendor' && (
            <>
              <div>
                <label className="block text-sm mb-2">Business Name (Optional)</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Fresh Foods Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Product Categories</label>
                <div className="grid grid-cols-2 gap-2 p-3 border border-input rounded-lg max-h-40 overflow-y-auto">
                  {availableCategories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Products to Sell</label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <textarea
                    value={formData.productsToSell}
                    onChange={e => setFormData({ ...formData, productsToSell: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Tomatoes, Peppers, Onions (comma separated)"
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Market Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.marketLocation}
                    onChange={e => setFormData({ ...formData, marketLocation: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Maya Market"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {isLogin && (
          <div className="mt-4 text-center">
            <button
              onClick={openResetModal}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-primary hover:underline"
          >
            {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <button
                onClick={closeResetModal}
                className="p-2 hover:bg-accent rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold mb-2">Password Reset Successful!</p>
                <p className="text-sm text-muted-foreground">You can now sign in with your new password.</p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Enter the email or phone number linked to your account, then choose a new password.
                </p>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-2">Email or Phone Number</label>
                  <input
                    type="text"
                    value={resetIdentifier}
                    onChange={e => setResetIdentifier(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email or phone"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="At least 6 characters"
                    minLength={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      confirmPassword && confirmPassword !== newPassword
                        ? 'border-destructive'
                        : 'border-input'
                    }`}
                    placeholder="Re-enter your new password"
                    required
                  />
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
