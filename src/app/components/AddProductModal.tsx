import { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fresh Produce',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    market: 'Maya Market'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNotification({
      type: 'general',
      title: 'Product Added',
      message: `${formData.name} has been added successfully!`
    });

    setFormData({
      name: '',
      category: 'Fresh Produce',
      price: '',
      originalPrice: '',
      stock: '',
      description: '',
      market: 'Maya Market'
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Fresh Tomatoes"
              required
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
                aria-required="true"
              >
                <option>Fresh Produce</option>
                <option>Meat & Fish</option>
                <option>Grains & Cereals</option>
                <option>Textiles & Fashion</option>
                <option>Groceries</option>
                <option>Traditional Items</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Market *</label>
              <select
                value={formData.market}
                onChange={e => setFormData({ ...formData, market: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
                aria-required="true"
              >
                <option>Maya Market</option>
                <option>Towobowo Market</option>
                <option>Okolo Market</option>
                <option>Temidire Market</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price (₦) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="1500"
                required
                aria-required="true"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Price (₦)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="2000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="45"
                required
                aria-required="true"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              placeholder="Describe your product..."
              required
              aria-required="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Images</label>
            <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or GIF (MAX. 5MB)
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-input rounded-lg hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
