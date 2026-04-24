import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Swords, BookOpen, Mic2, ArrowRight, Sparkles, Heart, ShieldAlert, AlertTriangle, Lightbulb } from "lucide-react";
import WomanCard from "@/components/WomanCard";
import { women } from "@/data/women";
import { useI18n } from "@/i18n";

const featured = women.slice(0, 6);

const iconMap = [Users, Swords, BookOpen, Mic2, Heart, ShieldAlert];
const colorMap = [
  "bg-primary/15 text-primary",
  "bg-violet/15 text-violet",
  "bg-gold/15 text-gold",
  "bg-teal/15 text-teal",
  "bg-coral/15 text-coral",
  "bg-accent/15 text-accent",
];

const Index = () => {
  const { t, raw } = useI18n();
  const sectionCards = raw<Array<{ title: string; desc: string }>>("index.sectionCards");
  const sections = sectionCards.map((section, index) => ({
    ...section,
    icon: iconMap[index],
    path: ["/mulheres", "/arena", "/artigos", "/palestras", "/doacoes", "/protocolos"][index],
    color: colorMap[index],
  }));

  return (
    <div className="min-h-screen pt-20">
      <section className="gradient-hero min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet/10 rounded-full blur-3xl" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-coral/8 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 border border-accent/20"
            >
              <Sparkles className="w-4 h-4" />
              {t("index.badge")}
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-gradient">Brave</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              {t("index.description")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/mulheres"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-accent text-accent-foreground font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                {t("index.explore")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/doacoes"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl gradient-warm text-accent-foreground font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-coral/25"
              >
                <Heart className="w-4 h-4" /> {t("index.support")}
              </Link>
              <Link
                to="/arena"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-border bg-background hover:bg-muted transition-colors font-medium"
              >
                <Swords className="w-4 h-4" /> {t("index.arena")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, index) => (
            <motion.div key={section.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
              <Link to={section.path} className="block p-6 rounded-2xl glass-card card-hover group">
                <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.desc}</p>
                <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">{t("index.sectionsTitle")}</h2>
          <p className="text-muted-foreground">{t("index.sectionsDescription")}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Link to="/apoio" className="block p-6 rounded-2xl glass-card card-hover group border-2 border-rose-deep/30">
              <div className="w-12 h-12 rounded-xl bg-rose-deep/15 text-rose-deep flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{t("index.supportCardTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t("index.supportCardDescription")}</p>
              <div className="space-y-1 text-xs text-muted-foreground mb-3">
                <p>✓ {t("index.supportBullet1")}</p>
                <p>✓ {t("index.supportBullet2")}</p>
                <p>✓ {t("index.supportBullet3")}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-deep group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Link to="/livros" className="block p-6 rounded-2xl glass-card card-hover group">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{t("index.booksCardTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t("index.booksCardDescription")}</p>
              <div className="space-y-1 text-xs text-muted-foreground mb-3">
                <p>✓ {t("index.booksBullet1")}</p>
                <p>✓ {t("index.booksBullet2")}</p>
                <p>✓ {t("index.booksBullet3")}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">{t("index.featuredTitle")}</h2>
          <p className="text-muted-foreground">{t("index.featuredDescription")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((woman, index) => (
            <WomanCard key={woman.name} woman={woman} index={index} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/mulheres" className="inline-flex items-center gap-2 text-accent font-medium hover:underline">
            {t("index.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto rounded-3xl gradient-vibrant p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative">
            <ShieldAlert className="w-10 h-10 text-accent-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-accent-foreground mb-3">{t("index.helpTitle")}</h3>
            <p className="text-accent-foreground/80 mb-6 max-w-md mx-auto">{t("index.helpDescription")}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/protocolos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background/20 text-accent-foreground font-medium hover:bg-background/30 transition-colors backdrop-blur-sm"
              >
                {t("index.helpButton")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:180"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-foreground text-accent font-medium hover:opacity-90 transition-opacity"
              >
                {t("index.callButton")}
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
