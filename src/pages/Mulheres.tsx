import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import WomanCard from "@/components/WomanCard";
import { women, categories, FALLBACK_WOMEN } from "@/data/women";

const Mulheres = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof women[0] | null>(null);

  const activeWomen = women.length > 0 ? women : FALLBACK_WOMEN;

  const filtered = useMemo(() => {
    return activeWomen.filter((w) => {
      const matchSearch =
        !search ||
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.profession.toLowerCase().includes(search.toLowerCase());
      const matchCat = !category || w.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category, activeWomen]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-gradient">
            Mulheres Extraordinárias
          </h1>
          <p className="text-muted-foreground">
            {activeWomen.length} mulheres que transformaram o mundo
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou profissão..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !category ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  category === cat ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((w, i) => (
            <WomanCard key={w.name} woman={w} index={i} onClick={() => setSelected(w)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Nenhuma mulher encontrada com esses filtros.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-background p-8 shadow-2xl border border-border"
            >
              <div className="flex justify-end">
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(selected.name)}&backgroundColor=transparent`}
                  alt={selected.name}
                  className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 border-4 border-primary/30"
                />
                <h2 className="font-display text-2xl font-bold mb-1">{selected.name}</h2>
                <p className="text-accent font-medium mb-1">{selected.profession}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground mb-4">
                  {selected.category} · {selected.era}
                </span>
                <p className="text-muted-foreground leading-relaxed">{selected.description}</p>
                {selected.gameClass && (
                  <div className="mt-6 p-4 rounded-xl bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">Classe na Arena</p>
                    <p className="font-display font-semibold text-lg">{selected.gameClass}</p>
                    <p className="text-sm text-accent">{selected.gameSkill}</p>
                    <div className="mt-2 h-2 rounded-full bg-background overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-accent"
                        style={{ width: `${selected.power}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Poder: {selected.power}/100</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Mulheres;
