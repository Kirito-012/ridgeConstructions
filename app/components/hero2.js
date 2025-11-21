'use client'

import {motion} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'

const container = {
	hidden: {opacity: 0},
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
}
const item = {
	hidden: {opacity: 0, y: 30},
	show: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut'}},
}

export default function ConstructionHero() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<section className='relative min-h-dvh flex items-center justify-center bg-black overflow-hidden'>
				<div className='absolute inset-0 bg-linear-to-b from-black/90 via-black/70 to-black/95 z-10'></div>
				<div className='bg-gray-900 w-full h-full absolute inset-0' />
				<div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center'>
					<div className='h-32'></div>
				</div>
			</section>
		)
	}

	return (
		<section className='relative min-h-dvh flex items-center justify-center bg-black overflow-hidden py-20 sm:py-0'>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				transition={{duration: 1.2}}
				className='absolute inset-0 z-10 bg-linear-to-b from-black/90 via-black/70 to-black/95'
			/>

			<motion.div
				initial={{scale: 1.1}}
				animate={{scale: 1}}
				transition={{duration: 1.8, ease: 'easeOut'}}
				className='absolute inset-0'>
				<Image
					src='/bg.jpg'
					alt='Construction site at golden hour'
					fill
					priority
					className='object-cover brightness-[0.6]'
				/>
			</motion.div>

			<motion.div
				variants={container}
				initial='hidden'
				animate='show'
				className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center w-full'>
				<motion.h1
					variants={item}
					className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight hero_heading_font'>
					<span className='text-always-white'>Building the Future,</span>
					<br />
					<motion.span
						initial={{opacity: 0, color: '#ffffff'}}
						animate={{opacity: 1, color: '#e55a24'}}
						transition={{delay: 0.8, duration: 0.8}}
						className='text-[#e55a24]'>
						Turning Vision into Reality
					</motion.span>
				</motion.h1>

				<motion.p
					variants={item}
					className='mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2'>
					Precision engineering, safety-first execution, and on-time completion
					for high-rise towers and sustainable residential complexes.
				</motion.p>
				<motion.div
					variants={item}
					className='mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-4'>
					<Link href='/contact'>
						<motion.button
							type='button'
							onClick={() => {
								const el = document.getElementById('quote')
								if (el) el.scrollIntoView({behavior: 'smooth'})
							}}
							whileHover={{
								scale: 1.05,
								boxShadow: '0 20px 30px rgba(229, 90, 36, 0.3)',
							}}
							whileTap={{scale: 0.98}}
							className='cursor-pointer inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#e55a24] hover:bg-[#d14d1f] btn-always-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg transition-all duration-300 shadow-2xl w-full sm:w-auto'>
							<svg
								className='w-5 h-5 sm:w-6 sm:h-6'
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
							Get Free Quote
						</motion.button>
					</Link>
					<motion.button
						type='button'
						onClick={() => {
							window.location.href = 'tel:+14164333383'
						}}
						whileHover={{
							scale: 1.05,
							backgroundColor: '#ffffff',
							color: '#000000',
						}}
						whileTap={{scale: 0.98}}
						transition={{duration: 0.2}}
						className='inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg cursor-pointer shadow-2xl phone-btn w-full sm:w-auto'>
						<svg
							className='w-5 h-5 sm:w-6 sm:h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.40 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
							/>
						</svg>
						<span className='hidden xs:inline'>+14164333383</span>
						<span className='xs:hidden'>Call Us</span>
					</motion.button>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				transition={{delay: 1.5, duration: 0.8}}
				className='absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20'>
				<motion.svg
					animate={{y: [0, 8, 0]}}
					transition={{repeat: Infinity, duration: 1.5, ease: 'easeInOut'}}
					className='w-6 h-6 sm:w-8 sm:h-8 text-white'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 14l-7 7m0 0l-7-7m7 7V3'
					/>
				</motion.svg>
			</motion.div>
		</section>
	)
}
