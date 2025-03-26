
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Rocket, Sparkles, Workflow, X, Filter, Play, Link2, Copy, ChevronLeft, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Enhanced use cases with better storytelling and more detailed information
const useCases = [
  {
    id: 1,
    title: "Deja que tu negocio hable solo",
    description: "Este flujo responde preguntas, agenda reuniones y genera propuestas mientras duermes.",
    tools: ["ChatGPT", "Zapier", "Make", "Calendly"],
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/30 to-purple-500/30",
    tags: ["Ventas", "Ahorrar tiempo"],
    objective: "Ahorrar 5 horas semanales en gestión comercial",
    longDescription: "Imagina que tu negocio puede responder consultas, agendar reuniones y enviar propuestas personalizadas, todo automáticamente. Este flujo conecta varios sistemas para crear un asistente virtual de ventas que trabaja 24/7 sin intervención humana.",
    diagram: "Cliente escribe → ChatGPT analiza → Zapier conecta → Calendly agenda → Make envía propuesta personalizada",
    originalTitle: "Automatiza tu contacto con clientes",
    hasVideo: true,
    benefits: [
      "Elimina la gestión manual de leads",
      "Respuestas instantáneas 24/7",
      "Agendamiento automático",
      "Seguimiento personalizado sin esfuerzo"
    ],
    results: "Reducción del 70% en tiempo de gestión de leads y aumento del 35% en tasa de conversión.",
    color: "blue",
    glow: "shadow-blue-500/20"
  },
  {
    id: 2,
    title: "Tu departamento creativo automático",
    description: "Flujo para crear, programar y analizar todo tu contenido en la mitad del tiempo.",
    tools: ["Midjourney", "ChatGPT", "Later", "Canva"],
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/30 to-red-500/30",
    tags: ["Marketing", "Escalar sin equipo"],
    objective: "Producir y programar contenido de redes 4x más rápido",
    longDescription: "Este sistema te permite crear, editar y programar contenido para múltiples plataformas sin un equipo de marketing. Convierte una idea en una publicación completa en minutos, no horas, con análisis integrado para optimizar resultados.",
    diagram: "Idea → ChatGPT genera copy → Midjourney crea visual → Canva edita → Later programa y analiza",
    originalTitle: "Gestiona contenido sin esfuerzo",
    hasVideo: true,
    benefits: [
      "Contenido consistente sin equipo",
      "Gráficos profesionales automatizados",
      "Análisis y optimización continua",
      "Escalable a múltiples canales"
    ],
    results: "Aumento del 300% en producción de contenido y 45% más engagement con el mismo equipo.",
    color: "orange",
    glow: "shadow-orange-500/20"
  },
  {
    id: 3,
    title: "El oráculo de tus datos",
    description: "Conecta tus fuentes, saca insights sin programar y toma decisiones en tiempo real.",
    tools: ["Airtable", "Notion", "PowerBI", "ChatGPT"],
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-green-500/30 to-emerald-500/30",
    tags: ["Operaciones", "Tomar decisiones"],
    objective: "Convertir datos en decisiones estratégicas instantáneas",
    longDescription: "Este sistema transforma los datos dispersos de tu negocio en un dashboard inteligente que no solo visualiza la información, sino que sugiere acciones concretas gracias a la IA. Deja de adivinar y comienza a decidir con confianza.",
    diagram: "Airtable recoge datos → Notion organiza → PowerBI visualiza → ChatGPT interpreta y sugiere acciones",
    originalTitle: "Genera informes en segundos",
    hasVideo: false,
    benefits: [
      "Centralización de todos tus datos",
      "Visualizaciones en tiempo real",
      "Interpretación automática con IA",
      "Sugerencias de acciones concretas"
    ],
    results: "Reducción del 90% en tiempo de análisis y 40% mejor ROI en decisiones de inversión.",
    color: "green",
    glow: "shadow-green-500/20"
  },
  {
    id: 4,
    title: "Sitios web que se construyen solos",
    description: "Monta sitios web profesionales y personalizados sin saber programar.",
    tools: ["Webflow", "Framer", "Midjourney", "ChatGPT"],
    icon: <Workflow className="w-6 h-6" />,
    gradient: "from-pink-500/30 to-purple-500/30",
    tags: ["Marketing", "Escalar sin equipo"],
    objective: "Crear sitios web profesionales sin contratar diseñadores ni programadores",
    longDescription: "Este flujo te permite conceptualizar, diseñar y publicar sitios web completos sin contratar a nadie. Desde la generación de contenido hasta la implementación técnica, todo automatizado para que puedas enfocarte en la estrategia.",
    diagram: "ChatGPT genera contenido → Midjourney crea visuales → Framer/Webflow compila → Publicación y análisis",
    originalTitle: "Crea webs increíbles sin código",
    hasVideo: true,
    benefits: [
      "Sitios visualmente impactantes sin diseñador",
      "Textos persuasivos generados con IA",
      "Actualizaciones rápidas y sin fricción",
      "Optimización automática para conversión"
    ],
    results: "Ahorro de $10k+ en costos de diseño y desarrollo, y reducción del time-to-market de meses a días.",
    color: "pink",
    glow: "shadow-pink-500/20"
  },
];

