import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Header from './Header';
import { Search, Filter, Star, ShoppingBag, TrendingUp, Tag } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' ||
        product.category.toLowerCase().includes(selectedCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const trendingProducts = products.filter(p => p.trending);

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      addNotification({
        type: 'general',
        title: 'Login Required',
        message: 'Please login to add items to your cart',
        link: '/auth'
      });
      navigate('/auth');
      return;
    }

    if (user?.role === 'vendor') {
      addNotification({
        type: 'general',
        title: 'Action Not Allowed',
        message: 'Vendors cannot purchase items. You can only sell products.',
        link: '/vendor/dashboard'
      });
      return;
    }

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=400',
      vendor: product.vendor
    });

    addNotification({
      type: 'general',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Browse Products</h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Discover fresh produce, quality goods, and unique items from Eruwa's markets
          </p>
        </div>
      </div>

      {trendingProducts.length > 0 && (
        <div className="bg-secondary text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingProducts.slice(0, 4).map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm opacity-90 mb-2">{product.vendor}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">₦{product.price.toLocaleString()}</span>
                    {product.discount && (
                      <span className="px-2 py-1 bg-destructive text-white text-xs rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 sticky top-24">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="category-filter" className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    aria-label="Filter by category"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sort-filter" className="text-sm font-medium mb-2 block">Sort By</label>
                  <select
                    id="sort-filter"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    aria-label="Sort products"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSortBy('featured');
                  }}
                  className="w-full py-2 text-sm text-primary hover:bg-accent rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search products by name or vendor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Search products"
                  role="searchbox"
                />
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {product.discount && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-destructive text-white text-xs rounded">
                            -{product.discount}%
                          </div>
                        )}
                        {product.trending && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-secondary text-white text-xs rounded flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-3 sm:p-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-semibold text-sm sm:text-base mb-1 hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 truncate">{product.vendor}</p>

                      <div className="flex items-center gap-1 mb-2 sm:mb-3">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                        <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 gap-1">
                        <div>
                          <span className="text-base sm:text-lg font-bold text-primary">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-muted-foreground line-through ml-1 sm:ml-2">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2 py-0.5 sm:py-1 bg-accent text-accent-foreground text-xs rounded">
                          {product.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.stock} in stock
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
