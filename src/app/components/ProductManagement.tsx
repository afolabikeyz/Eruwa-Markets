import { useState } from 'react';
import Header from './Header';
import { Package, Search, Eye, Star, Edit, Trash2, Plus } from 'lucide-react';
import { products } from '../data/mockData';
import AddProductModal from './AddProductModal';
import { useNotifications } from '../context/NotificationContext';

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addNotification } = useNotifications();
  const myProducts = products.slice(0, 15);

  const filteredProducts = myProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (productName: string) => {
    addNotification({
      type: 'general',
      title: 'Product Deleted',
      message: `${productName} has been removed from your store`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your product listings</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            aria-label="Add new product"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Product</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Stock</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Views</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Rating</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-border hover:bg-accent/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary/50" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.market}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-primary">₦{product.price.toLocaleString()}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.stock > 50 ? 'bg-secondary/10 text-secondary' :
                        product.stock > 20 ? 'bg-primary/10 text-primary' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.name)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
