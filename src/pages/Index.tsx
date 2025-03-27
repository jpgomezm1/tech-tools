
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
      title: "¡Súper Poderes Activados!",
      description: "Bienvenido al escuadrón de héroes tech. ¡Tu arsenal digital está listo!",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-irrelevant-dark overflow-x-hidden relative">
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
