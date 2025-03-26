
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Star, Zap, Rocket, Sparkles } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Nuestros secretos mejor guardados",
    description: "El toolkit que usamos a diario y nos ha salvado la vida (literalmente)",
    icon: <Star className="w-6 h-6" />,
    gradient: "from-purple-500/30 via-indigo-500/20 to-pink-500/30",
    pattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]",
    emoji: "🔥",
    cta: "Entrar a la sala secreta →",
    locked: false,
  },
  {
    id: 2,
    title: "Automatiza como un ninja no-code",
    description: "Para los que automatizan sin escribir una línea de código y hacen más con menos",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/30 via-cyan-400/20 to-teal-500/30",
    pattern: "bg-[linear-gradient(to_right,_var(--tw-gradient-stops))]",
    emoji: "⚡",
    cta: "Descubrir el combo →",
    locked: false,
  },
  {
    id: 3,
    title: "Lo que está rompiendo el juego en 2025",
    description: "Herramientas que parecen magia negra y que todos estarán usando en unos meses",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/30 via-amber-400/20 to-yellow-500/30",
    pattern: "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))]",
    emoji: "🚀",
    cta: "Ver este arsenal →",
    locked: false,
  },
  {
    id: 4,
    title: "Herramientas que destruyen lo antiguo (con AI)",
    description: "La nueva generación que está haciendo obsoletas herramientas que creías intocables",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-green-500/30 via-teal-400/20 to-emerald-500/30",
    pattern: "bg-[linear-gradient(to_bottom_left,_var(--tw-gradient-stops))]",
    emoji: "✨",
    cta: "Desbloquear el futuro →",
    locked: true,
  },
];

const CuratedCollections: React.FC = () => {
  const [unlockedAll, setUnlockedAll] = useState(false);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [showSecretInput, setShowSecretInput] = useState(false);

  const handleUnlock = () => {
    if (secretPhrase.toLowerCase().trim() === "soy irrelevant club") {
      setUnlockedAll(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-providence mb-4 text-gradient">
            Salas secretas de nuestro arsenal
          </h2>
          <p className="text-irrelevant-light/80">
            Desde lo que usamos todos los días hasta lo que apenas está explotando el juego
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`group perspective ${collection.locked && !unlockedAll ? 'relative' : ''}`}
            >
              <div
                className={`h-72 rounded-xl overflow-hidden relative gradient-border glass-panel transform transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-irrelevant-violet/10 cursor-pointer ${collection.pattern}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${collection.gradient} opacity-70`}></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-irrelevant-dark/90"></div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                        whileHover={{ 
                          rotate: [0, -10, 10, -5, 0],
                          scale: 1.05,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {collection.icon}
                        <span className="absolute -right-1 -top-1 text-lg">{collection.emoji}</span>
                      </motion.div>
                      <h3 className="text-2xl font-providence text-irrelevant-light">
                        {collection.title}
                      </h3>
                    </div>
                    <p className="text-irrelevant-light/90 text-lg">
                      {collection.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className="flex justify-end"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-2 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors border-b border-irrelevant-light/0 group-hover:border-irrelevant-light/30 pb-1">
                      <span className="text-base font-medium">{collection.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Animated glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ 
                    boxShadow: ["0 0 0 0px rgba(156, 107, 255, 0)", "0 0 0 2px rgba(156, 107, 255, 0.3)", "0 0 0 0px rgba(156, 107, 255, 0)"] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              </div>

              {/* Lock overlay for locked collections */}
              {collection.locked && !unlockedAll && (
                <div className="absolute inset-0 bg-irrelevant-dark/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-irrelevant-violet/30 flex items-center justify-center"
                  >
                    <Lock className="w-8 h-8 text-irrelevant-light/80" />
                  </motion.div>
                  <p className="text-irrelevant-light text-center max-w-[80%]">
                    Esta colección está bloqueada
                  </p>
                  {!showSecretInput ? (
                    <button 
                      onClick={() => setShowSecretInput(true)}
                      className="px-4 py-2 bg-irrelevant-violet/20 hover:bg-irrelevant-violet/30 rounded-md transition-colors text-irrelevant-light"
                    >
                      Desbloquear
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 w-[80%]">
                      <input
                        type="text"
                        placeholder="Introduce la frase secreta..."
                        value={secretPhrase}
                        onChange={(e) => setSecretPhrase(e.target.value)}
                        className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-irrelevant-light placeholder-irrelevant-light/50 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50"
                      />
                      <button 
                        onClick={handleUnlock}
                        className="px-4 py-2 bg-irrelevant-violet hover:bg-irrelevant-violet/80 rounded-md transition-colors text-irrelevant-light"
                      >
                        Verificar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
