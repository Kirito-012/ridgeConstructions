'use client'

import {useState, useRef, useEffect, useCallback} from 'react'
import {motion, useInView} from 'framer-motion'
import Link from 'next/link'

function ScrollTriggeredCard({step, index, activeIndex, setActiveIndex}) {
	const cardRef = useRef(null)
	const isInView = useInView(cardRef, {
		margin: '-40% 0px -40% 0px',
		amount: 0.5,
	})

	useEffect(() => {
		if (isInView && activeIndex !== index) {
			setActiveIndex(index)
		}
	}, [isInView, index, activeIndex, setActiveIndex])

	return (
		<div
			ref={cardRef}
			className={`relative ${
				index % 2 === 0 ? 'md:text-right' : 'md:text-left'
			}`}>
			<motion.div
				className={`md:flex items-center ${
					index % 2 === 0 ? 'md:flex-row-reverse' : ''
				}`}
				initial={{opacity: 0, y: 30}}
				whileInView={{opacity: 1, y: 0}}
				viewport={{once: true, amount: 0.3}}
				transition={{
					duration: 0.4,
					delay: index * 0.05,
					ease: [0.4, 0, 0.2, 1],
				}}>
				<div
					className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
					<motion.div
						className='group bg-card border-2 p-8 relative overflow-hidden will-change-transform'
						animate={{
							borderColor:
								activeIndex === index ? 'var(--accent)' : 'var(--border)',
							boxShadow:
								activeIndex === index
									? `0 20px 60px rgba(var(--accent-rgb, 229, 90, 36), 0.1)`
									: '0 0 0 rgba(0,0,0,0)',
						}}
						transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
						whileHover={{
							scale: 1.02,
							borderColor: 'var(--accent)',
							transition: {duration: 0.2, ease: [0.4, 0, 0.2, 1]},
						}}>
						<motion.div
							className='absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 will-change-opacity'
							animate={{opacity: activeIndex === index ? 1 : 0}}
							transition={{duration: 0.3, ease: 'easeOut'}}
						/>{' '}
						<div className='relative z-10'>
							<div className='flex items-start justify-between mb-4'>
								<div>
									<motion.h3
										className='text-2xl md:text-3xl font-bold mb-1'
										animate={{
											color:
												activeIndex === index
													? 'var(--accent)'
													: 'var(--card-foreground)',
										}}
										transition={{duration: 0.2, ease: 'easeOut'}}>
										{step.title}
									</motion.h3>
									<p className='text-accent font-medium text-sm uppercase tracking-wider'>
										{step.subtitle}
									</p>
								</div>
								<motion.span
									className='text-6xl font-bold text-accent leading-none will-change-transform'
									animate={{
										opacity: activeIndex === index ? 0.5 : 0.2,
										scale: activeIndex === index ? 1.15 : 1,
									}}
									transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}>
									{step.number}
								</motion.span>
							</div>

							<p className='text-muted-foreground leading-relaxed mb-4'>
								{step.description}
							</p>

							<motion.div
								initial={false}
								animate={{
									height: activeIndex === index ? 'auto' : 0,
									opacity: activeIndex === index ? 1 : 0,
									marginTop: activeIndex === index ? 16 : 0,
								}}
								transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
								className='overflow-hidden will-change-auto'>
								<div className='border-t border-border pt-4'>
									<p className='text-xs text-muted-foreground uppercase tracking-wider mb-3'>
										Key Deliverables
									</p>
									<div className='flex flex-wrap gap-2'>
										{step.highlights.map((highlight, i) => (
											<motion.span
												key={i}
												className='text-xs bg-accent/10 border border-accent/30 text-accent px-3 py-1.5 rounded-full will-change-transform'
												initial={{opacity: 0, scale: 0.9, y: 8}}
												animate={{
													opacity: activeIndex === index ? 1 : 0,
													scale: activeIndex === index ? 1 : 0.9,
													y: activeIndex === index ? 0 : 8,
												}}
												transition={{
													duration: 0.2,
													delay: activeIndex === index ? i * 0.05 : 0,
													ease: [0.4, 0, 0.2, 1],
												}}>
												{highlight}
											</motion.span>
										))}
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>

				<div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20'>
					<motion.div
						className='w-4 h-4 rounded-full relative will-change-transform'
						animate={{
							backgroundColor:
								activeIndex === index ? 'var(--accent)' : 'var(--border)',
							scale: activeIndex === index ? 1.75 : 1,
						}}
						transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}>
						{activeIndex === index && (
							<motion.div
								className='absolute inset-0 rounded-full bg-accent will-change-transform'
								initial={{scale: 1, opacity: 0.5}}
								animate={{scale: 2, opacity: 0}}
								transition={{duration: 1.2, repeat: Infinity, ease: 'easeOut'}}
							/>
						)}
					</motion.div>
				</div>

				<div className='hidden md:block md:w-1/2'></div>
			</motion.div>
		</div>
	)
}

