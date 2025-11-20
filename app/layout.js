import {Geist, Geist_Mono, Jost} from 'next/font/google'
import './globals.css'
import AppChrome from './components/app-chrome'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const jost = Jost({
	variable: '--font-jost',
	weight: ['400', '500', '700'],
	subsets: ['latin'],
})

export const metadata = {
	title: 'Ridge Constructions',
	description: 'Building your dreams with precision and care.',
	icons: {
		icon: '/fav.png',
		shortcut: '/fav.png',
		apple: '/fav.png',
	},
}

export default function RootLayout({children}) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} antialiased`}>
				<AppChrome>{children}</AppChrome>
			</body>
		</html>
	)
}
