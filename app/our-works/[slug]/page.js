'use client'

import {motion, AnimatePresence} from 'framer-motion'
import {useEffect, useState} from 'react'
import {useRouter, useParams} from 'next/navigation'
import {findWorkBySlug, preloadImages} from '@/lib/works'

function ImageLightbox({images, currentIndex, onClose, onNavigate}) {
	const [direction, setDirection] = useState(0)

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowLeft') handlePrevious()
			if (e.key === 'ArrowRight') handleNext()
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentIndex])

	const handlePrevious = () => {
		setDirection(-1)
		onNavigate((currentIndex - 1 + images.length) % images.length)
	}

	const handleNext = () => {
		setDirection(1)
		onNavigate((currentIndex + 1) % images.length)
	}

	const slideVariants = {
		enter: (direction) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction) => ({
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	}

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exixt={{opacity: 0}}
			className='fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center'
			onClick={onClose}>
			<button
				onClick={onClose}
				className='absolute top-4 right-4 z-[110] text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 group'>
				<svg
					className='w-8 h-8'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>

			<div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-[110] bg-black/50 px-4 py-2 rounded-full'>
				<p className='text-white font-medium'>
					{currentIndex + 1} / {images.length}
				</p>
			</div>

			<div
				className='relative w-full flex items-center justify-center px-4 md:px-20 pb-8'
				style={{
					height: 'calc(100vh - 240px)',
					maxHeight: 'calc(100vh - 240px)',
				}}
				onClick={(e) => e.stopPropagation()}>
				{images.length > 1 && (
					<button
						onClick={handlePrevious}
						className='absolute left-4 z-[110] text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-accent transition-all duration-300 hover:scale-110'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>
				)}

				<div className='relative w-full h-full flex items-center justify-center'>
					<AnimatePresence
						initial={false}
						custom={direction}
						mode='wait'>
						<motion.img
							key={currentIndex}
							src={images[currentIndex]}
							alt={`Gallery image ${currentIndex + 1}`}
							custom={direction}
							variants={slideVariants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{
								x: {type: 'tween', duration: 0.3, ease: 'easeInOut'},
								opacity: {duration: 0.2},
							}}
							className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
							onClick={(e) => e.stopPropagation()}
						/>
					</AnimatePresence>
				</div>

				{images.length > 1 && (
					<button
						onClick={handleNext}
						className='absolute right-4 z-[110] text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-accent transition-all duration-300 hover:scale-110'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</button>
				)}
			</div>

			<div className='h-4'></div>

			{images.length > 1 && (
				<div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[110] w-full max-w-5xl px-4'>
					<div className='bg-black/60 backdrop-blur-md rounded-xl p-3'>
						<div className='flex gap-3 overflow-x-auto scrollbar-hide justify-start md:justify-center'>
							{images.map((img, idx) => (
								<button
									key={idx}
									onClick={(e) => {
										e.stopPropagation()
										setDirection(idx > currentIndex ? 1 : -1)
										onNavigate(idx)
									}}
									className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-3 transition-all duration-300 ${
										idx === currentIndex
											? 'border-accent ring-2 ring-accent/50 shadow-lg shadow-accent/50 scale-105'
											: 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
									}`}>
									<img
										src={img}
										alt={`Thumbnail ${idx + 1}`}
										className='w-full h-full object-cover'
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default function WorkDetailPage() {
	const router = useRouter()
	const params = useParams()
	const slug = params?.slug

	const [work, setWork] = useState(null)
	const [loading, setLoading] = useState(true)
	const [imagesLoaded, setImagesLoaded] = useState(false)
	const [error, setError] = useState(null)
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		if (!slug) return

		const loadWork = async () => {
			try {
				setLoading(true)
				setImagesLoaded(false)

				const foundWork = await findWorkBySlug(slug)

				if (!foundWork) {
					setError('Work not found')
					setLoading(false)
					return
				}

				setWork(foundWork)
				setError(null)

				const allImages = [foundWork.image, ...foundWork.gallery].filter(
					Boolean
				)

				await preloadImages(allImages)

				await new Promise((resolve) => setTimeout(resolve, 300))

				setImagesLoaded(true)
				setLoading(false)
			} catch (err) {
				console.error('Error fetching work:', err)
				setError('Failed to load work details. Please try again later.')
				setLoading(false)
			}
		}

		loadWork()
	}, [slug])

	const openLightbox = (index) => {
		setCurrentImageIndex(index)
		setLightboxOpen(true)
		document.body.style.overflow = 'hidden'
	}

	const closeLightbox = () => {
		setLightboxOpen(false)
		document.body.style.overflow = 'unset'
	}

	const navigateImage = (index) => {
		setCurrentImageIndex(index)
	}

	if (loading || !imagesLoaded) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
				<div className='text-center'>
					<div className='relative inline-block'>
						<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent'></div>
						<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
							<div className='w-8 h-8 bg-accent/20 rounded-full animate-pulse'></div>
						</div>
					</div>
					<motion.p
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.2}}
						className='mt-6 text-lg text-muted-foreground font-medium'>
						{work ? 'Loading images...' : 'Loading project details...'}
					</motion.p>
					<motion.p
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.4}}
						className='mt-2 text-sm text-muted-foreground/70'>
						Please wait a moment
					</motion.p>
				</div>
			</div>
		)
	}

	if (error || !work) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
				<div className='text-center'>
					<p className='text-red-500 mb-4'>{error || 'Project not found'}</p>
					<button
						onClick={() => router.push('/our-works')}
						className='px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors'>
						Back to Works
					</button>
				</div>
			</div>
		)
	}

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration: 0.5}}
			className='min-h-screen bg-background'>
			<AnimatePresence>
				{lightboxOpen && (
					<ImageLightbox
						images={work.gallery}
						currentIndex={currentImageIndex}
						onClose={closeLightbox}
						onNavigate={navigateImage}
					/>
				)}
			</AnimatePresence>

			<div className='relative h-96 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{
						backgroundImage: `url(${work.image})`,
					}}
				/>
				<div className='absolute inset-0 bg-black/20' />
				{/* <div className='absolute inset-0 bg-linear-to-b from-black/5 to-background' /> */}

				<div className='absolute inset-0 flex items-center justify-center'>
					<motion.h1
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.8}}
						className='text-5xl md:text-7xl font-bold text-always-white text-center px-4'>
						{work.title}
					</motion.h1>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6, delay: 0.2}}
					className='mb-16 text-center max-w-3xl mx-auto'>
					<p className='text-sm lg:text-lg text-muted-foreground leading-relaxed'>
						{work.description}
					</p>
				</motion.div>

				{work.gallery && work.gallery.length > 0 && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.6, delay: 0.4}}>
						<h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
							Project <span className='text-accent'>Gallery</span>
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							{work.gallery[0] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 0.5}}
									onClick={() => openLightbox(0)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[0]})`}}
									/>
									<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-8 h-8 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery[1] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 0.6}}
									onClick={() => openLightbox(1)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-1 h-[250px] cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[1]})`}}
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery[2] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 0.7}}
									onClick={() => openLightbox(2)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[2]})`}}
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery[3] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 0.8}}
									onClick={() => openLightbox(3)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[3]})`}}
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery[4] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 0.9}}
									onClick={() => openLightbox(4)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[4]})`}}
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery[5] && (
								<motion.div
									initial={{opacity: 0, scale: 0.9}}
									animate={{opacity: 1, scale: 1}}
									transition={{duration: 0.5, delay: 1.0}}
									onClick={() => openLightbox(5)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[5]})`}}
									/>
									<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<div className='bg-accent/90 p-3 rounded-full'>
											<svg
												className='w-6 h-6 text-white'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
												/>
											</svg>
										</div>
									</div>
								</motion.div>
							)}{' '}
							{work.gallery.length > 6 && (
								<div className='md:col-span-4'>
									<h3 className='text-2xl font-bold text-foreground mb-6 mt-8'>
										More Images
									</h3>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										{work.gallery.slice(6).map((image, idx) => (
											<motion.div
												key={idx}
												initial={{opacity: 0, scale: 0.9}}
												animate={{opacity: 1, scale: 1}}
												transition={{duration: 0.5, delay: 1.1 + idx * 0.1}}
												onClick={() => openLightbox(6 + idx)}
												className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[250px] cursor-pointer'>
												<div
													className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
													style={{backgroundImage: `url(${image})`}}
												/>
												<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
												<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
													<div className='bg-accent/90 p-3 rounded-full'>
														<svg
															className='w-6 h-6 text-white'
															fill='none'
															stroke='currentColor'
															viewBox='0 0 24 24'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth={2}
																d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
															/>
														</svg>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	)
}
