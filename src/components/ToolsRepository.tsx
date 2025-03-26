
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight, ArrowRight, Tag, Zap, Star } from "lucide-react";

// Static tools data
const toolsData = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Asistente de IA conversacional avanzado",
    category: "IA",
    level: "Principiante",
    price: "Freemium",
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
    recommended: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
];

const ToolsRepository: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    level: "",
    search: "",
  });

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

    return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
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
            Repositorio de Herramientas
          </h2>
          <p className="text-irrelevant-light/80">
            Explora nuestra colección curada de herramientas tech
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-irrelevant-light/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar herramientas..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-irrelevant-violet/50 text-irrelevant-light"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filters.category === category
                      ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                      : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-irrelevant-light/50" />
              <span className="text-sm text-irrelevant-light/50">Filtros:</span>
            </div>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleFilterChange("level", level)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  filters.level === level
                    ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                    : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                }`}
              >
                {level}
              </button>
            ))}
            {prices.map((price) => (
              <button
                key={price}
                onClick={() => handleFilterChange("price", price)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  filters.price === price
                    ? "bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white"
                    : "bg-white/5 text-irrelevant-light/80 hover:bg-white/10"
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="gradient-border p-6 group hover-lift"
            >
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
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </h3>
                    <p className="text-sm text-irrelevant-light/70">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-irrelevant-light/50 group-hover:text-irrelevant-violet transition-colors" />
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ToolsRepository;
