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
	const [showError, setShowError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e?.preventDefault()

		// Validate form
		if (
			!formData.fullName.trim() ||
			!formData.email.trim() ||
			!formData.message.trim()
		) {
			setErrorMessage('Please fill in all required fields')
			setShowError(true)
			setTimeout(() => setShowError(false), 5000)
			return
		}

		setIsSubmitting(true)
		setShowError(false)
		setShowSuccess(false)

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to send message')
			}

			// Success
			setShowSuccess(true)
			setFormData({
				fullName: '',
				phone: '',
				email: '',
				message: '',
			})

			setTimeout(() => {
				setShowSuccess(false)
			}, 8000)
		} catch (error) {
			console.error('Form submission error:', error)
			setErrorMessage(
				error.message || 'Failed to send message. Please try again.'
			)
			setShowError(true)
			setTimeout(() => setShowError(false), 5000)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='min-h-screen bg-background py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6}}
					className='mb-12 text-center sm:mb-16'>
					<h1 className='mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl'>
						Get In <span className='text-accent'>Touch</span>
					</h1>
					<p className='mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg'>
						Have a question or want to work together? We'd love to hear from
						you.
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-10 lg:gap-16'>
					{/* Left Column - Contact Info */}
					<motion.div
						initial={{opacity: 0, x: -40}}
						animate={{opacity: 1, x: 0}}
						transition={{duration: 0.7, delay: 0.2}}
						className='space-y-8 lg:space-y-10'>
						<div>
							<h2 className='text-3xl font-bold text-foreground mb-4 sm:text-4xl'>
								Contact <span className='text-accent'>Us</span>
							</h2>
							<p className='text-muted-foreground leading-relaxed text-sm sm:text-base'>
								We're here to help and answer any question you might have. We
								look forward to hearing from you! Please fill out the form or
								reach out directly using the details below.
							</p>
						</div>

						<div className='space-y-7'>
							{/* Phone */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.3}}
								className='flex items-start gap-4 group'>
								<div className='shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300'>
									<svg
										className='w-5 h-5 sm:w-6 sm:h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
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
									<p className='text-muted-foreground text-sm sm:text-base'>
										+1 (416) 433-3383
									</p>
								</div>
							</motion.div>

							{/* Email */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.4}}
								className='flex items-start gap-4 group'>
								<div className='shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300'>
									<svg
										className='w-5 h-5 sm:w-6 sm:h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
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
									<a
										href='mailto:Info@frontridge.ca'
										className='text-muted-foreground text-sm sm:text-base hover:text-accent transition-colors'>
										Info@frontridge.ca
									</a>
								</div>
							</motion.div>

							{/* Address */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6, delay: 0.5}}
								className='flex items-start gap-4 group'>
								<div className='shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300'>
									<svg
										className='w-5 h-5 sm:w-6 sm:h-6 text-accent'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										aria-hidden='true'>
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
									<p className='text-muted-foreground text-sm sm:text-base leading-relaxed'>
										46 Squire Ellis Drive,
										<br />
										Brampton, Ontario L6P 4C2
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Column - Form */}
					<motion.div
						initial={{opacity: 0, x: 40}}
						animate={{opacity: 1, x: 0}}
						transition={{duration: 0.7, delay: 0.3}}
						className='bg-card border border-border rounded-2xl shadow-xl p-8 lg:p-10'>
						<form
							onSubmit={handleSubmit}
							className='space-y-6'>
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
									required
									disabled={isSubmitting}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
									placeholder='Your Name'
								/>
							</div>

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
									disabled={isSubmitting}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
									placeholder='Your Phone Number'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-semibold text-foreground mb-2'>
									Email Address <span className='text-red-500'>*</span>
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									required
									disabled={isSubmitting}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
									placeholder='Your Email Address'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-semibold text-foreground mb-2'>
									Message <span className='text-red-500'>*</span>
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									required
									disabled={isSubmitting}
									rows={5}
									className='w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 resize-none disabled:opacity-60 disabled:cursor-not-allowed'
									placeholder='Tell us about your project...'
								/>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-accent hover:bg-accent/90 text-always-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent/40 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg'>
								{isSubmitting ? (
									<>
										<svg
											className='animate-spin h-5 w-5'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											/>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											/>
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

							{showSuccess && (
								<motion.div
									initial={{opacity: 0, y: -10}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0}}
									className='bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3'>
									<svg
										className='w-6 h-6 text-green-500 shrink-0'
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

							{showError && (
								<motion.div
									initial={{opacity: 0, y: -10}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0}}
									className='bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3'>
									<svg
										className='w-6 h-6 text-red-500 shrink-0'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
									<div>
										<p className='text-red-500 font-semibold'>
											Failed to send message
										</p>
										<p className='text-red-500/80 text-sm'>{errorMessage}</p>
									</div>
								</motion.div>
							)}
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
