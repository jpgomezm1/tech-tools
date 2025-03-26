
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, Zap, Star, XCircle } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const categories = ["IA", "Automatización", "Productividad", "No-Code", "Diseño"];
const prices = ["Gratis", "Freemium", "Pago"];
const levels = ["Principiante", "Intermedio", "Avanzado"];
const useCases = [
  "Crear contenido", 
  "Automatizar tareas", 
  "Gestionar proyectos", 
  "Análisis de datos", 
  "Diseño gráfico", 
  "Marketing", 
  "Trabajar en equipo",
  "Integrar servicios",
  "Atención al cliente",
  "Finanzas",
  "Ecommerce",
  "Productividad personal"
];

const ToolsRepository: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    level: "",
    useCase: "",
    search: "",
  });
  
  const [searchResults, setSearchResults] = useState<typeof toolsData>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedTool, setSelectedTool] = useState<(typeof toolsData)[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (filters.search.length > 1) {
      const results = toolsData.filter(tool => 
        tool.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        tool.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tool.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        tool.useCase.some(uc => uc.toLowerCase().includes(filters.search.toLowerCase()))
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [filters.search]);

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

  const clearFilters = () => {
    setFilters({
      category: "",
      price: "",
      level: "",
      useCase: "",
      search: "",
    });
  };

  const handleOpenDetails = (tool: (typeof toolsData)[0]) => {
    setSelectedTool(tool);
    setIsDetailsOpen(true);
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
      boxShadow: "0 10px 25px -5px rgba(156, 107, 255, 0.2)",
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
              <Popover open={showSearchResults && searchResults.length > 0}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-irrelevant-light/50 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Busca herramientas por nombre o función..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, search: e.target.value }))
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[300px] p-0 bg-irrelevant-dark border border-white/10">
                  <Command className="bg-transparent">
                    <CommandList>
                      <CommandEmpty>No hay resultados</CommandEmpty>
                      <CommandGroup heading="Sugerencias">
                        {searchResults.map((tool) => (
                          <CommandItem
                            key={tool.id}
                            onSelect={() => {
                              setFilters(prev => ({ ...prev, search: tool.name }));
                              setShowSearchResults(false);
                            }}
                            className="flex items-center gap-2 py-2 cursor-pointer hover:bg-white/5"
                          >
                            <div className="w-6 h-6 rounded-full bg-white/10">
                              <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain rounded-full" />
                            </div>
                            <span>{tool.name}</span>
                            <span className="text-xs text-irrelevant-light/50 ml-auto">{tool.category}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
            
            <motion.button
              onClick={clearFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border border-white/10 
                flex items-center gap-1 text-irrelevant-light/60 hover:text-irrelevant-light/90 ml-auto`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </motion.button>
          </div>
          
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-providence mb-3 text-irrelevant-light/90">¿Qué quieres lograr?</h3>
            <div className="flex flex-wrap gap-2">
              {useCases.map((useCase) => (
                <motion.button
                  key={useCase}
                  onClick={() => handleFilterChange("useCase", useCase)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
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
                className="perspective"
              >
                <div className="gradient-border rounded-[20px] p-5 group relative overflow-hidden h-full flex flex-col">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-irrelevant-light flex items-center gap-2">
                            {tool.name}
                            {tool.recommended && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </h3>
                          <p className="text-sm text-irrelevant-light/70 line-clamp-1">
                            {tool.description}
                          </p>
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
                    </div>
                    
                    <motion.button
                      onClick={() => handleOpenDetails(tool)}
                      className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 
                        transition-all duration-300 text-irrelevant-light font-medium text-sm flex items-center justify-center gap-2
                        group-hover:bg-gradient-to-r group-hover:from-irrelevant-violet/80 group-hover:to-irrelevant-purple/80"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span>Espiar esta joya</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-irrelevant-violet/0 via-irrelevant-violet/0 to-irrelevant-purple/0 opacity-0 blur group-hover:opacity-20 group-hover:via-irrelevant-violet/20 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Tool Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-irrelevant-dark border border-white/10 text-irrelevant-light max-w-3xl">
          {selectedTool && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                    <img
                      src={selectedTool.logo}
                      alt={selectedTool.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-providence">
                      {selectedTool.name}
                      {selectedTool.recommended && (
                        <span className="ml-2">
                          <Star className="inline-block w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </span>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-irrelevant-light/70">
                      {selectedTool.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-irrelevant-light/80">
                    {selectedTool.category}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-irrelevant-light/80">
                    {selectedTool.level}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-irrelevant-light/80">
                    {selectedTool.price}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Casos de uso</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.useCase.map((useCase, i) => (
                      <div key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 text-sm">
                        <Zap className="w-4 h-4 text-irrelevant-violet" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setIsDetailsOpen(false)}
                    className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white px-6"
                  >
                    Volver al arsenal
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  );
};

export default ToolsRepository;
