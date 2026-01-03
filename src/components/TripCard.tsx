import { Trip } from '@/lib/storage';
import { Calendar, MapPin, IndianRupee, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export default function TripCard({ trip, onDelete, showActions = true }: TripCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="card-travel overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display font-bold text-lg text-primary-foreground line-clamp-1">
            {trip.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
        </div>

        {/* Destinations */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
          <div className="flex flex-wrap gap-1">
            {trip.destinations.slice(0, 3).map((dest, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary font-medium"
              >
                {dest}
              </span>
            ))}
            {trip.destinations.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                +{trip.destinations.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <IndianRupee className="w-4 h-4 text-accent" />
          <span>₹{trip.budget.toLocaleString('en-IN')}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {trip.description}
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2 border-t border-border">
            <Link
              to={`/create?edit=${trip.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(trip.id)}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
