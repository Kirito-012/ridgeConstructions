'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectDetail({ title, hero, gallery = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const thumbRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const images = [hero, ...gallery].filter(Boolean);
    let loaded = 0;

    if (images.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    const onLoad = () => {
      loaded++;
      if (loaded === images.length) {
        setTimeout(() => setAllImagesLoaded(true), 300);
      }
    };

    images.forEach(src => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = onLoad;
    });
  }, [hero, gallery]);

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

  // YOUR ORIGINAL LOADER
  if (!allImagesLoaded) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
        <div className='text-center'>
          <div className='relative inline-block'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='w-8 h-8 bg-accent/20 rounded-full animate-pulse'></div>
            </div>
          </div>
          <p className='mt-6 text-lg text-muted-foreground font-medium'>Loading images...</p>
          <p className='mt-2 text-sm text-muted-foreground/70'>Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LIGHTBOX — EXACT ORIGINAL COLORS */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center" onClick={closeLightbox}>
          {/* Close button — original black/50 */}
          <button className="absolute top-4 right-4 z-[110] cursor-pointer text-always-white p-2 rounded-full bg-white/50 hover:bg-black/70 transition-all duration-200 group">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[110] bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
            <p className="text-white font-medium">{currentIndex + 1} / {gallery.length}</p>
          </div>

          <div className="relative w-full flex items-center justify-center px-4 md:px-20 pb-8" style={{ height: 'calc(100vh - 240px)', maxHeight: 'calc(100vh - 240px)' }} onClick={e => e.stopPropagation()}>
            {gallery.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 z-[110] text-always-white cursor-pointer p-3 rounded-full bg-white/50 hover:bg-accent transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 z-[110] text-always-white cursor-pointer p-3 rounded-full bg-white/50 hover:bg-accent transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <Image
                src={gallery[currentIndex]}
                alt=""
                fill
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                priority
                sizes="100vw"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Thumbnails — original colors */}
          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[110] w-full max-w-5xl px-4">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 shadow-2xl">
                <div ref={containerRef} className="flex gap-3 overflow-x-auto scrollbar-hide justify-start scroll-smooth">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      ref={el => thumbRefs.current[idx] = el}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                      className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-3 transition-all duration-200 ${
                        idx === currentIndex
                          ? 'border-accent ring-2 ring-accent/50 shadow-lg shadow-accent/50 scale-105'
                          : 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover pointer-events-none" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MAIN PAGE — 100% YOUR ORIGINAL DESIGN */}
      <div className="min-h-screen bg-background">
        <div className="relative h-96 overflow-hidden">
          <Image src={hero} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20" />

          <Link href="/our-works">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-18 left-2 md:top-20 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-orange-500/45 hover:bg-orange-500 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl font-semibold will-change-transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </motion.button>
          </Link>

          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-always-white text-center px-4">
              {title}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Project <span className="text-accent">Gallery</span>
          </h2>

          {/* GALLERY — EXACT ORIGINAL LAYOUT + BOTH LAST IMAGES WIDE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 0: Large */}
            {gallery[0] && (
              <div onClick={() => openLightbox(0)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer bg-muted/20">
                <Image src={gallery[0]} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform" sizes="(max-width: 768px) 100vw, 50vw" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* 1: Wide */}
            {gallery[1] && (
              <div onClick={() => openLightbox(1)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer bg-muted/20">
                <Image src={gallery[1]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* 2 & 3: Normal */}
            {gallery[2] && (
              <div onClick={() => openLightbox(2)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[250px] cursor-pointer bg-muted/20">
                <Image src={gallery[2]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {gallery[3] && (
              <div onClick={() => openLightbox(3)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[250px] cursor-pointer bg-muted/20">
                <Image src={gallery[3]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* 4 & 5: BOTH WIDE — FIXED */}
            {gallery[4] && (
              <div onClick={() => openLightbox(4)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer bg-muted/20">
                <Image src={gallery[4]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {gallery[5] && (
              <div onClick={() => openLightbox(5)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer bg-muted/20">
                <Image src={gallery[5]} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent/90 p-3 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* More Images */}
          {gallery.length > 6 && (
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-foreground mb-6 mt-8 text-center">More Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.slice(6).map((img, i) => (
                  <div key={i} onClick={() => openLightbox(6 + i)} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-[250px] cursor-pointer bg-muted/20">
                    <Image src={img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-accent/90 p-3 rounded-full">
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