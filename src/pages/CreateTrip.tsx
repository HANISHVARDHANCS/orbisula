import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Save, X, Plus, MapPin, Calendar, FileText, IndianRupee, Image } from 'lucide-react';
import Layout from '@/components/Layout';
import { getTrips, saveTrip, Trip, indianCities, generateId } from '@/lib/storage';

const defaultImages = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: 30000,
    image: defaultImages[0],
  });
  const [destinations, setDestinations] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    if (editId) {
      const trip = getTrips().find(t => t.id === editId);
      if (trip) {
        setForm({
          name: trip.name,
          startDate: trip.startDate,
          endDate: trip.endDate,
          description: trip.description,
          budget: trip.budget,
          image: trip.image,
        });
        setDestinations(trip.destinations);
      }
    }
  }, [editId]);

  const filteredCities = indianCities.filter(
    city => city.toLowerCase().includes(citySearch.toLowerCase()) && !destinations.includes(city)
  );

  const addDestination = (city: string) => {
    setDestinations([...destinations, city]);
    setCitySearch('');
    setShowCityDropdown(false);
  };

  const removeDestination = (city: string) => {
    setDestinations(destinations.filter(d => d !== city));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trip: Trip = {
      id: editId || generateId(),
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      destinations,
      budget: form.budget,
      image: form.image,
    };

    saveTrip(trip);
    navigate('/trips');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {editId ? 'Edit Trip' : 'Create New Trip'}
          </h1>
          <p className="text-muted-foreground mt-1">
            Plan your perfect Indian adventure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Name */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <FileText className="w-4 h-4 text-primary" />
              Trip Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Kerala Backwaters Adventure"
              className="input-travel"
              required
            />
          </div>

          {/* Dates */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <Calendar className="w-4 h-4 text-primary" />
              Travel Dates
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="input-travel"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="input-travel"
                  required
                />
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <MapPin className="w-4 h-4 text-secondary" />
              Destinations
            </label>
            
            {/* Selected Destinations */}
            {destinations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {destinations.map((city) => (
                  <span
                    key={city}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium text-sm"
                  >
                    {city}
                    <button
                      type="button"
                      onClick={() => removeDestination(city)}
                      className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/30"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* City Search */}
            <div className="relative">
              <input
                type="text"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setShowCityDropdown(true);
                }}
                onFocus={() => setShowCityDropdown(true)}
                placeholder="Search and add cities..."
                className="input-travel"
              />
              
              {showCityDropdown && citySearch && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredCities.slice(0, 6).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => addDestination(city)}
                      className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4 text-primary" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Budget */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <IndianRupee className="w-4 h-4 text-accent" />
              Budget
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="font-semibold text-lg min-w-[100px] text-right">
                ₹{form.budget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <FileText className="w-4 h-4 text-primary" />
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your trip plans..."
              rows={4}
              className="input-travel resize-none"
            />
          </div>

          {/* Cover Image */}
          <div className="card-travel p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <Image className="w-4 h-4 text-primary" />
              Cover Image
            </label>
            <div className="grid grid-cols-5 gap-3">
              {defaultImages.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setForm({ ...form, image: img })}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    form.image === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              {editId ? 'Update Trip' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
