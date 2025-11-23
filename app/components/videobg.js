'use client'
import React, {useState, useEffect, useCallback, useMemo, memo} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {ChevronLeft, ChevronRight} from 'lucide-react'

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
]

const HeroSliderSection = () => {
	const [currentProject, setCurrentProject] = useState(0)
	const [currentImage, setCurrentImage] = useState(0)
	const [imagesLoaded, setImagesLoaded] = useState(new Set())

	const currentProjectData = useMemo(
		() => projects[currentProject],
		[currentProject]
	)

	const currentImageCount = currentProjectData.images.length

	useEffect(() => {
		const preloadImages = () => {
			const loadedSet = new Set()

			projects.forEach((project) => {
				project.images.forEach((imageSrc) => {
					const img = new Image()
					img.onload = () => {
						loadedSet.add(imageSrc)
						setImagesLoaded(new Set(loadedSet))
					}
					img.src = imageSrc
				})
			})
		}

		preloadImages()
	}, [])

	useEffect(() => {
		const nextProjectIndex = (currentProject + 1) % projects.length
		const nextProject = projects[nextProjectIndex]

		nextProject.images.forEach((imageSrc) => {
			if (!imagesLoaded.has(imageSrc)) {
				const img = new Image()
				img.onload = () => {
					setImagesLoaded((prev) => new Set([...prev, imageSrc]))
				}
				img.src = imageSrc
			}
		})
	}, [currentProject, imagesLoaded])

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % currentImageCount)
		}, 3000)

		return () => clearInterval(timer)
	}, [currentProject, currentImageCount])

	const nextProject = useCallback(() => {
		setCurrentProject((prev) => (prev + 1) % projects.length)
		setCurrentImage(0)
	}, [])

	const prevProject = useCallback(() => {
		setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
		setCurrentImage(0)
	}, [])

	const goToProject = useCallback((index) => {
		setCurrentProject(index)
		setCurrentImage(0)
	}, [])

	return (
		<div className='relative w-full h-[90vh] md:h-[95vh] overflow-hidden bg-black'>
			{/* Image slider with crossfade - no AnimatePresence on outer container */}
			<div className='absolute inset-0'>
				<AnimatePresence initial={false}>
					<motion.img
						key={`${currentProject}-${currentImage}`}
						src={currentProjectData.images[currentImage]}
						alt={currentProjectData.name}
						initial={{opacity: 0}}
						animate={{
							opacity: imagesLoaded.has(currentProjectData.images[currentImage])
								? 1
								: 0,
						}}
						exit={{opacity: 0}}
						transition={{duration: 0.5, ease: 'easeInOut'}}
						className='absolute inset-0 w-full h-full object-cover'
					/>
				</AnimatePresence>
			</div>

			{/* Gradient overlay - stronger on mobile for text readability */}
			<div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none' />

			{/* Project title and type */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentProject}
					initial={{opacity: 0, y: 30}}
					animate={{opacity: 1, y: 0}}
					exit={{opacity: 0, y: -30}}
					transition={{duration: 0.5, ease: 'easeInOut'}}
					className='absolute bottom-26 md:bottom-12 left-4 md:left-12 right-4 md:right-auto z-10 max-w-2xl'>
					<h2 className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-always-white mb-1 md:mb-3 tracking-tight md:tracking-wide'>
						{currentProjectData.name}
					</h2>
					<p className='text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-always-white uppercase tracking-wider'>
						{currentProjectData.type}
					</p>
				</motion.div>
			</AnimatePresence>

			{/* Navigation arrows */}
			<NavButton
				direction='left'
				onClick={prevProject}
			/>
			<NavButton
				direction='right'
				onClick={nextProject}
			/>

			{/* Project selector dots */}
			<ProjectDots
				currentProject={currentProject}
				goToProject={goToProject}
			/>

			{/* Image progress indicators */}
			<ImageProgressBars
				imageCount={currentImageCount}
				currentImage={currentImage}
			/>
		</div>
	)
}

const NavButton = memo(({direction, onClick}) => {
	const isLeft = direction === 'left'

	return (
		<button
			onClick={onClick}
			className='absolute top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 md:p-3 rounded-full transition-all duration-300'
			style={{[isLeft ? 'left' : 'right']: '1rem'}}
			aria-label={isLeft ? 'Previous project' : 'Next project'}>
			{isLeft ? (
				<ChevronLeft className='w-7 h-7 md:w-8 md:h-8 text-always-white' />
			) : (
				<ChevronRight className='w-7 h-7 md:w-8 md:h-8 text-always-white' />
			)}
		</button>
	)
})
NavButton.displayName = 'NavButton'

// Project dots - centered on mobile, right-aligned on larger screens
const ProjectDots = memo(({currentProject, goToProject}) => (
	<div className='absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-20 flex gap-2 md:gap-3'>
		{projects.map((_, index) => (
			<button
				key={index}
				onClick={() => goToProject(index)}
				className={`rounded-full transition-all duration-300 ${
					currentProject === index
						? 'bg-white w-8 md:w-10 h-2 md:h-3'
						: 'bg-white/50 hover:bg-white/70 w-2 md:w-3 h-2 md:h-3'
				}`}
				aria-label={`Go to project ${index + 1}`}
			/>
		))}
	</div>
))
ProjectDots.displayName = 'ProjectDots'

// Image progress bars - centered on mobile
const ImageProgressBars = memo(({imageCount, currentImage}) => (
	<div className='absolute top-8 md:top-12 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-20 flex gap-2'>
		{Array.from({length: imageCount}, (_, index) => (
			<div
				key={index}
				className={`h-1 rounded-full transition-all duration-300 ${
					currentImage === index
						? 'bg-white w-10 md:w-12'
						: 'bg-white/40 w-6 md:w-8'
				}`}
			/>
		))}
	</div>
))
ImageProgressBars.displayName = 'ImageProgressBars'

export default memo(HeroSliderSection)
