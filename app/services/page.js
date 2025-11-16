'use client'

import {useState, useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import {
	Building2,
	Hammer,
	Ruler,
	PenTool,
	Wrench,
	Shield,
	Clock,
	Award,
} from 'lucide-react'

function ServiceCard({service, index}) {
	const cardRef = useRef(null)
	const isInView = useInView(cardRef, {once: true, margin: '-100px'})

	return (
		<motion.div
			ref={cardRef}
			initial={{opacity: 0, y: 50}}
			animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
			transition={{duration: 0.6, delay: index * 0.1}}
			className='group relative overflow-hidden bg-card border border-border hover:border-accent transition-all duration-500'>
			{/* Image Section */}
			<div className='relative h-64 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
					style={{
						backgroundImage: `url(${service.image})`,
						filter: 'brightness(0.7)',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent' />

				{/* Icon Overlay */}
				<div className='absolute top-6 right-6'>
					<motion.div
						className='flex h-16 w-16 items-center justify-center bg-accent'
						whileHover={{scale: 1.1, rotate: 5}}
						transition={{duration: 0.3}}>
						<service.icon className='h-8 w-8 text-accent-foreground' />
					</motion.div>
				</div>

				{/* Category Tag */}
				<div className='absolute bottom-6 left-6'>
					<span className='bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground'>
						{service.category}
					</span>
				</div>
			</div>

			{/* Content Section */}
			<div className='p-8'>
				<h3 className='mb-3 text-2xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-accent'>
					{service.title}
				</h3>
				<p className='mb-6 text-muted-foreground leading-relaxed'>
					{service.description}
				</p>

				{/* Features List */}
				<ul className='mb-6 space-y-3'>
					{service.features.map((feature, i) => (
						<motion.li
							key={i}
							initial={{opacity: 0, x: -20}}
							animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -20}}
							transition={{duration: 0.4, delay: index * 0.1 + i * 0.1}}
							className='flex items-start text-sm text-muted-foreground'>
							<span className='mt-2 mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent' />
							{feature}
						</motion.li>
					))}
				</ul>

				{/* CTA Button */}
				<motion.button
					className='w-full border-2 border-accent py-3 px-6 font-bold uppercase tracking-wider text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-accent-foreground'
					whileHover={{scale: 1.02}}
					whileTap={{scale: 0.98}}>
					Learn More
				</motion.button>
			</div>

			{/* Decorative Corner */}
			<div className='absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
			<div className='absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
		</motion.div>
	)
}

function StatCard({stat, index}) {
	const cardRef = useRef(null)
	const isInView = useInView(cardRef, {once: true})

	return (
		<motion.div
			ref={cardRef}
			initial={{opacity: 0, scale: 0.9}}
			animate={isInView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
			transition={{duration: 0.5, delay: index * 0.1}}
			className='bg-card p-4 sm:p-6 text-center border border-border'>
			<stat.icon className='mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 text-accent' />
			<h4 className='mb-2 text-3xl sm:text-4xl font-bold text-card-foreground'>
				{stat.number}
			</h4>
			<p className='text-muted-foreground uppercase tracking-wider text-xs sm:text-sm'>
				{stat.label}
			</p>
		</motion.div>
	)
}

export default function ServicesPage() {
	const services = [
		{
			icon: Building2,
			category: 'Residential',
			title: 'Custom Home Construction',
			description:
				'Transform your vision into reality with our bespoke home building services. From concept to completion, we craft homes that reflect your lifestyle and aspirations.',
			features: [
				'Luxury custom homes and estates',
				'Architectural design consultation',
				'High-end material selection',
				'Smart home integration',
				'Sustainable building practices',
			],
			image:
				'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
		},
		{
			icon: Hammer,
			category: 'Commercial',
			title: 'Commercial Development',
			description:
				"Build your business's future with our commercial construction expertise. We deliver functional, impressive spaces that drive success.",
			features: [
				'Office buildings and complexes',
				'Retail and hospitality spaces',
				'Industrial facilities',
				'Tenant improvements',
				'Fast-track construction',
			],
			image:
				'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
		},
		{
			icon: Wrench,
			category: 'Renovation',
			title: 'Complete Renovations',
			description:
				'Breathe new life into existing structures with our comprehensive renovation services. We modernize and enhance while preserving character.',
			features: [
				'Kitchen and bathroom remodels',
				'Whole-home renovations',
				'Historic restoration',
				'Structural modifications',
				'Energy efficiency upgrades',
			],
			image:
				'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
		},
		{
			icon: PenTool,
			category: 'Design-Build',
			title: 'Architectural Design',
			description:
				'Seamless integration of design and construction under one roof. Our design-build approach ensures your vision is perfectly executed.',
			features: [
				'3D visualization and rendering',
				'Space planning and optimization',
				'Interior design services',
				'Permit and approval management',
				'Value engineering',
			],
			image:
				'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
		},
		{
			icon: Ruler,
			category: 'Infrastructure',
			title: 'Site Development',
			description:
				'Prepare your land for success with our comprehensive site development services. We handle everything from grading to utilities.',
			features: [
				'Land surveying and analysis',
				'Grading and excavation',
				'Utility installation',
				'Drainage systems',
				'Landscaping and hardscaping',
			],
			image:
				'https://images.unsplash.com/photo-1625745267661-fe77c78581c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			icon: Shield,
			category: 'Maintenance',
			title: 'Project Management',
			description:
				"Expert oversight ensuring your project stays on time, on budget, and exceeds expectations. We handle the complexities so you don't have to.",
			features: [
				'Budget planning and control',
				'Timeline management',
				'Quality assurance',
				'Subcontractor coordination',
				'Regular progress reporting',
			],
			image:
				'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
		},
	]

	const stats = [
		{icon: Award, number: '300+', label: 'Projects Completed'},
		{icon: Clock, number: '25+', label: 'Years Experience'},
		{icon: Shield, number: '99%', label: 'Client Satisfaction'},
		{icon: Building2, number: '$1M+', label: 'Value Delivered'},
	]

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<section className='relative flex h-[50vh] items-center justify-center overflow-hidden sm:h-[60vh] pt-20 sm:pt-22'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
						filter: 'brightness(0.4)',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black dark:from-black/70 dark:via-black/50 dark:to-black' />

				<div className='relative z-10 px-4 text-center max-w-5xl mx-auto'>
					<motion.div
						initial={{opacity: 0, y: 30}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.8}}>
						<span className='inline-block mb-4 sm:mb-6 border border-accent px-4 sm:px-6 py-2 sm:py-3 text-xs font-bold uppercase tracking-widest text-accent'>
							Our Services
						</span>
						<h1 className='mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground'>
							<span className='text-always-white'>Building Excellence</span>
							<br />
							<span className='text-accent'>Across Every Sector</span>
						</h1>
						<p className='mx-auto max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground'>
							From residential masterpieces to commercial landmarks, we deliver
							construction solutions that stand the test of time.
						</p>
					</motion.div>
				</div>

		
			</section>

			{/* Stats Section */}
			<section className='py-12 sm:py-16 px-4 bg-linear-to-b from-background to-card'>
				<div className='mx-auto max-w-7xl'>
					<div className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4'>
						{stats.map((stat, i) => (
							<StatCard
								key={i}
								stat={stat}
								index={i}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Services Grid */}
			<section className='py-16 sm:py-24 px-4 bg-card'>
				<div className='mx-auto max-w-7xl'>
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6}}
						className='mb-12 sm:mb-16 text-center'>
						<h2 className='mb-6 text-3xl sm:text-4xl font-bold text-foreground md:text-5xl'>
							Comprehensive Construction Solutions
						</h2>
						<p className='mx-auto max-w-3xl text-lg text-muted-foreground'>
							Whatever your project demands, our expert teams deliver with
							precision, quality, and unwavering commitment to excellence.
						</p>
					</motion.div>

					<div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{services.map((service, i) => (
							<ServiceCard
								key={i}
								service={service}
								index={i}
							/>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='relative py-16 sm:py-24 px-4 overflow-hidden bg-linear-to-b from-card to-background'>
				<div className='absolute inset-0 opacity-5'>
					<div className='absolute top-0 left-1/4 h-96 w-96 rounded-full bg-accent blur-3xl' />
					<div className='absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl' />
				</div>

				<div className='relative z-10 mx-auto max-w-4xl text-center'>
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6}}>
						<h2 className='mb-6 text-3xl sm:text-4xl font-bold text-foreground md:text-5xl'>
							Ready to Start Your Project?
						</h2>
						<p className='mb-8 sm:mb-10 text-lg leading-relaxed text-muted-foreground'>
							Let's discuss how we can bring your vision to life with our proven
							expertise and commitment to excellence.
						</p>
						<div className='flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row'>
							<motion.button
								className='bg-accent px-8 sm:px-10 py-3 sm:py-4 font-bold uppercase tracking-wider text-accent-foreground transition-colors duration-300 hover:bg-accent/90'
								whileHover={{scale: 1.05}}
								whileTap={{scale: 0.98}}>
								Schedule Consultation
							</motion.button>
							<motion.button
								className='border-2 border-foreground px-8 sm:px-10 py-3 sm:py-4 font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-foreground hover:text-background'
								whileHover={{scale: 1.05}}
								whileTap={{scale: 0.98}}>
								View Portfolio
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}