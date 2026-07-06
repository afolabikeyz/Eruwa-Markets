import { useState } from 'react';
import Header from './Header';
import { Star, MapPin, Store, TrendingUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { vendors, products } from '../data/mockData';

export default function VendorList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('all');

  // Get unique markets
  const markets = Array.from(new Set(vendors.map(v => v.market)));

  // Filter vendors based on search query and market
  const filteredVendors = vendors.filter(vendor => {
    // Get all products from this vendor
    const vendorProducts = products.filter(p => p.vendor === vendor.name);

    // Check if vendor name, market, or any of their products match the search
    const matchesSearch = searchQuery === '' ||
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendorProducts.some(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Check if vendor market matches selected filter
    const matchesMarket = selectedMarket === 'all' || vendor.market === selectedMarket;

    return matchesSearch && matchesMarket;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Vendors</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse all verified vendors across Eruwa markets
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search vendors by name, market, or products they sell..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search vendors"
              role="searchbox"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMarket('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedMarket === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
              >
                All Markets
              </button>
              {markets.map(market => (
                <button
                  key={market}
                  onClick={() => setSelectedMarket(market)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMarket === market
                      ? 'bg-primary text-white'
                      : 'bg-white border border-input hover:bg-accent'
                  }`}
                >
                  {market}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => {
            const vendorProducts = products.filter(p => p.vendor === vendor.name);
            const vendorCategories = Array.from(new Set(vendorProducts.map(p => p.category))).slice(0, 3);

            return (
            <div
              key={vendor.id}
              className="bg-white rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.market}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold">{vendor.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({vendor.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">{vendor.products}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Sales</span>
                  <span className="font-medium">{vendor.sales}</span>
                </div>
              </div>

              {/* Categories this vendor sells */}
              {vendorCategories.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Specializes in:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendorCategories.map(category => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Link
                  to="/products"
                  className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center text-sm"
                >
                  View Products
                </Link>
                <button
                  className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
                  aria-label={`Follow ${vendor.name}`}
                >
                  <TrendingUp className="w-4 h-4" />
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {filteredVendors.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <Store className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No vendors found</h2>
            <p className="text-muted-foreground mb-4">
              {searchQuery ?
                `No vendors match "${searchQuery}"` :
                'Try adjusting your search or filter criteria'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMarket('all');
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
