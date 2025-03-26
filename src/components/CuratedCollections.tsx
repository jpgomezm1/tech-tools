
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Rocket, Sparkles } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Nuestros secretos mejor guardados",
    description: "Las herramientas que más usamos día a día y nos cambiaron la vida",
    icon: <Star className="w-6 h-6" />,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Automatiza sin saber programar",
    description: "Herramientas no-code para automatizar tu negocio sin conocimientos técnicos",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Las más virales de 2025",
    description: "Trending tools que están cambiando el juego y son el futuro inmediato",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 4,
    title: "Reemplazos AI para herramientas tradicionales",
    description: "La nueva generación de herramientas potenciadas por IA que arrasan con lo antiguo",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

const CuratedCollections: React.FC = () => {
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
            Selección brutal de herramientas
          </h2>
          <p className="text-irrelevant-light/80">
            Colecciones especiales para cada caso de uso
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
              className="group perspective"
            >
              <div
                className="h-64 rounded-xl overflow-hidden relative gradient-border glass-panel transform transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-white/5 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${collection.gradient} opacity-50`}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-irrelevant-dark/90"></div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {collection.icon}
                    </motion.div>
                    <h3 className="text-xl font-providence text-irrelevant-light mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-irrelevant-light/80">
                      {collection.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className="flex justify-end"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-2 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors">
                      <span className="text-sm font-medium">Explorar colección</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Animated border effect */}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
