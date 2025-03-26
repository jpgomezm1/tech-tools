
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-hero-pattern bg-cover bg-center"
    >
      <div className="text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-irrelevant-light mb-4">
            Irrelevant Tech
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-providence text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gradient"
        >
          El Repositorio Tech que usamos para hacer magia
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-irrelevant-light/90 max-w-3xl mx-auto"
        >
          Herramientas de IA, automatización y productividad que usamos en{" "}
          <span className="italic">irrelevant</span> para trabajar más rápido, escalar y crear sin límites.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenModal}
          className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-4 px-8 rounded-full hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
        >
          Descubrir herramientas
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownCircle className="w-10 h-10 text-irrelevant-light/50" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
