'use client'

import {motion, useInView} from 'framer-motion'
import {useRef} from 'react'
import Link from 'next/link'

function ProjectCard({project, index}) {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: true, margin: '-100px'})

	return (
		<motion.div
			ref={ref}
			initial={{opacity: 0, y: 60}}
			animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 60}}
			transition={{duration: 0.6, delay: index * 0.15}}
			className='group relative overflow-hidden bg-card border border-border rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer'>
			<div className='relative h-64 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
					style={{
						backgroundImage: `url(${project.image})`,
						filter: 'brightness(0.75)',
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />
			</div>
			<div className='p-6'>
				<h3 className='mb-2 text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300'>
					{project.title}
				</h3>
				<p className='text-muted-foreground leading-relaxed line-clamp-3'>
					{project.category}
				</p>
			</div>
			<div className='pointer-events-none absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
			<div className='pointer-events-none absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
		</motion.div>
	)
}

export default function Projects() {
	const projects = [
		{
			title: 'Commercial Complex',
			category: 'Commercial',
			image:
				'https://images.unsplash.com/photo-1761333477936-56fbc7851c65?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			title: 'Residential Tower',
			category: 'Residential',
			image:
				'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			title: 'Industrial Facility',
			category: 'Industrial',
			image:
				'https://images.unsplash.com/photo-1716191299945-4c5b89703971?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			title: 'Retail Center',
			category: 'Commercial',
			image:
				'https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
	]

	return (
		<section
			id='projects'
			className='py-20 px-4 sm:px-6 lg:px-8 bg-background'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					className='mb-16'
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.2}}
					transition={{duration: 0.6}}>
					<span className='inline-block text-accent text-sm font-bold mb-4 border border-accent px-3 py-1'>
						OUR WORK
					</span>
					<h2 className='text-4xl md:text-5xl font-bold text-foreground'>
						Featured Projects
					</h2>
				</motion.div>

				<div className='grid gap-8 md:grid-cols-2'>
					{projects.map((project, i) => (
						<ProjectCard key={i} project={project} index={i} />
					))}
				</div>

				<div className='mt-16 text-center'>
					<Link
						href='/our-works'
						className='group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-black px-12 py-5
                       shadow-2xl hover:shadow-accent/40 transition-all duration-300'>
						VIEW ALL PROJECTS
						<svg
							className='w-5 h-5 transition-transform group-hover:translate-x-1'
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
					</Link>
				</div>
			</div>
		</section>
	)
}