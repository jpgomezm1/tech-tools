
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Rocket, Sparkles } from "lucide-react";

const collections = [
  {
    id: 1,
    title: "Favoritas del equipo irrelevant",
    description: "Las herramientas que más usamos día a día",
    icon: <Star className="w-6 h-6" />,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Automatiza sin saber programar",
    description: "Herramientas no-code para automatizar tu negocio",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Las más virales de 2025",
    description: "Trending tools que están cambiando el juego",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    id: 4,
    title: "Reemplazos AI para herramientas tradicionales",
    description: "La nueva generación de herramientas potenciadas por IA",
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
            Colecciones Curadas
          </h2>
          <p className="text-irrelevant-light/80">
            Descubre nuestras selecciones especiales de herramientas
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
              className="group"
            >
              <div
                className={`h-64 rounded-xl overflow-hidden relative gradient-border ${collection.gradient} p-8 flex flex-col justify-between hover-lift cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-irrelevant-dark/80" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                    {collection.icon}
                  </div>
                  <h3 className="text-xl font-providence text-irrelevant-light mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-irrelevant-light/80">
                    {collection.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex justify-end">
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors"
                  >
                    <span className="text-sm font-medium">Explorar</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;
