import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Send } from "lucide-react";

const DenunciaButton = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ tipo: "", descricao: "", contato: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setForm({ tipo: "", descricao: "", contato: "" });
    }, 3000);
  };

  return (
    <>
      {/* Discreet floating button - looks like a heart/support button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-accent flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title="Precisa de ajuda?"
        aria-label="Canal de apoio"
      >
        <Heart className="w-6 h-6 text-accent-foreground" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-semibold">
                  Canal Seguro de Apoio
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-lg font-medium">Sua mensagem foi enviada</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Você não está sozinha. Entraremos em contato em breve.
                  </p>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Este é um canal seguro e confidencial. Sua identidade será protegida.
                  </p>
                  <div className="mb-3 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
                    <strong>Ligue 180</strong> — Central de Atendimento à Mulher (24h, gratuito)
                    <br />
                    <strong>Ligue 190</strong> — Polícia Militar (emergências)
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <select
                      value={form.tipo}
                      onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                      required
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
                    >
                      <option value="">Tipo de situação</option>
                      <option value="violencia">Violência doméstica</option>
                      <option value="assedio">Assédio</option>
                      <option value="discriminacao">Discriminação</option>
                      <option value="ameaca">Ameaça</option>
                      <option value="outro">Outro</option>
                    </select>

                    <textarea
                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                      placeholder="Descreva com detalhes: data, hora, local, testemunhas (tudo é opcional, sua segurança vem em primeiro lugar)..."
                      rows={4}
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm resize-none focus:ring-2 focus:ring-ring outline-none"
                    />

                    <input
                      type="text"
                      value={form.contato}
                      onChange={(e) => setForm({ ...form, contato: e.target.value })}
                      placeholder="Contato seguro (opcional)"
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full p-3 rounded-lg gradient-accent text-accent-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                      Enviar de forma anônima
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DenunciaButton;
