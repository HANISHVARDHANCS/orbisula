import { useState, useEffect } from 'react';
import { IndianRupee, Hotel, Utensils, Car, Ticket, ShoppingBag, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { getTrips, Trip } from '@/lib/storage';

interface BudgetCategory {
  name: string;
  amount: number;
  color: string;
  icon: typeof Hotel;
}

export default function Budget() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const allTrips = getTrips();
    setTrips(allTrips);
    if (allTrips.length > 0) {
      setSelectedTrip(allTrips[0]);
    }
  }, []);

  // Generate mock budget breakdown
  const getBudgetBreakdown = (budget: number): BudgetCategory[] => [
    { name: 'Accommodation', amount: Math.round(budget * 0.35), color: 'bg-primary', icon: Hotel },
    { name: 'Food & Dining', amount: Math.round(budget * 0.20), color: 'bg-secondary', icon: Utensils },
    { name: 'Transport', amount: Math.round(budget * 0.20), color: 'bg-accent', icon: Car },
    { name: 'Activities', amount: Math.round(budget * 0.15), color: 'bg-sunset', icon: Ticket },
    { name: 'Shopping', amount: Math.round(budget * 0.10), color: 'bg-forest', icon: ShoppingBag },
  ];

  const breakdown = selectedTrip ? getBudgetBreakdown(selectedTrip.budget) : [];
  const totalBudget = selectedTrip?.budget || 0;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
          <IndianRupee className="w-8 h-8 text-accent" />
          Budget Breakdown
        </h1>
        <p className="text-muted-foreground mt-1">Track and plan your travel expenses</p>
      </div>

      {/* Trip Selector */}
      {trips.length > 0 && (
        <div className="card-travel p-4 mb-6">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Trip</label>
          <select
            value={selectedTrip?.id || ''}
            onChange={(e) => setSelectedTrip(trips.find(t => t.id === e.target.value) || null)}
            className="input-travel"
          >
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>{trip.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedTrip ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Visual */}
          <div className="card-travel p-6">
            <h2 className="font-display font-semibold text-lg mb-6">Budget Distribution</h2>
            
            {/* Simple Pie Chart using CSS */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {breakdown.reduce((acc, cat, i) => {
                  const percentage = (cat.amount / totalBudget) * 100;
                  const previousTotal = acc.total;
                  const strokeDasharray = `${percentage} ${100 - percentage}`;
                  const strokeDashoffset = -previousTotal;
                  
                  acc.elements.push(
                    <circle
                      key={cat.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="20"
                      className={`${cat.color.replace('bg-', 'stroke-')}`}
                      style={{
                        strokeDasharray,
                        strokeDashoffset,
                      }}
                    />
                  );
                  acc.total += percentage;
                  return acc;
                }, { elements: [] as JSX.Element[], total: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="font-display font-bold text-2xl">₹{totalBudget.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
              {breakdown.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown List */}
          <div className="card-travel p-6">
            <h2 className="font-display font-semibold text-lg mb-6">Expense Categories</h2>
            <div className="space-y-4">
              {breakdown.map((cat) => {
                const Icon = cat.icon;
                const percentage = Math.round((cat.amount / totalBudget) * 100);
                
                return (
                  <div key={cat.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${cat.color} bg-opacity-20 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${cat.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{cat.name}</p>
                          <p className="text-sm text-muted-foreground">{percentage}% of budget</p>
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{cat.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="lg:col-span-2 card-travel p-6 gradient-ocean text-primary-foreground">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Budget Tips for {selectedTrip.destinations[0]}</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Book accommodations 2-3 weeks in advance for best rates</li>
                  <li>• Try local street food for authentic experiences at lower costs</li>
                  <li>• Use public transport or shared rides when possible</li>
                  <li>• Carry cash for small vendors and tips</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-2xl">
          <IndianRupee className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No trips to budget</h3>
          <p className="text-muted-foreground">Create a trip first to see budget breakdown</p>
        </div>
      )}
    </Layout>
  );
}
