import Header from './Header';
import { ShoppingBag, Heart, Clock, TrendingUp, Package, Star, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { products, orders, markets } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BuyerDashboard() {
  const recommendations = products.filter(p => p.trending).slice(0, 4);

  const spendingData = [
    { id: 'jan', month: 'Jan', amount: 25000 },
    { id: 'feb', month: 'Feb', amount: 32000 },
    { id: 'mar', month: 'Mar', amount: 28000 },
    { id: 'apr', month: 'Apr', amount: 45000 },
    { id: 'may', month: 'May', amount: 38000 },
    { id: 'jun', month: 'Jun', amount: 52000 }
  ];

  const upcomingMarkets = markets
    .filter(m => m.isActiveToday || m.type === 'daily')
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome back! Here's your shopping overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Link
            to="/orders"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View all orders"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">{orders.length}</span>
            </div>
            <h3 className="font-semibold mb-1">Total Orders</h3>
            <p className="text-sm text-muted-foreground">All time purchases</p>
          </Link>

          <Link
            to="/orders"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View active orders"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-2xl font-bold">
                {orders.filter(o => o.status === 'processing' || o.status === 'in-transit').length}
              </span>
            </div>
            <h3 className="font-semibold mb-1">Active Orders</h3>
            <p className="text-sm text-muted-foreground">Currently processing</p>
          </Link>

          <Link
            to="/products"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View wishlist"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-chart-3" />
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>
            <h3 className="font-semibold mb-1">Wishlist</h3>
            <p className="text-sm text-muted-foreground">Saved products</p>
          </Link>

          <Link
            to="/vendors"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View followed vendors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">5</span>
            </div>
            <h3 className="font-semibold mb-1">Followed Vendors</h3>
            <p className="text-sm text-muted-foreground">Your favorites</p>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-bold text-lg">Market Days Calendar</h2>
            </div>
            <Link to="/markets" className="text-primary hover:underline text-sm">
              View All Markets
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingMarkets.map(market => (
              <Link
                key={market.id}
                to="/markets"
                className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{market.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {market.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        market.isActiveToday
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {market.isActiveToday ? 'Open Today' : market.schedule}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {market.type}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-accent/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Market Day Reminders</p>
                <p className="text-xs text-muted-foreground">
                  Get notified when your favorite markets are active. Follow vendors to receive updates about their market days.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.vendor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">₦{order.total.toLocaleString()}</p>
                    <p className={`text-xs ${
                      order.status === 'delivered' ? 'text-secondary' :
                      order.status === 'in-transit' ? 'text-primary' :
                      'text-chart-3'
                    }`}>
                      {order.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/orders"
              className="mt-4 w-full py-2 border border-input rounded-lg hover:bg-accent transition-colors text-center block"
            >
              View All Orders
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-bold text-lg mb-4">Monthly Spending</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={spendingData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis" dataKey="month" stroke="#666" fontSize={12} />
                <YAxis key="yaxis" stroke="#666" fontSize={12} />
                <Tooltip key="tooltip" />
                <Bar key="amount-bar" dataKey="amount" fill="#d97706" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold text-primary">₦52,000</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-xl font-bold">₦36,667</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="font-bold text-lg">Recommended for You</h2>
            </div>
            <Link to="/products" className="text-primary hover:underline text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
