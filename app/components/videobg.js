export default function HeroVideoSection() {
	return (
		<div className='relative w-full h-screen overflow-hidden'>
			<video
				className='absolute top-0 left-0 w-full h-full object-cover'
				autoPlay
				loop
				muted
				playsInline>
				<source
					src='/bgvideo1.mp4'
					type='video/mp4'
				/>
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
