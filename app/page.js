'use client'
import Hero from './components/hero'
import Mission from './components/mission'
import Projects from './components/projects'
import Footer from './components/footer'
import HeroSection from './components/hero2'
import Services from './components/services'
export default function Home() {
	return (
		<>
			<HeroSection />
			<Hero />
			<Mission />
			<Services />
			<Projects />
		</>
	)
}
