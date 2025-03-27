import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Lock, User, Mail, Building, Briefcase, ArrowRight, Key, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerUser, verifySecretPhrase } from '../services/api';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

// Lista de países para el selector
const countries = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", 
  "Cuba", "Ecuador", "El Salvador", "España", "Guatemala", "Honduras", 
  "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico", 
  "República Dominicana", "Uruguay", "Venezuela", "Otro"
];

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    userType: "",
    company: "",
    automationNeeds: "",
    linkedinUrl: "",
    interestArea: "",
    toolsUsed: "",
    projectDescription: "",
    secretPhrase: "",
  });

  const [formStep, setFormStep] = useState(0);
  const [showCompanyFields, setShowCompanyFields] = useState(false);
  const [showPersonFields, setShowPersonFields] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (formData.userType === "Empresa") {
      setShowCompanyFields(true);
      setShowPersonFields(false);
    } else if (["Emprendedor", "Freelancer", "Persona"].includes(formData.userType)) {
      setShowPersonFields(true);
      setShowCompanyFields(false);
    } else {
      setShowCompanyFields(false);
      setShowPersonFields(false);
    }
  }, [formData.userType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar mensaje de error cuando el usuario comienza a escribir
    if (formError) {
      setFormError("");
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar mensaje de error cuando el usuario selecciona algo
    if (formError) {
      setFormError("");
    }
  };

  const handleNextStep = () => {
    setFormStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const getMaxSteps = () => {
    if (showCompanyFields) return 2;
    if (showPersonFields) return 2;
    return 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Si el usuario ingresó la frase secreta, intenta validarla
    if (formData.secretPhrase) {
      setIsSubmitting(true);
      
      try {
        const result = await verifySecretPhrase(formData.secretPhrase);
        
        if (result.success) {
          // La frase es correcta, procede con el acceso
          setIsSubmitting(false);
          onSubmit();
          return;
        } else {
          // Mostrar error de frase incorrecta
          setFormError("Frase secreta incorrecta. Por favor intenta de nuevo.");
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("Error al verificar frase secreta:", error);
        setFormError("Error de conexión. Por favor intenta de nuevo más tarde.");
        setIsSubmitting(false);
      }
      return;
    }
    
    // Si estamos en un paso intermedio del formulario, avanzar al siguiente
    if (formStep < getMaxSteps() - 1) {
      handleNextStep();
      return;
    }
    
    // Preparar los datos del usuario para el registro
    const userData = {
      name: formData.name,
      email: formData.email,
      country: formData.country,
      userType: formData.userType,
      // Agregar campos condicionales según el tipo de usuario
      ...(formData.userType === 'Empresa' && {
        company: formData.company,
        automationNeeds: formData.automationNeeds,
        linkedinUrl: formData.linkedinUrl || undefined
      }),
      ...((['Emprendedor', 'Freelancer', 'Persona'].includes(formData.userType)) && {
        interestArea: formData.interestArea,
        toolsUsed: formData.toolsUsed,
        projectDescription: formData.projectDescription,
        linkedinUrl: formData.linkedinUrl || undefined
      })
    };
    
    setIsSubmitting(true);
    
    try {
      const result = await registerUser(userData);
      
      if (result.success) {
        // Registro exitoso, mostrar animación de éxito
        setFormSubmitted(true);
        
        // Dar tiempo a que se muestre la animación y luego completar el proceso
        setTimeout(() => {
          setIsSubmitting(false);
          onSubmit();
        }, 1500);
      } else {
        // Mostrar error de registro
        setFormError(result.error || "Error al registrar usuario. Por favor intenta de nuevo.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setFormError("Error de conexión. Por favor intenta de nuevo más tarde.");
      setIsSubmitting(false);
    }
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

  // Animation variants for slide effects
  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } },
  };

  const checkSecretPhrase = () => {
    return formData.secretPhrase && formData.secretPhrase.toLowerCase() === "soy irrelevant club";
  };

  const toggleSecretMode = () => {
    setSecretMode(!secretMode);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
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
                {checkSecretPhrase() ? (
                  <h2 className="text-2xl font-providence text-gradient flex items-center gap-2">
                    <Lock className="w-5 h-5 text-irrelevant-violet" />
                    ¡Acceso exclusivo desbloqueado!
                  </h2>
                ) : (
                  <h2 className="text-2xl font-providence text-gradient">
                    {formSubmitted 
                      ? "¡Registro completado!"
                      : "Únete a nuestro arsenal tech"
                    }
                  </h2>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-irrelevant-light" />
                </button>
              </div>

              {checkSecretPhrase() ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xl mb-8">¡Te reconocemos! Acceso inmediato concedido.</p>
                    <button
                      onClick={onSubmit}
                      className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                    >
                      Entrar al arsenal de herramientas 
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div>
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="flex justify-between mb-8">
                        {Array.from({ length: getMaxSteps() }).map((_, index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 mx-1 rounded-full ${
                              index <= formStep
                                ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {formStep === 0 && (
                          <motion.div
                            key="step1"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideVariants}
                            className="space-y-5"
                          >
                            <div>
                              <p className="text-irrelevant-light/70 text-sm mb-6">Información básica</p>
                            </div>

                            <div className="relative">
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                Nombre completo
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-irrelevant-light/50">
                                  <User className="w-5 h-5" />
                                </div>
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                  placeholder="Tu nombre"
                                />
                              </div>
                            </div>

                            <div className="relative">
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                Correo electrónico
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-irrelevant-light/50">
                                  <Mail className="w-5 h-5" />
                                </div>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                  placeholder="tu@email.com"
                                />
                              </div>
                            </div>

                            <div className="relative">
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                País
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-irrelevant-light/50 z-10">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <Select
                                  value={formData.country}
                                  onValueChange={(value) => handleSelectChange("country", value)}
                                >
                                  <SelectTrigger 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light h-auto"
                                  >
                                    <SelectValue placeholder="Selecciona tu país" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-irrelevant-dark border-white/10 text-irrelevant-light max-h-80">
                                    {countries.map((country) => (
                                      <SelectItem 
                                        key={country} 
                                        value={country}
                                        className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                                      >
                                        {country}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿Cuál de estos te describe mejor?
                              </label>
                              <Select
                                value={formData.userType}
                                onValueChange={(value) => handleSelectChange("userType", value)}
                              >
                                <SelectTrigger 
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light h-auto"
                                >
                                  <SelectValue placeholder="Selecciona una opción" />
                                </SelectTrigger>
                                <SelectContent className="bg-irrelevant-dark border-white/10 text-irrelevant-light">
                                  <SelectItem 
                                    value="Emprendedor"
                                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                                  >
                                    Emprendedor con negocio propio
                                  </SelectItem>
                                  <SelectItem 
                                    value="Freelancer"
                                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                                  >
                                    Profesional independiente / freelancer
                                  </SelectItem>
                                  <SelectItem 
                                    value="Persona"
                                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                                  >
                                    Persona interesada en aprender y explorar
                                  </SelectItem>
                                  <SelectItem 
                                    value="Empresa"
                                    className="hover:bg-white/10 focus:bg-white/10 cursor-pointer"
                                  >
                                    Empresa
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="relative group">
                              <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium mb-1 text-irrelevant-light flex items-center gap-1">
                                  <div onClick={toggleSecretMode}>
                                    <Key className={`w-4 h-4 ${secretMode ? "text-irrelevant-violet" : "text-irrelevant-light/50"} cursor-pointer`} />
                                  </div>
                                  <span>¿Ya perteneces al club?</span>
                                </label>
                                <button 
                                  type="button"
                                  onClick={toggleSecretMode}
                                  className="text-xs text-irrelevant-light/50 hover:text-irrelevant-violet"
                                >
                                  {secretMode ? "Ocultar" : "Mostrar"}
                                </button>
                              </div>
                              
                              <motion.div
                                initial={false}
                                animate={{ 
                                  height: secretMode ? "auto" : "0",
                                  opacity: secretMode ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="py-2">
                                  <input
                                    type="text"
                                    name="secretPhrase"
                                    value={formData.secretPhrase}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                    placeholder="Ingresa la frase secreta para acceso inmediato"
                                  />
                                  <p className="text-xs text-irrelevant-light/70 mt-1">
                                    Si ya formas parte del club <span className="italic">irrelevant</span>, introduce la frase secreta.
                                  </p>
                                </div>
                              </motion.div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                type="submit"
                                className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                              >
                                {formData.userType ? <span>Continuar</span> : <span>Acceder</span>}
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {formStep === 1 && showCompanyFields && (
                          <motion.div
                            key="step2-company"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideVariants}
                            className="space-y-5"
                          >
                            <div>
                              <p className="text-irrelevant-light/70 text-sm mb-6">Cuéntanos sobre tu empresa</p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿A qué se dedica tu empresa?
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-irrelevant-light/50">
                                  <Building className="w-5 h-5" />
                                </div>
                                <input
                                  type="text"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                  placeholder="Sector y tipo de empresa"
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿Qué te gustaría automatizar en tu empresa?
                              </label>
                              <textarea
                                name="automationNeeds"
                                value={formData.automationNeeds}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light min-h-[100px]"
                                placeholder="Describe procesos o tareas que te gustaría mejorar"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                Perfil de LinkedIn o página web (opcional)
                              </label>
                              <input
                                type="text"
                                name="linkedinUrl"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                placeholder="https://"
                              />
                            </div>

                            <div className="flex justify-between pt-2">
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="bg-white/5 hover:bg-white/10 text-irrelevant-light font-medium py-3 px-6 rounded-lg transition-all duration-300"
                              >
                                Atrás
                              </button>
                              <button
                                type="submit"
                                className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                              >
                                <span>Acceder</span>
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {formStep === 1 && showPersonFields && (
                          <motion.div
                            key="step2-person"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={slideVariants}
                            className="space-y-5"
                          >
                            <div>
                              <p className="text-irrelevant-light/70 text-sm mb-6">Queremos conocerte mejor</p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿Qué te interesa aprender?
                              </label>
                              <div className="relative">
                                <div className="absolute left-3 top-5 -translate-y-1/2 text-irrelevant-light/50">
                                  <Briefcase className="w-5 h-5" />
                                </div>
                                <textarea
                                  name="interestArea"
                                  value={formData.interestArea}
                                  onChange={handleChange}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light min-h-[80px]"
                                  placeholder="Áreas de interés, tecnologías, etc."
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿Qué herramientas has usado antes?
                              </label>
                              <input
                                type="text"
                                name="toolsUsed"
                                value={formData.toolsUsed}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                                placeholder="Herramientas tech, plataformas, programas..."
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1 text-irrelevant-light">
                                ¿Tienes algún proyecto en mente?
                              </label>
                              <textarea
                                name="projectDescription"
                                value={formData.projectDescription}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light min-h-[80px]"
                                placeholder="Cuéntanos qué te gustaría lograr con estas herramientas"
                                required
                              />
                            </div>

                            <div className="flex justify-between pt-2">
                              <button
                                type="button"
                                onClick={handlePrevStep}
                                className="bg-white/5 hover:bg-white/10 text-irrelevant-light font-medium py-3 px-6 rounded-lg transition-all duration-300"
                              >
                                Atrás
                              </button>
                              <button
                                type="submit"
                                className="flex items-center gap-2 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                              >
                                <span>Acceder</span>
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-xl mb-4">¡Estamos abriendo las puertas del arsenal!</p>
                        <p className="text-irrelevant-light/70 mb-8">
                          Preparando tu experiencia personalizada...
                        </p>
                        
                        <motion.div
                          className="h-2 bg-white/10 rounded-full max-w-md mx-auto overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
