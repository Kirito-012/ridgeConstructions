'use client'

import {motion} from 'framer-motion'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Hero() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<section
				id='home'
				className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden'>
				<div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
					<div />
					<div />
				</div>
			</section>
		)
	}

	return (
		<section
			id='home'
			className='pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden'>
			<div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center'>
				<motion.div
					initial={{opacity: 0, x: -80}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true, amount: 0.3}}
					transition={{duration: 0.8, ease: 'easeOut'}}>
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.2, duration: 0.6}}
						className='mb-6'>
						<span className='inline-block text-[color:var(--accent)] text-sm font-bold border border-[color:var(--accent)] px-3 py-1'>
							OUR VISION
						</span>
					</motion.div>

					<motion.h1
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.3, duration: 0.8}}
						className='text-5xl md:text-6xl font-bold text-white mb-8 leading-tight'>
						Excellence in
						<br />
						<span className='text-[color:var(--accent)]'>Every Build</span>
					</motion.h1>

					<motion.div
						initial={{opacity: 0, x: -40}}
						whileInView={{opacity: 1, x: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.5, duration: 0.8, ease: 'easeOut'}}
						className='border-l-4 border-[color:var(--accent)] pl-6 mb-8'>
						<motion.p
							initial={{opacity: 0}}
							whileInView={{opacity: 1}}
							viewport={{once: true, amount: 0.3}}
							transition={{delay: 0.7, duration: 0.6}}
							className='text-gray-300 leading-relaxed mb-6'>
							We don't just construct buildings — we engineer "enduring
							landmarks" that stand the test of time. From concept to
							completion, our team delivers precision, innovation, and unmatched
							craftsmanship.
						</motion.p>

						<motion.p
							initial={{opacity: 0}}
							whileInView={{opacity: 1}}
							viewport={{once: true, amount: 0.3}}
							transition={{delay: 0.8, duration: 0.6}}
							className='text-gray-300 leading-relaxed'>
							Serving "Toronto, Mississauga, Oakville, and the Niagara Region",
							we've earned the trust of developers, architects, and owners
							through "transparent collaboration" and "uncompromising
							standards".
						</motion.p>
					</motion.div>

					<Link href='/our-works'>
						<motion.button
							initial={{opacity: 0, y: 20}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true, amount: 0.3}}
							transition={{delay: 1.0, duration: 0.6}}
							whileHover={{
								scale: 1.05,
								boxShadow: '0 10px 20px rgba(229, 90, 36, 0.3)',
							}}
							whileTap={{scale: 0.95}}
							className='bg-[color:var(--accent)] text-[#ffff] cursor-pointer px-8 py-3 font-bold hover:bg-[color:var(--accent-dark)] transition-all duration-300 w-fit shadow-lg'>
							EXPLORE OUR WORK
						</motion.button>
					</Link>
				</motion.div>

				<motion.div
					initial={{opacity: 0, x: 80}}
					whileInView={{opacity: 1, x: 0}}
					viewport={{once: true, amount: 0.3}}
					transition={{delay: 0.4, duration: 0.8, ease: 'easeOut'}}>
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.6, duration: 0.6}}
						className='mb-8'>
						<span className='inline-block text-[color:var(--accent)] text-sm font-bold border border-[color:var(--accent)] px-3 py-1'>
							OUR MISSION
						</span>
					</motion.div>

					<motion.h2
						initial={{opacity: 0, y: 30}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.7, duration: 0.8}}
						className='text-4xl font-bold text-white mb-8'>
						Build Smarter. Last Longer.
					</motion.h2>

					<motion.p
						initial={{opacity: 0}}
						whileInView={{opacity: 1}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 0.9, duration: 0.6}}
						className='text-gray-300 mb-6 leading-relaxed'>
						Every project is a partnership. We integrate "cutting-edge
						technology", "sustainable practices", and "rigorous safety
						protocols" to deliver spaces that are functional, beautiful, and
						future-ready.
					</motion.p>

					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true, amount: 0.3}}
						transition={{delay: 1.1, duration: 0.7}}
						className='grid grid-cols-2 gap-6 text-center'>
						<div>
							<p className='text-3xl font-bold text-[color:var(--accent)]'>
								8+
							</p>
							<p className='text-sm text-gray-400 uppercase tracking-wider'>
								Years of Excellence
							</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-[color:var(--accent)]'>
								100+
							</p>
							<p className='text-sm text-gray-400 uppercase tracking-wider'>
								Projects Delivered
							</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-[color:var(--accent)]'>
								100%
							</p>
							<p className='text-sm text-gray-400 uppercase tracking-wider'>
								On-Time Record
							</p>
						</div>
						<div>
							<p className='text-3xl font-bold text-[color:var(--accent)]'>
								5★
							</p>
							<p className='text-sm text-gray-400 uppercase tracking-wider'>
								Client Rated
							</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	)
}
