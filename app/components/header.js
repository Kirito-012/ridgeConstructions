'use client'

import {useState, useEffect} from 'react'
import {usePathname} from 'next/navigation'

export default function Navbar() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		setIsVisible(true)

		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'dark') {
			setIsDark(true)
			document.documentElement.classList.add('dark')
		} else {
			setIsDark(false)
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
			setIsDark(false)
		} else {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
			setIsDark(true)
		}
	}

	const navLinks = [
		{name: 'Home', href: '/'},
		{name: 'Services', href: '/services'},
		{name: 'Our Works', href: '/our-works'},
		{name: 'About Us', href: '/about-us'},
		{name: 'Contact Us', href: '/contact'},
	]

	return (
		<nav
			className={`fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-b border-border z-50 transition-all duration-700 ${
				isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
			}`}>
			<div className='max-w-7xl font-jost  mx-auto px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<a
						href='/'
						className='flex items-center'>
						<img
							src={isDark ? '/logo2.png' : '/blacklogo.png'}
							alt='Front Ridge Logo'
							className='h-50 w-auto transition-opacity duration-300'
						/>
					</a>

					<div className='hidden md:flex items-center gap-8'>
						{navLinks.map((link) => {
							const isActive = pathname === link.href
							return (
								<a
									key={link.name}
									href={link.href}
									className={`text-md transition-colors ${
										isActive
											? 'active-nav'
											: 'text-[#e55a24]/80 hover:text-[#e55a24]'
									}`}
									aria-current={isActive ? 'page' : undefined}>
									{link.name}
								</a>
							)
						})}

						<button
							onClick={toggleTheme}
							className='p-2 rounded-lg cursor-pointer  ease-in hover:bg-muted transition-colors'
							aria-label='Toggle theme'>
							{isDark ? (
								<svg
									className='w-5 h-5 text-foreground'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
									/>
								</svg>
							) : (
								<svg
									className='w-5 h-5 text-foreground'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
									/>
								</svg>
							)}
						</button>

						<a
							href='/contact'
							className='px-5 py-2 text-sm bg-accent hover:bg-accent/80 hover:scale-110 hover:text-accent-foreground/70 text-always-white  ease-in-out transition-all duration-300'>
							Get Started
						</a>
					</div>

					<div className='md:hidden flex items-center gap-3'>
						<button
							onClick={toggleTheme}
							className='p-2 rounded-lg hover:bg-muted transition-colors'
							aria-label='Toggle theme'>
							{isDark ? (
								<svg
									className='w-5 h-5 text-foreground'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
									/>
								</svg>
							) : (
								<svg
									className='w-5 h-5 text-foreground'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
									/>
								</svg>
							)}
						</button>

						<button
							onClick={() => setIsOpen(!isOpen)}
							className='text-foreground/80 hover:text-foreground'
							aria-label='Toggle menu'>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								{isOpen ? (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								) : (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 6h16M4 12h16M4 18h16'
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{isOpen && (
					<div className='md:hidden border-t border-border py-4'>
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`block px-4 py-2 text-sm ${
									pathname === link.href
										? 'text-accent font-bold'
										: 'text-foreground/80 hover:text-foreground'
								}`}>
								{link.name}
							</a>
						))}
						<a
							href='/contact'
							onClick={() => setIsOpen(false)}
							className='block mx-4 mt-2 px-4 py-2 text-sm text-center bg-accent text-accent-foreground hover:bg-accent-dark'>
							Get Started
						</a>
					</div>
				)}
			</div>


		</nav>
	)
}

