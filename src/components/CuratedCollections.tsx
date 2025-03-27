import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Lock, Star, Zap, Rocket, Sparkles, ExternalLink, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: 1,
    title: "Joyas que usamos cuando el juego se pone serio",
    description: "El toolkit que usamos a diario y nos ha salvado la vida (literalmente)",
    icon: <Star className="w-6 h-6" />,
    gradient: "from-purple-500/30 via-indigo-500/20 to-pink-500/30",
    pattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]",
    emoji: "🔥",
    tag: "Nivel pro",
    cta: "Entrar a la sala secreta →",
    locked: false,
    tools: [
      {
        name: "Zapier",
        logo: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
        description: "Conecta apps sin escribir una sola línea de código y automatiza flujos de trabajo completos.",
        tags: ["Automatización", "Intermedio", "Freemium"],
        useCases: ["Marketing", "Ventas", "Operaciones"]
      },
      {
        name: "Notion",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
        description: "Tu segunda memoria cerebral. Base de datos, wikis y gestión de proyectos todo en uno.",
        tags: ["Productividad", "Intermedio", "Freemium"],
        useCases: ["Gestión", "Documentación", "Colaboración"]
      },
      {
        name: "Make (Integromat)",
        logo: "https://assets.website-files.com/5e59256cdea1ff287e7c8405/6214da84d5077144db975f41_make-social-card.png",
        description: "La versión pro de Zapier para crear automatizaciones complejas con control total.",
        tags: ["Automatización", "Avanzado", "Freemium"],
        useCases: ["Operaciones", "Desarrollo", "Marketing"]
      }
    ],
    longDescription: "Este es nuestro arsenal diario: las herramientas que usamos cuando necesitamos resultados rápidos, fiables y escalables. Con este combo, hemos automatizado procesos que nos ahorraban 20+ horas semanales y hemos escalado operaciones sin contratar a nadie más. Son las joyas de la corona que nos permiten construir productos y servicios a velocidad inhumana.",
    workflow: "Notion como cerebro central + Zapier para conectar con herramientas externas + Make para los flujos complejos = Stack perfecto para equipos pequeños que quieren impacto masivo."
  },
  {
    id: 2,
    title: "Automatiza como un fantasma sin escribir una línea",
    description: "Para los que automatizan sin escribir una línea de código y hacen más con menos",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/30 via-cyan-400/20 to-teal-500/30",
    pattern: "bg-[linear-gradient(to_right,_var(--tw-gradient-stops))]",
    emoji: "⚡",
    tag: "No-code power",
    cta: "Descubrir el combo →",
    locked: false,
    tools: [
      {
        name: "Airtable",
        logo: "https://seeklogo.com/images/A/airtable-logo-216B9AF035-seeklogo.com.png",
        description: "Bases de datos visuales tan potentes como Excel pero tan fáciles como una app.",
        tags: ["Datos", "Principiante", "Freemium"],
        useCases: ["CRM", "Proyectos", "Inventario"]
      },
      {
        name: "Webflow",
        logo: "https://assets-global.website-files.com/5e59259a16c6f948c03865f4/5e5d77a2d5a0bfda53c1d8f8_webflow.svg",
        description: "La plataforma para crear webs profesionales sin tocar una línea de código.",
        tags: ["Web", "Intermedio", "Pago"],
        useCases: ["Marketing", "Desarrollo", "Diseño"]
      },
      {
        name: "Glide",
        logo: "https://glideapps.com/images/social.png",
        description: "Crea apps móviles conectadas a tus hojas de cálculo en minutos, no meses.",
        tags: ["Apps", "Principiante", "Freemium"],
        useCases: ["Operaciones", "Ventas", "Servicio"]
      }
    ],
    longDescription: "En esta colección encontrarás las armas secretas para construir productos digitales completos sin tocar una línea de código. Desde bases de datos, apps móviles y webs profesionales hasta flujos de trabajo completos, todo sin depender de programadores o diseñadores externos.",
    workflow: "Airtable como base de datos + Webflow como frontend + Glide para apps internas = Infraestructura digital completa sin depender de desarrollo tradicional."
  },
  {
    id: 3,
    title: "Herramientas que vienen del futuro (y ya están aquí)",
    description: "Herramientas que parecen magia negra y que todos estarán usando en unos meses",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/30 via-amber-400/20 to-yellow-500/30",
    pattern: "bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))]",
    emoji: "🚀",
    tag: "Early adopters",
    cta: "Ver este arsenal →",
    locked: false,
    tools: [
      {
        name: "Midjourney",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
        description: "El generador de imágenes AI que está redefiniendo lo que es posible en diseño visual.",
        tags: ["IA", "Intermedio", "Pago"],
        useCases: ["Diseño", "Marketing", "Contenidos"]
      },
      {
        name: "Perplexity AI",
        logo: "https://assets-global.website-files.com/6491a3e9e52e3e3de90253cc/6491a3e9e52e3e3de90254e3_perplexity-logo.png",
        description: "Motor de búsqueda con IA que da respuestas directas, no solo links.",
        tags: ["IA", "Principiante", "Freemium"],
        useCases: ["Investigación", "Escritura", "Aprendizaje"]
      },
      {
        name: "Descript",
        logo: "https://assets-global.website-files.com/5d5aeaab8e4ca479874128b5/5f0d2bc0c7f25da1e739cdfb_descript-logo.svg",
        description: "Edita audio y video editando texto, como si fuera un documento.",
        tags: ["Contenido", "Intermedio", "Pago"],
        useCases: ["Video", "Podcast", "Entrevistas"]
      }
    ],
    longDescription: "Estas son las herramientas de las que nadie habla (aún), pero que están redefiniendo completamente los flujos de trabajo creativos y de productividad. La mayoría usa IA generativa para hacer posible lo que antes requería equipos enteros o años de experiencia.",
    workflow: "Midjourney para generar conceptos visuales + Perplexity AI para investigar sin perderse en Google + Descript para crear contenido multimedia profesional = Flujo creativo acelerado x10."
  },
  {
    id: 4,
    title: "Arsenal prohibido para hackear lo establecido",
    description: "La nueva generación que está haciendo obsoletas herramientas que creías intocables",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-green-500/30 via-teal-400/20 to-emerald-500/30",
    pattern: "bg-[linear-gradient(to_bottom_left,_var(--tw-gradient-stops))]",
    emoji: "✨",
    tag: "🧪 Laboratorio secreto",
    cta: "Desbloquear el futuro →",
    locked: true,
    tools: [
      {
        name: "Runway",
        logo: "https://assets-global.website-files.com/5dd2c331e35c5a6860dce1c9/5ebcba2ff0c7db7b42e4fbf8_runway-logo.png",
        description: "Crea y edita videos con IA, genera escenas completas y efectos visuales imposibles.",
        tags: ["IA", "Avanzado", "Pago"],
        useCases: ["Video", "Efectos", "Marketing"]
      },
      {
        name: "GPTs personalizados",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        description: "Asistentes de IA a medida que pueden reemplazar roles enteros en tu equipo.",
        tags: ["IA", "Intermedio", "Pago"],
        useCases: ["Operaciones", "Soporte", "Contenido"]
      },
      {
        name: "Retool",
        logo: "https://retool.com/static/3bca5101a7e23c86a7ff0df993116efe/retool_r_logo.svg",
        description: "Construye herramientas internas en minutos que cambiarán tu operativa para siempre.",
        tags: ["Desarrollo", "Avanzado", "Freemium"],
        useCases: ["Operaciones", "Datos", "Automatización"]
      }
    ],
    longDescription: "Esta colección es nuestro laboratorio secreto. Herramientas tan disruptivas que están haciendo obsoletos flujos de trabajo enteros que antes parecían intocables. Con este arsenal has entrado en territorio experimental donde las reglas tradicionales no aplican.",
    workflow: "Runway para crear contenido visual imposible + GPTs personalizados para sustituir roles + Retool para operaciones internas = Reemplazar equipos enteros con tecnología."
  },
];

