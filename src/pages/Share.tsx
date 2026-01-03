import { useState, useEffect } from 'react';
import { Link2, Copy, Check, Mail, MessageCircle, Facebook, Twitter, QrCode, Eye } from 'lucide-react';
import Layout from '@/components/Layout';
import { getTrips, Trip } from '@/lib/storage';

export default function Share() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const allTrips = getTrips();
    setTrips(allTrips);
    if (allTrips.length > 0) {
      setSelectedTrip(allTrips[0]);
    }
  }, []);

  const shareUrl = selectedTrip 
    ? `https://globetrotter.app/trip/${selectedTrip.id}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500', url: `https://wa.me/?text=Check out my trip: ${shareUrl}` },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', url: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500', url: `https://twitter.com/intent/tweet?url=${shareUrl}` },
    { name: 'Email', icon: Mail, color: 'bg-gray-600', url: `mailto:?subject=My Trip&body=Check out my trip: ${shareUrl}` },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
          <Link2 className="w-8 h-8 text-primary" />
          Share Your Trip
        </h1>
        <p className="text-muted-foreground mt-1">Generate a public link to share with friends and family</p>
      </div>

      {trips.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Trip Selector */}
          <div className="card-travel p-6">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Select Trip to Share</label>
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

          {selectedTrip && (
            <>
              {/* Share Link */}
              <div className="card-travel p-6">
                <h2 className="font-display font-semibold text-lg mb-4">Public Share Link</h2>
                <div className="flex gap-3">
                  <div className="flex-1 bg-muted rounded-lg px-4 py-3 font-mono text-sm text-muted-foreground truncate">
                    {shareUrl}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
                      copied 
                        ? 'bg-secondary text-secondary-foreground' 
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Share */}
              <div className="card-travel p-6">
                <h2 className="font-display font-semibold text-lg mb-4">Share on Social Media</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white rounded-lg px-4 py-3 font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                      >
                        <Icon className="w-5 h-5" />
                        {social.name}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* QR Code (Fake) */}
              <div className="card-travel p-6">
                <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  QR Code
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-foreground rounded-lg p-2">
                    <div className="w-full h-full bg-background rounded grid grid-cols-8 gap-0.5 p-2">
                      {/* Fake QR pattern */}
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-background'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm mb-3">
                      Scan this QR code to open the trip on any device
                    </p>
                    <button className="text-primary font-medium text-sm hover:underline">
                      Download QR Code
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Button */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full card-travel p-4 flex items-center justify-center gap-2 text-primary font-medium hover:bg-primary/5 transition-colors"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide Preview' : 'Preview Shared Page'}
              </button>

              {/* Preview Card */}
              {showPreview && (
                <div className="card-travel overflow-hidden animate-fade-in">
                  <img
                    src={selectedTrip.image}
                    alt={selectedTrip.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display font-bold text-2xl mb-2">{selectedTrip.name}</h3>
                    <p className="text-muted-foreground mb-4">{selectedTrip.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedTrip.destinations.map((dest, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {new Date(selectedTrip.startDate).toLocaleDateString('en-IN')} - {new Date(selectedTrip.endDate).toLocaleDateString('en-IN')}
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{selectedTrip.budget.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-muted/50 rounded-2xl max-w-2xl mx-auto">
          <Link2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg mb-2">No trips to share</h3>
          <p className="text-muted-foreground">Create a trip first to generate a share link</p>
        </div>
      )}
    </Layout>
  );
}
