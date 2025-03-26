
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, Sparkles, Zap } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Dynamic background with animated elements */}
      <div className="absolute inset-0 bg-irrelevant-dark z-0">
        <div className="absolute inset-0 bg-gradient-radial from-irrelevant-violet/10 via-transparent to-transparent opacity-70"></div>
        
        {/* Animated code lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-irrelevant-violet/30 to-transparent"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                width: `${50 + Math.random() * 50}%`,
              }}
              initial={{ x: "-100%" }}
              animate={{ 
                x: "200%",
                transition: { 
                  repeat: Infinity, 
                  duration: 10 + Math.random() * 20,
                  delay: Math.random() * 5 
                } 
              }}
            />
          ))}
        </div>
        
        {/* Floating elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div 
            key={`float-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              background: `rgba(156, 107, 255, ${0.1 + Math.random() * 0.15})`,
            }}
            animate={{
              y: [20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-5xl mx-auto z-10 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-irrelevant-light mb-4 gap-1">
            <Sparkles className="w-3.5 h-3.5 text-irrelevant-violet" />
            Armas Secretas de *irrelevant*
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-providence text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-gradient">Lo que usamos para</span>{" "}
          <motion.span 
            className="text-irrelevant-violet inline-block"
            animate={{ 
              rotate: [0, 1, -1, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            hacer magia
          </motion.span>
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
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(156, 107, 255, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-irrelevant-violet/20 transition-all duration-300 group"
        >
          <span>Descubrir el arsenal</span>
          <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
