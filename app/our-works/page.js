'use client'

import {motion, useInView} from 'framer-motion'
import {useRef, useState, useEffect, useCallback} from 'react'
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

				<motion.button
					onClick={onBack}
					whileHover={{scale: 1.05}}
					whileTap={{scale: 0.95}}
					className='absolute top-18 left-2 md:top-20 md:left-6 z-50 flex items-center gap-2 px-3 py-1.5 bg-orange-500/45 hover:bg-orange-500 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl font-semibold will-change-transform'>
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
				</motion.button>

				<div className='absolute inset-0 flex items-center justify-center'>
					<motion.h1
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
						className='text-5xl md:text-7xl font-bold text-always-white text-center px-4'>
						{work.title}
					</motion.h1>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.div
					initial={{opacity: 0, y: 15}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1]}}
					className='mb-16 text-center max-w-3xl mx-auto'>
					<p className='text-xl text-muted-foreground leading-relaxed'>
						{work.description}
					</p>
				</motion.div>

				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 0.3, delay: 0.2, ease: 'easeOut'}}>
					<h2 className='text-3xl font-bold text-foreground mb-12 text-center'>
						Project <span className='text-accent'>Gallery</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<div className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer will-change-transform'>
							<div
								className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform'
								style={{backgroundImage: `url(${work.gallery[0]})`}}
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300' />
						</div>
						{[1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
									i === 1 || i === 4 ? 'md:col-span-2' : 'md:col-span-1'
								} h-[250px] cursor-pointer will-change-transform`}>
								<div
									className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform'
									style={{backgroundImage: `url(${work.gallery[i]})`}}
								/>
								<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}

function WorkCard({work, onClick}) {
	return (
		<div
			onClick={onClick}
			className='group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer will-change-transform'>
			<div className='relative h-64 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 will-change-transform'
					style={{
						backgroundImage: `url(${work.image})`,
						filter: 'brightness(0.75)',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent' />
			</div>
			<div className='p-6'>
				<h3 className='mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-200'>
					{work.title}
				</h3>
				<p className='text-muted-foreground leading-relaxed line-clamp-3'>
					{work.description}
				</p>
			</div>
			<div className='pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
			<div className='pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
		</div>
	)
}

const CATEGORIES = [
	{id: 'All', label: 'All'},
	{id: 'Restaurants', label: 'Restaurants'},
	{id: 'Healthcare', label: 'Healthcare'},
	{id: 'Commercial Offices', label: 'Commercial Offices'},
]

export default function OurWorkPage() {
	const [works, setWorks] = useState([])
	const [loading, setLoading] = useState(true)
	const [navigating, setNavigating] = useState(false)
	const [error, setError] = useState(null)
	const [activeTab, setActiveTab] = useState('All')
	const router = useRouter()

	useEffect(() => {
		const loadWorks = async () => {
			try {
				setLoading(true)
				const loadedWorks = await fetchWorks()
				setWorks(loadedWorks)

				const titleImages = loadedWorks.map((w) => w.image).filter(Boolean)
				await preloadImages(titleImages)

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

	const handleCardClick = useCallback(
		(work) => {
			setNavigating(true)
			setTimeout(() => {
				router.push(`/our-works/${work.slug}`)
			}, 100)
		},
		[router]
	)

	const filteredWorks =
		activeTab === 'All'
			? works
			: works.filter((work) => work.category === activeTab)

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
			{navigating && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center'>
					<div className='text-center'>
						<div className='relative inline-block'>
							<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent'></div>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
								<div className='w-8 h-8 bg-accent/20 rounded-full animate-pulse'></div>
							</div>
						</div>
						<p className='mt-6 text-lg text-foreground font-medium'>
							Loading project...
						</p>
					</div>
				</motion.div>
			)}

			<motion.div
				initial={{opacity: 0, y: 15}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
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
				<motion.div
					initial={{opacity: 0, y: 15}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
					className='flex flex-wrap gap-4 mb-8'>
					{CATEGORIES.map((category, index) => (
						<motion.button
							key={category.id}
							initial={{opacity: 0, y: 10}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1]}}
							onClick={() => setActiveTab(category.id)}
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							className={`px-6 py-2.5 font-semibold transition-all duration-200 shadow-md hover:shadow-lg will-change-transform ${
								activeTab === category.id
									? 'bg-orange-500 text-always-white'
									: 'border-[1.5px] border-orange-500 text-foreground hover:bg-orange-500/10'
							}`}>
							{category.label}
						</motion.button>
					))}
				</motion.div>

				{filteredWorks.length > 0 ? (
					<motion.div
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, margin: '-100px'}}
						transition={{duration: 0.5, ease: [0.4, 0, 0.2, 1]}}
						className='grid gap-8 md:grid-cols-2'>
						{filteredWorks.map((work) => (
							<WorkCard
								key={work.id}
								work={work}
								onClick={() => handleCardClick(work)}
							/>
						))}
					</motion.div>
				) : (
					<div className='text-center py-12'>
						<p className='text-muted-foreground text-lg'>
							{activeTab === 'All'
								? 'No works available at the moment.'
								: `No works found in ${activeTab} category.`}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
