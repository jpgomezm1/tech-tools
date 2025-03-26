
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Check } from "lucide-react";

const Community: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-panel border-white/10 p-8 rounded-xl"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-providence mb-3 text-white">
                  Únete a nuestra comunidad
                </h3>
                
                <p className="text-irrelevant-light/90 mb-5">
                  Entra al grupo exclusivo de WhatsApp y entérate cómo el mundo cambia todos los días con estas herramientas. <span className="italic text-irrelevant-light">Esto no es spam. Es tu nueva obsesión tech.</span>
                </p>
                
                <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+34 600 00 00 00"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-irrelevant-light"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Quiero estar ahí 🔥</span>
                  </button>
                </form>
              </div>
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
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-providence mb-4 text-white">
              ¡Bienvenido a la comunidad!
            </h3>
            <p className="text-irrelevant-light/90">
              En breve recibirás un mensaje para unirte al grupo exclusivo de WhatsApp.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Community;
