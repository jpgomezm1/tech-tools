
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import RegistrationModal from "@/components/RegistrationModal";
import ToolsRepository from "@/components/ToolsRepository";
import CuratedCollections from "@/components/CuratedCollections";
import UseCases from "@/components/UseCases";
import CommunityNewsletter from "@/components/CommunityNewsletter";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  // Lock scrolling when content is not unlocked
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Slight delay for animation to complete before scrolling
      setTimeout(() => {
        window.scrollBy({
          top: 10,
          behavior: "smooth"
        });
      }, 800);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isScrollLocked]);

  const handleUnlock = (method: string) => {
    setIsRegistered(true);
    setIsScrollLocked(false);
    toast.success(
      method === "email" 
        ? "Arsenal desbloqueado. El toolkit es tuyo." 
        : "Frase correcta. Ya eres parte del arsenal secreto."
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setIsRegistered(true);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-irrelevant-dark overflow-x-hidden relative">
      <HeroSection 
        onOpenModal={() => setShowModal(true)} 
        isScrollLocked={isScrollLocked}
        onUnlock={handleUnlock} 
      />
      
      <RegistrationModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
      
      {/* Blurred content preview when locked */}
      <div 
        className={`transition-all duration-500 ${isScrollLocked ? "filter blur-md opacity-40 pointer-events-none" : ""}`}
      >
        <AnimatePresence>
          {isRegistered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ToolsRepository />
              <CuratedCollections />
              <UseCases />
              <CommunityNewsletter />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Visual indicator for locked scroll */}
      {isScrollLocked && (
        <motion.div 
          className="fixed bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none"
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            y: [0, 5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-1 h-12 rounded-full bg-gradient-to-b from-irrelevant-violet/20 via-irrelevant-violet to-irrelevant-violet/20"></div>
            <p className="text-irrelevant-light/70 text-sm font-medium">Desbloquea para explorar</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
