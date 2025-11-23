// components/ProjectDetail.js   ← OPTIMIZED + NO DESCRIPTION + SUPER SMOOTH

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectDetail({ title, hero, gallery = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbRefs = useRef([]);
  const containerRef = useRef(null);

  const openLightbox = useCallback((i) => {
    setCurrentIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goPrev = () => setCurrentIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setCurrentIndex((i) => (i + 1) % gallery.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  useEffect(() => {
    if (lightboxOpen && containerRef.current && thumbRefs.current[currentIndex]) {
      const thumb = thumbRefs.current[currentIndex];
      containerRef.current.scrollTo({
        left: thumb.offsetLeft - containerRef.current.clientWidth / 2 + thumb.clientWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, lightboxOpen]);

  // Fast loading — no more lag!
  return (
    <>
      {/* LIGHTBOX — SMOOTH & OPTIMIZED */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 z-[110] p-3 bg-white/50 hover:bg-orange-500 rounded-full text-always-white cursor-pointer transition">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
            <p className="text-white font-medium">{currentIndex + 1} / {gallery.length}</p>
          </div>

          <div className="relative w-full h-full flex items-center justify-center px-10" onClick={e => e.stopPropagation()}>
            {gallery.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 z-[110] p-4 bg-white/50 hover:bg-orange-500 rounded-full text-always-white cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 z-[110] p-4 bg-white/50 hover:bg-orange-500 rounded-full text-always-white cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* High-performance image with blur placeholder */}
            <Image
              src={gallery[currentIndex]}
              alt=""
              fill
              className="object-contain rounded-lg"
              priority={currentIndex < 3}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoQ0cA3AAAAAElFTkSuQmCC"
              sizes="100vw"
              onClick={e => e.stopPropagation()}
            />
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
              <div ref={containerRef} className="flex gap-3 overflow-x-auto scrollbar-hide bg-black/60 backdrop-blur-md rounded-xl p-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    ref={el => thumbRefs.current[i] = el}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-4 transition-all ${
                      i === currentIndex ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105' : 'border-white/30'
                    }`}
                  >
                    <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MAIN PAGE */}
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={hero}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />

          <Link href="/our-works">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-18 left-2 md:top-20 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-orange-500/55 cursor-pointer hover:bg-orange-500 text-always-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </motion.button>
          </Link>

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-always-white text-center px-4 drop-shadow-2xl">
              {title}
            </h1>
          </div>
        </div>

        {/* GALLERY — OPTIMIZED & SMOOTH */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Project <span className="text-accent">Gallery</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {gallery.slice(0, 6).map((img, i) => (
              <div
                key={i}
                onClick={() => openLightbox(i)}
                className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer bg-muted/20 ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-full' :
                  i === 1 || i === 4 ? 'md:col-span-2 h-[250px]' : 'h-[250px]'
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoQ0cA3AAAAAElFTkSuQmCC"
                />
                <div className={`absolute inset-0 ${i === 0 ? 'bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40' : 'bg-black/0 group-hover:bg-black/20'} transition-all duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-orange-500/90 p-3 rounded-full">
                    <svg className="w-8 h-8 text-always-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Images */}
          {gallery.length > 6 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">More Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.slice(6).map((img, i) => (
                  <div key={i} onClick={() => openLightbox(6 + i)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-[250px] cursor-pointer bg-muted/20">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGAoQ0cA3AAAAAElFTkSuQmCC"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-orange-500/90 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}