import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertTriangle } from "lucide-react";
import {
  supportResources,
  importantContacts,
  strengthenContents,
  type SupportResource,
  type ImportantContact,
  type StrengthenContent,
} from "@/data/support-resources";
import {
  ResourceCard,
  ResourceDetail,
  ContactCard,
  QuoteCard,
  AffirmationCard,
} from "@/components/support/SupportCards";

const Apoio = () => {
  const [selectedResource, setSelectedResource] = useState<SupportResource | null>(null);
  const [activeTab, setActiveTab] = useState<"sinais" | "contatos" | "fortalecimento">("sinais");

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-soft/20 text-rose-deep text-sm font-medium mb-6 border border-rose-soft/30">
            <AlertTriangle className="w-4 h-4" />
            Você não está sozinha. Ajuda está disponível.
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gradient">
            Apoio e Orientação
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Um espaço seguro com informações sobre violência, direitos, segurança e recuperação. 
            Esta plataforma não substitui serviços de emergência.
          </p>
          <p className="text-sm font-medium flex items-center gap-2 text-rose-deep bg-rose-soft/20 px-4 py-2 rounded-lg w-fit border border-rose-soft/30">
            <AlertTriangle className="w-4 h-4" />
            Risco imediato? Ligue 190
          </p>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-col sm:flex-row gap-3 bg-muted/50 p-1 rounded-2xl w-fit mx-auto">
          {[
            { id: "sinais", label: "Sinais & Segurança", icon: "🛡️" },
            { id: "contatos", label: "Contatos Importantes", icon: "📞" },
            { id: "fortalecimento", label: "Fortalecimento", icon: "💪" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-xl font-medium transition-all text-sm ${
                activeTab === tab.id
                  ? "gradient-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === "sinais" && (
          <motion.section
            key="sinais"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mb-20"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold mb-8">Reconheça os Sinais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportResources
                  .filter((r) => r.category === "sinais")
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      icon={resource.icon}
                      onClick={() => setSelectedResource(resource)}
                    />
                  ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold mb-8">Segurança e Ação</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportResources
                  .filter((r) => ["seguranca", "ajuda", "apoio", "provas", "direitos"].includes(r.category))
                  .map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      title={resource.title}
                      description={resource.description}
                      icon={resource.icon}
                      onClick={() => setSelectedResource(resource)}
                      highlighted={resource.category === "direitos"}
                    />
                  ))}
              </div>
            </div>

            <QuoteCard
              text="Coragem não é a ausência de medo. É agir apesar do medo."
              author="Mulheres que saíram de relacionamentos abusivos"
              highlighted
            />
          </motion.section>
        )}

        {activeTab === "contatos" && (
          <motion.section
            key="contatos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mb-20"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold mb-2">Ligue. Denuncie. Peça Ajuda.</h2>
              <p className="text-muted-foreground mb-8">
                Todos esses contatos são confidenciais, anônimos e gratuitos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {importantContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    name={contact.name}
                    number={contact.number}
                    description={contact.description}
                    when={contact.when}
                    details={contact.details}
                    color={contact.color}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-teal/10 border border-teal/30">
              <h3 className="font-semibold text-teal mb-3">💡 Dica de Privacidade</h3>
              <p className="text-sm text-foreground leading-relaxed">
                Se compartilhar um dispositivo, use navegação privada/anônima. Limpe histórico após usar essa página. 
                Use WiFi público quando possível. Crie uma conta de email secundária para comunicações confidenciais.
              </p>
            </div>
          </motion.section>
        )}

        {activeTab === "fortalecimento" && (
          <motion.section
            key="fortalecimento"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mb-20"
          >
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold mb-2">Caminhos para Fortalecimento</h2>
              <p className="text-muted-foreground mb-8">
                Reconstrução começa do seu próprio ritmo. Você merece paz, saúde e felicidade.
              </p>

              <div className="space-y-8">
                {strengthenContents.map((content, idx) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 rounded-2xl glass-card border border-border"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl flex-shrink-0">
                        {content.icon === "Sparkles" && "✨"}
                        {content.icon === "DollarSign" && "💰"}
                        {content.icon === "RefreshCw" && "🔄"}
                        {content.icon === "ShieldAlert" && "⚖️"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{content.title}</h3>
                        <p className="text-sm text-muted-foreground">{content.description}</p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4">{content.content}</p>

                    {content.affirmations && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.affirmations.map((affirmation, i) => (
                          <AffirmationCard key={i} text={affirmation} />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <QuoteCard
              text="Sua cicatriz é uma prova de sua força, não de sua fraqueza."
              author="Comunidade Brave"
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Resource Detail Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setSelectedResource(null)}
          >
            <ResourceDetail
              title={selectedResource.title}
              description={selectedResource.description}
              content={selectedResource.content}
              icon={selectedResource.icon}
              tips={selectedResource.tips}
              onClose={() => setSelectedResource(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Banner */}
      <section className="fixed bottom-0 left-0 right-0 bg-rose-deep text-white py-3 px-4 z-40 md:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <span className="text-sm font-medium">Risco imediato?</span>
          <button
            onClick={() => window.location.href = "tel:190"}
            className="px-4 py-2 rounded-lg bg-white text-rose-deep font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Ligue 190
          </button>
        </div>
      </section>
    </div>
  );
};

export default Apoio;