// All possible filter options
const filterOptions = {
  areas: ["Ventas", "Marketing", "Operaciones", "Finanzas", "Atención al cliente"],
  objectives: ["Ahorrar tiempo", "Aumentar ventas", "Tomar decisiones", "Escalar sin equipo"]
};

// Component for detailed view of a use case
const UseCaseDetail = ({ 
  useCase, 
  onBack 
}: { 
  useCase: typeof useCases[0], 
  onBack: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="flex items-center gap-2 text-irrelevant-light/80 hover:text-irrelevant-light transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Volver a flujos</span>
        </motion.button>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          {useCase.tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 rounded-full bg-irrelevant-violet/20 text-irrelevant-light/90 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-${useCase.color}-500/20 backdrop-blur-sm`}>
          {useCase.icon}
        </div>
        <h2 className="text-4xl font-providence text-gradient">
          {useCase.title}
        </h2>
        <h3 className="text-lg text-irrelevant-light/70">
          <em>Antes conocido como "{useCase.originalTitle}"</em>
        </h3>
        <p className="text-irrelevant-light/90 text-lg">
          {useCase.longDescription}
        </p>
      </motion.div>
      
      {/* Objetivo y Resultado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className={`glass-panel border-${useCase.color}-500/30 ${useCase.glow}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">🎯 Objetivo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-irrelevant-light/90 text-lg font-medium">{useCase.objective}</p>
          </CardContent>
        </Card>
        
        <Card className={`glass-panel border-${useCase.color}-500/30 ${useCase.glow}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">📊 Resultado</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-irrelevant-light/90">{useCase.results}</p>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Diagrama de flujo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-8 rounded-xl glass-panel border-${useCase.color}-500/30 ${useCase.glow} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-30`}></div>
        
        <h3 className="text-2xl font-providence text-irrelevant-light mb-6 relative z-10">Diagrama del flujo</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 relative z-10">
          {useCase.diagram.split('→').map((step, index, array) => (
            <React.Fragment key={index}>
              <div className={`p-4 rounded-lg bg-white/10 backdrop-blur-sm flex flex-col items-center text-center border border-white/5 ${index === array.length - 1 ? 'col-span-1' : 'col-span-1'}`}>
                <span className="text-sm text-irrelevant-light/90 font-medium">{step.trim()}</span>
              </div>
              
              {index < array.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-irrelevant-light/60" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2 relative z-10">
          <p className="text-sm text-irrelevant-light/70 mb-1 w-full">
            Herramientas utilizadas:
          </p>
          {useCase.tools.map(tool => (
            <div 
              key={tool} 
              className="px-3 py-2 rounded-full bg-white/10 text-sm font-medium text-irrelevant-light flex items-center gap-1.5"
            >
              <div className="w-5 h-5 rounded-full bg-irrelevant-violet/20 flex items-center justify-center">
                <span className="text-xs">⚙️</span>
              </div>
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Beneficios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel rounded-xl p-8 space-y-4"
      >
        <h3 className="text-2xl font-providence text-irrelevant-light">
          Beneficios clave
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {useCase.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-irrelevant-violet/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">✓</span>
              </div>
              <p className="text-irrelevant-light/80">{benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Video o Vista previa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`glass-panel rounded-xl overflow-hidden ${useCase.hasVideo ? 'aspect-video relative' : 'p-8'}`}
      >
        {useCase.hasVideo ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-irrelevant-violet/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-irrelevant-light ml-1" />
              </div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-providence text-irrelevant-light mb-2">
                  Ver en acción
                </h3>
                <p className="text-irrelevant-light/70">
                  Haz clic para ver cómo implementamos este flujo paso a paso
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-providence text-irrelevant-light">
              ¿Quieres implementar este flujo?
            </h3>
            <p className="text-irrelevant-light/70 max-w-xl mx-auto">
              Próximamente tendremos un video tutorial detallado mostrando cómo implementar este flujo desde cero.
            </p>
          </div>
        )}
      </motion.div>
      
      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row gap-6 justify-center"
      >
        <Button 
          className="bg-irrelevant-violet hover:bg-irrelevant-violet/80 text-white flex items-center gap-2 py-6 px-8 text-lg"
        >
          <Copy className="w-5 h-5" />
          <span>Clona este flujo</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="border-white/10 bg-white/5 hover:bg-white/10 text-irrelevant-light flex items-center gap-2 py-6 px-8 text-lg"
        >
          <Link2 className="w-5 h-5" />
          <span>Plantilla de referencia</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

const UseCases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    area: [] as string[],
    objective: [] as string[]
  });
  
  const toggleAreaFilter = (area: string) => {
    setFilters(prev => ({
      ...prev,
      area: prev.area.includes(area) 
        ? prev.area.filter(a => a !== area)
        : [...prev.area, area]
    }));
  };
  
  const toggleObjectiveFilter = (objective: string) => {
    setFilters(prev => ({
      ...prev,
      objective: prev.objective.includes(objective) 
        ? prev.objective.filter(o => o !== objective)
        : [...prev.objective, objective]
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      area: [],
      objective: []
    });
  };
  
  const filteredCases = useCases.filter(useCase => {
    if (filters.area.length === 0 && filters.objective.length === 0) return true;
    
    const matchesArea = filters.area.length === 0 || 
      useCase.tags.some(tag => filters.area.includes(tag));
      
    const matchesObjective = filters.objective.length === 0 || 
      useCase.tags.some(tag => filters.objective.includes(tag));
      
    return matchesArea && matchesObjective;
  });
  
  const selectedCaseData = selectedCase !== null 
    ? useCases.find(c => c.id === selectedCase) 
    : null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedCase === null ? (
            <motion.div
              key="cases-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-3xl font-providence mb-4 text-gradient">
                  Flujos en acción
                </h2>
                <p className="text-irrelevant-light/80">
                  Casos reales que implementamos con estas herramientas para transformar negocios
                </p>
              </motion.div>
              
              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8 flex flex-wrap items-center gap-3"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-white/10 bg-white/5 text-irrelevant-light flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span>Área</span>
                      {filters.area.length > 0 && (
                        <span className="w-5 h-5 rounded-full bg-irrelevant-violet text-white text-xs flex items-center justify-center">
                          {filters.area.length}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2">
                    <div className="space-y-1">
                      {filterOptions.areas.map(area => (
                        <div
                          key={area}
                          className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                            filters.area.includes(area)
                              ? 'bg-irrelevant-violet/20 text-irrelevant-light'
                              : 'hover:bg-white/5 text-irrelevant-light/70'
                          }`}
                          onClick={() => toggleAreaFilter(area)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${
                              filters.area.includes(area)
                                ? 'bg-irrelevant-violet'
                                : 'bg-white/10'
                            }`}>
                              {filters.area.includes(area) && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <span>{area}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="border-white/10 bg-white/5 text-irrelevant-light flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span>Objetivo</span>
                      {filters.objective.length > 0 && (
                        <span className="w-5 h-5 rounded-full bg-irrelevant-violet text-white text-xs flex items-center justify-center">
                          {filters.objective.length}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2">
                    <div className="space-y-1">
                      {filterOptions.objectives.map(objective => (
                        <div
                          key={objective}
                          className={`px-3 py-2 rounded-md cursor-pointer transition-colors ${
                            filters.objective.includes(objective)
                              ? 'bg-irrelevant-violet/20 text-irrelevant-light'
                              : 'hover:bg-white/5 text-irrelevant-light/70'
                          }`}
                          onClick={() => toggleObjectiveFilter(objective)}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${
                              filters.objective.includes(objective)
                                ? 'bg-irrelevant-violet'
                                : 'bg-white/10'
                            }`}>
                              {filters.objective.includes(objective) && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <span>{objective}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                {(filters.area.length > 0 || filters.objective.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="text-irrelevant-light/70 hover:text-irrelevant-light"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpiar filtros
                  </Button>
                )}
                
                {(filters.area.length > 0 || filters.objective.length > 0) && (
                  <div className="text-sm text-irrelevant-light/70 ml-auto">
                    Mostrando {filteredCases.length} de {useCases.length} flujos
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group perspective"
                  >
                    <HoverCard>
                      <HoverCardTrigger>
                        <div 
                          onClick={() => setSelectedCase(useCase.id)}
                          className={`h-full rounded-xl overflow-hidden relative gradient-border glass-panel cursor-pointer transition-all duration-300 group-hover:shadow-2xl ${useCase.glow}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-b ${useCase.gradient} opacity-70 transition-opacity duration-300 group-hover:opacity-90`}></div>
                          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-irrelevant-dark/90"></div>
                          
                          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            <div>
                              {/* Tag badges */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {useCase.tags.map((tag, i) => (
                                  <motion.div 
                                    key={`tag-${i}`}
                                    className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-irrelevant-light/90"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    viewport={{ once: true }}
                                  >
                                    {tag}
                                  </motion.div>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-3 mb-4">
                                <motion.div 
                                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                                  whileHover={{ 
                                    rotate: [0, -10, 10, -5, 0],
                                    scale: 1.05,
                                    transition: { duration: 0.5 }
                                  }}
                                >
                                  {useCase.icon}
                                </motion.div>
                                <h3 className="text-2xl font-providence text-irrelevant-light">
                                  {useCase.title}
                                </h3>
                              </div>
                              <p className="text-irrelevant-light/90 text-lg mb-4">
                                {useCase.description}
                              </p>
                              
                              {/* Tools section */}
                              <div className="flex flex-wrap gap-2">
                                {useCase.tools.map((tool, i) => (
                                  <motion.div
                                    key={`tool-${i}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-irrelevant-light/80"
                                  >
                                    <div className="w-4 h-4 rounded-full bg-irrelevant-violet/20 flex items-center justify-center">
                                      <span className="text-[0.6rem]">⚙️</span>
                                    </div>
                                    <span>{tool}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            <motion.div
                              className="flex justify-end mt-6"
                              whileHover={{ x: 5 }}
                            >
                              <Button 
                                variant="ghost"
                                className="group-hover:bg-white/10 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors flex items-center gap-2"
                              >
                                <span className="text-base font-medium">Espiar cómo funciona</span>
                                <ArrowUpRight className="w-5 h-5" />
                              </Button>
                            </motion.div>
                          </div>
                          
                          {/* Animated glow effect on hover */}
                          <motion.div 
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{ 
                              boxShadow: ["0 0 0 0px rgba(156, 107, 255, 0)", "0 0 0 2px rgba(156, 107, 255, 0.3)", "0 0 0 0px rgba(156, 107, 255, 0)"] 
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut" 
                            }}
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="p-0 w-80">
                        <div className="p-4 bg-gradient-to-b from-irrelevant-dark/90 to-irrelevant-dark backdrop-blur-md">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-irrelevant-light/80">DIAGRAMA DE FLUJO</span>
                          </div>
                          <div className="space-y-2">
                            {useCase.diagram.split('→').map((step, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-irrelevant-violet/20 flex-shrink-0 flex items-center justify-center text-xs">
                                  {i + 1}
                                </div>
                                <div className="text-sm text-irrelevant-light/90">{step.trim()}</div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10 text-xs text-irrelevant-light/70">
                            Haz clic para ver el flujo completo
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>
              
              {filteredCases.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 glass-panel rounded-xl"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Filter className="w-8 h-8 text-irrelevant-light/60" />
                  </div>
                  <h3 className="text-2xl font-providence text-irrelevant-light mb-2">
                    No hay flujos que coincidan
                  </h3>
                  <p className="text-irrelevant-light/70 max-w-md mx-auto">
                    No encontramos flujos que coincidan con tus filtros. Intenta con otra combinación.
                  </p>
                  <Button 
                    onClick={clearFilters} 
                    className="mt-6 bg-irrelevant-violet/20 hover:bg-irrelevant-violet/30 text-irrelevant-light"
                  >
                    Limpiar filtros
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="case-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedCaseData && (
                <UseCaseDetail 
                  useCase={selectedCaseData} 
                  onBack={() => setSelectedCase(null)} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Check component
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default UseCases;
