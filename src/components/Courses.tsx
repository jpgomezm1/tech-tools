
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Book, Check, X, Send, GraduationCap } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const courses = [
  {
    id: 1,
    title: "IA Aplicada para Personas Normales",
    description: "Aprende a usar 5 herramientas de IA para automatizar tareas del día a día y multiplicar tu impacto",
    level: "Básico",
    duration: "4 semanas",
    icon: <Book className="w-6 h-6" />,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    title: "Automatización No-Code para Negocios",
    description: "Monta flujos de trabajo que funcionan solos y eliminan el 80% de tus tareas manuales repetitivas",
    level: "Intermedio",
    duration: "6 semanas",
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "Productividad Exponencial con Tech",
    description: "Aumenta tu capacidad 10x usando IA, automatización y herramientas de gestión avanzadas",
    level: "Básico-Intermedio",
    duration: "5 semanas",
    icon: <Book className="w-6 h-6" />,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

const Courses: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenDialog = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulated submission - would connect to backend in real app
    setTimeout(() => {
      setIsDialogOpen(false);
    }, 2000);
  };

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
            Aprende con nosotros
          </h2>
          <p className="text-irrelevant-light/80">
            Formaciones específicas para dominar estas herramientas y multiplicar tu impacto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className={`h-full bg-gradient-to-br ${course.gradient} glass-panel border-white/10`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md">
                      {course.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-providence text-irrelevant-light">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-irrelevant-light/80 text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-irrelevant-light">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-white/10 text-xs font-medium text-irrelevant-light">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <button
                    onClick={() => handleOpenDialog(course)}
                    className="w-full bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                  >
                    Quiero aprender esto
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-panel border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-providence text-gradient">
              {selectedCourse?.title}
            </DialogTitle>
            <DialogDescription className="text-irrelevant-light/80">
              Completa tus datos y resuelve tus dudas sobre este curso
            </DialogDescription>
          </DialogHeader>
          
          {submitted ? (
            <div className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-xl text-irrelevant-light">¡Recibido! Te contactaremos pronto</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-irrelevant-light">
                  Nombre completo
                </label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 text-irrelevant-light"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-irrelevant-light">
                  Correo electrónico
                </label>
                <Input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 text-irrelevant-light"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-irrelevant-light">
                  ¿Tienes alguna duda específica?
                </label>
                <Textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="bg-white/5 border border-white/10 text-irrelevant-light min-h-[80px]"
                  placeholder="¿Qué te gustaría aprender específicamente?"
                />
              </div>
              
              <div className="pt-2 flex justify-end gap-2">
                <DialogClose asChild>
                  <button type="button" className="flex items-center gap-1 px-4 py-2 rounded bg-white/5 text-irrelevant-light hover:bg-white/10">
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </DialogClose>
                
                <button 
                  type="submit"
                  className="flex items-center gap-1 bg-gradient-to-r from-irrelevant-violet to-irrelevant-purple text-white font-medium py-2 px-4 rounded hover:shadow-lg hover:shadow-irrelevant-violet/20 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Courses;
