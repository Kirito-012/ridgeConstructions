'use client'

import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {useRouter, useParams} from 'next/navigation'
import {findWorkBySlug, preloadImages} from '@/lib/works'

export default function WorkDetailPage() {
	const router = useRouter()
	const params = useParams()
	const slug = params?.slug

	const [work, setWork] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!slug) return

		const loadWork = async () => {
			try {
				setLoading(true)
				const foundWork = await findWorkBySlug(slug)

				if (!foundWork) {
					setError('Work not found')
					return
				}

				setWork(foundWork)

				// Preloading gallery images
				const allImages = [foundWork.image, ...foundWork.gallery]
				preloadImages(allImages)

				setError(null)
			} catch (err) {
				console.error('Error fetching work:', err)
				setError('Failed to load work details. Please try again later.')
			} finally {
				setLoading(false)
			}
		}

		loadWork()
	}, [slug])

	if (loading) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center py-20 px-4'>
				<div className='text-center'>
					<div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent'></div>
					<p className='mt-4 text-muted-foreground'>
						Loading project details...
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
					onClick={() => router.push('/our-works')}
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
									className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 md:col-span-2 md:row-span-2 h-[400px] md:h-full cursor-pointer'>
									<div
										className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
										style={{backgroundImage: `url(${work.gallery[0]})`}}
									/>
									<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500' />
								</motion.div>
							)}

							{work.gallery[1] && (
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
							)}

							{work.gallery[2] && (
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
							)}

							{work.gallery[3] && (
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
							)}

							{work.gallery[4] && (
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
							)}

							{work.gallery[5] && (
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
							)}

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
												className='group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-[250px] cursor-pointer'>
												<div
													className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
													style={{backgroundImage: `url(${image})`}}
												/>
												<div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500' />
											</motion.div>
										))}
									</div>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	)
}
