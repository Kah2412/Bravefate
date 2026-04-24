import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import DenunciaButton from "@/components/DenunciaButton";
import QuickExitButton from "@/components/support/QuickExitButton";
import { I18nProvider } from "@/i18n";
import Index from "./pages/Index";
import Mulheres from "./pages/Mulheres";
import Arena from "./pages/Arena";
import Artigos from "./pages/Artigos";
import Palestras from "./pages/Palestras";
import Doacoes from "./pages/Doacoes";
import Protocolos from "./pages/Protocolos";
import Apoio from "./pages/Apoio";
import AutoAvaliacao from "./pages/AutoAvaliacao";
import Livros from "./pages/Livros";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mulheres" element={<Mulheres />} />
            <Route path="/arena" element={<Arena />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/palestras" element={<Palestras />} />
            <Route path="/doacoes" element={<Doacoes />} />
            <Route path="/protocolos" element={<Protocolos />} />
            <Route path="/apoio" element={<Apoio />} />
            <Route path="/autoavaliacao" element={<AutoAvaliacao />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <DenunciaButton />
          <QuickExitButton />
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
