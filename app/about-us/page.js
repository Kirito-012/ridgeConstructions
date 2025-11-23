'use client'

import {useState, useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import {Building2, Award, Clock, Shield, Users, Star} from 'lucide-react'

function StatCard({stat, index}) {
	const cardRef = useRef(null)
	const isInView = useInView(cardRef, {once: true})

	return (
		<motion.div
			ref={cardRef}
			initial={{opacity: 0, scale: 0.9}}
			animate={isInView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
			transition={{duration: 0.5, delay: index * 0.1}}
			className='bg-card p-4 sm:p-6 md:p-8 text-center border border-border'>
			<stat.icon className='mx-auto mb-3 h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 text-accent' />
			<h4 className='mb-2 text-3xl sm:text-4xl md:text-4xl font-bold text-card-foreground'>
				{stat.number}
			</h4>
			<p className='text-muted-foreground uppercase tracking-wider text-xs sm:text-sm md:text-sm'>
				{stat.label}
			</p>
		</motion.div>
	)
}

function TestimonialCard({testimonial}) {
	return (
		<div className='bg-card border border-border p-6 sm:p-8 min-w-[300px] sm:min-w-[400px] mx-4'>
			<div className='flex mb-4'>
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className='h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent'
					/>
				))}
			</div>
			<p className='text-muted-foreground mb-4 sm:mb-6 leading-relaxed italic'>
				"{testimonial.quote}"
			</p>
			<div className='flex items-center'>
				<div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold mr-4'>
					{testimonial.initials}
				</div>
				<div>
					<h4 className='font-bold text-card-foreground'>{testimonial.name}</h4>
					<p className='text-xs sm:text-sm text-muted-foreground'>
						{testimonial.role}
					</p>
				</div>
			</div>
		</div>
	)
}

