import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, AlertCircle, Sparkles, ChevronRight, Shield } from "lucide-react";
import { fetchBooks, fetchBookCategories } from "@/lib/api";

interface Book {
  _id?: string;
  title: string;
  author: string;
  description: string;
  category: string;
  link: string;
  coverUrl?: string;
  thumbnailUrl?: string;
  sourceApi?: string;
  externalId?: string;
}

interface CategoryItem {
  id: string;
  label: string;
}

type CategoryChoice = CategoryItem | { id: string; label: string; icon: string };

const categories = [
  { id: "autoestima", label: "Autoestima", icon: "✨" },
  { id: "abuso", label: "Relacionamentos Abusivos", icon: "🛡️" },
  { id: "cura", label: "Cura Emocional", icon: "💚" },
  { id: "lideranca", label: "Liderança Feminina", icon: "👑" },
  { id: "ciencia", label: "Mulheres na Ciência", icon: "🔬" },
  { id: "recomeço", label: "Recomeço", icon: "🌱" },
];

const categoryIcons: Record<string, string> = {
  autoestima: "✨",
  abuso: "🛡️",
  cura: "💚",
  lideranca: "👑",
  ciencia: "🔬",
  recomeço: "🌱",
};

const placeholderCover = (book: { title: string; author: string; category: string }) => (
  <div className="relative w-full h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_40%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%),linear-gradient(225deg,rgba(255,255,255,0.03),transparent_45%)]" />
    <div className="relative z-10 flex h-full flex-col justify-between">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400">
          Biblioteca premium
        </span>
        <h3 className="text-2xl font-semibold leading-tight">{book.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{book.author || 'Autor desconhecido'}</p>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-100 shadow-lg shadow-slate-950/30">
          <Shield className="w-4 h-4 text-cyan-300" />
          {categoryIcons[book.category] ?? '📘'} {book.category || 'Sem categoria'}
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sem capa? Ainda assim, o card reserva uma experiência visual rica.</p>
      </div>
    </div>
  </div>
);

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const cover = book.coverUrl || book.thumbnailUrl;
  const categoryIcon = categoryIcons[book.category] || '📘';

  return (
    <AnimatePresence>
      <motion.a
        layout
        href={book.link || '#'}
        target={book.link ? '_blank' : undefined}
        rel={book.link ? 'noopener noreferrer' : undefined}
        whileHover={{ y: -8 }}
        className="group block rounded-[32px] overflow-hidden border border-white/10 bg-slate-950 shadow-[0_32px_120px_-64px_rgba(56,189,248,0.35)] transition hover:border-accent/50"
      >
        <div className="relative aspect-[9/12] overflow-hidden bg-slate-900">
          {cover ? (
            <img
              src={cover}
              alt={book.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              onError={(event) => {
                (event.target as HTMLImageElement).src = '';
              }}
            />
          ) : (
            placeholderCover(book)
          )}

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-100 shadow-lg shadow-slate-950/20">
              {book.sourceApi || 'Curadoria'}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-100 shadow-lg shadow-slate-950/20">
              {categoryIcon} {book.category || 'GÊNERO'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-100">
              {categoryIcon} {book.category}
            </span>
            {book.externalId ? (
              <span className="text-[11px] text-slate-500">#{book.externalId.slice(0, 8)}</span>
            ) : null}
          </div>

          <h3 className="text-xl font-semibold leading-tight text-slate-100 line-clamp-2">{book.title}</h3>
          <p className="mt-3 text-sm text-slate-400 line-clamp-2">{book.author || 'Autor desconhecido'}</p>

          <p className="mt-4 text-sm leading-6 text-slate-300 line-clamp-3">{book.description || 'Um título curado para inspirar e fortalecer sua jornada, mesmo sem capa visual disponível.'}</p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Descubra agora</span>
            <ChevronRight className="w-4 h-4 text-accent transition group-hover:translate-x-1" />
          </div>
        </div>
      </motion.a>
    </AnimatePresence>
  );
};

const Livros = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [categoriesState, setCategoriesState] = useState<CategoryChoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchBookCategories();
        setCategoriesState(response.categories || []);
      } catch {
        setCategoriesState([
          { id: 'autoestima', label: 'Autoestima' },
          { id: 'abuso', label: 'Relacionamentos Abusivos' },
          { id: 'cura', label: 'Cura Emocional' },
          { id: 'lideranca', label: 'Liderança Feminina' },
          { id: 'ciencia', label: 'Mulheres na Ciência' },
          { id: 'recomeço', label: 'Recomeço' }
        ]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBooks(search.trim(), selectedCategory || undefined);
        setBooks(response.books || []);
      } catch (err) {
        setError('Não foi possível carregar a biblioteca.');
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_45%),linear-gradient(180deg,#010617_0%,#0a1323_100%)] text-white">
      <section className="container mx-auto px-4 mb-12">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-6 shadow-[0_0_0_1px_rgba(56,189,248,0.12)]">
            <Sparkles className="w-4 h-4" />
            Biblioteca interativa e premium
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight mb-4 text-slate-100">
            Leituras que fortalecem sua jornada
          </h1>
          <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
            Descubra títulos selecionados para empoderar, curar e inspirar. Capas são carregadas automaticamente com Google Books e Open Library, garantindo que o visual não fique vazio.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mb-10">
        <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, autor ou tema..."
              className="w-full rounded-[32px] border border-white/10 bg-slate-950/80 py-4 pl-14 pr-5 text-white placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-[26px] px-4 py-3 text-sm font-semibold transition ${
                !selectedCategory ? 'bg-accent text-slate-950 shadow-lg shadow-accent/20' : 'bg-slate-900/85 text-slate-300 hover:bg-slate-900'
              }`}
            >
              Todas
            </button>
            {(categoriesState.length ? categoriesState : categories).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-[26px] px-4 py-3 text-sm font-semibold transition ${
                  selectedCategory === cat.id ? 'bg-accent text-slate-950 shadow-lg shadow-accent/20' : 'bg-slate-900/85 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {'icon' in cat ? <span>{(cat as any).icon}</span> : null} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-96 rounded-[32px] bg-slate-900/80 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-10 text-center shadow-xl">
            <AlertCircle className="mx-auto mb-4 h-16 w-16 text-slate-400" />
            <p className="text-xl font-semibold text-slate-100 mb-2">Erro ao carregar a biblioteca</p>
            <p className="text-slate-400">Verifique sua conexão ou tente novamente em alguns instantes.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="uppercase tracking-[0.3em] text-sm text-slate-500">Acervo</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-100">{books.length} livros prontos para explorar</h2>
                </div>
                <div className="rounded-full bg-gradient-to-r from-accent to-cyan-500 px-5 py-3 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20">
                  Biblioteca premium
                </div>
              </div>
            </div>

            {books.length > 0 ? (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book._id || `${book.title}-${book.author}`} book={book} />
                ))}
              </motion.div>
            ) : (
              <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-12 text-center shadow-xl">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-2">Nenhuma leitura encontrada</h3>
                <p className="text-slate-400">Ajuste sua busca ou explore outra categoria para encontrar inspiração.</p>
              </div>
            )}
          </>
        )}
      </section>

      <section className="container mx-auto px-4 mt-20">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/20">
          <h3 className="text-2xl font-semibold text-slate-100 mb-3">Visão da biblioteca</h3>
          <p className="text-slate-400 leading-relaxed">
            Essa seção agora une curadoria e tecnologia de capa dinâmica. Ela garante que cards sem imagem ainda sejam apresentados com um design premium e sem espaços vazios.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Livros;
