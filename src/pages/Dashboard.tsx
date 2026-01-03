import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Compass, Star, TrendingUp } from 'lucide-react';
import Layout from '@/components/Layout';
import TripCard from '@/components/TripCard';
import { getTrips, Trip, deleteTrip } from '@/lib/storage';

const quickPackages = [
  {
    id: 'kerala',
    name: 'Kerala Bliss',
    duration: '7 Days',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400',
    destinations: ['Kochi', 'Alleppey', 'Munnar'],
  },
  {
    id: 'rajasthan',
    name: 'Royal Rajasthan',
    duration: '8 Days',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
    destinations: ['Jaipur', 'Udaipur', 'Jodhpur'],
  },
  {
    id: 'goa',
    name: 'Goa Beach Escape',
    duration: '5 Days',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400',
    destinations: ['North Goa', 'South Goa'],
  },
  {
    id: 'himachal',
    name: 'Himalayan Heights',
    duration: '6 Days',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    destinations: ['Shimla', 'Manali', 'Kullu'],
  },
];

const popularCities = [
  { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300', trips: 234 },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300', trips: 456 },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300', trips: 321 },
  { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1537572263231-9c14e7803a4b?w=300', trips: 189 },
  { name: 'Varanasi', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=300', trips: 278 },
  { name: 'Udaipur', image: 'https://images.unsplash.com/photo-1586612438666-ffd0ae97ad36?w=300', trips: 198 },
];

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(id);
      setTrips(getTrips());
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-6 px-4 py-12 mb-8 gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Where to Next?
          </h1>
          <p className="text-lg opacity-90 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Plan your next adventure across incredible India. Explore curated packages or create your own itinerary.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all animate-slide-up"
          >
            <Plus className="w-5 h-5" />
            Plan New Trip
          </Link>
        </div>
      </section>

      {/* Quick Packages */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              Quick Packages
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Curated experiences for hassle-free travel</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickPackages.map((pkg) => (
            <div key={pkg.id} className="card-travel overflow-hidden group cursor-pointer">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="font-display font-semibold text-primary-foreground">{pkg.name}</h3>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{pkg.duration}</span>
                  <span className="font-semibold text-primary">₹{pkg.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {pkg.destinations.map((dest, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Trips */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <Compass className="w-6 h-6 text-primary" />
              My Trips
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Your planned adventures</p>
          </div>
          <Link to="/trips" className="text-primary font-medium text-sm hover:underline">
            View All →
          </Link>
        </div>
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.slice(0, 3).map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/50 rounded-2xl">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">No trips yet</h3>
            <p className="text-muted-foreground mb-4">Start planning your first adventure!</p>
            <Link to="/create" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Trip
            </Link>
          </div>
        )}
      </section>

      {/* Popular Cities */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-secondary" />
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Trending places across India</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCities.map((city) => (
            <div key={city.name} className="card-travel overflow-hidden cursor-pointer group">
              <div className="relative h-24 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              <div className="p-2 text-center">
                <h3 className="font-semibold text-sm">{city.name}</h3>
                <p className="text-xs text-muted-foreground">{city.trips} trips</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
