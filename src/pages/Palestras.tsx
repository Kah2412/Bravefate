import { useState } from "react";
import { motion } from "framer-motion";
import { Mic2, Calendar, MapPin, Clock, Users, Video, Plus } from "lucide-react";

interface Talk {
  id: number;
  title: string;
  speaker: string;
  role: string;
  date: string;
  time: string;
  location: string;
  type: "presencial" | "online";
  spots: number;
  registered: number;
  description: string;
}

const upcomingTalks: Talk[] = [
  { id: 1, title: "Autoestima e Empoderamento Feminino", speaker: "Dra. Patrícia Lima", role: "Psicóloga Clínica — CRP 06/12345", date: "2024-04-15", time: "19:00", location: "Auditório Central", type: "presencial", spots: 100, registered: 67, description: "Uma palestra sobre construção de autoestima e ferramentas para empoderamento pessoal." },
  { id: 2, title: "Lidando com Ansiedade no Ambiente de Trabalho", speaker: "Dra. Fernanda Costa", role: "Psicóloga Organizacional", date: "2024-04-20", time: "14:00", location: "Online via Zoom", type: "online", spots: 200, registered: 143, description: "Estratégias práticas para gerenciar a ansiedade e manter o equilíbrio emocional." },
  { id: 3, title: "Violência Doméstica: Identificar e Agir", speaker: "Dra. Camila Rocha", role: "Psicóloga Forense", date: "2024-05-02", time: "10:00", location: "Centro Comunitário Esperança", type: "presencial", spots: 80, registered: 45, description: "Como identificar sinais de violência e quais caminhos seguir para buscar ajuda." },
  { id: 4, title: "Maternidade e Saúde Mental", speaker: "Dra. Juliana Alves", role: "Psicóloga Perinatal", date: "2024-05-10", time: "16:00", location: "Online via Google Meet", type: "online", spots: 150, registered: 89, description: "Os desafios emocionais da maternidade e a importância do autocuidado." },
];

const Palestras = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 text-gradient">
            Palestras
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Espaço para psicólogas e especialistas compartilharem conhecimento e apoio
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 rounded-xl gradient-accent text-accent-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Cancelar" : "Propor Palestra"}
          </button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-lg font-semibold">Propor uma palestra</h3>
              <input type="text" placeholder="Tema da sua palestra (ex: Saúde Mental, Liderança, Violência...)" className="w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none" />
              <input type="text" placeholder="Seu nome como especialista" className="w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none" />
              <input type="text" placeholder="Registro profissional (CRP)" className="w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none" />
                <input type="time" className="p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none" />
              </div>
              <select className="w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-ring outline-none">
                <option>Formato</option>
                <option value="presencial">Presencial</option>
                <option value="online">Online</option>
              </select>
              <textarea placeholder="Descreva como sua palestra ajudará mulheres em nosso contexto de apoio e fortalecimento..." rows={4} className="w-full p-3 rounded-xl border border-input bg-background text-sm resize-none focus:ring-2 focus:ring-ring outline-none" />
              <button className="w-full p-3 rounded-xl gradient-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity">
                Enviar Proposta
              </button>
            </div>
          </motion.div>
        )}

        {/* Talks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {upcomingTalks.map((talk, i) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  talk.type === "online"
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/10 text-primary-foreground"
                }`}>
                  {talk.type === "online" ? <Video className="w-3 h-3 inline mr-1" /> : <MapPin className="w-3 h-3 inline mr-1" />}
                  {talk.type}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold mb-2">{talk.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{talk.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mic2 className="w-4 h-4 text-accent" />
                  <span className="font-medium">{talk.speaker}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-6">{talk.role}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(talk.date).toLocaleDateString("pt-BR")}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{talk.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{talk.location}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {talk.registered}/{talk.spots} vagas
                </div>
                <button className="px-4 py-2 rounded-lg gradient-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                  Inscrever-se
                </button>
              </div>

              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gradient-accent"
                  style={{ width: `${(talk.registered / talk.spots) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Palestras;