export default function AboutPage() {
	const stats = [
		{icon: Award, number: '100+', label: 'Projects Completed'},
		{icon: Clock, number: '8+', label: 'Years Experience'},
		{icon: Shield, number: '99%', label: 'Client Satisfaction'},
		{icon: Users, number: '150+', label: 'Expert Team Members'},
	]

	const testimonials = [
		{
			quote:
				'FRONT RIDGE transformed our office space beyond our expectations. Their attention to detail and commitment to quality is unmatched.',
			name: 'Sarah Mitchell',
			role: 'CEO, TechVision Inc',
			initials: 'SM',
		},
		{
			quote:
				'Professional, reliable, and incredibly skilled. They completed our restaurant renovation ahead of schedule with stunning results.',
			name: 'Michael Chen',
			role: 'Owner, The Golden Spoon',
			initials: 'MC',
		},
		{
			quote:
				'From design to execution, FRONT RIDGE handled our retail space buildout flawlessly. Highly recommend their services!',
			name: 'Emily Rodriguez',
			role: 'Director, Luxe Boutique',
			initials: 'ER',
		},
		{
			quote:
				"Their team's expertise in commercial construction is evident in every project. Our new headquarters looks absolutely incredible.",
			name: 'David Thompson',
			role: 'CFO, Global Solutions',
			initials: 'DT',
		},
		{
			quote:
				'FRONT RIDGE delivered exceptional craftsmanship on our medical facility. They understood our unique requirements perfectly.',
			name: 'Dr. Jennifer Park',
			role: 'Medical Director',
			initials: 'JP',
		},
	]

	const [scrollPosition, setScrollPosition] = useState(0)

	useEffect(() => {
		const scroll = () => {
			setScrollPosition((prev) => prev - 1)
		}
		const interval = setInterval(scroll, 30)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='min-h-screen bg-background'>
		<section className='relative flex items-center justify-center overflow-hidden py-20 sm:py-24 md:py-28'>
  {/* Background Image */}
  <div
    className='absolute inset-0 bg-cover bg-center'
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80')",
      filter: 'brightness(0.4)',
    }}
  />
  <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black dark:from-black/70 dark:via-black/50 dark:to-black' />

  {/* Content */}
  <div className='relative z-10 px-4 text-center max-w-5xl mx-auto'>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='space-y-6 sm:space-y-8'
    >
      <span className='inline-block mb-4 sm:mb-6 border border-accent px-4 sm:px-6 py-2 sm:py-3 text-xs font-bold uppercase tracking-widest text-accent'>
        About Us
      </span>

      <h1 className='mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground'>
        <span className='text-always-white'>Crafting Spaces,</span>
        <br />
        <span className='text-accent'>Building Dreams</span>
      </h1>

      <p className='mx-auto max-w-3xl text-lg sm:text-xl leading-relaxed text-muted-foreground'>
        With over 25 years of excellence, we transform ordinary spaces into extraordinary environments through precision, passion, and unwavering dedication.
      </p>
    </motion.div>
  </div>
</section>

			<section className='py-12 sm:py-16 md:py-20 px-4 bg-linear-to-b from-background to-card'>
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

			<section className='py-16 sm:py-24 px-4 bg-card'>
				<div className='mx-auto max-w-7xl'>
					<div className='grid md:grid-cols-2 gap-8 sm:gap-12 items-center'>
						<motion.div
							initial={{opacity: 0, x: -50}}
							whileInView={{opacity: 1, x: 0}}
							viewport={{once: true}}
							transition={{duration: 0.8}}>
							<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6'>
								Welcome to <span className='text-accent'>FRONT RIDGE</span>{' '}
								Constructions
							</h2>
							<p className='text-lg text-muted-foreground leading-relaxed mb-6'>
								At FRONT RIDGE Constructions, we specialize in transforming
								indoor spaces into functional masterpieces. Our expertise spans
								commercial interiors, office fit-outs, retail environments,
								hospitality venues, and specialized facilities. We understand
								that every square foot matters, and we're committed to
								maximizing both aesthetics and functionality.
							</p>
							<p className='text-lg text-muted-foreground leading-relaxed'>
								From concept to completion, our dedicated team of designers,
								engineers, and craftsmen work collaboratively to bring your
								vision to life. We pride ourselves on delivering projects on
								time, within budget, and exceeding expectations. Our
								comprehensive approach includes space planning, interior
								architecture, custom millwork, and complete construction
								management—ensuring a seamless experience from start to finish.
							</p>
						</motion.div>

						<motion.div
							initial={{opacity: 0, x: 50}}
							whileInView={{opacity: 1, x: 0}}
							viewport={{once: true}}
							transition={{duration: 0.8}}
							className='relative'>
							<div className='relative h-[400px] sm:h-[500px] overflow-hidden'>
								<img
									src='https://images.unsplash.com/photo-1672748341520-6a839e6c05bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
									alt='Modern office interior'
									className='w-full h-full object-cover'
								/>
								<div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent' />

								<div className='absolute top-0 left-0 h-20 w-20 border-t-4 border-l-4 border-accent' />
								<div className='absolute bottom-0 right-0 h-20 w-20 border-b-4 border-r-4 border-accent' />
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<section className='py-16 sm:py-24 bg-background overflow-hidden'>
				<div className='mx-auto max-w-7xl mb-12 sm:mb-16 px-4'>
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.6}}
						className='text-center'>
						<h2 className='mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground'>
							What Our Clients Say
						</h2>
						<p className='mx-auto max-w-3xl text-lg text-muted-foreground'>
							Don't just take our word for it—hear from the clients who've
							experienced the FRONT RIDGE difference.
						</p>
					</motion.div>
				</div>

				<div className='relative'>
					<div className='flex overflow-hidden'>
						<div
							className='flex animate-scroll'
							style={{transform: `translateX(${scrollPosition}px)`}}>
							{[...testimonials, ...testimonials, ...testimonials].map(
								(testimonial, i) => (
									<TestimonialCard
										key={i}
										testimonial={testimonial}
									/>
								)
							)}
						</div>
					</div>

					<div className='absolute inset-y-0 left-0 w-20 sm:w-40 bg-linear-to-r from-background via-background to-transparent pointer-events-none z-10' />
					<div className='absolute inset-y-0 right-0 w-20 sm:w-40 bg-linear-to-l from-background via-background to-transparent pointer-events-none z-10' />
				</div>
			</section>

			<section className='relative py-20 sm:py-24 md:py-32 px-4 overflow-hidden bg-linear-to-br from-card via-background to-card'>
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-0 left-1/4 h-96 w-96 rounded-full bg-accent blur-3xl animate-pulse' />
					<div
						className='absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl animate-pulse'
						style={{animationDelay: '1s'}}
					/>
				</div>

				<div className='relative z-10 mx-auto max-w-4xl text-center'>
					<motion.div
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						transition={{duration: 0.8}}>
						<Building2 className='h-12 w-12 sm:h-16 sm:w-16 text-accent mx-auto mb-8' />
						<h2 className='mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-foreground'>
							Let's Build Something
							<br />
							<span className='text-accent'>Amazing Together</span>
						</h2>
						<p className='mb-8 sm:mb-12 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto'>
							Ready to transform your space? Our team is standing by to discuss
							your project and bring your vision to life with unparalleled
							expertise and dedication.
						</p>

						<motion.a
							href='/contact'
							className='inline-block text-always-white bg-accent px-8 sm:px-12 py-4 sm:py-5 font-bold uppercase tracking-wider text-base sm:text-lg text-accent-foreground transition-all duration-300 hover:bg-accent/90 shadow-2xl hover:shadow-accent/50'
							whileHover={{scale: 1.05, y: -2}}
							whileTap={{scale: 0.98}}>
							Connect Now
						</motion.a>

						<p className='mt-8 text-sm text-muted-foreground'>
							Available Monday - Friday, 9AM - 6PM EST
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
