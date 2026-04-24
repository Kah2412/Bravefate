import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, BookOpen, Users, Swords, Mic2, Heart, ShieldAlert, AlertTriangle, Lightbulb, User, LogOut, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const { t } = useI18n();

  const navItems = [
    { path: "/", label: t("navbar.home"), icon: Shield },
    { path: "/mulheres", label: t("navbar.women"), icon: Users },
    { path: "/arena", label: t("navbar.arena"), icon: Swords },
    { path: "/artigos", label: t("navbar.articles"), icon: BookOpen },
    { path: "/palestras", label: t("navbar.talks"), icon: Mic2 },
    { path: "/doacoes", label: t("navbar.donations"), icon: Heart },
    { path: "/protocolos", label: t("navbar.protocols"), icon: ShieldAlert },
  ];

  const supportItems = [
    { path: "/apoio", label: t("navbar.support"), icon: AlertTriangle, highlight: true },
    { path: "/livros", label: t("navbar.books"), icon: Lightbulb },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold text-gradient">
          <Zap className="w-6 h-6" />
          Brave
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === path ? "text-accent" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <div className="w-px h-5 bg-border" />

          {supportItems.map(({ path, label, icon: Icon, highlight }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                highlight
                  ? location.pathname === path
                    ? "gradient-accent text-accent-foreground"
                    : "text-rose-deep hover:bg-rose-soft/20"
                  : location.pathname === path
                    ? "text-accent"
                    : "text-muted-foreground hover:text-accent"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <div className="w-px h-5 bg-border" />
          <LanguageSwitcher />
          <div className="w-px h-5 bg-border" />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  location.pathname === "/profile" ? "text-accent" : "text-muted-foreground hover:text-accent"
                }`}
              >
                <User className="w-4 h-4" />
                {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                {t("navbar.logout")}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                location.pathname === "/login" ? "text-accent" : "text-muted-foreground hover:text-accent"
              }`}
            >
              <User className="w-4 h-4" />
              {t("navbar.login")}
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-card border-t border-border"
          >
            <div className="p-4 flex flex-col gap-3">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === path ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              {supportItems.map(({ path, label, icon: Icon, highlight }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    highlight && location.pathname === path
                      ? "gradient-accent text-accent-foreground"
                      : location.pathname === path
                        ? "bg-accent/10 text-accent"
                        : highlight
                          ? "text-rose-deep hover:bg-rose-soft/20"
                          : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />
              <LanguageSwitcher mobile />
              <div className="h-px bg-border my-2" />

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      location.pathname === "/profile"
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    {user.username}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("navbar.logout")}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === "/login"
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <User className="w-4 h-4" />
                  {t("navbar.login")}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
