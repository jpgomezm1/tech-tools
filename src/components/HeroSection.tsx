
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle, Sparkles, Zap, Key, Mail, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onOpenModal: () => void;
  isScrollLocked: boolean;
  onUnlock: (method: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal, isScrollLocked, onUnlock }) => {
  const [input, setInput] = useState("");
  const [inputMode, setInputMode] = useState<"email" | "phrase">("email");
  const [isLoading, setIsLoading] = useState(false);

  const secretPhrases = [
    "abracadabra",
    "irrelevant",
    "arsenal secreto",
    "dame acceso",
    "quiero entrar",
    "automatiza todo"
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // Auto-detect if user is typing an email or a phrase
    if (e.target.value.includes('@')) {
      setInputMode("email");
    } else if (e.target.value.length > 0 && !e.target.value.includes('@')) {
      setInputMode("phrase");
    }
  };

  const handleSubmit = () => {
    if (!input) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (inputMode === "email" && validateEmail(input)) {
        onUnlock("email");
      } else if (inputMode === "phrase" && secretPhrases.some(phrase => input.toLowerCase().includes(phrase))) {
        onUnlock("phrase");
      } else {
        // Handle invalid input
        const errorMessage = inputMode === "email" 
          ? "Escribe un email válido para desbloquear" 
          : "Esa frase no abre ninguna puerta... ¿Pruebas otra?";
        
        // Animate the input field to indicate error
        const inputElement = document.getElementById("unlock-input");
        if (inputElement) {
          inputElement.classList.add("animate-shake");
          setTimeout(() => {
            inputElement.classList.remove("animate-shake");
          }, 500);
        }
      }
      setIsLoading(false);
    }, 800);
  };

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

      <div className="text-center max-w-5xl mx-auto z-10 relative flex flex-col items-center">
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
          <span className="text-gradient">Nuestro arsenal</span>{" "}
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
            secreto
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-irrelevant-light/90 max-w-3xl mx-auto"
        >
          Hay herramientas que te cambian la vida. Nosotros las usamos. Ahora tú también puedes.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center w-full max-w-md"
        >
          {/* Unlock section */}
          <div className="w-full mb-6 perspective relative">
            <div className="relative flex items-center w-full">
              <div className="absolute left-3 text-irrelevant-light/60">
                {inputMode === "email" ? (
                  <Mail className="w-5 h-5" />
                ) : (
                  <Key className="w-5 h-5" />
                )}
              </div>
              
              <Input
                id="unlock-input"
                type={inputMode === "email" ? "email" : "text"}
                placeholder={inputMode === "email" 
                  ? "Tu email para desbloquear el arsenal" 
                  : "O escribe una frase clave para entrar..."
                }
                className="w-full pl-10 pr-4 py-3 h-14 bg-white/5 backdrop-blur-md border border-irrelevant-violet/20 focus:border-irrelevant-violet/60 rounded-lg text-irrelevant-light text-md placeholder-irrelevant-light/40 shadow-[0_0_15px_rgba(156,107,255,0.1)] transition-all duration-300 focus:shadow-[0_0_20px_rgba(156,107,255,0.25)]"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              
              <div className="absolute right-3 text-xs text-irrelevant-light/40 pointer-events-none">
                {inputMode === "email" ? "Email" : "Frase clave"}
              </div>
            </div>
            
            {/* Input mode toggle */}
            <motion.button
              type="button"
              onClick={() => setInputMode(inputMode === "email" ? "phrase" : "email")}
              className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-irrelevant-light/50 hover:text-irrelevant-light/80 transition-colors duration-300 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Cambiar a {inputMode === "email" ? "frase clave" : "email"}</span>
            </motion.button>
          </div>
          
          {/* Unlock button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(156, 107, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || !input}
            className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-irrelevant-violet/20 transition-all duration-300 group relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10">
              {isLoading ? "Desbloqueando..." : "Entrar sin romper nada"}
            </span>
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="relative z-10"
              >
                <Unlock className="w-5 h-5" />
              </motion.div>
            ) : (
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform relative z-10" />
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

          {/* Extra hint for users */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 text-sm text-irrelevant-light/50"
          >
            Una comunidad tech que construye mientras aprende. Sin presiones. Sin humo.
          </motion.p>

          {isScrollLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-10 flex justify-center w-full"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDownCircle className="w-10 h-10 text-irrelevant-light/50" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
