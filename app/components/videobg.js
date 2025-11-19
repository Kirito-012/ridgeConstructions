import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    name: 'SECRET KITCHEN',
    type: 'Restaurant',
    images: [
      '/projects/sk1.jpeg',
      '/projects/sk2.jpeg',
      '/projects/sk3.jpg'
    ]
  },
  {
    name: 'GREENBOOK DENTISTRY',
    type: 'Healthcare',
    images: [
      '/projects/gd1.jpeg',
      '/projects/gd2.jpeg'
    ]
  },
  {
    name: 'MABELLE DENTAL',
    type: 'Healthcare',
    images: [
      '/projects/mv1.jpeg',
      '/projects/mv2.jpeg'
    ]
  },
  {
    name: 'SHELBYS',
    type: 'Restaurant',
    images: [
      '/projects/sh1.jpeg',
      '/projects/sh2.jpeg'
    ]
  },
  {
    name: 'BURGER KING',
    type: 'Restaurant',
    images: [
      '/projects/bk1.jpeg',
      '/projects/bk2.jpeg'
    ]
  }
];

export default function HeroSliderSection() {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => {
        const nextImage = prev + 1;
        if (nextImage >= projects[currentProject].images.length) {
          return 0;
        }
        return nextImage;
      });
    }, 3000);

    return () => clearInterval(imageTimer);
  }, [currentProject]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentImage(0);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImage(0);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
    setCurrentImage(0);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${currentProject}-${currentImage}`}
              src={projects[currentProject].images[currentImage]}
              alt={projects[currentProject].name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-12 z-10"
          >
            <h2 className="text-5xl font-bold text-always-white mb-2 tracking-wide">
              {projects[currentProject].name}
            </h2>
            <p className="text-xl text-always-white uppercase tracking-widest">
              {projects[currentProject].type}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevProject}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-8 h-8 text-always-white cursor-pointer" />
      </button>

      <button
        onClick={nextProject}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        aria-label="Next project"
      >
        <ChevronRight className="w-8 h-8 text-always-white cursor-pointer" />
      </button>

      <div className="absolute bottom-12 right-12 z-20 flex gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentProject === index
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-12 right-12 z-20 flex gap-2">
        {projects[currentProject].images.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentImage === index
                ? 'bg-white w-12'
                : 'bg-white/30 w-8'
            }`}
          />
        ))}
      </div>
    </div>
  );
}