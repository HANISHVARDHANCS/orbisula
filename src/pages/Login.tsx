import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { login } from '@/lib/storage';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = login(email, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try test@test.com / 123');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center backdrop-blur-sm">
              <MapPin className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-3xl">OrbisUla</h1>
          </div>
          <h2 className="font-display text-5xl font-bold leading-tight mb-6">
            Plan Your Perfect
            <br />
            <span className="text-accent">Indian Adventure</span>
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Discover the magic of India with our easy-to-use trip planner. 
            From Kerala backwaters to Rajasthan palaces, plan it all in one place.
          </p>
          
          {/* Floating Stats */}
          <div className="flex gap-6 mt-12">
            {[
              { value: '25+', label: 'Cities' },
              { value: '60+', label: 'Activities' },
              { value: '1000+', label: 'Trips Planned' },
            ].map((stat, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-5 py-4">
                <div className="font-display font-bold text-2xl">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl gradient-ocean flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">OrbisUla</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">Sign in to continue your journey</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-secondary/10 rounded-xl p-4 mb-6 border border-secondary/20">
            <p className="text-sm text-secondary font-medium mb-1">🎉 Demo Credentials</p>
            <p className="text-sm text-muted-foreground">
              Email: <code className="bg-muted px-1 rounded">test@test.com</code> | 
              Password: <code className="bg-muted px-1 rounded">123</code>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm animate-fade-in">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@test.com"
                  className="input-travel pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="input-travel pl-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <button className="text-primary font-medium hover:underline">
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
