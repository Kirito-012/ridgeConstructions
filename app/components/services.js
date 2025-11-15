"use client";

import { motion } from 'framer-motion';

export default function ServicesSharp() {
  const services = [
    {
      title: "High-Rise Towers",
      desc: "60+ story structures with seismic bracing, smart MEP, and zero-compromise safety.",
      path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      title: "Medical Centers",
      desc: "OR-ready hospitals built to CDC & JCI standards with modular future-proof wings.",
      path: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.204.507 14.978 14.978 0 00-2.764.19m8.687-7.25a2 2 0 100-4 2 2 0 000 4z",
    },
    {
      title: "Net-Zero Warehouses",
      desc: "1M+ sq ft facilities with solar roofs, EV charging, and 100 % recycled steel.",
      path: "M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4 0v16m4-16v16",
    },
    {
      title: "Retail Flagships",
      desc: "Experiential stores that fuse digital kiosks with bold concrete-and-glass façades.",
      path: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `
      translateY(-12px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.03)
    `;

    const light = card.querySelector('.light-effect');
    if (light) {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      light.style.transform = `translate(${xPercent - 50}%, ${yPercent - 50}%)`;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
      <span className="inline-block text-accent text-xs font-bold tracking-widest mb-4 border border-accent px-4 py-2 uppercase">
         CORE DIVISIONS
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            We Build <span className="text-[#e55a24]">Tomorrow</span>
          </h2>
        </motion.div>

        {/* 3D TILT + SUBTLE LIGHTING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ perspective: '1500px' }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              className="group relative p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl
                         transition-all duration-700 ease-out
                         hover:border-[#e55a24]/40"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              {/* Subtle light reflection following cursor */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="light-effect absolute w-[180%] h-[180%] -left-1/2 -top-1/2 transition-transform duration-200 ease-out"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(229, 90, 36, 0.18) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Reduced glow intensity and blur */}
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-[#e55a24]/0 via-[#e55a24]/12 to-[#e55a24]/0 
                              opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 rounded-2xl" />

              {/* Orange bar */}
              <div className="h-1 bg-[#e55a24] mb-6 scale-x-0 group-hover:scale-x-100 
                              transition-transform origin-left duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 border-2 border-[#e55a24] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#e55a24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.path} />
                </svg>
              </div>

              <h3 className="text-2xl font-black text-white mb-3">{s.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#quote"
            className="group inline-flex items-center gap-3 bg-[#e55a24] hover:bg-[#c94d1d] text-[#ffff] font-black px-12 py-5
                       shadow-2xl hover:shadow-[#e55a24]/40 transition-all duration-300"
          >
            START PROJECT
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}