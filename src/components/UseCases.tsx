
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Rocket, Sparkles, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const useCases = [
  {
    id: 1,
    title: "Automatiza tu contacto con clientes",
    description: "Sistema que responde preguntas, agenda reuniones y genera propuestas sin intervención humana",
    tools: ["ChatGPT", "Zapier", "Make", "Calendly"],
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-blue-500/30 to-purple-500/30",
  },
  {
    id: 2,
    title: "Gestiona contenido sin esfuerzo",
    description: "Flujo para crear, programar y analizar todo tu contenido en la mitad del tiempo",
    tools: ["Midjourney", "ChatGPT", "Later", "Canva"],
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-orange-500/30 to-red-500/30",
  },
  {
    id: 3,
    title: "Genera informes en segundos",
    description: "Conecta tus fuentes de datos y obtén insights valiosos de forma instantánea y visual",
    tools: ["Airtable", "Notion", "PowerBI", "ChatGPT"],
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-green-500/30 to-emerald-500/30",
  },
  {
    id: 4,
    title: "Crea webs increíbles sin código",
    description: "Monta sitios web profesionales y personalizados sin saber programar",
    tools: ["Webflow", "Framer", "Midjourney", "ChatGPT"],
    icon: <Workflow className="w-6 h-6" />,
    gradient: "from-pink-500/30 to-purple-500/30",
  },
];

const UseCases: React.FC = () => {
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
            Así se hace
          </h2>
          <p className="text-irrelevant-light/80">
            Casos reales que implementamos con estas herramientas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full bg-gradient-to-br ${useCase.gradient} glass-panel border-white/10`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md">
                      {useCase.icon}
                    </div>
                    <CardTitle className="text-xl font-providence text-irrelevant-light">
                      {useCase.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-irrelevant-light/80 text-base">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <p className="text-sm text-irrelevant-light/70 mb-2 w-full">
                      Herramientas utilizadas:
                    </p>
                    {useCase.tools.map(tool => (
                      <span 
                        key={tool} 
                        className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-irrelevant-light"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-irrelevant-light/80 group-hover:text-irrelevant-light transition-colors"
                  >
                    <span className="text-sm font-medium">Ver flujo completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
