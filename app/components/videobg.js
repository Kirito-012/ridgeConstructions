import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    name: 'SECRET KITCHEN',
    type: 'Restaurant',
    images: ['/projects/sk1.jpeg', '/projects/sk2.jpeg', '/projects/sk3.jpg'],
  },
  {
    name: 'GREENBOOK DENTISTRY',
    type: 'Healthcare',
    images: ['/projects/gd1.jpeg', '/projects/gd2.jpeg'],
  },
  {
    name: 'MABELLE DENTAL',
    type: 'Healthcare',
    images: ['/projects/mv1.jpeg', '/projects/mv2.jpeg'],
  },
  {
    name: 'SHELBYS',
    type: 'Restaurant',
    images: ['/projects/sh1.jpeg', '/projects/sh2.jpeg'],
  },
  {
    name: 'BURGER KING',
    type: 'Restaurant',
    images: ['/projects/bk1.jpeg', '/projects/bk2.jpeg'],
  },
];

const HeroSliderSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Memoize current project data to avoid recalculating on every render
  const currentProjectData = useMemo(
    () => projects[currentProject],
    [currentProject]
  );

  const currentImageCount = currentProjectData.images.length;

  // Auto-advance images with cleanup and dependency optimization
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % currentImageCount);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentProject, currentImageCount]); // Only re-create interval when project changes

  // Memoize navigation handlers to prevent unnecessary re-renders
  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setCurrentImage(0);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setCurrentImage(0);
  }, []);

  const goToProject = useCallback((index) => {
    setCurrentProject(index);
    setCurrentImage(0);
  }, []);

  return (
    <div className="relative w-full h-[95vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Image fade transition */}
          <AnimatePresence mode="wait">
            <motion.img
              key={`${currentProject}-${currentImage}`}
              src={currentProjectData.images[currentImage]}
              alt={currentProjectData.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy" // Reduces initial load impact
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-10 left-12 z-10"
          >
            <h2 className="text-5xl font-bold text-always-white mb-2 tracking-wide">
              {currentProjectData.name}
            </h2>
            <p className="text-xl text-always-white uppercase tracking-widest">
              {currentProjectData.type}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - extracted to prevent re-creation */}
      <NavButton direction="left" onClick={prevProject} />
      <NavButton direction="right" onClick={nextProject} />

      {/* Project Dots - memoized component */}
      <ProjectDots currentProject={currentProject} goToProject={goToProject} />

      {/* Image Progress Indicators - memoized */}
      <ImageProgressBars
        imageCount={currentImageCount}
        currentImage={currentImage}
      />
    </div>
  );
};

// Separate memoized components to prevent re-rendering
const NavButton = memo(({ direction, onClick }) => {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
      style={{ [isLeft ? 'left' : 'right']: '1.5rem' }}
      aria-label={isLeft ? 'Previous project' : 'Next project'}
    >
      {isLeft ? (
        <ChevronLeft className="w-8 h-8 cursor-pointer text-always-white" />
      ) : (
        <ChevronRight className="w-8 h-8 cursor-pointer text-always-white" />
      )}
    </button>
  );
});

NavButton.displayName = 'NavButton';

const ProjectDots = memo(({ currentProject, goToProject }) => (
  <div className="absolute bottom-12 right-12 z-20 flex gap-3">
    {projects.map((_, index) => (
      <button
        key={index}
        onClick={() => goToProject(index)}
        className={`rounded-full transition-all duration-300 ${
          currentProject === index
            ? 'bg-white w-10 h-3'
            : 'bg-white/40 hover:bg-white/60 w-3 h-3'
        }`}
        aria-label={`Go to project ${index + 1}`}
      />
    ))}
  </div>
));

ProjectDots.displayName = 'ProjectDots';

const ImageProgressBars = memo(({ imageCount, currentImage }) => (
  <div className="absolute top-12 right-12 z-20 flex gap-2">
    {Array.from({ length: imageCount }, (_, index) => (
      <div
        key={index}
        className={`h-1 rounded-full transition-all duration-300 ${
          currentImage === index ? 'bg-white w-12' : 'bg-white/30 w-8'
        }`}
      />
    ))}
  </div>
));

ImageProgressBars.displayName = 'ImageProgressBars';

export default memo(HeroSliderSection);