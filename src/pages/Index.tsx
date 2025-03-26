
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import RegistrationModal from "@/components/RegistrationModal";
import ToolsRepository from "@/components/ToolsRepository";
import CuratedCollections from "@/components/CuratedCollections";
import UseCases from "@/components/UseCases";
import CommunityNewsletter from "@/components/CommunityNewsletter";
import Footer from "@/components/Footer";

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setIsRegistered(true);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-irrelevant-dark overflow-x-hidden">
      <HeroSection onOpenModal={() => setShowModal(true)} />
      
      <RegistrationModal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
      
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
  );
};

export default Index;
