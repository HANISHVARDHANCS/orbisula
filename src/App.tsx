import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "@/lib/storage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import CreateTrip from "./pages/CreateTrip";
import Budget from "./pages/Budget";
import Share from "./pages/Share";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Simple auth guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/share" element={<ProtectedRoute><Share /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