export default function Mission() {
	const [activeIndex, setActiveIndex] = useState(0)

	const processSteps = [
		{
			number: '01',
			title: 'Discovery & Consultation',
			subtitle: 'Understanding Your Dream',
			description:
				'We dive deep into your lifestyle, preferences, and aspirations. Through detailed consultations, site visits, and mood boarding sessions, we capture every nuance of your vision.',
			highlights: [
				'Initial Site Analysis',
				'Budget Planning',
				'Vision Mapping',
			],
		},
		{
			number: '02',
			title: 'Design & Development',
			subtitle: 'Crafting the Blueprint',
			description:
				'Our award-winning designers transform concepts into detailed 3D visualizations and technical drawings. Every material, texture, and spatial element is carefully curated to reflect your unique style.',
			highlights: ['3D Renderings', 'Material Selection', 'Design Revisions'],
		},
		{
			number: '03',
			title: 'Planning & Permits',
			subtitle: 'Laying the Foundation',
			description:
				'We navigate the complex world of permits, regulations, and approvals. Our experienced team ensures all documentation is accurate, compliant, and submitted on time.',
			highlights: [
				'Permit Acquisition',
				'Compliance Review',
				'Timeline Planning',
			],
		},
		{
			number: '04',
			title: 'Construction & Oversight',
			subtitle: 'Building Excellence',
			description:
				'With precision execution and rigorous quality control, we bring your project to life. Our project managers provide weekly updates and maintain transparent communication throughout the build.',
			highlights: [
				'Quality Assurance',
				'Progress Reports',
				'On-Site Management',
			],
		},
	]

	return (
		<section
			id='mission'
			className='py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-card to-background relative overflow-hidden'>
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full'></div>
			<div className='absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full'></div>

			<div className='max-w-7xl mx-auto relative z-10'>
				<motion.div
					className='text-center mb-16'
					initial={{opacity: 0, y: 15}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.3}}
					transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}>
					<span className='inline-block text-accent text-xs font-bold tracking-widest mb-4 border border-accent px-4 py-2 uppercase'>
						Our Methodology
					</span>
					<h2 className='text-5xl md:text-6xl font-bold text-foreground mb-4'>
						From Concept to Creation
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						A meticulously crafted process that transforms ambitious visions
						into architectural masterpieces
					</p>
				</motion.div>

				<div className='relative'>
					<div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-accent to-transparent opacity-30'></div>

					<div className='space-y-16 md:space-y-32'>
						{processSteps.map((step, index) => (
							<ScrollTriggeredCard
								key={index}
								step={step}
								index={index}
								activeIndex={activeIndex}
								setActiveIndex={setActiveIndex}
							/>
						))}
					</div>
				</div>

				<motion.div
					className='text-center mt-24'
					initial={{opacity: 0, y: 15}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.3}}
					transition={{duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1]}}>
					<p className='text-muted-foreground mb-6 text-lg'>
						Ready to start your journey?
					</p>
					<Link href='/contact'>
						<motion.button
							className='bg-accent text-[#ffff] cursor-pointer font-bold px-10 py-4 hover:bg-accent/90 transition-colors duration-200 will-change-transform'
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							transition={{duration: 0.15, ease: [0.4, 0, 0.2, 1]}}>
							SCHEDULE A CONSULTATION
						</motion.button>
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
