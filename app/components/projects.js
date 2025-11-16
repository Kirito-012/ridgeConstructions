'use client'

import {motion} from 'framer-motion'
import Link from 'next/link'

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
			className='py-10 px-4 sm:px-16 lg:px-8 bg-black'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					className='mb-16'
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.2}}
					transition={{duration: 0.6}}>
					<span className='inline-block text-[color:var(--accent)] text-sm font-bold mb-4 border border-[color:var(--accent)] px-3 py-1'>
						OUR WORK
					</span>
					<h2 className='text-4xl md:text-5xl font-bold text-white'>
						Featured Projects
					</h2>
				</motion.div>

				<div className='grid md:grid-cols-2 gap-4'>
					{projects.map((project, i) => (
						<motion.div
							key={i}
							className='group relative cursor-pointer overflow-hidden bg-[#1a1a1a] h-80'
							initial={{opacity: 0, y: 20}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true, amount: 0.2}}
							transition={{delay: i * 0.12, duration: 0.6, ease: 'easeOut'}}>
							<img
								src={project.image || '/placeholder.svg'}
								alt={project.title}
								className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
							/>

							<div className='absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/60 transition-all duration-500'>
								<div className='text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75'>
									<span className='block text-[color:var(--accent)] text-xs font-bold mb-2'>
										{project.category.toUpperCase()}
									</span>
									<h3 className='text-2xl font-bold text-[#ffff]'>
										{project.title}
									</h3>
								</div>
							</div>

							<span className='absolute right-6 top-1/2 -translate-y-1/2 text-[color:var(--accent)] text-3xl opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500'>
								→
							</span>
						</motion.div>
					))}
				</div>

				<div className='mt-16 text-center'>
					<Link
						href='/our-works'
						className='group inline-flex items-center gap-3 bg-[#e55a24] hover:bg-[#c94d1d] text-[#ffff] font-black px-12 py-5
                       shadow-2xl hover:shadow-[#e55a24]/40 transition-all duration-300'>
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
