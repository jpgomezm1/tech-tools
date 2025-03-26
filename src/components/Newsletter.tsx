
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-providence mb-4 text-gradient">
              ¿Te gustó? Te enviamos una nueva herramienta brutal cada semana
            </h2>
            <p className="text-lg text-irrelevant-light/80 mb-8">
              Suscríbete al newsletter de <span className="italic">irrelevant</span>{" "}
              y recibe las joyas que usamos antes que nadie.
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-36 py-4 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-2 px-6 rounded-full hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Suscribirme</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
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
            className="py-10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-providence mb-4 text-gradient">
              ¡Gracias por suscribirte!
            </h3>
            <p className="text-irrelevant-light/80">
              Te enviaremos tu primera recomendación muy pronto.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
