import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Send } from "lucide-react";
import { useI18n } from "@/i18n";

const DenunciaButton = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ tipo: "", descricao: "", contato: "" });
  const { t } = useI18n();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setForm({ tipo: "", descricao: "", contato: "" });
    }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-accent flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title={t("report.buttonTitle")}
        aria-label={t("report.buttonAria")}
      >
        <Heart className="w-6 h-6 text-accent-foreground" />
      </button>

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
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-semibold">{t("report.title")}</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-lg font-medium">{t("report.sentTitle")}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t("report.sentDescription")}</p>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-4">{t("report.intro")}</p>
                  <div className="mb-3 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
                    {t("report.hotline1")}
                    <br />
                    {t("report.hotline2")}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <select
                      value={form.tipo}
                      onChange={(event) => setForm({ ...form, tipo: event.target.value })}
                      required
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
                    >
                      <option value="">{t("report.typePlaceholder")}</option>
                      <option value="violencia">{t("report.types.violencia")}</option>
                      <option value="assedio">{t("report.types.assedio")}</option>
                      <option value="discriminacao">{t("report.types.discriminacao")}</option>
                      <option value="ameaca">{t("report.types.ameaca")}</option>
                      <option value="outro">{t("report.types.outro")}</option>
                    </select>

                    <textarea
                      value={form.descricao}
                      onChange={(event) => setForm({ ...form, descricao: event.target.value })}
                      placeholder={t("report.descriptionPlaceholder")}
                      rows={4}
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm resize-none focus:ring-2 focus:ring-ring outline-none"
                    />

                    <input
                      type="text"
                      value={form.contato}
                      onChange={(event) => setForm({ ...form, contato: event.target.value })}
                      placeholder={t("report.contactPlaceholder")}
                      className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
                    />

                    <button
                      type="submit"
                      className="w-full p-3 rounded-lg gradient-accent text-accent-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                      {t("report.submit")}
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
