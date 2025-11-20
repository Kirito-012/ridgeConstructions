'use client'

import {motion, useInView} from 'framer-motion'
import {useRef, useState, useEffect, useCallback} from 'react'
import Link from 'next/link'
import {fetchWorks} from '@/lib/works'

function ProjectCard({project, index}) {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: true, margin: '-100px'})

	return (
		<Link href={`/our-works/${project.slug}`}>
			<motion.div
				ref={ref}
				initial={{opacity: 0, y: 30}}
				animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
				transition={{
					duration: 0.4,
					delay: index * 0.05,
					ease: [0.4, 0, 0.2, 1],
				}}
				className='group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer will-change-transform'>
				<div className='relative h-64 overflow-hidden'>
					<div
						className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
						style={{
							backgroundImage: `url(${project.image})`,
							filter: 'brightness(0.75)',
						}}
					/>
					<div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent' />
				</div>
				<div className='p-6'>
					<h3 className='mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-200'>
						{project.title}
					</h3>
					<p className='text-muted-foreground leading-relaxed line-clamp-3'>
						{project.description}
					</p>
				</div>
				<div className='pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
				<div className='pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
			</motion.div>
		</Link>
	)
}

export default function Projects() {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadProjects = async () => {
			try {
				setLoading(true)
				const works = await fetchWorks()
				const latestWorks = works.slice(0, 4)
				setProjects(latestWorks)
			} catch (error) {
				console.error('Error loading projects:', error)
				setProjects([])
			} finally {
				setLoading(false)
			}
		}

		loadProjects()
	}, [])

	return (
		<section
			id='projects'
			className='py-20 px-4 sm:px-6 lg:px-8 bg-background'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					className='mb-16'
					initial={{opacity: 0, y: 15}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.2}}
					transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}>
					<span className='inline-block text-accent text-sm font-bold mb-4 border border-accent px-3 py-1'>
						OUR WORK
					</span>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground'>
						Featured Projects
					</h2>
				</motion.div>

				{loading ? (
					<div className='text-center py-12'>
						<div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent'></div>
						<p className='mt-4 text-muted-foreground'>Loading projects...</p>
					</div>
				) : projects.length > 0 ? (
					<>
						<div className='grid gap-8 md:grid-cols-2'>
							{projects.map((project, i) => (
								<ProjectCard
									key={project.id || i}
									project={project}
									index={i}
								/>
							))}
						</div>

						<div className='mt-16 text-center'>
							<Link href='/our-works'>
								<motion.button
									whileHover={{scale: 1.05}}
									whileTap={{scale: 0.95}}
									transition={{duration: 0.15, ease: [0.4, 0, 0.2, 1]}}
									className='group text-always-white inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-black px-12 py-5 shadow-2xl hover:shadow-accent/40 transition-colors duration-200 will-change-transform'>
									VIEW ALL PROJECTS
									<svg
										className='w-5 h-5 transition-transform duration-200 group-hover:translate-x-1'
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
								</motion.button>
							</Link>
						</div>
					</>
				) : (
					<div className='text-center py-12'>
						<p className='text-muted-foreground text-lg'>
							No projects available at the moment.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
