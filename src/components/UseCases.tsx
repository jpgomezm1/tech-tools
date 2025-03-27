
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Rocket, Sparkles, Workflow, X, Filter, Play, Link2, Copy, ChevronLeft, ArrowUpRight, ExternalLink, Check, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Estructura de datos escalable para los casos de uso
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
    glow: "shadow-blue-500/20",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop",
    imageAlt: "Persona trabajando con laptop mientras el sistema responde automáticamente",
    problem: "Pasar horas respondiendo consultas básicas y coordinando agendas con clientes potenciales",
    testimonial: "Con este flujo automatizado, podemos generar el doble de propuestas con la mitad del equipo comercial.",
    tagline: "Este flujo hace más que tu equipo comercial... sin pedir aumento."
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
    glow: "shadow-orange-500/20",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1744&auto=format&fit=crop",
    imageAlt: "Espacio de trabajo creativo con múltiples pantallas mostrando diseños",
    problem: "Depender de un equipo creativo costoso y lento para generar contenido para redes",
    testimonial: "Pasamos de publicar 2 veces por semana a tener contenido diario en 3 plataformas diferentes, sin contratar a nadie más.",
    tagline: "Dormí tranquilo. Este flujo trabaja por ti."
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
    glow: "shadow-green-500/20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    imageAlt: "Dashboard analítico con visualizaciones de datos",
    problem: "Tener datos dispersos en múltiples sistemas sin capacidad de análisis unificado",
    testimonial: "Ahora tomamos decisiones de inversión basadas en datos reales, no en intuiciones o reportes obsoletos.",
    tagline: "Este flujo ve patrones donde tu equipo solo ve números."
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
    glow: "shadow-pink-500/20",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1470&auto=format&fit=crop",
    imageAlt: "Interfaz de diseño web con elementos visuales coloridos",
    problem: "Depender de equipos de desarrollo costosos para crear y mantener sitios web profesionales",
    testimonial: "Lanzamos 4 sitios web para diferentes productos en el tiempo que antes nos tomaba crear uno solo.",
    tagline: "Despide a tu equipo de desarrollo. Este flujo diseña mejor y más rápido."
  },
];

const filterOptions = {
  areas: ["Ventas", "Marketing", "Operaciones", "Finanzas", "Atención al cliente"],
  objectives: ["Ahorrar tiempo", "Aumentar ventas", "Tomar decisiones", "Escalar sin equipo"]
};

// Componente para mostrar el detalle de un caso de uso dentro del Dialog
const UseCaseDetail = ({ 
  useCase, 
  onClose 
}: { 
  useCase: typeof useCases[0], 
  onClose: () => void 
}) => {
  return (
    <div className="space-y-8 px-4">
      <div className="flex justify-between items-center">
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="flex items-center gap-2 text-irrelevant-light/80 hover:text-irrelevant-light transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Volver a flujos</span>
        </motion.button>
        
        <DialogClose className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <X className="h-5 w-5" />
        </DialogClose>
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
        <p className="text-xl text-irrelevant-light/90 font-semibold italic">
          "{useCase.tagline}"
        </p>
        <p className="text-irrelevant-light/90 text-lg">
          {useCase.longDescription}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className={`glass-panel border-${useCase.color}-500/30 ${useCase.glow}`}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-lg">⚡ Problema</span>
            </h3>
            <p className="text-irrelevant-light/90">{useCase.problem}</p>
          </CardContent>
        </Card>
        
        <Card className={`glass-panel border-${useCase.color}-500/30 ${useCase.glow}`}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-lg">🎯 Objetivo</span>
            </h3>
            <p className="text-irrelevant-light/90 text-lg font-medium">{useCase.objective}</p>
          </CardContent>
        </Card>
      </motion.div>
      
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
                <Check className="w-4 h-4 text-irrelevant-light" />
              </div>
              <p className="text-irrelevant-light/80">{benefit}</p>
            </div>
          ))}
        </div>
      </motion.div>
      
      {useCase.testimonial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className={`glass-panel rounded-xl p-8 border-l-4 border-${useCase.color}-500/50`}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">💬</div>
            <div>
              <p className="text-irrelevant-light/90 text-lg italic">"{useCase.testimonial}"</p>
              <p className="text-irrelevant-light/60 mt-2 text-sm">— Usuario de irrelevant</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`glass-panel rounded-xl overflow-hidden ${useCase.hasVideo ? 'aspect-video relative' : 'p-8'}`}
      >
        {useCase.hasVideo ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{
                   backgroundImage: `url(${useCase.image})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 flex items-center justify-center backdrop-blur-sm"></div>
              <div className="w-20 h-20 rounded-full bg-irrelevant-violet/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform duration-300 z-10">
                <Play className="w-8 h-8 text-irrelevant-light ml-1" />
              </div>
              <div className="absolute bottom-8 left-8 z-10">
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
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row gap-6 justify-center mb-6"
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
    </div>
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

        {/* Carrusel horizontal con scroll */}
        <ScrollArea className="w-full overflow-auto pb-6">
          <div className="flex space-x-6 px-1 min-w-full">
            {filteredCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group flex-none w-[340px] md:w-[380px]"
                onClick={() => setSelectedCase(useCase.id)}
              >
                <div 
                  className={`h-[420px] rounded-xl overflow-hidden relative gradient-border glass-panel cursor-pointer transition-all duration-300 group-hover:shadow-2xl ${useCase.glow}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      backgroundImage: `url(${useCase.image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-irrelevant-dark/70 to-irrelevant-dark/90 mix-blend-multiply"></div>
                  </div>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
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
                          className={`w-14 h-14 rounded-full bg-${useCase.color}-500/20 backdrop-blur-md flex items-center justify-center`}
                          whileHover={{ 
                            rotate: [0, -10, 10, -5, 0],
                            scale: 1.05,
                            transition: { duration: 0.5 }
                          }}
                        >
                          {useCase.icon}
                        </motion.div>
                        <h3 className="text-xl font-providence text-irrelevant-light">
                          {useCase.title}
                        </h3>
                      </div>
                      <p className="text-irrelevant-light/90 text-base mb-4">
                        {useCase.description}
                      </p>
                      
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
                        <Eye className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                  
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
              </motion.div>
            ))}
          </div>
        </ScrollArea>
        
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
              No hay flujos con estos filtros
            </h3>
            <p className="text-irrelevant-light/70 max-w-xl mx-auto">
              Prueba a cambiar los filtros o revisar otras categorías para encontrar lo que buscas.
            </p>
          </motion.div>
        )}
        
        {/* Modal para mostrar el detalle del caso */}
        <Dialog 
          open={selectedCase !== null} 
          onOpenChange={(open) => !open && setSelectedCase(null)}
        >
          <DialogContent className="bg-irrelevant-dark border border-white/10 text-irrelevant-light w-[95vw] max-w-5xl max-h-[85vh] overflow-y-auto">
            {selectedCaseData && (
              <UseCaseDetail 
                useCase={selectedCaseData} 
                onClose={() => setSelectedCase(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default UseCases;
