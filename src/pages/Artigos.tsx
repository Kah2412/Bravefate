import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Clock, Heart, MessageCircle } from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
}

const featuredArticles: Article[] = [
  { id: 1, title: "O legado de Marie Curie na ciência moderna", author: "Dra. Ana Silva", excerpt: "Como os descobrimentos de Marie Curie moldaram a física nuclear e a medicina moderna...", date: "2024-03-08", likes: 42, comments: 8, category: "Ciência" },
  { id: 2, title: "Mulheres na tecnologia: de Ada Lovelace a hoje", author: "Prof. Maria Santos", excerpt: "Uma jornada pelas contribuições femininas na computação desde o primeiro algoritmo...", date: "2024-03-05", likes: 38, comments: 12, category: "Tecnologia" },
  { id: 3, title: "A força silenciosa: Clarice Lispector e a introspecção", author: "Laura Mendes", excerpt: "Explorando como a escrita de Clarice transcendeu o literário e se tornou filosófica...", date: "2024-02-28", likes: 55, comments: 15, category: "Literatura" },
  { id: 4, title: "Saúde mental feminina: quebrando tabus", author: "Dra. Carla Oliveira", excerpt: "A importância do acolhimento psicológico e o papel das redes de apoio...", date: "2024-02-20", likes: 67, comments: 23, category: "Saúde" },
];

const Artigos = () => {
  const [showForm, setShowForm] = useState(false);
  const [articles] = useState<Article[]>(featuredArticles);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-gradient">
            Artigos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Espaço para mulheres compartilharem conhecimento, histórias e reflexões
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <PenTool className="w-4 h-4" />
            {showForm ? "Cancelar" : "Escrever Artigo"}
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <input
                type="text"
                placeholder="Título: Sua história de força, conhecimento ou reflexão..."
                className="w-full p-3 rounded-xl border border-input bg-background font-display text-lg focus:ring-2 focus:ring-ring outline-none"
              />
              <input
                type="text"
                placeholder="Seu nome (será publicado com crédito)"
                className="w-full p-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
              />
              <select className="w-full p-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none">
                <option>Categoria</option>
                <option>Ciência</option>
                <option>Tecnologia</option>
                <option>Literatura</option>
                <option>Saúde</option>
                <option>Ativismo</option>
                <option>Arte</option>
              </select>
              <textarea
                placeholder="Compartilhe sua experiência, insights ou conhecimento que pode impactar outras mulheres..."
                rows={8}
                className="w-full p-3 rounded-xl border border-input bg-background text-sm resize-none focus:ring-2 focus:ring-ring outline-none"
              />
              <button className="w-full p-3 rounded-xl gradient-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Publicar Artigo
              </button>
            </div>
          </motion.div>
        )}

        {/* Articles list */}
        <div className="max-w-3xl mx-auto space-y-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{article.author}</span>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {article.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {article.comments}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artigos;
