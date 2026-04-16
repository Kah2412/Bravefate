import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("Brave: Usuário acessou rota inexistente -", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Heart className="w-24 h-24 mx-auto text-accent opacity-20 mb-4" />
          <h1 className="text-7xl font-display font-bold text-gradient mb-2">404</h1>
        </motion.div>

        <h2 className="text-2xl font-display font-bold mb-3">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Essa página desapareceu. Mas você não. Vamos levá-la de volta ao caminho.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>
          <p className="text-xs text-muted-foreground">
            Se essa página deveria existir, nos avise pelo Apoio
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
