import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Bell, User, Search, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'buyer': return '/buyer/dashboard';
      case 'vendor': return '/vendor/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-primary">MarketDay</h1>
                <p className="text-xs text-muted-foreground">Eruwa Markets</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/markets" className="text-sm hover:text-primary transition-colors">
                Markets
              </Link>
              <Link to="/products" className="text-sm hover:text-primary transition-colors">
                Products
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2 hover:bg-accent rounded-lg relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-border max-h-96 overflow-y-auto z-50">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button
                      onClick={notifications.markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  {notifications.notifications.length === 0 ? (
                    <p className="p-4 text-sm text-muted-foreground">No notifications</p>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.notifications.map(notif => (
                        notif.link ? (
                          <Link
                            key={notif.id}
                            to={notif.link}
                            className={`p-4 hover:bg-accent cursor-pointer block ${!notif.read ? 'bg-accent/50' : ''}`}
                            onClick={() => {
                              notifications.markAsRead(notif.id);
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex gap-3">
                              {notif.icon && <notif.icon className="w-5 h-5 text-primary flex-shrink-0" />}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{notif.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notif.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <div
                            key={notif.id}
                            className={`p-4 hover:bg-accent cursor-pointer ${!notif.read ? 'bg-accent/50' : ''}`}
                            onClick={() => notifications.markAsRead(notif.id)}
                          >
                            <div className="flex gap-3">
                              {notif.icon && <notif.icon className="w-5 h-5 text-primary flex-shrink-0" />}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{notif.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notif.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {(!user || user.role !== 'vendor') && (
              <Link
                to="/cart"
                className="p-1.5 sm:p-2 hover:bg-accent rounded-lg relative transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-xs lg:text-sm">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs lg:text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden md:flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-xs lg:text-sm">Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-accent rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            <Link
              to="/markets"
              className="block px-4 py-2 hover:bg-accent rounded-lg"
              onClick={() => setShowMobileMenu(false)}
            >
              Markets
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 hover:bg-accent rounded-lg"
              onClick={() => setShowMobileMenu(false)}
            >
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-4 py-2 hover:bg-accent rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-accent rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-4 py-2 bg-primary text-white rounded-lg text-center"
                onClick={() => setShowMobileMenu(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
