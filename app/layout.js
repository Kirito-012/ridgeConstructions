import {Geist, Geist_Mono} from 'next/font/google'
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

export const metadata = {
	title: 'Ridge Constructions',
	description: 'Building your dreams with precision and care.',
}

export default function RootLayout({children}) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AppChrome>{children}</AppChrome>
			</body>
		</html>
	)
}
