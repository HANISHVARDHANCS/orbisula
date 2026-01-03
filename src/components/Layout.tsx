import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, Plus, PieChart, Share2, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { logout, getUser } from '@/lib/storage';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/trips', label: 'My Trips', icon: MapPin },
  { path: '/create', label: 'New Trip', icon: Plus },
  { path: '/budget', label: 'Budget', icon: PieChart },
  { path: '/share', label: 'Share', icon: Share2 },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="gradient-hero text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl hidden sm:block">GlobeTrotter</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-foreground/20 font-semibold'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm opacity-90">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-foreground/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur-sm pb-4 animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-foreground/20 font-semibold'
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 transition-all text-left mt-2 border-t border-primary-foreground/20 pt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
