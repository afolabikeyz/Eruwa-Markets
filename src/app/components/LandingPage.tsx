import { Link } from 'react-router';
import Header from './Header';
import { Calendar, ShoppingBag, TrendingUp, Bell, Shield, Zap, Users, MapPin } from 'lucide-react';
import { markets, products } from '../data/mockData';

export default function LandingPage() {
  const activeMarkets = markets.filter(m => m.isActiveToday);
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/10 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Discover Eruwa's
              <span className="text-primary block sm:inline"> Traditional Markets</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
              Connect with local vendors, discover market days, and shop fresh products from Eruwa's vibrant markets
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/products"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Browse Products
              </Link>
              <Link
                to="/markets"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-primary text-primary rounded-lg hover:bg-accent transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                View Market Calendar
              </Link>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Link
              to="/markets"
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
              aria-label="View all markets"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl sm:text-2xl">{markets.length}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Markets</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {activeMarkets.length} active today
              </p>
            </Link>

            <Link
              to="/vendors"
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
              aria-label="View all vendors"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl sm:text-2xl">500+</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Vendors</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Verified local sellers
              </p>
            </Link>

            <Link
              to="/products"
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
              aria-label="View all products"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl sm:text-2xl">1,234</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Products</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Fresh and quality items
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MarketDay?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the convenience of traditional markets with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Market Discovery</h3>
              <p className="text-sm text-muted-foreground">
                Never miss a market day with our intelligent calendar system
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered product suggestions based on your preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Get notified about market days, deals, and order updates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Safe and secure payment processing with Paystack & Flutterwave
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Active Markets Today</h2>
              <p className="text-muted-foreground">Explore markets open today</p>
            </div>
            <Link to="/markets" className="text-primary hover:underline">
              View All Markets
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMarkets.slice(0, 3).map(market => (
              <Link
                key={market.id}
                to="/markets"
                className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                aria-label={`View ${market.name} market details`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{market.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {market.location}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-secondary text-white text-xs rounded-full">
                      Open Today
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{market.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{market.vendors} vendors</span>
                    <span className="text-primary">{market.schedule}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Products</h2>
              <p className="text-muted-foreground">Popular items from our markets</p>
            </div>
            <Link to="/products" className="text-primary hover:underline">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
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
                    <div>
                      <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="px-2 py-1 bg-destructive text-white text-xs rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of buyers and vendors on Eruwa's premier market platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-accent transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">MarketDay</h3>
              <p className="text-xs sm:text-sm text-white/70">
                Connecting Eruwa's traditional markets with modern technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Quick Links</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <Link to="/markets" className="block text-white/70 hover:text-white">Markets</Link>
                <Link to="/products" className="block text-white/70 hover:text-white">Products</Link>
                <Link to="/auth" className="block text-white/70 hover:text-white">Sign In</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">For Vendors</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <Link to="/auth" className="block text-white/70 hover:text-white">Register Store</Link>
                <Link to="/vendor/dashboard" className="block text-white/70 hover:text-white">Vendor Portal</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Contact</h4>
              <div className="space-y-2 text-xs sm:text-sm text-white/70">
                <p>Eruwa, Oyo State, Nigeria</p>
                <p>support@marketday.ng</p>
                <p>+234 800 000 0000</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center text-xs sm:text-sm text-white/70">
            <p>&copy; 2024 MarketDay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
