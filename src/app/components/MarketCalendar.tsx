import { useState } from 'react';
import Header from './Header';
import { Calendar, MapPin, Clock, Users, ChevronRight, Filter, Search, ChevronLeft, Store } from 'lucide-react';
import { markets, vendors } from '../data/mockData';
import { Link } from 'react-router';

export default function MarketCalendar() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const filteredMarkets = markets.filter(market => {
    const matchesType = selectedType === 'all' || market.type === selectedType;
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const activeToday = markets.filter(m => m.isActiveToday);
  const upcomingMarkets = markets
    .filter(m => !m.isActiveToday)
    .sort((a, b) => a.nextMarketDay.getTime() - b.nextMarketDay.getTime());

  const getDaysUntil = (date: Date) => {
    const days = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-secondary text-white';
      case 'weekly': return 'bg-primary text-white';
      case 'cycle': return 'bg-chart-3 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMarketsForDate = (date: Date) => {
    const cycleBase = new Date('2026-07-02T00:00:00');
    cycleBase.setHours(0, 0, 0, 0);
    const target = new Date(date); target.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((target.getTime() - cycleBase.getTime()) / (1000 * 60 * 60 * 24));
    const offsets: Record<string, number> = {
      'Maya Market': 0,
      'Towobowo Market': 1,
      'Okolo Market': 2,
      'Temidire Market': 4
    };
    return markets.filter(market => {
      const offset = offsets[market.name];
      if (offset === undefined) return false;
      return ((daysDiff - offset) % 5 + 5) % 5 === 0;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const marketVendors = selectedMarket
    ? vendors.filter(v => v.market === markets.find(m => m.id === selectedMarket)?.name)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Market Calendar</h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Discover when your favorite markets are open and plan your shopping accordingly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{activeToday.length}</h3>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{markets.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Markets</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {markets.reduce((sum, m) => sum + m.vendors, 0)}
                  </h3>
                  <p className="text-sm text-muted-foreground">Total Vendors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-input hover:bg-accent'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-input hover:bg-accent'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {viewMode === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const marketsOnDay = getMarketsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-2 ${
                      isToday ? 'border-primary bg-primary/5' : 'border-border'
                    } hover:bg-accent transition-colors`}
                  >
                    <div className="text-sm font-semibold mb-1">{day}</div>
                    <div className="space-y-1">
                      {marketsOnDay.slice(0, 2).map(market => (
                        <div
                          key={market.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${
                            market.type === 'daily' ? 'bg-secondary/20 text-secondary' :
                            market.type === 'weekly' ? 'bg-primary/20 text-primary' :
                            'bg-chart-3/20 text-chart-3'
                          }`}
                          title={market.name}
                        >
                          {market.name.split(' ')[0]}
                        </div>
                      ))}
                      {marketsOnDay.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{marketsOnDay.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-chart-3/20 border border-chart-3 rounded"></div>
                <span className="text-sm">5-Day Cycle Market</span>
              </div>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setViewMode('list');
                }}
                className="text-sm text-primary hover:underline"
              >
                View All Markets
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search markets by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search markets"
              role="searchbox"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Filter markets by type">
            {['all', 'cycle'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-white border border-input hover:bg-accent'
                }`}
                aria-pressed={selectedType === type}
                aria-label={`Filter by ${type} markets`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {selectedMarket && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Vendors at {markets.find(m => m.id === selectedMarket)?.name}
              </h2>
              <button
                onClick={() => setSelectedMarket(null)}
                className="text-sm text-primary hover:underline"
              >
                Close
              </button>
            </div>

            {marketVendors.length === 0 ? (
              <div className="text-center py-8">
                <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No vendors found for this market</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketVendors.map(vendor => (
                  <div
                    key={vendor.id}
                    className="p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <span>⭐ {vendor.rating}</span>
                          <span>•</span>
                          <span>{vendor.reviews} reviews</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{vendor.products} products</span>
                          <Link
                            to="/products"
                            className="text-primary hover:underline"
                          >
                            View Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'list' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {selectedType === 'all' ? 'Open Today' :
               `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Markets`}
            </h2>
          {filteredMarkets.filter(m => selectedType === 'all' ? m.isActiveToday : true).length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No markets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.filter(m => selectedType === 'all' ? m.isActiveToday : true).map(market => (
                <div
                  key={market.id}
                  className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{market.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <p className="text-sm font-medium">{market.location}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${getTypeColor(market.type)} flex-shrink-0`}>
                        {market.type}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{market.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{market.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{market.vendors} vendors</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {market.categories.slice(0, 3).map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/products?market=${market.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >
                        Products
                      </Link>
                      <button
                        onClick={() => setSelectedMarket(market.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-input rounded-lg hover:bg-accent transition-colors text-sm"
                      >
                        Vendors
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        )}

        {viewMode === 'list' && selectedType === 'all' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMarkets.filter(m => filteredMarkets.includes(m)).map(market => (
              <div
                key={market.id}
                className="bg-white rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  <img
                    src={market.image}
                    alt={market.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{market.name}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm font-medium">{market.location}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${getTypeColor(market.type)} flex-shrink-0`}>
                      {market.type}
                    </span>
                  </div>

                  <div className="mb-4 p-3 bg-accent rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Market Day</span>
                      <span className="text-sm font-semibold text-primary">
                        {getDaysUntil(market.nextMarketDay)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {market.nextMarketDay.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{market.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{market.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{market.vendors} vendors</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {market.categories.slice(0, 3).map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedMarket(market.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 border border-input rounded-lg hover:bg-accent transition-colors text-sm"
                  >
                    View Vendors
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}

        {filteredMarkets.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center mt-8">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No markets found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
