"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

function ProjectDetailPage({ work, onBack }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Background */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${work.image})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-18 left-2 md:top-20 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-orange-500/45 hover:bg-orange-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-always-white text-center px-4"
          >
            {work.title}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            {work.description}
          </p>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Project <span className="text-accent">Gallery</span>
          </h2>
          
          {/* Masonry-style Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large featured image - takes 2 columns and 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[0]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </motion.div>

            {/* Second image - tall */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-1 h-[250px] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[1]})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>

            {/* Third image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[2]})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>

            {/* Fourth image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[3]})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>

            {/* Fifth image - wide */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[4]})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>

            {/* Sixth image - wide */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${work.gallery[5]})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function WorkCard({ work, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
      className="group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${work.image})`,
            filter: "brightness(0.75)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
          {work.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{work.description}</p>
      </div>

      {/* Decorative corners */}
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function OurWorkPage() {
  const [selectedWork, setSelectedWork] = useState(null)
  
  const works = [
    {
      title: "Skyline Corporate Tower",
      description:
        "A 32-storey LEED-certified office building featuring cutting-edge smart systems and panoramic city views.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
        "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80",
        "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&q=80",
      ]
    },
    {
      title: "Lakeside Luxury Residences",
      description:
        "Exclusive waterfront community with bespoke villas, private docks, and sustainable energy solutions.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
      ]
    },
    {
      title: "Heritage Museum Restoration",
      description:
        "Painstaking restoration of a 19th-century landmark, preserving historic details while adding modern amenities.",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "https://images.unsplash.com/photo-1598391990342-311775e3d374?w=800&q=80",
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      ]
    },
    {
      title: "GreenTech Industrial Park",
      description:
        "Eco-friendly manufacturing campus with solar arrays, rainwater harvesting, and modular construction.",
      image: "https://images.unsplash.com/photo-1655184310368-f39517c7d169?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      gallery: [
        "https://images.unsplash.com/photo-1655184310368-f39517c7d169?w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
        "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      ]
    },
  ]

  if (selectedWork) {
    return <ProjectDetailPage work={selectedWork} onBack={() => setSelectedWork(null)} />
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
          Our <span className="text-accent">Works</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A selection of landmark projects that demonstrate our commitment to quality, innovation, and client satisfaction.
        </p>
      </motion.div>

      {/* Work Cards Grid – Responsive container with enhanced mobile spacing */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="grid gap-8 md:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard key={i} work={work} index={i} onClick={() => setSelectedWork(work)} />
          ))}
        </div>
      </div>
    </div>
  )
}