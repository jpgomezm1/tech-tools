
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import RegistrationModal from "@/components/RegistrationModal";
import ToolsRepository from "@/components/ToolsRepository";
import CuratedCollections from "@/components/CuratedCollections";
import UseCases from "@/components/UseCases";
import CommunityNewsletter from "@/components/CommunityNewsletter";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  // Effect to prevent scrolling when not registered
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (!isRegistered) {
        window.scrollTo(0, 0);
      }
    };

    if (!isRegistered) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isRegistered]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setIsRegistered(true);
    setShowModal(false);
    
    // Display success toast when user unlocks access
    toast({
      title: "¡Acceso desbloqueado!",
      description: "Ya eres parte del arsenal. Explora y disfruta.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-irrelevant-dark overflow-x-hidden relative">
      {/* Scroll hint indicator (visible only when not registered) */}
      {!isRegistered && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 2 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <div className="text-irrelevant-light/70 text-sm font-medium mb-2">
            Aún no tienes acceso completo
          </div>
          <motion.div 
            className="px-4 py-2 rounded-full bg-irrelevant-violet/20 backdrop-blur-sm border border-irrelevant-violet/30 inline-flex items-center gap-2"
            animate={{ boxShadow: ["0 0 0px rgba(156, 107, 255, 0.3)", "0 0 15px rgba(156, 107, 255, 0.5)", "0 0 0px rgba(156, 107, 255, 0.3)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-irrelevant-violet">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
            <span className="text-irrelevant-light">Desbloquea para navegar</span>
          </motion.div>
        </motion.div>
      )}

      <HeroSection onOpenModal={() => setShowModal(true)} isUnlocked={isRegistered} />
      
      <RegistrationModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
      
      <AnimatePresence>
        {isRegistered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <ToolsRepository />
            <CuratedCollections />
            <UseCases />
            <CommunityNewsletter />
            <Footer />
          </motion.div>
        ) : (
          <motion.div 
            className="fixed inset-0 pointer-events-none z-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="h-full overflow-hidden filter blur-md">
              <div className="opacity-20">
                <ToolsRepository />
                <CuratedCollections />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Toaster />
    </div>
  );
};

export default Index;
