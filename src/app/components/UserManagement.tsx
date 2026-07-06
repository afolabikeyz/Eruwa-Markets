import { useState } from 'react';
import Header from './Header';
import { Users, UserPlus, Trash2, Search, Filter, ShoppingBag, Store, Shield, X, Mail, Phone, MapPin, Package, Building } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useUserManagement } from '../context/UserManagementContext';

export default function UserManagement() {
  const { addNotification } = useNotifications();
  const { allUsers, addUser, removeUser, toggleUserStatus } = useUserManagement();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'buyer' | 'vendor' | 'admin'>('all');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer' as 'buyer' | 'vendor' | 'admin',
    location: '',
    businessName: '',
    categories: [] as string[],
    productsToSell: '',
    marketLocation: ''
  });

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.password) {
      addNotification({
        type: 'general',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    const user = addUser({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      role: newUser.role,
      location: newUser.location || undefined,
      vendorDetails: newUser.role === 'vendor' ? {
        businessName: newUser.businessName || undefined,
        categories: newUser.categories,
        productsToSell: newUser.productsToSell.split(',').map(p => p.trim()).filter(p => p),
        marketLocation: newUser.marketLocation || undefined
      } : undefined
    });

    setAddUserModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'buyer',
      location: '',
      businessName: '',
      categories: [],
      productsToSell: '',
      marketLocation: ''
    });

    addNotification({
      type: 'general',
      title: 'User Added',
      message: `${user.name} has been added as ${user.role}`
    });
  };

  const handleRemoveUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to remove ${userName}?`)) {
      removeUser(userId);
      addNotification({
        type: 'general',
        title: 'User Removed',
        message: `${userName} has been removed from the system`
      });
    }
  };

  const handleToggleStatus = (userId: string) => {
    toggleUserStatus(userId);
  };

  const toggleCategory = (category: string) => {
    setNewUser(prev => ({
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'buyer': return ShoppingBag;
      case 'vendor': return Store;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'buyer': return 'bg-blue-100 text-blue-700';
      case 'vendor': return 'bg-purple-100 text-purple-700';
      case 'admin': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">User Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Add, remove, and monitor all platform users
            </p>
          </div>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.length}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter(u => u.role === 'buyer').length}</p>
                <p className="text-xs text-muted-foreground">Buyers</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter(u => u.role === 'vendor').length}</p>
                <p className="text-xs text-muted-foreground">Vendors</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allUsers.filter(u => u.role === 'admin').length}</p>
                <p className="text-xs text-muted-foreground">Admins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setRoleFilter('buyer')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === 'buyer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
              >
                Buyers
              </button>
              <button
                onClick={() => setRoleFilter('vendor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === 'vendor'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
              >
                Vendors
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  roleFilter === 'admin'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
              >
                Admins
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
        </p>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-sm">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Activity</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map(user => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <tr key={user.id} className="hover:bg-accent/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {user.location || 'N/A'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          <RoleIcon className="w-3 h-3" />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                          <p className="text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {user.role === 'buyer' && (
                            <p className="text-sm">
                              <span className="font-semibold">{user.totalOrders}</span> orders
                            </p>
                          )}
                          {user.role === 'vendor' && (
                            <>
                              <p className="text-sm">
                                <span className="font-semibold">{user.totalSales}</span> sales
                              </p>
                              {user.vendorDetails?.productsToSell && user.vendorDetails.productsToSell.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  Sells: {user.vendorDetails.productsToSell.slice(0, 3).join(', ')}
                                  {user.vendorDetails.productsToSell.length > 3 && '...'}
                                </p>
                              )}
                            </>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Joined {user.joinDate.toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.status === 'active' ? 'Active' : 'Suspended'}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleRemoveUser(user.id, user.name)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          aria-label={`Remove ${user.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center mt-6">
            <Users className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No users found</h2>
            <p className="text-muted-foreground">
              {searchQuery ? `No users match "${searchQuery}"` : 'No users in this category'}
            </p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Add New User</h3>
              <button
                onClick={() => setAddUserModalOpen(false)}
                className="p-2 hover:bg-accent rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+234 801 234 5678"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'buyer' | 'vendor' | 'admin' })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="buyer">Buyer</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {newUser.role === 'buyer' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                    placeholder="e.g., Eruwa, Oyo"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {newUser.role === 'vendor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={newUser.businessName}
                        onChange={(e) => setNewUser({ ...newUser, businessName: e.target.value })}
                        placeholder="e.g., Fresh Foods Ltd"
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Product Categories</label>
                    <div className="grid grid-cols-2 gap-2 p-3 border border-input rounded-lg max-h-32 overflow-y-auto">
                      {availableCategories.map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newUser.categories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-primary focus:ring-primary rounded"
                          />
                          <span className="text-xs">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Products to Sell</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <textarea
                        value={newUser.productsToSell}
                        onChange={(e) => setNewUser({ ...newUser, productsToSell: e.target.value })}
                        placeholder="e.g., Tomatoes, Peppers, Onions"
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Market Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={newUser.marketLocation}
                        onChange={(e) => setNewUser({ ...newUser, marketLocation: e.target.value })}
                        placeholder="e.g., Maya Market"
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setAddUserModalOpen(false)}
                className="flex-1 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
