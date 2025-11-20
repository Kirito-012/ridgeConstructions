'use client'

import {useEffect, useState, useRef, useCallback} from 'react'
import {useRouter, useParams} from 'next/navigation'
import {findWorkBySlug, preloadImages} from '@/lib/works'

function ImageLightbox({images, currentIndex, onClose, onNavigate}) {
	const thumbnailRefs = useRef([])
	const thumbnailContainerRef = useRef(null)
	const [imageLoaded, setImageLoaded] = useState(false)
	const [direction, setDirection] = useState(0)

	const handlePrevious = useCallback(() => {
		setDirection(-1)
		onNavigate((currentIndex - 1 + images.length) % images.length)
	}, [currentIndex, images.length, onNavigate])

	const handleNext = useCallback(() => {
		setDirection(1)
		onNavigate((currentIndex + 1) % images.length)
	}, [currentIndex, images.length, onNavigate])

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowLeft') handlePrevious()
			if (e.key === 'ArrowRight') handleNext()
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [handlePrevious, handleNext, onClose])

	useEffect(() => {
		setImageLoaded(false)

		const scrollToThumbnail = () => {
			if (
				thumbnailRefs.current[currentIndex] &&
				thumbnailContainerRef.current
			) {
				const thumbnail = thumbnailRefs.current[currentIndex]
				const container = thumbnailContainerRef.current

				const thumbnailRect = thumbnail.getBoundingClientRect()
				const containerRect = container.getBoundingClientRect()

				const scrollLeft =
					thumbnail.offsetLeft -
					containerRect.width / 2 +
					thumbnailRect.width / 2

				container.scrollTo({
					left: scrollLeft,
					behavior: 'smooth',
				})
			}
		}

		requestAnimationFrame(scrollToThumbnail)
	}, [currentIndex])

	useEffect(() => {
		const preloadAdjacentImages = () => {
			const prevIndex = (currentIndex - 1 + images.length) % images.length
			const nextIndex = (currentIndex + 1) % images.length

			;[prevIndex, nextIndex].forEach((idx) => {
				const img = new Image()
				img.src = images[idx]
			})
		}

		preloadAdjacentImages()
	}, [currentIndex, images])

	return (
		<div
			className='fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center'
			onClick={onClose}>
			<button
				onClick={onClose}
				className='absolute top-4 right-4 z-110 text-white/80 hover:text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 group'>
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
			</button>{' '}
			<div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-110 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md'>
				<p className='text-white font-medium'>
					{currentIndex + 1} / {images.length}
				</p>
			</div>{' '}
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
						className='absolute left-4 z-110 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-accent transition-colors duration-200'>
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
				)}{' '}
				<div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
					<img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`Gallery image ${currentIndex + 1}`}
						className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
						onClick={(e) => e.stopPropagation()}
						onLoad={() => setImageLoaded(true)}
						loading='eager'
						draggable={false}
					/>{' '}
					{!imageLoaded && (
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent'></div>
						</div>
					)}
				</div>
				{images.length > 1 && (
					<button
						onClick={handleNext}
						className='absolute right-4 z-110 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-accent transition-colors duration-200'>
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
			</div>{' '}
			<div className='h-4'></div>
			{images.length > 1 && (
				<div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-110 w-full max-w-5xl px-4'>
					<div className='bg-black/60 backdrop-blur-md rounded-xl p-3 shadow-2xl'>
						<div
							ref={thumbnailContainerRef}
							className='flex gap-3 overflow-x-auto scrollbar-hide justify-start scroll-smooth'
							style={{
								scrollbarWidth: 'none',
								msOverflowStyle: 'none',
								WebkitOverflowScrolling: 'touch',
							}}>
							{images.map((img, idx) => (
								<button
									key={idx}
									ref={(el) => (thumbnailRefs.current[idx] = el)}
									onClick={(e) => {
										e.stopPropagation()
										setDirection(idx > currentIndex ? 1 : -1)
										onNavigate(idx)
									}}
									className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-3 transition-all duration-200 ${
										idx === currentIndex
											? 'border-accent ring-2 ring-accent/50 shadow-lg shadow-accent/50 scale-105'
											: 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
									}`}>
									<img
										src={img}
										alt={`Thumbnail ${idx + 1}`}
										className='w-full h-full object-cover pointer-events-none'
										loading='lazy'
										draggable={false}
									/>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
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

	const openLightbox = useCallback((index) => {
		setCurrentImageIndex(index)
		setLightboxOpen(true)
		document.body.style.overflow = 'hidden'
	}, [])

	const closeLightbox = useCallback(() => {
		setLightboxOpen(false)
		document.body.style.overflow = 'unset'
	}, [])

	const navigateImage = useCallback((index) => {
		setCurrentImageIndex(index)
	}, [])

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
					<p className='mt-6 text-lg text-muted-foreground font-medium'>
						{work ? 'Loading images...' : 'Loading project details...'}
					</p>
					<p className='mt-2 text-sm text-muted-foreground/70'>
						Please wait a moment
					</p>
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
		<div className='min-h-screen bg-background'>
			{lightboxOpen && (
				<ImageLightbox
					images={work.gallery}
					currentIndex={currentImageIndex}
					onClose={closeLightbox}
					onNavigate={navigateImage}
				/>
			)}

			<div className='relative h-96 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{
						backgroundImage: `url(${work.image})`,
					}}
				/>
				<div className='absolute inset-0 bg-black/20' />
				<div className='absolute inset-0 flex items-center justify-center'>
					<h1 className='text-5xl md:text-7xl font-bold text-always-white text-center px-4'>
						{work.title}
					</h1>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='mb-16 text-center max-w-3xl mx-auto'>
					<p className='text-sm lg:text-lg text-muted-foreground leading-relaxed'>
						{work.description}
					</p>
				</div>

				{work.gallery && work.gallery.length > 0 && (
					<div>
						<h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
							Project <span className='text-accent'>Gallery</span>
						</h2>

						<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
							{work.gallery[0] && (
								<div
									onClick={() => openLightbox(0)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer bg-muted/20'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform'
										style={{backgroundImage: `url(${work.gallery[0]})`}}
									/>
									<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300' />
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
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
								</div>
							)}{' '}
							{work.gallery[1] && (
								<div
									onClick={() => openLightbox(1)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-1 h-[250px] cursor-pointer bg-muted/20'>
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
								</div>
							)}{' '}
							{work.gallery[2] && (
								<div
									onClick={() => openLightbox(2)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer bg-muted/20'>
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
								</div>
							)}{' '}
							{work.gallery[3] && (
								<div
									onClick={() => openLightbox(3)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer bg-muted/20'>
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
								</div>
							)}{' '}
							{work.gallery[4] && (
								<div
									onClick={() => openLightbox(4)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer bg-muted/20'>
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
								</div>
							)}{' '}
							{work.gallery[5] && (
								<div
									onClick={() => openLightbox(5)}
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer bg-muted/20'>
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
								</div>
							)}{' '}
							{work.gallery.length > 6 && (
								<div className='md:col-span-4'>
									<h3 className='text-2xl font-bold text-foreground mb-6 mt-8'>
										More Images
									</h3>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										{work.gallery.slice(6).map((image, idx) => (
											<div
												key={idx}
												onClick={() => openLightbox(6 + idx)}
												className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-[250px] cursor-pointer bg-muted/20'>
												<div
													className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform'
													style={{backgroundImage: `url(${image})`}}
												/>
												<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
												<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
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
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
