
import React from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, Key, Sparkles, Zap } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: () => void;
  isUnlocked: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal, isUnlocked }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Logo positioning */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-8 left-8 z-20"
      >
        <img 
          src="https://storage.googleapis.com/cluvi/logo_final.png" 
          alt="Irrelevant Logo" 
          className="h-10 md:h-12"
        />
      </motion.div>

      {/* Dynamic background with animated elements */}
      <div className="absolute inset-0 bg-irrelevant-dark z-0">
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#9C6BFF_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.15]"></div>
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-irrelevant-violet/10 via-transparent to-transparent opacity-70"></div>
        
        {/* Animated code lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
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
        
        {/* Neural network nodes */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div 
              key={`node-${i}`}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: `rgba(156, 107, 255, ${0.3 + Math.random() * 0.5})`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Connection lines between nodes */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`connection-${i}`}
              className="absolute h-px opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 150}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                transformOrigin: 'left center',
                background: `linear-gradient(90deg, rgba(156, 107, 255, 0.7), transparent)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Superhero character */}
      <motion.div 
        className="absolute right-0 bottom-0 z-10 h-60 sm:h-80 md:h-96 lg:h-[500px] opacity-20 sm:opacity-30"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: isUnlocked ? 0.5 : 0.3 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src="/lovable-uploads/50c5d86d-0f30-4447-8bc1-103e266384cc.png" 
          alt="Tech Superhero" 
          className="h-full object-contain"
        />
      </motion.div>

      {/* Small floating superheros for decoration */}
      <motion.div 
        className="absolute left-10 bottom-32 z-5 h-16 md:h-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: [0, -15, 0],
          opacity: isUnlocked ? 0.6 : 0.2,
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          opacity: { duration: 1, delay: 0.8 }
        }}
      >
        <img 
          src="/lovable-uploads/50c5d86d-0f30-4447-8bc1-103e266384cc.png" 
          alt="Mini Hero" 
          className="h-full object-contain transform -scale-x-100 rotate-12"
        />
      </motion.div>

      <motion.div 
        className="absolute left-1/4 top-1/4 z-5 h-10 md:h-14"
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: [0, 10, 0],
          opacity: isUnlocked ? 0.5 : 0.15,
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          opacity: { duration: 1, delay: 1.2 }
        }}
      >
        <img 
          src="/lovable-uploads/50c5d86d-0f30-4447-8bc1-103e266384cc.png" 
          alt="Mini Hero" 
          className="h-full object-contain transform rotate-[-15deg]"
        />
      </motion.div>

      <div className="text-center max-w-5xl mx-auto z-10 relative flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-irrelevant-light mb-4 gap-1">
            <Sparkles className="w-3.5 h-3.5 text-irrelevant-violet" />
            Los Súper Poderes de *irrelevant*
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-providence text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-gradient">Conviértete en</span>{" "}
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
            superhéroe
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-irrelevant-light/90 max-w-3xl mx-auto"
        >
          Hay tecnologías que te dan súper poderes. Nosotros las dominamos. Ahora es tu turno.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(156, 107, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenModal}
            className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-irrelevant-violet/20 transition-all duration-300 group relative overflow-hidden"
            animate={!isUnlocked ? {
              boxShadow: ["0 0 0px rgba(156, 107, 255, 0.3)", "0 0 20px rgba(156, 107, 255, 0.6)", "0 0 0px rgba(156, 107, 255, 0.3)"]
            } : {}}
            transition={!isUnlocked ? {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            } : {}}
          >
            <span className="relative z-10">
              {isUnlocked ? "Explora tus poderes" : "Desbloquea tus poderes"}
            </span>
            {isUnlocked ? (
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10" />
            ) : (
              <Key className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10" />
            )}
            
            {/* Button glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-irrelevant-violet/80 to-irrelevant-purple/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  "linear-gradient(90deg, rgba(156, 107, 255, 0.8) 0%, rgba(165, 102, 255, 0.8) 100%)",
                  "linear-gradient(90deg, rgba(165, 102, 255, 0.8) 0%, rgba(156, 107, 255, 0.8) 100%)",
                  "linear-gradient(90deg, rgba(156, 107, 255, 0.8) 0%, rgba(165, 102, 255, 0.8) 100%)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.button>

          {isUnlocked ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 py-2 px-4 rounded-full bg-irrelevant-violet/20 text-irrelevant-light/90 text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              ¡Poderes desbloqueados con éxito!
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4 text-irrelevant-light/70 text-sm flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-irrelevant-violet">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Necesitas la clave para activar tus poderes
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isUnlocked ? 1 : 0 }}
            transition={{ delay: isUnlocked ? 1 : 0, duration: 0.5 }}
            className="mt-10 flex justify-center w-full"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDownCircle className="w-10 h-10 text-irrelevant-light/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Visual indicator for locked scroll */}
      {!isUnlocked && (
        <motion.div 
          className="absolute bottom-16 left-0 right-0 h-32 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-full bg-gradient-to-t from-irrelevant-dark to-transparent" />
        </motion.div>
      )}

      {/* Cape effect when unlocked */}
      {isUnlocked && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-irrelevant-violet/10 to-transparent" />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-irrelevant-violet/5 to-transparent"
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              height: ["40px", "60px", "40px"]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        </motion.div>
      )}
    </motion.section>
  );
};

export default HeroSection;
