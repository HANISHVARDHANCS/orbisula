import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import TripCard from '@/components/TripCard';
import { getTrips, deleteTrip, Trip } from '@/lib/storage';

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
      setTrips(getTrips());
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const today = new Date();
    const startDate = new Date(trip.startDate);
    
    if (filter === 'upcoming') return matchesSearch && startDate >= today;
    if (filter === 'past') return matchesSearch && startDate < today;
    return matchesSearch;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">My Trips</h1>
          <p className="text-muted-foreground mt-1">{trips.length} adventures planned</p>
        </div>
        <Link
          to="/create"
          className="btn-primary inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-5 h-5" />
          New Trip
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search trips or destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-travel pl-12 w-full"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {(['all', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trip Grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-2xl">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No trips found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try a different search term' : 'Start planning your first adventure!'}
          </p>
          {!searchTerm && (
            <Link to="/create" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Trip
            </Link>
          )}
        </div>
      )}
    </Layout>
  );
}
