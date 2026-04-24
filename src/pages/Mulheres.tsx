import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import WomanCard from "@/components/WomanCard";
import { women, categories, FALLBACK_WOMEN } from "@/data/women";
import { useI18n } from "@/i18n";

const Mulheres = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof women[0] | null>(null);
  const { t } = useI18n();

  const activeWomen = women.length > 0 ? women : FALLBACK_WOMEN;

  const filtered = useMemo(() => {
    return activeWomen.filter((woman) => {
      const matchSearch =
        !search ||
        woman.name.toLowerCase().includes(search.toLowerCase()) ||
        woman.profession.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || woman.category === category;
      return matchSearch && matchCategory;
    });
  }, [search, category, activeWomen]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-gradient">{t("women.title")}</h1>
          <p className="text-muted-foreground">{t("women.subtitle", { count: activeWomen.length })}</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("women.searchPlaceholder")}
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
              {t("common.all")}
            </button>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  category === item ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((woman, index) => (
            <WomanCard key={woman.name} woman={woman} index={index} onClick={() => setSelected(woman)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>{t("women.noneFound")}</p>
          </div>
        )}
      </div>

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
              onClick={(event) => event.stopPropagation()}
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
                    <p className="text-xs text-muted-foreground mb-1">{t("women.arenaClass")}</p>
                    <p className="font-display font-semibold text-lg">{selected.gameClass}</p>
                    <p className="text-sm text-accent">{selected.gameSkill}</p>
                    <div className="mt-2 h-2 rounded-full bg-background overflow-hidden">
                      <div className="h-full rounded-full gradient-accent" style={{ width: `${selected.power}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("women.power")}: {selected.power}/100
                    </p>
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
