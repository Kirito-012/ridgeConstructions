'use client'

import {motion} from 'framer-motion'
import {useState} from 'react'

export default function ContactPage() {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = () => {
		setIsSubmitting(true)
		
		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false)
			setShowSuccess(true)
			
			// Reset form
			setFormData({
				fullName: '',
				phone: '',
				email: '',
				message: '',
			})
			
			// Hide success message after 5 seconds
			setTimeout(() => {
				setShowSuccess(false)
			}, 5000)
		}, 1500)
	}

	return (
		<div className='min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6}}
					className='mb-16 text-center'>
					<h1 className='mb-4 text-5xl font-bold text-foreground md:text-6xl'>
						Get In <span className='text-accent'>Touch</span>
					</h1>
					<p className='mx-auto max-w-3xl text-lg text-muted-foreground'>
						Have a question or want to work together? We'd love to hear from you.
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-12'>
					{/* Left Side - Contact Information */}
					<motion.div
						initial={{opacity: 0, x: -30}}
						animate={{opacity: 1, x: 0}}
						transition={{duration: 0.6, delay: 0.2}}
						className='space-y-8'>
						<div>
							<h2 className='text-3xl font-bold text-foreground mb-4'>
								Contact <span className='text-accent'>Us</span>
							</h2>
							<p className='text-muted-foreground leading-relaxed'>
								We're here to help and answer any question you might have. We look
								forward to hearing from you! Please fill out the form, or reach out
								to us directly using the contact information below.
							</p>
						</div>

						<div className='space-y-6'>
							{/* Phone */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.3}}
								className='flex items-start gap-4 group'>
								<div className='flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='text-lg font-semibold text-foreground mb-1'>
										Phone
									</h3>
									<p className='text-muted-foreground'>+1 4164333383</p>
								</div>
							</motion.div>

							{/* Email */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.4}}
								className='flex items-start gap-4 group'>
								<div className='flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='text-lg font-semibold text-foreground mb-1'>
										Email
									</h3>
									<p className='text-muted-foreground'>Info@frontridge.ca</p>
								</div>
							</motion.div>

							{/* Address */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.5}}
								className='flex items-start gap-4 group'>
								<div className='flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300'>
									<svg
										className='w-6 h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='text-lg font-semibold text-foreground mb-1'>
										Address
									</h3>
									<p className='text-muted-foreground'>
										46 squire Ellis drive,
										<br />
									Brampton,Ontario L6P 4C2
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Side - Contact Form */}
					<motion.div
						initial={{opacity: 0, x: 30}}
						animate={{opacity: 1, x: 0}}
						transition={{duration: 0.6, delay: 0.2}}
						className='bg-card border border-border rounded-lg shadow-xl p-8'>
						<div className='space-y-6'>
							{/* Full Name */}
							<div>
								<label
									htmlFor='fullName'
									className='block text-sm font-semibold text-foreground mb-2'>
									Full Name
								</label>
								<input
									type='text'
									id='fullName'
									name='fullName'
									value={formData.fullName}
									onChange={handleChange}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300'
									placeholder='John Doe'
								/>
							</div>

							{/* Phone */}
							<div>
								<label
									htmlFor='phone'
									className='block text-sm font-semibold text-foreground mb-2'>
									Phone Number
								</label>
								<input
									type='tel'
									id='phone'
									name='phone'
									value={formData.phone}
									onChange={handleChange}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300'
									placeholder='+1 (555) 123-4567'
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor='email'
									className='block text-sm font-semibold text-foreground mb-2'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300'
									placeholder='john@example.com'
								/>
							</div>

							{/* Message */}
							<div>
								<label
									htmlFor='message'
									className='block text-sm font-semibold text-foreground mb-2'>
									Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									rows={5}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 resize-none'
									placeholder='Tell us about your project...'
								/>
							</div>

							{/* Submit Button */}
							<button
								onClick={handleSubmit}
								disabled={isSubmitting}
								className='w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/40 hover:scale-[1.02] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2'>
								{isSubmitting ? (
									<>
										<svg
											className='animate-spin h-5 w-5 text-white'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'></circle>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
										</svg>
										Sending...
									</>
								) : (
									<>
										Send Message
										<svg
											className='w-5 h-5 transition-transform group-hover:translate-x-1'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M14 5l7 7m0 0l-7 7m7-7H3'
											/>
										</svg>
									</>
								)}
							</button>

							{/* Success Message */}
							{showSuccess && (
								<motion.div
									initial={{opacity: 0, y: -10}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0}}
									className='bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center gap-3'>
									<svg
										className='w-6 h-6 text-green-500 flex-shrink-0'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
									<div>
										<p className='text-green-500 font-semibold'>
											Message sent successfully!
										</p>
										<p className='text-green-500/80 text-sm'>
											We'll get back to you as soon as possible.
										</p>
									</div>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}