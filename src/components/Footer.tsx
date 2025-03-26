
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-irrelevant-dark/80 to-transparent z-10"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-irrelevant-violet/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 3 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-panel border-white/10 p-8 md:p-12 rounded-2xl"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-providence mb-6 text-gradient">
              <span className="font-bold">irrelevant</span> es la agencia de IA que tu negocio quería y no sabía que existía.
            </h2>
            
            <p className="text-lg text-irrelevant-light/80 max-w-3xl">
              Creamos automatizaciones, sistemas y flujos con inteligencia artificial para que 
              escales más rápido y trabajes más inteligente. 
              Si tienes una empresa y quieres que construyamos algo para ti, agenda una reunión con nosotros.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-6 px-8 rounded-xl hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300 flex items-center gap-3 text-lg h-auto"
                onClick={() => window.open("https://calendly.com/jpgomez-stayirrelevant/irrelevant-club?month=2025-03", "_blank")}
              >
                <Calendar className="w-5 h-5" />
                <span>Agenda una reunión</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-md text-white font-medium py-6 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg h-auto"
                onClick={() => window.open("https://www.stayirrelevant.com", "_blank")}
              >
                <span>Explorar página web</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Button>
            </motion.div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-irrelevant-light/60 text-sm">
              © {new Date().getFullYear()} irrelevant. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              {/* Social media icons could go here */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => window.open("https://twitter.com/stayirrelevant", "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => window.open("https://www.linkedin.com/company/stayirrelevant", "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
