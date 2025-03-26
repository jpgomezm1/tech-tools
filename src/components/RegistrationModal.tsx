
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    companySize: "",
    interests: [] as string[],
    phrase: "",
  });

  const [showCompanySize, setShowCompanySize] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "userType") {
      setShowCompanySize(value === "Empresa");
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((interest) => interest !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if phrase is one of the allowed phrases to skip registration
    if (
      formData.phrase &&
      (formData.phrase.toLowerCase() === "ya soy del clan" ||
        formData.phrase.toLowerCase() === "irrelevant lover")
    ) {
      onSubmit();
      return;
    }
    
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 1000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="glass-panel w-full max-w-2xl rounded-xl p-6 sm:p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-providence text-gradient">
                  {formData.phrase && 
                   (formData.phrase.toLowerCase() === "ya soy del clan" ||
                    formData.phrase.toLowerCase() === "irrelevant lover")
                    ? "¡Bienvenido de vuelta!"
                    : "Únete al repositorio tech"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-irrelevant-light" />
                </button>
              </div>

              {formData.phrase && 
               (formData.phrase.toLowerCase() === "ya soy del clan" ||
                formData.phrase.toLowerCase() === "irrelevant lover") ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <p className="text-xl mb-8">Te reconocemos. ¡Acceso concedido!</p>
                  <button
                    onClick={onSubmit}
                    className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                  >
                    Continuar al repositorio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formSubmitted ? (
                    <div className="text-center py-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>
                      <p className="text-xl">¡Registro completado con éxito!</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                          ¿Cuál de estos te describe mejor?
                        </label>
                        <select
                          name="userType"
                          required
                          value={formData.userType}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light appearance-none"
                        >
                          <option value="" disabled>
                            Selecciona una opción
                          </option>
                          <option value="Emprendedor">Emprendedor con negocio propio</option>
                          <option value="Freelancer">Profesional independiente / freelancer</option>
                          <option value="Persona">Persona interesada en aprender y explorar</option>
                          <option value="Empresa">Empresa</option>
                        </select>
                      </div>

                      {showCompanySize && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                            Tamaño del equipo
                          </label>
                          <select
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light appearance-none"
                          >
                            <option value="" disabled>
                              Selecciona el tamaño
                            </option>
                            <option value="1-10">1-10 empleados</option>
                            <option value="11-50">11-50 empleados</option>
                            <option value="51-200">51-200 empleados</option>
                            <option value="201+">201+ empleados</option>
                          </select>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2 text-irrelevant-light">
                          ¿Para qué te interesa este repositorio?
                        </label>
                        <div className="space-y-2">
                          {[
                            "Mejorar mi productividad",
                            "Empezar un proyecto nuevo",
                            "Optimizar mi operación",
                            "Aprender sobre IA / Automatización",
                            "Otro",
                          ].map((interest) => (
                            <div key={interest} className="flex items-center">
                              <input
                                type="checkbox"
                                id={interest}
                                name="interests"
                                value={interest}
                                checked={formData.interests.includes(interest)}
                                onChange={handleInterestChange}
                                className="w-5 h-5 rounded border-white/30 text-irrelevant-violet focus:ring-irrelevant-violet/50 bg-white/5"
                              />
                              <label
                                htmlFor={interest}
                                className="ml-2 text-irrelevant-light"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                          ¿Ya estás registrado?
                        </label>
                        <input
                          type="text"
                          name="phrase"
                          value={formData.phrase}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                          placeholder="Ingresa tu frase irrelevant"
                        />
                        <p className="text-xs text-irrelevant-light/70 mt-1">
                          Si ya formas parte del clan, ingresa tu frase para acceder.
                        </p>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                        >
                          Acceder al repositorio
                        </button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
