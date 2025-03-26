
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Rocket, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommunityNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phoneNumber) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-panel border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="bg-black/20 backdrop-blur-lg p-8 md:p-12">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-irrelevant-violet to-irrelevant-purple flex items-center justify-center mx-auto mb-8"
                animate={{ 
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-providence text-center mb-4 text-gradient">
                ¿Te voló la cabeza? Bienvenido al club.
              </h2>
              
              <p className="text-lg text-irrelevant-light/80 text-center mb-8 max-w-3xl mx-auto">
                Te enviamos una joya tech cada semana y te sumamos al grupo más cool de WhatsApp 
                donde compartimos cómo automatizar tu vida sin volverte loco.{" "}
                <span className="italic font-semibold text-irrelevant-light">Esto no es spam. Es tu nueva obsesión.</span>
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-6 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                      />
                      <Button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-1 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>Recibir joyas</span>
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+34 600 00 00 00"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-6 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-irrelevant-light"
                      />
                      <Button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-1 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center gap-2"
                      >
                        <span>Entrar al grupo</span>
                        <Rocket className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="glass-panel border-white/10 p-10 rounded-xl text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-providence mb-4 text-gradient">
              ¡Bienvenido al club de irrelevant!
            </h3>
            <p className="text-irrelevant-light/80 max-w-2xl mx-auto">
              Prepárate para recibir contenido exclusivo que te volará la cabeza. Ya estás dentro del club más tech del planeta.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CommunityNewsletter;
