import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MfaVerify from "./pages/MfaVerify";
import KycUpload from "./pages/KycUpload";
import KycStatus from "./pages/KycStatus";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Marketplace from "./pages/Marketplace";
import LoanDetail from "./pages/LoanDetail";
import LoanRequest from "./pages/LoanRequest";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mfa-verify" element={<MfaVerify />} />
          <Route path="/kyc/upload" element={<KycUpload />} />
          <Route path="/kyc/status" element={<KycStatus />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/loan/:id" element={<LoanDetail />} />
          <Route path="/loan-request" element={<LoanRequest />} />
          <Route path="/security" element={<Security />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
