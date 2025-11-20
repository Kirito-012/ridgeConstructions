export const metadata = {
	title: 'Admin Dashboard | Front Ridge Construction',
}

export default function AdminLayout({children}) {
	return (
		<div className='min-h-screen bg-linear-to-br from-background via-secondary to-background text-foreground'>
			{children}
		</div>
	)
}
