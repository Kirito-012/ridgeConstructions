'use client'

import {useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import {useRouter} from 'next/navigation'

const Building2Icon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z' />
		<path d='M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2' />
		<path d='M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2' />
		<path d='M10 6h4' />
		<path d='M10 10h4' />
		<path d='M10 14h4' />
		<path d='M10 18h4' />
	</svg>
)

const HammerIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9' />
		<path d='M17.64 15 22 10.64' />
		<path d='m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91' />
	</svg>
)

const WrenchIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='32'
		height='32'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' />
	</svg>
)

function ServiceCard({service, index}) {
	const cardRef = useRef(null)
	const isInView = useInView(cardRef, {once: true, margin: '-100px'})
	const IconComponent = service.icon
	const router = useRouter()

	const handleClick = () => {
		// Navigate to /our-works with the category as a query parameter
		router.push(`/our-works?category=${encodeURIComponent(service.category)}`)
	}

	return (
		<motion.div
			ref={cardRef}
			initial={{opacity: 0, y: 50}}
			animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
			transition={{duration: 0.6, delay: index * 0.1}}
			onClick={handleClick}
			className='group relative overflow-hidden bg-card border border-border hover:border-accent transition-all duration-500 cursor-pointer'>
			<div className='relative h-64 overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110'
					style={{
						backgroundImage: `url(${service.image})`,
						filter: 'brightness(0.7)',
					}}
				/>
				<div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent' />

				<div className='absolute top-6 right-6'>
					<motion.div
						className='flex h-16 w-16 items-center justify-center bg-accent text-always-white'
						whileHover={{scale: 1.1, rotate: 5}}
						transition={{duration: 0.3}}>
						<IconComponent />
					</motion.div>
				</div>

				<div className='absolute bottom-6 left-6'>
					<span className='bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground'>
						{service.category}
					</span>
				</div>
			</div>

			<div className='p-8'>
				<h3 className='mb-3 text-2xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-accent'>
					{service.title}
				</h3>
				<p className='mb-6 text-muted-foreground leading-relaxed'>
					{service.description}
				</p>

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
			</div>

			<div className='absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
			<div className='absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
		</motion.div>
	)
}

export default function ServicesSection() {
	const services = [
		{
			icon: Building2Icon,
			category: 'Restaurants',
			title: 'Restaurants',
			description:
				'Create unforgettable dining experiences with our specialized restaurant construction and design services. We build spaces that blend ambiance, functionality, and culinary excellence.',
			features: [
				'Custom kitchen and dining layouts',
				'Commercial kitchen installations',
				'Bar and seating area design',
				'Health code compliance',
				'Ventilation and HVAC systems',
			],
			image:
				'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
		},
		{
			icon: HammerIcon,
			category: 'Healthcare',
			title: 'Medical Centres',
			description:
				'Deliver world-class healthcare facilities designed for patient comfort and operational efficiency. Our medical construction expertise ensures compliance with all healthcare standards.',
			features: [
				'Patient-centered design',
				'Medical equipment integration',
				'Sterile environment construction',
				'Accessibility compliance',
				'Advanced HVAC and filtration',
			],
			image:
				'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
		},
		{
			icon: WrenchIcon,
			category: 'Corporate Offices',
			title: 'Office Renovation',
			description:
				'Transform your workspace into a modern, productive environment. Our office renovation services enhance functionality while reflecting your company culture and brand.',
			features: [
				'Open concept and private offices',
				'Modern meeting room upgrades',
				'Technology infrastructure',
				'Energy-efficient lighting',
				'Minimal business disruption',
			],
			image:
				'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
		},
	]

	return (
		<section className='py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-card to-background relative overflow-hidden'>
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full'></div>
			<div className='absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full'></div>

		<div className='max-w-7xl mx-auto relative z-10'>
			<motion.div
					className='text-center mb-16'
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true, amount: 0.3}}
					transition={{duration: 0.6}}>
					<span className='inline-block text-accent text-xs font-bold tracking-widest mb-4 border border-accent px-4 py-2 uppercase'>
						Our Services
					</span>
					<h2 className='text-5xl md:text-6xl cursor-default font-bold text-foreground mb-4'>
						Comprehensive Construction Solutions
					</h2>
					<p className='text-muted-foreground cursor-default text-lg max-w-2xl mx-auto'>
						Whatever your project demands, our expert teams deliver with
						precision, quality, and unwavering commitment to excellence
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
	)
}
