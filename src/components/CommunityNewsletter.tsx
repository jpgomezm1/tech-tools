
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Rocket, Sparkles, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  whatsapp: z.string().min(9, "Número inválido").optional(),
}).refine(data => data.email || data.whatsapp, {
  message: "Proporciona al menos un método de contacto",
  path: ["email"],
});

const CommunityNewsletter: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      whatsapp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-irrelevant-dark to-irrelevant-dark/95 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${155 + Math.random() * 100}, ${107 + Math.random() * 100}, ${255}, ${0.3 + Math.random() * 0.4})`,
            }}
            animate={{
              y: [0, -(Math.random() * 100 + 50)],
              opacity: [0, 0.8, 0],
              scale: [0, 1 + Math.random()],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* 3D effect gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30"></div>
            
            <div className="glass-panel border-white/10 rounded-2xl overflow-hidden relative">
              {/* Subtle tech pattern overlay */}
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
              
              <div className="bg-black/40 backdrop-blur-lg p-8 md:p-12 flex flex-col">
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="px-6 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2"
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-white/80">+1500 personas en la comunidad</span>
                  </motion.div>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-providence text-center mb-4 text-white tracking-tight leading-tight">
                  <span className="text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Tu cerebro necesita esto.</span>
                </h2>

                <p className="text-lg text-irrelevant-light/80 text-center mb-8 max-w-2xl mx-auto">
                  Cada semana desbloqueamos una herramienta de IA que multiplica tu productividad × 10. 
                  <span className="block mt-2 italic font-semibold text-white">
                    El grupo de WhatsApp es donde están pasando cosas que no puedes ni imaginar.
                  </span>
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="tu@email.com"
                                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-6 pr-36 py-6 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-irrelevant-light placeholder:text-white/40 h-auto text-base"
                                    />
                                    <Button
                                      type="submit"
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300 flex items-center gap-2 h-auto"
                                    >
                                      <span>Recibir joyas</span>
                                      <Zap className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                          <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type="tel"
                                      placeholder="+34 600 00 00 00"
                                      className="w-full bg-black/60 border border-white/10 rounded-xl pl-6 pr-36 py-6 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-irrelevant-light placeholder:text-white/40 h-auto text-base"
                                    />
                                    <Button
                                      type="submit"
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center gap-2 h-auto"
                                    >
                                      <span>Entrar al grupo</span>
                                      <Rocket className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Final CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-16 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-black/60 to-black/80 backdrop-blur-lg border border-white/5 relative overflow-hidden"
            >
              {/* Background particle effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 3 + 1 + "px",
                      height: Math.random() * 3 + 1 + "px",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: `rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`,
                    }}
                    animate={{
                      x: [0, Math.random() * 50 - 25],
                      y: [0, Math.random() * 50 - 25],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>
              
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  Cada segundo en un proceso manual es tiempo perdido, errores que se repiten y plata que se va.{" "}
                  <span className="text-gradient bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">Automatiza con nosotros.</span>
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-6 px-8 rounded-xl hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300 flex items-center gap-3 text-lg h-auto w-full sm:w-auto justify-center"
                      onClick={() => window.open("https://calendly.com/jpgomez-stayirrelevant/irrelevant-club?month=2025-03", "_blank")}
                    >
                      <span>Agendar reunión</span>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline"
                      className="border-white/20 bg-white/5 backdrop-blur-md text-white font-medium py-6 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 text-lg h-auto w-full sm:w-auto justify-center"
                      onClick={() => window.open("https://irrelevant-club.com", "_blank")}
                    >
                      <span>Explorar página web</span>
                    </Button>
                  </motion.div>
                </div>
                
                <div className="text-center text-white/40 text-sm mt-12">
                  © {new Date().getFullYear()} irrelevant. Para cerebros que no se conforman.
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="glass-panel border-white/10 p-10 rounded-xl text-center relative overflow-hidden"
          >
            {/* Success animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 z-0"></div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-providence mb-4 text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              >
                ¡Prepárate para lo que viene!
              </motion.h3>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-irrelevant-light/80 max-w-2xl mx-auto mb-8"
              >
                Te has unido al grupo más tech del planeta. Cada herramienta que compartimos está pensada para multiplicar tu productividad y hacer que los demás se pregunten cómo lo haces.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                  onClick={() => window.open("https://irrelevant-club.com", "_blank")}
                >
                  <span>Visitar nuestra web</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CommunityNewsletter;
