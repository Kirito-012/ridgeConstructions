'use client'
import Hero from './components/hero'
import Mission from './components/mission'
import Projects from './components/projects'
import HeroSection from './components/hero2'
import HeroVideoSection from './components/videobg'
import ServiceCard from './components/services'
export default function Home() {
	return (
		<>
			<HeroVideoSection />
			<HeroSection />
			<Hero />
			<ServiceCard />
			<Mission />
			<Projects />
		</>
	)
}
