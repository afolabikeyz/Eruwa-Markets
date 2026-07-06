import { Link } from 'react-router';
import Header from './Header';
import { Users, Store, ShoppingBag, DollarSign, TrendingUp, MapPin, Package, Activity, Shield, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { markets, products, vendors } from '../data/mockData';

export default function AdminDashboard() {
  const revenueData = [
    { id: 'jan', month: 'Jan', revenue: 125000 },
    { id: 'feb', month: 'Feb', revenue: 158000 },
    { id: 'mar', month: 'Mar', revenue: 142000 },
    { id: 'apr', month: 'Apr', revenue: 195000 },
    { id: 'may', month: 'May', revenue: 178000 },
    { id: 'jun', month: 'Jun', revenue: 225000 }
  ];

  const marketActivity = [
    { id: 'maya', market: 'Maya', orders: 234 },
    { id: 'towobowo', market: 'Towobowo', orders: 198 },
    { id: 'okolo', market: 'Okolo', orders: 176 },
    { id: 'temidire', market: 'Temidire', orders: 156 }
  ];

  const totalVendors = markets.reduce((sum, m) => sum + m.vendors, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-8 sm:py-12 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold">Admin Control Center</h1>
                  <p className="text-sm sm:text-base text-blue-100 mt-1">Platform Management & Analytics</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                <p className="text-xs text-blue-100">System Status</p>
                <div className="text-lg font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse block"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 -mt-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Link
            to="/admin/users"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-blue-400/30"
            aria-label="Manage all users"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full font-semibold">+15.3%</span>
            </div>
            <h3 className="font-semibold mb-1 text-blue-100">Manage Users</h3>
            <p className="text-3xl font-bold">12,458</p>
            <p className="text-xs text-blue-100 mt-1">Add, remove & monitor</p>
          </Link>

          <Link
            to="/vendors"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-purple-400/30"
            aria-label="View all vendors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full font-semibold">+8.7%</span>
            </div>
            <h3 className="font-semibold mb-1 text-purple-100">Total Vendors</h3>
            <p className="text-3xl font-bold">{totalVendors}</p>
            <p className="text-xs text-purple-100 mt-1">Verified sellers</p>
          </Link>

          <Link
            to="/products"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-indigo-400/30"
            aria-label="View all products"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full font-semibold">+12.1%</span>
            </div>
            <h3 className="font-semibold mb-1 text-indigo-100">Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
            <p className="text-xs text-indigo-100 mt-1">Active listings</p>
          </Link>

          <button
            onClick={() => window.scrollTo({ top: document.querySelector('.revenue-trend')?.getBoundingClientRect().top || 0, behavior: 'smooth' })}
            className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left border-2 border-cyan-400/30"
            aria-label="View revenue details"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs bg-white/20 backdrop-blur px-2 py-1 rounded-full font-semibold">+18.5%</span>
            </div>
            <h3 className="font-semibold mb-1 text-cyan-100">Revenue</h3>
            <p className="text-3xl font-bold">₦225,000</p>
            <p className="text-xs text-cyan-100 mt-1">This month</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl border-2 border-indigo-100 p-6 revenue-trend">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Revenue Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis key="xaxis" dataKey="month" stroke="#6366f1" fontSize={12} fontWeight={600} />
                <YAxis key="yaxis" stroke="#6366f1" fontSize={12} fontWeight={600} />
                <Tooltip key="tooltip" contentStyle={{ backgroundColor: '#4f46e5', color: 'white', borderRadius: '8px', border: 'none' }} />
                <Line
                  key="revenue-line"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{ fill: '#6366f1', r: 6, strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">This Month</p>
                <p className="text-2xl font-bold text-indigo-700">₦225,000</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Last Month</p>
                <p className="text-2xl font-bold text-purple-700">₦178,000</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border-2 border-cyan-200">
                <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wide">Growth</p>
                <p className="text-2xl font-bold text-teal-700">+26.4%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl border-2 border-purple-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Market Status</h2>
            </div>
            <div className="space-y-4">
              <Link
                to="/markets"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl hover:from-purple-200 hover:to-pink-200 transition-all border-2 border-purple-200"
                aria-label="View all markets"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-purple-700">{markets.length}</p>
                    <p className="text-xs text-purple-600 font-semibold">Total Markets</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/markets"
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl hover:from-blue-200 hover:to-cyan-200 transition-all border-2 border-blue-200"
                aria-label="View active markets today"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-blue-700">{markets.filter(m => m.isActiveToday).length}</p>
                    <p className="text-xs text-blue-600 font-semibold">Active Today</p>
                  </div>
                </div>
              </Link>

              <div className="space-y-3 mt-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-slate-200">
                <p className="text-sm font-bold text-slate-700 uppercase tracking-wide">Market Types</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Daily</span>
                    <span className="font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm">{markets.filter(m => m.type === 'daily').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Weekly</span>
                    <span className="font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm">{markets.filter(m => m.type === 'weekly').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-slate-600">Cycle</span>
                    <span className="font-bold text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full text-sm">{markets.filter(m => m.type === 'cycle').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl border-2 border-cyan-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Market Activity</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketActivity}>
                <CartesianGrid key="grid-market" strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis key="xaxis-market" dataKey="market" stroke="#0891b2" fontSize={12} fontWeight={600} />
                <YAxis key="yaxis-market" stroke="#0891b2" fontSize={12} fontWeight={600} />
                <Tooltip key="tooltip-market" contentStyle={{ backgroundColor: '#0891b2', color: 'white', borderRadius: '8px', border: 'none' }} />
                <Bar key="orders-bar" dataKey="orders" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-xl border-2 border-indigo-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Top Vendors</h2>
            </div>
            <div className="space-y-3">
              {vendors.slice(0, 5).map((vendor, index) => (
                <div key={vendor.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                    index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                    'bg-gradient-to-br from-indigo-500 to-purple-600'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{vendor.name}</p>
                    <p className="text-sm text-slate-600">{vendor.market}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-indigo-700">{vendor.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold">{vendor.reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
