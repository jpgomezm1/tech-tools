
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Zap, Star, XCircle, ExternalLink, Youtube, 
  BookOpen, Podcast, Lightbulb, ChevronRight, ChevronLeft, Check 
} from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
    fullDescription: "ChatGPT es un modelo de lenguaje diseñado para entender y generar texto similar al humano. Puede ayudarte con escritura creativa, responder preguntas, asistir en la programación y mucho más.",
    tasks: [
      "Escribir contenido SEO optimizado",
      "Generar ideas para marketing",
      "Resumir textos extensos",
      "Crear scripts para videos",
      "Responder preguntas de clientes"
    ],
    resources: [
      { type: "youtube", title: "Cómo usar ChatGPT en 2024", url: "#" },
      { type: "blog", title: "Prompts avanzados para ChatGPT", url: "#" },
      { type: "podcast", title: "El futuro de la IA conversacional", url: "#" },
      { type: "course", title: "Masterclass gratuita: ChatGPT para negocios", url: "#" }
    ],
    teamTip: "En irrelevant lo usamos para redactar emails personalizados y crear contenido base que luego personalizamos."
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
    fullDescription: "Zapier permite conectar más de 3,000 apps y servicios web sin necesidad de código. Automatiza tareas repetitivas y crea flujos de trabajo personalizados entre aplicaciones.",
    tasks: [
      "Sincronizar leads entre CRM y hojas de cálculo",
      "Automatizar respuestas en redes sociales",
      "Crear tickets de soporte desde emails",
      "Organizar tareas entre equipos"
    ],
    resources: [
      { type: "youtube", title: "Zapier desde cero: Tutorial completo", url: "#" },
      { type: "blog", title: "10 automatizaciones que necesitas implementar", url: "#" },
      { type: "podcast", title: "Entrevista con fundadores de Zapier", url: "#" },
      { type: "course", title: "Curso gratuito: De principiante a experto en Zapier", url: "#" }
    ],
    teamTip: "Lo combinamos con Make y Google Sheets para rastrear conversiones y automatizar el seguimiento de clientes."
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
    fullDescription: "Notion es un espacio de trabajo todo-en-uno para notas, tareas, wikis y bases de datos. Combina documentos, proyectos y colaboración en una sola herramienta altamente personalizable.",
    tasks: [
      "Crear un hub de conocimiento para tu equipo",
      "Gestionar proyectos con vistas Kanban",
      "Documentar procesos empresariales",
      "Planificar contenido editorial"
    ],
    resources: [
      { type: "youtube", title: "Notion para principiantes: Guía completa", url: "#" },
      { type: "blog", title: "Cómo estructurar tu Notion para máxima productividad", url: "#" },
      { type: "podcast", title: "Productividad personal con Notion", url: "#" },
      { type: "course", title: "Plantillas gratuitas de Notion para cualquier caso", url: "#" }
    ],
    teamTip: "Nuestra herramienta principal para documentación interna y gestión de contenidos. Lo conectamos con todo."
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
    fullDescription: "Midjourney es una herramienta de IA que genera imágenes de alta calidad a partir de descripciones textuales. Ideal para crear ilustraciones, conceptos y diseños visuales únicos.",
    tasks: [
      "Generar conceptos visuales para productos",
      "Crear ilustraciones para contenido",
      "Diseñar mockups rápidos",
      "Producir arte para redes sociales",
      "Inspirar sesiones creativas"
    ],
    resources: [
      { type: "youtube", title: "Domina Midjourney: Guía paso a paso", url: "#" },
      { type: "blog", title: "Prompts avanzados para Midjourney v6", url: "#" },
      { type: "podcast", title: "El futuro del arte generativo", url: "#" },
      { type: "course", title: "De cero a experto: Curso gratuito de Midjourney", url: "#" }
    ],
    teamTip: "Creamos todas nuestras ilustraciones conceptuales con esta herramienta. Ahorra horas de diseño."
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
    fullDescription: "Airtable combina la simplicidad de una hoja de cálculo con la potencia de una base de datos. Perfecta para organizar y visualizar información de forma flexible y colaborativa.",
    tasks: [
      "Gestionar inventarios y catálogos",
      "Seguimiento de proyectos y tareas",
      "Organizar eventos y calendarios",
      "Centralizar información de clientes"
    ],
    resources: [
      { type: "youtube", title: "Airtable desde cero: Tutorial completo", url: "#" },
      { type: "blog", title: "Cómo reemplazar Excel con Airtable", url: "#" },
      { type: "podcast", title: "Bases de datos sin ser desarrollador", url: "#" },
      { type: "course", title: "Airtable para negocios: Curso introductorio", url: "#" }
    ],
    teamTip: "Usamos Airtable para mantener nuestro CRM interno y gestionar el seguimiento de clientes de forma visual."
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
    fullDescription: "Make (anteriormente Integromat) permite crear automatizaciones complejas con una interfaz visual. Más potente que Zapier para flujos de trabajo avanzados con transformaciones de datos.",
    tasks: [
      "Crear integraciones personalizadas entre sistemas",
      "Automatizar procesos de negocio complejos",
      "Transformar y enriquecer datos entre plataformas",
      "Construir webhooks y endpoints personalizados"
    ],
    resources: [
      { type: "youtube", title: "Make vs Zapier: Cuándo usar cada uno", url: "#" },
      { type: "blog", title: "5 automatizaciones avanzadas con Make", url: "#" },
      { type: "podcast", title: "El poder de la automatización sin código", url: "#" },
      { type: "course", title: "Make para desarrolladores ciudadanos", url: "#" }
    ],
    teamTip: "Cuando Zapier se queda corto, usamos Make para las automatizaciones más complejas que requieren manipulación de datos."
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
    fullDescription: "Webflow es una plataforma que combina diseño visual con la potencia del código HTML, CSS y JS. Permite crear sitios web profesionales sin programar, con total control de diseño.",
    tasks: [
      "Construir landing pages de alto rendimiento",
      "Crear portfolios y sitios corporativos",
      "Implementar blogs y CMS personalizados",
      "Diseñar e-commerce sin limitaciones"
    ],
    resources: [
      { type: "youtube", title: "Webflow University: Curso completo", url: "#" },
      { type: "blog", title: "De diseñador a constructor web con Webflow", url: "#" },
      { type: "podcast", title: "No-Code Revolution con Webflow", url: "#" },
      { type: "course", title: "Masterclass gratuita: SEO en Webflow", url: "#" }
    ],
    teamTip: "Construimos todos nuestros sitios web en Webflow por su flexibilidad y facilidad para hacer cambios rápidos."
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
    fullDescription: "Figma es una herramienta de diseño basada en la nube que facilita la colaboración en tiempo real. Perfecta para diseño UI/UX, prototipado, y sistemas de diseño compartidos.",
    tasks: [
      "Crear interfaces de usuario para web y mobile",
      "Desarrollar sistemas de diseño escalables",
      "Prototipar interacciones y flujos de usuario",
      "Colaborar con equipos de producto en tiempo real"
    ],
    resources: [
      { type: "youtube", title: "Figma para principiantes 2024", url: "#" },
      { type: "blog", title: "Mejores prácticas para sistemas de diseño en Figma", url: "#" },
      { type: "podcast", title: "El futuro del diseño colaborativo", url: "#" },
      { type: "course", title: "Auto-layout y componentes en Figma: Curso gratuito", url: "#" }
    ],
    teamTip: "Todo nuestro proceso de diseño ocurre en Figma. La colaboración en tiempo real ha eliminado las reuniones de revisión."
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
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleCategories, setVisibleCategories] = useState<string[]>(categories);
  const [groupedTools, setGroupedTools] = useState<Record<string, typeof toolsData>>({});
  const [useCaseGroups, setUseCaseGroups] = useState<Record<string, typeof toolsData>>({});

  // References for scrolling
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Group tools by category and useCase
  useEffect(() => {
    const byCategory: Record<string, typeof toolsData> = {};
    const byUseCase: Record<string, typeof toolsData> = {};
    
    // Initialize categories
    categories.forEach(category => {
      byCategory[category] = [];
    });
    
    // Initialize use cases
    useCases.forEach(useCase => {
      byUseCase[useCase] = [];
    });
    
    // Group tools
    toolsData.forEach(tool => {
      // Add to category group
      if (byCategory[tool.category]) {
        byCategory[tool.category].push(tool);
      }
      
      // Add to each useCase group the tool belongs to
      tool.useCase.forEach(uc => {
        if (byUseCase[uc]) {
          byUseCase[uc].push(tool);
        }
      });
    });
    
    setGroupedTools(byCategory);
    setUseCaseGroups(byUseCase);
  }, []);

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

  const scrollToCategory = (category: string) => {
    if (categoryRefs.current[category]) {
      categoryRefs.current[category]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveCategory(category);
    }
  };

  const filteredToolsByCategory = (category: string) => {
    return groupedTools[category]?.filter((tool) => {
      const matchesSearch = !filters.search || 
        tool.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        tool.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = !filters.price || tool.price === filters.price;
      const matchesLevel = !filters.level || tool.level === filters.level;
      const matchesUseCase = !filters.useCase || tool.useCase.includes(filters.useCase);

      return matchesSearch && matchesPrice && matchesLevel && matchesUseCase;
    });
  };

  const filteredToolsByUseCase = (useCase: string) => {
    return useCaseGroups[useCase]?.filter((tool) => {
      const matchesSearch = !filters.search || 
        tool.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        tool.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || tool.category === filters.category;
      const matchesPrice = !filters.price || tool.price === filters.price;
      const matchesLevel = !filters.level || tool.level === filters.level;

      return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
    });
  };

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
      y: -8,
      boxShadow: "0 8px 30px -5px rgba(156, 107, 255, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  // Resource icon mapping
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'blog':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'podcast':
        return <Podcast className="w-4 h-4 text-green-400" />;
      case 'course':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      default:
        return <ExternalLink className="w-4 h-4 text-irrelevant-light/70" />;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-irrelevant-violet/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 -left-10 w-72 h-72 bg-irrelevant-purple/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-irrelevant-violet/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-providence mb-6 text-gradient">
              El Arsenal Tech de Superhéroes
            </h2>
            <p className="text-xl text-irrelevant-light/80 max-w-3xl">
              Herramientas no-code, flujos de trabajo con IA y joyas ocultas que usamos todos los días para hacer más con menos tiempo. 
              Este es el arsenal que nos da superpoderes, y ahora también es tuyo.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 relative"
          >
            <div className="glass-panel rounded-2xl p-6 backdrop-blur-lg">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-grow max-w-md">
                  <Popover open={showSearchResults && searchResults.length > 0}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-irrelevant-light/50 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Busca tu próximo superpoder..."
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
                
                <div className="flex items-center gap-3 ml-auto">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="border-white/10 bg-white/5 text-irrelevant-light hover:bg-white/10">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filtros</span>
                        {(filters.price || filters.level || filters.useCase) && (
                          <span className="ml-2 w-2 h-2 rounded-full bg-irrelevant-violet"></span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4 bg-irrelevant-dark border border-white/10">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-irrelevant-light/70">Nivel de dificultad</h4>
                          <div className="flex flex-wrap gap-2">
                            {levels.map((level) => (
                              <Button
                                key={level}
                                onClick={() => handleFilterChange("level", level)}
                                variant="outline"
                                size="sm"
                                className={`rounded-full border-white/10 ${
                                  filters.level === level
                                    ? "bg-irrelevant-violet text-white"
                                    : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                                }`}
                              >
                                {filters.level === level && <Check className="w-3 h-3 mr-1" />}
                                {level}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-irrelevant-light/70">Precio</h4>
                          <div className="flex flex-wrap gap-2">
                            {prices.map((price) => (
                              <Button
                                key={price}
                                onClick={() => handleFilterChange("price", price)}
                                variant="outline"
                                size="sm"
                                className={`rounded-full border-white/10 ${
                                  filters.price === price
                                    ? "bg-irrelevant-violet text-white"
                                    : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                                }`}
                              >
                                {filters.price === price && <Check className="w-3 h-3 mr-1" />}
                                {price}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-3 text-irrelevant-light/70">Caso de uso</h4>
                          <ScrollArea className="h-40 pr-3">
                            <div className="flex flex-wrap gap-2">
                              {useCases.map((useCase) => (
                                <Button
                                  key={useCase}
                                  onClick={() => handleFilterChange("useCase", useCase)}
                                  variant="outline"
                                  size="sm"
                                  className={`rounded-full border-white/10 ${
                                    filters.useCase === useCase
                                      ? "bg-irrelevant-violet text-white"
                                      : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                                  }`}
                                >
                                  {filters.useCase === useCase && <Check className="w-3 h-3 mr-1" />}
                                  {useCase}
                                </Button>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                        
                        {(filters.price || filters.level || filters.useCase) && (
                          <Button 
                            onClick={clearFilters}
                            variant="link" 
                            className="text-irrelevant-light/60 hover:text-irrelevant-light/90 p-0 h-auto"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            <span>Limpiar filtros</span>
                          </Button>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => scrollToCategory(category)}
                variant="outline"
                className={`rounded-full whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-300 border-white/10 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                    : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tools By Category */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              ref={(el) => (categoryRefs.current[category] = el)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-providence text-gradient">{category}</h3>
                <p className="text-irrelevant-light/70">
                  {category === "IA" && "Potencia tu trabajo con las mejores herramientas de inteligencia artificial."}
                  {category === "Automatización" && "Haz que las máquinas trabajen por ti con estos flujos automáticos."}
                  {category === "Productividad" && "Maximiza tu rendimiento y haz más en menos tiempo."}
                  {category === "No-Code" && "Crea sin saber programar y lanza productos más rápido."}
                  {category === "Diseño" && "Herramientas visuales para crear experiencias sorprendentes."}
                </p>
              </div>

              {filteredToolsByCategory(category).length > 0 ? (
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {filteredToolsByCategory(category).map((tool, index) => (
                      <CarouselItem key={tool.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <motion.div
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          whileHover="hover"
                          onClick={() => handleOpenDetails(tool)}
                          className="cursor-pointer h-full"
                        >
                          <div className="gradient-border rounded-[20px] p-5 group relative overflow-hidden h-full flex flex-col bg-white/5">
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 z-0"></div>
                            
                            <div className="relative z-10 h-full flex flex-col">
                              <div className="flex gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                                  <img
                                    src={tool.logo}
                                    alt={tool.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-xl text-irrelevant-light flex items-center gap-2">
                                    {tool.name}
                                    {tool.recommended && (
                                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    )}
                                  </h3>
                                  <p className="text-sm text-irrelevant-light/70">
                                    {tool.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1.5 mt-auto">
                                {tool.useCase.slice(0, 3).map((useCase, i) => (
                                  <div key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-xs">
                                    <Zap className="w-3 h-3 text-irrelevant-violet" />
                                    <span>{useCase}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Hover glow effect */}
                              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-irrelevant-violet/0 via-irrelevant-violet/0 to-irrelevant-purple/0 opacity-0 blur group-hover:opacity-20 group-hover:via-irrelevant-violet/20 transition-all duration-500"></div>
                            </div>
                          </div>
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex items-center justify-end mt-4 gap-2">
                    <CarouselPrevious className="relative inset-0 translate-y-0 bg-white/5 border-white/10 text-irrelevant-light hover:bg-white/10 hover:text-white" />
                    <CarouselNext className="relative inset-0 translate-y-0 bg-white/5 border-white/10 text-irrelevant-light hover:bg-white/10 hover:text-white" />
                  </div>
                </Carousel>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <p className="text-irrelevant-light/60">No hay herramientas que coincidan con los filtros seleccionados</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Use Case Showcase */}
        {filters.useCase && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 pb-10"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-providence text-gradient">Herramientas para: {filters.useCase}</h3>
              <p className="text-irrelevant-light/70">Superpoderes específicos para este caso de uso</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredToolsByUseCase(filters.useCase).map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover="hover"
                    layout
                    onClick={() => handleOpenDetails(tool)}
                    className="cursor-pointer rounded-2xl overflow-hidden"
                  >
                    <div className="gradient-border rounded-[20px] p-5 group relative overflow-hidden h-full flex flex-col bg-white/5">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 z-0"></div>
                      
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex gap-4 mb-4">
                          <div className="w-16 h-16 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-irrelevant-light flex items-center gap-2">
                              {tool.name}
                              {tool.recommended && (
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              )}
                            </h3>
                            <p className="text-sm text-irrelevant-light/70">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
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

                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {tool.useCase.slice(0, 3).map((useCase, i) => (
                            <div key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-xs">
                              <Zap className="w-3 h-3 text-irrelevant-violet" />
                              <span>{useCase}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-irrelevant-violet/0 via-irrelevant-violet/0 to-irrelevant-purple/0 opacity-0 blur group-hover:opacity-20 group-hover:via-irrelevant-violet/20 transition-all duration-500"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tool Details Dialog - Redesigned */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-irrelevant-dark border border-white/10 text-irrelevant-light max-w-4xl">
          {selectedTool && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                    <img
                      src={selectedTool.logo}
                      alt={selectedTool.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-providence flex items-center gap-2">
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
              
              <div className="mt-6 space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                {/* Full description */}
                <div>
                  <p className="text-irrelevant-light/90 leading-relaxed">
                    {selectedTool.fullDescription}
                  </p>
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 pt-2">
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
                
                {/* Use cases */}
                <div className="pt-2">
                  <h4 className="text-xl font-providence mb-3 text-gradient">Casos de uso</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.useCase.map((useCase, i) => (
                      <div key={i} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 text-sm">
                        <Zap className="w-4 h-4 text-irrelevant-violet" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div className="pt-2">
                  <h4 className="text-xl font-providence mb-3 text-gradient">Lo que puedes hacer con {selectedTool.name}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedTool.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2 text-irrelevant-light/80">
                        <div className="w-5 h-5 rounded-full bg-irrelevant-violet/20 flex items-center justify-center shrink-0">
                          <Zap className="w-3 h-3 text-irrelevant-violet" />
                        </div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="pt-2">
                  <h4 className="text-xl font-providence mb-3 text-gradient">Aprende a sacarle el jugo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedTool.resources.map((resource, i) => (
                      <a 
                        key={i} 
                        href={resource.url}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          {getResourceIcon(resource.type)}
                        </div>
                        <span className="text-sm">{resource.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Team tip */}
                <div className="pt-2">
                  <div className="bg-irrelevant-violet/10 border border-irrelevant-violet/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-irrelevant-violet/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-5 h-5 text-irrelevant-violet" />
                      </div>
                      <div>
                        <h5 className="font-medium text-irrelevant-light mb-1">Tip del escuadrón irrelevant</h5>
                        <p className="text-irrelevant-light/80 text-sm">{selectedTool.teamTip}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-4 flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white px-8 py-6 h-auto text-base font-medium"
                  >
                    <span>Activar este superpoder</span>
                    <ExternalLink className="w-5 h-5 ml-2" />
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
