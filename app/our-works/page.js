'use client'

import {motion, useInView} from 'framer-motion'
import {useRef, useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {fetchWorks, preloadImages} from '@/lib/works'

function ProjectDetailPage({work, onBack}) {
	return (
		<div className='min-h-screen bg-background'>
			<div className='relative h-96 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{
						backgroundImage: `url(${work.image})`,
					}}
				/>
				<div className='absolute inset-0 bg-black/60' />
				<div className='absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-background' />

				<button
					onClick={onBack}
					className='absolute top-18 left-2 md:top-20 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-orange-500/45 hover:bg-orange-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold'>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M10 19l-7-7m0 0l7-7m-7 7h18'
						/>
					</svg>
					Back
				</button>

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
					<p className='text-xl text-muted-foreground leading-relaxed'>
						{work.description}
					</p>
				</motion.div>

				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.6, delay: 0.4}}>
					<h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
						Project <span className='text-accent'>Gallery</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 0.5}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[0]})`}}
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500' />
						</motion.div>

						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 0.6}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-1 h-[250px] cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[1]})`}}
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
						</motion.div>

						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 0.7}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[2]})`}}
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
						</motion.div>

						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 0.8}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-1 h-[250px] cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[3]})`}}
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
						</motion.div>

						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 0.9}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[4]})`}}
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
						</motion.div>

						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							transition={{duration: 0.5, delay: 1.0}}
							className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 h-[250px] cursor-pointer'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
								style={{backgroundImage: `url(${work.gallery[5]})`}}
							/>
							<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

function WorkCard({work, index, onClick}) {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: true, margin: '-100px'})

	return (
		<motion.div
			ref={ref}
			initial={{opacity: 0, y: 60}}
			animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 60}}
			transition={{duration: 0.6, delay: index * 0.15}}
			onClick={onClick}
			className='group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer'>
			<div className='relative h-64 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
					style={{
						backgroundImage: `url(${work.image})`,
						filter: 'brightness(0.75)',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent' />
			</div>

			<div className='p-6'>
				<h3 className='mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300'>
					{work.title}
				</h3>
				<p className='text-muted-foreground leading-relaxed'>
					{work.description}
				</p>
			</div>

			<div className='pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
			<div className='pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
		</motion.div>
	)
}

export default function OurWorkPage() {
	const [works, setWorks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const router = useRouter()

	useEffect(() => {
		const loadWorks = async () => {
			try {
				setLoading(true)
				const loadedWorks = await fetchWorks()
				setWorks(loadedWorks)

				// Preload title images for better performance
				const titleImages = loadedWorks.map((w) => w.image).filter(Boolean)
				preloadImages(titleImages)

				setError(null)
			} catch (err) {
				console.error('Error fetching works:', err)
				setError('Failed to load works. Please try again later.')
			} finally {
				setLoading(false)
			}
		}

		loadWorks()
	}, [])

	const handleCardClick = (work) => {
		router.push(`/our-works/${work.slug}`)
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
				<div className='text-center'>
					<div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent'></div>
					<p className='mt-4 text-muted-foreground'>Loading our works...</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
				<div className='text-center'>
					<p className='text-red-500 mb-4'>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className='px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors'>
						Try Again
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8'>
			<motion.div
				initial={{opacity: 0, y: 20}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.6}}
				className='mb-16 text-center'>
				<h1 className='mb-4 text-5xl font-bold text-foreground md:text-6xl'>
					Our <span className='text-accent'>Works</span>
				</h1>
				<p className='mx-auto max-w-3xl text-lg text-muted-foreground'>
					A selection of landmark projects that demonstrate our commitment to
					quality, innovation, and client satisfaction.
				</p>
			</motion.div>

			<div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0'>
				{works.length > 0 ? (
					<div className='grid gap-8 md:grid-cols-2'>
						{works.map((work, i) => (
							<WorkCard
								key={work.id}
								work={work}
								index={i}
								onClick={() => handleCardClick(work)}
							/>
						))}
					</div>
				) : (
					<div className='text-center py-12'>
						<p className='text-muted-foreground text-lg'>
							No works available at the moment.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
