import { useState } from 'react';
import { Link } from 'react-router';
import Header from './Header';
import AddProductModal from './AddProductModal';
import { Package, DollarSign, ShoppingCart, TrendingUp, Eye, Star, Plus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { products } from '../data/mockData';

export default function VendorDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const myProducts = products.slice(0, 5);

  const revenueData = [
    { id: 'mon', date: 'Mon', revenue: 12000 },
    { id: 'tue', date: 'Tue', revenue: 18000 },
    { id: 'wed', date: 'Wed', revenue: 15000 },
    { id: 'thu', date: 'Thu', revenue: 22000 },
    { id: 'fri', date: 'Fri', revenue: 28000 },
    { id: 'sat', date: 'Sat', revenue: 35000 },
    { id: 'sun', date: 'Sun', revenue: 25000 }
  ];

  const categoryData = [
    { id: 'produce', name: 'Fresh Produce', value: 45 },
    { id: 'grains', name: 'Grains', value: 25 },
    { id: 'meat', name: 'Meat & Fish', value: 20 },
    { id: 'others', name: 'Others', value: 10 }
  ];

  const COLORS = ['#d97706', '#16a34a', '#0284c7', '#7c3aed'];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Vendor Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your store and track performance</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            aria-label="Add new product"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <button
            onClick={() => window.scrollTo({ top: document.querySelector('.revenue-chart')?.getBoundingClientRect().top || 0, behavior: 'smooth' })}
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-left"
            aria-label="View revenue details"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-secondary">+12.5%</span>
            </div>
            <h3 className="font-semibold mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-primary">₦155,000</p>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </button>

          <Link
            to="/orders"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View all orders"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs text-secondary">+8.2%</span>
            </div>
            <h3 className="font-semibold mb-1">Orders</h3>
            <p className="text-2xl font-bold">127</p>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </Link>

          <Link
            to="/vendor/products"
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            aria-label="View all products"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-chart-3" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Products</h3>
            <p className="text-2xl font-bold">45</p>
            <p className="text-xs text-muted-foreground mt-1">Active listings</p>
          </Link>

          <button
            onClick={() => window.scrollTo({ top: document.querySelector('.products-table')?.getBoundingClientRect().top || 0, behavior: 'smooth' })}
            className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-left"
            aria-label="View rating details"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-1">Rating</h3>
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-xs text-muted-foreground mt-1">467 reviews</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-border p-6 revenue-chart">
            <h2 className="font-bold text-lg mb-4">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis" dataKey="date" stroke="#666" fontSize={12} />
                <YAxis key="yaxis" stroke="#666" fontSize={12} />
                <Tooltip key="tooltip" />
                <Line
                  key="revenue-line"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#d97706"
                  strokeWidth={3}
                  dot={{ fill: '#d97706', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-xl font-bold text-primary">₦25,000</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-xl font-bold">₦155,000</p>
              </div>
              <div className="p-3 bg-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold">₦520,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-border p-6">
            <h2 className="font-bold text-lg mb-4">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  key="sales-pie"
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip key="pie-tooltip" />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border p-6 products-table">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Your Products</h2>
            <Link to="/vendor/products" className="text-primary hover:underline text-sm">
              Manage All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Views</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map(product => (
                  <tr key={product.id} className="border-b border-border hover:bg-accent/30">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary/50" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="py-4 px-4 font-semibold text-primary">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.stock > 50 ? 'bg-secondary/10 text-secondary' :
                        product.stock > 20 ? 'bg-primary/10 text-primary' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
