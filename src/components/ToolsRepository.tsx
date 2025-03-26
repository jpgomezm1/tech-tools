
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpRight, ArrowRight, Tag, Zap, Star, Heart, Info, Bookmark, BookmarkCheck } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Static tools data
const toolsData = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Asistente de IA conversacional avanzado",
    category: "IA",
    level: "Principiante",
    price: "Freemium",
    useCase: ["Crear contenido", "Automatizar tareas", "Análisis de datos"],
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png",
  },
  {
    id: 2,
    name: "Zapier",
    description: "Conecta apps y automatiza flujos de trabajo",
    category: "Automatización",
    level: "Intermedio",
    price: "Freemium",
    useCase: ["Automatizar tareas", "Integrar servicios"],
    recommended: true,
    logo: "https://cdn.zapier.com/zapier/images/logos/zapier-logo-inverse.svg",
  },
  {
    id: 3,
    name: "Notion",
    description: "Todo en uno: notas, tareas, bases de datos",
    category: "Productividad",
    level: "Principiante",
    price: "Freemium",
    useCase: ["Gestionar proyectos", "Crear contenido", "Trabajar en equipo"],
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    id: 4,
    name: "Midjourney",
    description: "Generador de imágenes con IA de alta calidad",
    category: "IA",
    level: "Principiante",
    price: "Pago",
    useCase: ["Crear contenido", "Diseño gráfico", "Marketing"],
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
  },
  {
    id: 5,
    name: "Airtable",
    description: "Base de datos flexible y colaborativa",
    category: "Productividad",
    level: "Intermedio",
    price: "Freemium",
    useCase: ["Gestionar datos", "Trabajar en equipo"],
    recommended: false,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg",
  },
  {
    id: 6,
    name: "Make",
    description: "Crea flujos de trabajo complejos sin código",
    category: "Automatización",
    level: "Avanzado",
    price: "Freemium",
    useCase: ["Automatizar procesos", "Integrar servicios"],
    recommended: false,
    logo: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_8a3fcce3962b963c0cf2d9d8cfcb1083/make.png",
  },
  {
    id: 7,
    name: "Webflow",
    description: "Crea sitios web profesionales sin código",
    category: "No-Code",
    level: "Intermedio",
    price: "Freemium",
    useCase: ["Diseño web", "Marketing"],
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Webflow_logo.svg",
  },
  {
    id: 8,
    name: "Figma",
    description: "Diseño y prototipado colaborativo",
    category: "Diseño",
    level: "Intermedio",
    price: "Freemium",
    useCase: ["Diseño UI/UX", "Prototipado", "Trabajar en equipo"],
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
];

const useCases = [
  "Crear contenido", 
  "Automatizar tareas", 
  "Gestionar proyectos", 
  "Análisis de datos", 
  "Diseño gráfico", 
  "Marketing", 
  "Trabajar en equipo",
  "Integrar servicios"
];

const ToolsRepository: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    level: "",
    useCase: "",
    search: "",
  });
  
  const [favorites, setFavorites] = useState<number[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const categories = ["IA", "Automatización", "Productividad", "No-Code", "Diseño"];
  const prices = ["Gratis", "Freemium", "Pago"];
  const levels = ["Principiante", "Intermedio", "Avanzado"];

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch = tool.name
      .toLowerCase()
      .includes(filters.search.toLowerCase()) || tool.description
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || tool.category === filters.category;
    const matchesPrice = !filters.price || tool.price === filters.price;
    const matchesLevel = !filters.level || tool.level === filters.level;
    const matchesUseCase = !filters.useCase || tool.useCase.includes(filters.useCase);

    return matchesSearch && matchesCategory && matchesPrice && matchesLevel && matchesUseCase;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: { 
      y: -10,
      boxShadow: "0 10px 25px -5px rgba(156, 107, 255, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-providence mb-4 text-gradient">
            Armas Secretas de Productividad
          </h2>
          <p className="text-irrelevant-light/80">
            Explora nuestra colección curada de herramientas que usamos en <span className="italic">irrelevant</span> (y lo que no sirve, no entra)
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-irrelevant-light/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Busca herramientas por nombre o función..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filters.category === category
                      ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                      : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-irrelevant-light/50" />
              <span className="text-sm text-irrelevant-light/50">Filtros:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  onClick={() => handleFilterChange("level", level)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    filters.level === level
                      ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                      : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {prices.map((price) => (
                <motion.button
                  key={price}
                  onClick={() => handleFilterChange("price", price)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    filters.price === price
                      ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                      : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                  }`}
                >
                  {price}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-4 w-full">
              <p className="text-sm text-irrelevant-light/50 mb-2 flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>Casos de uso:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {useCases.map((useCase) => (
                  <motion.button
                    key={useCase}
                    onClick={() => handleFilterChange("useCase", useCase)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      filters.useCase === useCase
                        ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                        : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                    }`}
                  >
                    {useCase}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
                layout
                className="flip-card"
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front gradient-border p-6 group relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 z-0"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/10 p-2 flex items-center justify-center">
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg text-irrelevant-light flex items-center gap-2">
                              {tool.name}
                              {tool.recommended && (
                                <HoverCard>
                                  <HoverCardTrigger>
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  </HoverCardTrigger>
                                  <HoverCardContent className="bg-irrelevant-dark/95 border border-white/10 text-irrelevant-light text-sm">
                                    Recomendado por el equipo de <span className="italic">irrelevant</span>
                                  </HoverCardContent>
                                </HoverCard>
                              )}
                            </h3>
                            <p className="text-sm text-irrelevant-light/70">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(tool.id);
                            }}
                            className="text-irrelevant-light/40 hover:text-pink-500 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${favorites.includes(tool.id) ? "text-pink-500 fill-pink-500" : ""}`} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(tool.id);
                            }}
                            className="text-irrelevant-light/40 hover:text-irrelevant-violet transition-colors"
                          >
                            {bookmarks.includes(tool.id) ? (
                              <BookmarkCheck className="w-5 h-5 text-irrelevant-violet fill-irrelevant-violet/20" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-irrelevant-light/80">
                          {tool.category}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-irrelevant-light/80">
                          {tool.level}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-white/5 text-xs text-irrelevant-light/80">
                          {tool.price}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <HoverCard>
                          <HoverCardTrigger>
                            <button className="flex items-center gap-1 text-xs text-irrelevant-light/60 hover:text-irrelevant-light">
                              <Info className="w-3.5 h-3.5" />
                              <span>Info</span>
                            </button>
                          </HoverCardTrigger>
                          <HoverCardContent className="bg-irrelevant-dark/95 border border-white/10 text-irrelevant-light">
                            <h4 className="text-sm font-semibold mb-2">Casos de uso</h4>
                            <ul className="text-xs space-y-1">
                              {tool.useCase.map((use, i) => (
                                <li key={i} className="flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-irrelevant-violet" />
                                  <span>{use}</span>
                                </li>
                              ))}
                            </ul>
                          </HoverCardContent>
                        </HoverCard>
                        
                        <button className="flex items-center gap-1 text-xs text-irrelevant-violet hover:text-irrelevant-light">
                          <span>Ver detalles</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-irrelevant-violet/0 via-irrelevant-violet/0 to-irrelevant-purple/0 opacity-0 blur group-hover:opacity-20 group-hover:via-irrelevant-violet/20 transition-all duration-500"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default ToolsRepository;
