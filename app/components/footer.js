'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react'

export default function Footer() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'dark') {
			setIsDark(true)
			document.documentElement.classList.add('dark')
		} else {
			setIsDark(false)
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const currentYear = new Date().getFullYear()

	const quickLinks = [
		{name: 'Home', href: '/'},
		{name: 'Services', href: '/services'},
		{name: 'Our Works', href: '/our-works'},
		{name: 'About Us', href: '/about-us'},
		{name: 'Contact Us', href: '/contact'},
	]

	return (
		<footer
			id='footer'
			className='bg-black border-t border-[color:var(--border-color)]'>
			<div className='px-4 sm:px-6 lg:px-8 py-2 sm:py-16 lg:py-20'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-16'>
						<div className='animate-fade-in-up'>
							<Link
								href='/'
								className='flex items-center mb-4 sm:mb-6'>
								<Image
									src={isDark ? '/logo2.png' : '/blacklogo.png'}
									alt='Front Ridge Logo'
									width={140}
									height={140}
									className='rounded-md sm:w-[160px] sm:h-[160px] transition-opacity duration-300'
								/>
							</Link>
							<p className='text-gray-400 text-sm leading-relaxed -mt-10 sm:-mt-16'>
								Building excellence through quality construction and
								professional expertise.
							</p>
						</div>

						<div className='animate-fade-in-up animation-delay-1'>
							<h4 className='text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg'>
								Quick Links
							</h4>
							<ul className='space-y-2 sm:space-y-3'>
								{quickLinks.map((link) => (
									<li key={link.name}>
										<Link
											href={link.href}
											className='text-gray-400 hover:text-[color:var(--accent)] transition-colors text-sm'>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className='animate-fade-in-up animation-delay-2'>
							<h4 className='text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg'>
								Services
							</h4>
							<ul className='space-y-2 sm:space-y-3'>
								{[
									'Restaurant',
									'Healthcare',
									'Corporate Offices',
									'Salons & Spa',
								].map((service) => (
									<li key={service}>
										<a
											href='/'
											className='text-gray-400 hover:text-[color:var(--accent)] transition-colors text-sm'>
											{service}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div className='animate-fade-in-up animation-delay-3'>
							<h4 className='text-white font-bold mb-4 sm:mb-6 text-base sm:text-lg'>
								Contact
							</h4>
							<div className='space-y-2 sm:space-y-3 text-sm text-gray-400'>
								<p>46 Squire Ellis Drive, Brampton, Ontario L6P 4C2</p>
								<p>+1 4164333383</p>
								<p>Info@frontridge.ca</p>
							</div>
						</div>
					</div>

					<div className='border-t border-[color:var(--border-color)] pt-6 sm:pt-8'>
						<div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400'>
							<p className='text-center md:text-left'>
								© {currentYear} Front Ridge Construction. All rights reserved.
							</p>
							<div className='flex gap-4 sm:gap-6'>
								<a
									href='#'
									className='hover:text-[color:var(--accent)] transition-colors'>
									Privacy Policy
								</a>
								<a
									href='#'
									className='hover:text-[color:var(--accent)] transition-colors'>
									Terms of Service
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
