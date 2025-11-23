'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const WORKS = [
  {
    title: "Secret Kitchen",
    category: "Restaurants",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763632146/works/title/uzbg57hamqbjrsizgquv.jpg",
    folder: "secret-kitchen"
  },
  {
    title: "Shelbys",
    category: "Restaurants",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763624657/works/title/nv1vmfnuzwocwsa0xtxg.jpg",
    folder: "shelbys"
  },
  {
    title: "Mabelle Dental",
    category: "Healthcare",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622599/works/title/ys6dc8hlj68y1c7e1wsz.jpg",
    folder: "mabelle-dental"
  },
  {
    title: "Greenbook Dentistry",
    category: "Healthcare",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763622058/works/title/g4waoqwfsfgayqhmdeia.jpg",
    folder: "greenbook-dentistry"
  },
  {
    title: "Dough Box",
    category: "Restaurants",
    description: "Modern fast-food restaurant with high-traffic layout and efficient workflows. Superior design for quick service and customer satisfaction.",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763493501/works/title/jkqhentb42rhbmbk1cro.jpg",
    folder: "dough-box"
  },
  {
    title: "Burger King",
    category: "Restaurants",
    description: "A fast-food style restaurant built with a modern, high-traffic layout, durable materials, and efficient kitchen workflows.",
    image: "https://res.cloudinary.com/duor8d5e3/image/upload/v1763491433/works/title/jpv3sae10gpugz4vqwup.jpg",
    folder: "burger-king"
  },
];

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Restaurants', label: 'Restaurants' },
  { id: 'Healthcare', label: 'Healthcare' },
  { id: 'Corporate Offices', label: 'Corporate Offices' },
  { id: 'Salons & Spa', label: 'Salons & Spa' },
];

export default function OurWorksPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = activeTab === 'All' ? WORKS : WORKS.filter(w => w.category === activeTab);

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!imagesLoaded) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
        <div className='text-center'>
          <div className='relative inline-block'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='w-8 h-8 bg-accent/20 rounded-full animate-pulse'></div>
            </div>
          </div>
          <p className='mt-6 text-lg text-muted-foreground font-medium'>Loading our works...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
          Our <span className="text-accent">Works</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A selection of landmark projects that demonstrate our commitment to quality, innovation, and client satisfaction.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto mb-12">

        <div className="hidden md:flex flex-wrap gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 font-semibold cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg will-change-transform ${
                activeTab === category.id
                  ? 'bg-orange-500 text-always-white'
                  : 'border-[1.5px] border-orange-500 text-foreground hover:bg-orange-500/10'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-3 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
            </svg>
            Filter by Category
            <span className="ml-2 text-sm opacity-80">({activeTab})</span>
          </button>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative bg-background w-80 max-w-full p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Filter by Category</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setMobileFiltersOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === category.id
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2">
        {filtered.map((work) => (
          <Link key={work.folder} href={`/our-works/${work.folder}`}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer will-change-transform"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-200">
                  {work.title}
                </h3>
                <span className="text-xs font-semibold text-accent uppercase">
                  {work.category}
                </span>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {work.description || ''}
                </p>
              </div>

              <div className="pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}