const CollectionDetail = ({ 
  collection
}: { 
  collection: typeof collections[0]
}) => {
  return (
    <div className="space-y-8">      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-irrelevant-violet/20 text-irrelevant-light/90 text-sm mb-4">
          {collection.emoji} <span>{collection.tag}</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-providence text-gradient">
          {collection.title}
        </h2>
        
        <p className="text-irrelevant-light/90 text-base sm:text-lg">
          {collection.longDescription}
        </p>
      </div>
      
      <ScrollArea className="h-[400px] w-full overflow-y-auto pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.tools.map((tool, index) => (
            <motion.div
              key={`${collection.id}-tool-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
              className="glass-panel rounded-xl overflow-hidden relative"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center p-2">
                    <img src={tool.logo} alt={tool.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-irrelevant-light">{tool.name}</h3>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {tool.tags.map((tag, i) => (
                        <span key={`tag-${i}`} className="text-xs px-2 py-0.5 rounded-full bg-irrelevant-violet/20 text-irrelevant-light/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-irrelevant-light/80">{tool.description}</p>
                <div className="space-y-2">
                  <div className="text-xs text-irrelevant-light/60 uppercase tracking-wide">Casos de uso principales</div>
                  <div className="flex flex-wrap gap-2">
                    {tool.useCases.map((useCase, i) => (
                      <span key={`use-${i}`} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-irrelevant-light/70">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-2 text-center py-2 px-4 bg-irrelevant-violet/10 hover:bg-irrelevant-violet/20 rounded-lg text-irrelevant-light/90 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <span>Ver cómo la usamos</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel rounded-xl p-6 space-y-4"
      >
        <h3 className="text-2xl font-providence text-irrelevant-light">
          ¿Qué puedes hacer con este combo?
        </h3>
        <p className="text-irrelevant-light/80">
          {collection.workflow}
        </p>
        <div className="flex justify-end">
          <Button className="px-4 py-2 rounded-lg bg-irrelevant-violet hover:bg-irrelevant-violet/80 flex items-center gap-2">
            <span>Muéstramelo en acción 🔥</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const CuratedCollections: React.FC = () => {
  const [unlockedAll, setUnlockedAll] = useState(false);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);

  const handleUnlock = () => {
    if (secretPhrase.toLowerCase().trim() === "soy irrelevant club") {
      setUnlockedAll(true);
      setShowSecretInput(false);
    }
  };

  const selectedCollectionData = selectedCollection !== null 
    ? collections.find(c => c.id === selectedCollection) 
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
            Salas secretas de nuestro arsenal
          </h2>
          <p className="text-irrelevant-light/80">
            Desde lo que usamos todos los días hasta lo que apenas está explotando el juego
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`group perspective ${collection.locked && !unlockedAll ? 'relative' : ''}`}
              onClick={() => {
                if (!collection.locked || unlockedAll) {
                  setSelectedCollection(collection.id);
                }
              }}
            >
              <div
                className={`h-72 rounded-xl overflow-hidden relative gradient-border glass-panel transform transition-transform duration-300 group-hover:shadow-2xl group-hover:shadow-irrelevant-violet/10 cursor-pointer ${collection.pattern}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${collection.gradient} opacity-70`}></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-irrelevant-dark/90"></div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <motion.div 
                      className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-irrelevant-light/90 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {collection.tag}
                    </motion.div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div 
                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                        whileHover={{ 
                          rotate: [0, -10, 10, -5, 0],
                          scale: 1.05,
                          transition: { duration: 0.5 }
                        }}
                      >
                        {collection.icon}
                        <span className="absolute -right-1 -top-1 text-lg">{collection.emoji}</span>
                      </motion.div>
                      <h3 className="text-2xl font-providence text-irrelevant-light">
                        {collection.title}
                      </h3>
                    </div>
                    <p className="text-irrelevant-light/90 text-lg">
                      {collection.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className="flex justify-end"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-2 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors border-b border-irrelevant-light/0 group-hover:border-irrelevant-light/30 pb-1">
                      <span className="text-base font-medium">{collection.cta}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
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

              {collection.locked && !unlockedAll && (
                <div className="absolute inset-0 bg-irrelevant-dark/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-irrelevant-violet/30 flex items-center justify-center"
                  >
                    <Lock className="w-8 h-8 text-irrelevant-light/80" />
                  </motion.div>
                  <p className="text-irrelevant-light text-center max-w-[80%] font-providence text-xl">
                    Acceso restringido. ¿Eres uno de los nuestros?
                  </p>
                  {!showSecretInput ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSecretInput(true);
                      }}
                      className="px-4 py-2 bg-irrelevant-violet/20 hover:bg-irrelevant-violet/30 rounded-md transition-colors text-irrelevant-light"
                    >
                      Desbloquear con frase secreta
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 w-[80%]" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        placeholder="Introduce la frase secreta..."
                        value={secretPhrase}
                        onChange={(e) => setSecretPhrase(e.target.value)}
                        className="px-4 py-2 rounded-md bg-white/10 border border-white/20 text-irrelevant-light placeholder-irrelevant-light/50 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlock();
                        }}
                        className="px-4 py-2 bg-irrelevant-violet hover:bg-irrelevant-violet/80 rounded-md transition-colors text-irrelevant-light"
                      >
                        Verificar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <Dialog open={selectedCollection !== null} onOpenChange={(open) => !open && setSelectedCollection(null)}>
          <DialogContent className="bg-irrelevant-dark border border-white/10 text-irrelevant-light w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden">
            <DialogHeader className="flex flex-row items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedCollection(null)}
                className="flex items-center gap-2 text-irrelevant-light/80 hover:text-irrelevant-light hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al arsenal</span>
              </Button>
              
              {selectedCollectionData && (
                <div className="flex items-center gap-2">
                  <span className="text-irrelevant-light/60 text-sm">Colección #{selectedCollectionData.id}</span>
                </div>
              )}
              
              <DialogClose className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-5 w-5 text-irrelevant-light/70 hover:text-irrelevant-light" />
                <span className="sr-only">Cerrar</span>
              </DialogClose>
            </DialogHeader>
            
            {selectedCollectionData && (
              <CollectionDetail collection={selectedCollectionData} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CuratedCollections;
