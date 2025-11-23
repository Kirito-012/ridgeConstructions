'use client'

import {useRef} from 'react'
import {motion, useInView} from 'framer-motion'
import {Building2, Hammer, Ruler, PenTool, Wrench, Shield} from 'lucide-react'
import Link from 'next/link'

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

	return (
		<motion.div
			ref={cardRef}
			initial={{opacity: 0, y: 50}}
			animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
			transition={{duration: 0.6, delay: index * 0.1}}
			className='group relative overflow-hidden bg-card border border-border hover:border-accent transition-all duration-500'>
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
						<service.icon className='h-8 w-8 text-always-white' />
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

export default function ServicesPage() {
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
		}
	]

	return (
		<div className='min-h-screen bg-background'>
<section className='relative flex items-center justify-center overflow-hidden py-20 sm:py-24 md:py-28'>
  <div
    className='absolute inset-0 bg-cover bg-center'
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
      filter: 'brightness(0.4)',
    }}
  />
  <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black dark:from-black/70 dark:via-black/50 dark:to-black' />

  <div className='relative z-10 px-4 text-center max-w-5xl mx-auto'>
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className='space-y-6 sm:space-y-8'>
      <span className='inline-block border border-accent px-4 sm:px-6 py-2 sm:py-3 text-xs font-bold uppercase tracking-widest text-accent'>
        Our Services
      </span>

      <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-always-white'>
        Building Excellence
        <br />
        <span className='text-accent'>Across Every Sector</span>
      </h1>

      <p className='mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground'>
        From residential masterpieces to commercial landmarks, we deliver construction solutions that stand the test of time.
      </p>
    </motion.div>
  </div>
</section>

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
								<Link href='/contact'>Schedule Consultation</Link>
							</motion.button>
							<motion.button
								className='cursor-pointer border-2 border-foreground px-8 sm:px-10 py-3 sm:py-4 font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-foreground hover:text-background'
								whileHover={{scale: 1.05}}
								whileTap={{scale: 0.98}}>
								<Link href='/our-works'>View Portfolio</Link>
							</motion.button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
