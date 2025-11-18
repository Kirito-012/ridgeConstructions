'use client'

import {useCallback, useEffect, useMemo, useState} from 'react'
import {Edit3, Trash2} from 'lucide-react'

const TABS = [
	{id: 'add', label: 'Add New Work'},
	{id: 'manage', label: 'Manage Work'},
]

const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function ToastStack({toasts, onDismiss}) {
	return (
		<div className='fixed top-5 right-5 z-50 flex flex-col gap-3 text-sm'>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={classNames(
						'rounded-xl shadow-lg px-4 py-3 font-medium text-white',
						toast.variant === 'success' ? 'bg-emerald-500' : 'bg-red-500'
					)}>
					<div className='flex items-center gap-3'>
						<span>{toast.message}</span>
						<button
							type='button'
							onClick={() => onDismiss(toast.id)}
							className='text-white/80 hover:text-white'>
							×
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

function PasswordGate({onAuthenticated, pushToast}) {
	const [password, setPassword] = useState('')
	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!password.trim()) {
			pushToast({variant: 'error', message: 'Password is required'})
			return
		}
		setSubmitting(true)
		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({password}),
			})
			if (!response.ok) {
				const data = await response
					.json()
					.catch(() => ({error: 'Not Authenticated'}))
				pushToast({
					variant: 'error',
					message: data.error || 'Not Authenticated',
				})
				return
			}
			pushToast({variant: 'success', message: 'Successfully logged in'})
			onAuthenticated()
			setPassword('')
		} catch (error) {
			console.error('Login failed', error)
			pushToast({variant: 'error', message: 'Unable to log in'})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<div className='flex items-center justify-center'>
				<div className='w-full max-w-md rounded-2xl bg-card/80 p-8 shadow-2xl'>
					<div className='mb-8 text-center'>
						<p className='text-sm font-semibold uppercase tracking-widest text-accent'>
							Admin Portal
						</p>
						<h1 className='mt-2 text-3xl font-bold'>Enter Password</h1>
						<p className='mt-2 text-sm text-muted-foreground'>
							This area is restricted to authorized team members.
						</p>
					</div>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'>
						<div>
							<label
								className='block text-sm font-medium mb-2'
								htmlFor='admin-password'>
								Password
							</label>
							<input
								id='admin-password'
								name='password'
								type='password'
								autoComplete='current-password'
								className='w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								disabled={submitting}
							/>
						</div>
						<button
							type='submit'
							disabled={submitting}
							className='w-full rounded-lg bg-accent px-4 py-3 text-center text-white font-semibold transition hover:bg-accent-dark disabled:opacity-70'>
							{submitting ? 'Verifying...' : 'Access Dashboard'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

function TabSidebar({activeTab, onChange}) {
	return (
		<aside className='w-full max-w-xs rounded-2xl border border-border bg-card/70 p-4 shadow-lg lg:p-5'>
			<div className='mb-6'>
				<p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>
					Dashboard
				</p>
				<h2 className='mt-2 text-xl font-semibold'>Control Center</h2>
			</div>
			<nav className='space-y-2 text-sm'>
				{TABS.map((tab) => {
					const active = tab.id === activeTab
					return (
						<button
							key={tab.id}
							type='button'
							onClick={() => onChange(tab.id)}
							className={classNames(
								'w-full rounded-xl px-4 py-2.5 text-left font-semibold transition',
								active
									? 'bg-accent text-white shadow-lg'
									: 'bg-card/60 text-foreground hover:bg-card'
							)}>
							{tab.label}
						</button>
					)
				})}
			</nav>
		</aside>
	)
}

async function uploadImageToCloud(file, folder) {
	const formData = new FormData()
	formData.append('file', file)
	if (folder) {
		formData.append('folder', folder)
	}

	const response = await fetch('/api/images/upload', {
		method: 'POST',
		body: formData,
	})

	if (!response.ok) {
		const data = await response.json().catch(() => ({error: 'Upload failed'}))
		throw new Error(data.error || 'Upload failed')
	}

	const data = await response.json()
	return data.url
}

function AddWorkTab({onCreated, pushToast}) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [titleImage, setTitleImage] = useState(null)
	const [galleryFields, setGalleryFields] = useState(() => [
		{id: crypto.randomUUID(), file: null},
	])
	const [submitting, setSubmitting] = useState(false)
	const titlePreview = useMemo(
		() => (titleImage ? URL.createObjectURL(titleImage) : null),
		[titleImage]
	)

	useEffect(() => {
		return () => {
			if (titlePreview) URL.revokeObjectURL(titlePreview)
			galleryFields.forEach((field) => {
				if (field.file?._previewUrl) URL.revokeObjectURL(field.file._previewUrl)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const galleryWithPreview = useMemo(
		() =>
			galleryFields.map((entry) => {
				if (entry.file && !entry.file._previewUrl) {
					entry.file._previewUrl = URL.createObjectURL(entry.file)
				}
				return entry
			}),
		[galleryFields]
	)

	const resetForm = () => {
		setName('')
		setDescription('')
		setTitleImage(null)
		setGalleryFields([{id: crypto.randomUUID(), file: null}])
	}

	const handleGalleryChange = (id, file) => {
		setGalleryFields((prev) =>
			prev.map((entry) => {
				if (entry.id === id) {
					if (entry.file?._previewUrl)
						URL.revokeObjectURL(entry.file._previewUrl)
					return {...entry, file}
				}
				return entry
			})
		)
	}

	const handleAddGalleryField = () => {
		setGalleryFields((prev) => [...prev, {id: crypto.randomUUID(), file: null}])
	}

	const handleRemoveGalleryField = (id) => {
		setGalleryFields((prev) => {
			const next =
				prev.length === 1 ? prev : prev.filter((entry) => entry.id !== id)
			const removed = prev.find((entry) => entry.id === id)
			if (removed?.file?._previewUrl)
				URL.revokeObjectURL(removed.file._previewUrl)
			return next
		})
	}

	const validateFiles = (file) => {
		if (!file) return true
		if (file.size > MAX_FILE_SIZE_BYTES) {
			pushToast({
				variant: 'error',
				message: `File ${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit`,
			})
			return false
		}
		return true
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!name.trim()) {
			pushToast({
				variant: 'error',
				message: 'Name is required',
			})
			return
		}
		if (!titleImage) {
			pushToast({variant: 'error', message: 'Title image is required'})
			return
		}
		const galleryFiles = galleryFields
			.map((entry) => entry.file)
			.filter((file) => file instanceof File)

		if (!validateFiles(titleImage)) {
			return
		}
		for (const file of galleryFiles) {
			if (!validateFiles(file)) {
				return
			}
		}

		setSubmitting(true)
		try {
			const [titleImageUrl, galleryImageUrls] = await Promise.all([
				uploadImageToCloud(titleImage, 'works/title'),
				Promise.all(
					galleryFiles.map((file) => uploadImageToCloud(file, 'works/gallery'))
				),
			])

			const response = await fetch('/api/works', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					name: name.trim(),
					description: description.trim(),
					titleImageUrl,
					galleryImageUrls,
				}),
			})

			if (!response.ok) {
				const data = await response
					.json()
					.catch(() => ({error: 'Failed to save work'}))
				throw new Error(data.error || 'Failed to save work')
			}

			pushToast({variant: 'success', message: 'Successfully added'})
			resetForm()
			onCreated()
		} catch (error) {
			console.error('Add work failed', error)
			pushToast({
				variant: 'error',
				message: error.message || 'Failed to add work',
			})
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-8 rounded-3xl border border-border bg-card/80 px-6 py-7 shadow-xl text-sm'>
			<div>
				<label className='mb-2 block text-xs font-semibold uppercase tracking-wide'>
					Name of the Work
				</label>
				<input
					type='text'
					value={name}
					onChange={(event) => setName(event.target.value)}
					placeholder='e.g., Skyline Corporate Tower'
					className='w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:border-accent focus:outline-none'
					disabled={submitting}
				/>
			</div>

			<div>
				<label className='mb-2 block text-xs font-semibold uppercase tracking-wide'>
					Description (Optional)
				</label>
				<textarea
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					rows={4}
					placeholder='Project overview, highlights, etc.'
					className='w-full rounded-xl border border-border bg-background px-3 py-2.5 focus:border-accent focus:outline-none'
					disabled={submitting}
				/>
			</div>

			<div>
				<label className='mb-2 block text-xs font-semibold uppercase tracking-wide'>
					Title Image
				</label>
				<div className='flex flex-col gap-3 rounded-xl border border-dashed border-border bg-background/80 px-4 py-4 sm:flex-row sm:items-center'>
					<input
						type='file'
						accept='image/*'
						onChange={(event) => setTitleImage(event.target.files?.[0] || null)}
						disabled={submitting}
					/>
					{titleImage && (
						<div className='flex flex-1 items-center justify-between gap-3 text-xs text-muted-foreground'>
							<span className='truncate'>{titleImage.name}</span>
							{titlePreview && (
								<img
									src={titlePreview}
									alt='Title preview'
									className='h-14 w-14 rounded-lg object-cover border border-border'
								/>
							)}
						</div>
					)}
				</div>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label className='mb-2 block text-xs font-semibold uppercase tracking-wide'>
						Additional Images
					</label>
					<button
						type='button'
						onClick={handleAddGalleryField}
						className='text-sm font-semibold text-accent hover:text-accent-dark'
						disabled={submitting}>
						+ Add an image
					</button>
				</div>
				<div className='space-y-4'>
					{galleryWithPreview.map((field) => (
						<div
							key={field.id}
							className='flex flex-col gap-3 rounded-xl border border-dashed border-border bg-background/90 px-4 py-3 md:flex-row md:items-center'>
							<input
								type='file'
								accept='image/*'
								onChange={(event) =>
									handleGalleryChange(field.id, event.target.files?.[0] || null)
								}
								disabled={submitting}
							/>
							<div className='flex flex-1 items-center justify-between gap-3 text-xs text-muted-foreground'>
								<div className='flex items-center gap-3'>
									<span>{field.file?.name || 'No file selected'}</span>
									{field.file?._previewUrl && (
										<img
											src={field.file._previewUrl}
											alt='Preview'
											className='h-12 w-12 rounded border border-border object-cover'
										/>
									)}
								</div>
								{galleryFields.length > 1 && (
									<button
										type='button'
										onClick={() => handleRemoveGalleryField(field.id)}
										className='text-red-500 hover:text-red-600'
										disabled={submitting}>
										Remove
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='flex justify-end'>
				<button
					type='submit'
					disabled={submitting}
					className='rounded-xl bg-accent px-6 py-3 text-white font-semibold shadow-lg transition hover:bg-accent-dark disabled:opacity-70'>
					{submitting ? 'Saving...' : 'Add to Our Work'}
				</button>
			</div>
		</form>
	)
}

function ManageWorkTab({refreshKey, pushToast, onEdit, onDelete}) {
	const [works, setWorks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchWorks = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const response = await fetch('/api/works', {cache: 'no-store'})
			if (!response.ok) {
				const data = await response
					.json()
					.catch(() => ({error: 'Failed to load'}))
				throw new Error(data.error || 'Failed to load works')
			}
			const data = await response.json()
			setWorks(data.works || [])
		} catch (err) {
			console.error('Fetch works error', err)
			setError(err.message || 'Unable to load works')
			pushToast({
				variant: 'error',
				message: err.message || 'Unable to load works',
			})
		} finally {
			setLoading(false)
		}
	}, [pushToast])

	useEffect(() => {
		fetchWorks()
	}, [fetchWorks, refreshKey])

	if (loading) {
		return (
			<div className='rounded-3xl border border-border bg-card/80 p-8 text-center shadow-xl'>
				<p className='text-muted-foreground'>Loading works...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='rounded-3xl border border-border bg-card/80 p-8 shadow-xl'>
				<p className='text-red-500'>{error}</p>
				<button
					type='button'
					onClick={fetchWorks}
					className='mt-4 rounded-lg border border-border px-4 py-2 font-semibold hover:border-accent'>
					Try again
				</button>
			</div>
		)
	}

	if (!works.length) {
		return (
			<div className='rounded-3xl border border-border bg-card/80 p-8 text-center shadow-xl'>
				<p className='text-muted-foreground'>No work entries yet.</p>
			</div>
		)
	}

	return (
		<div className='rounded-3xl border border-border bg-card/80 p-6 shadow-xl text-sm'>
			<div className='mb-4 flex items-center justify-between'>
				<h3 className='text-xl font-semibold'>Existing Works</h3>
				<button
					type='button'
					onClick={fetchWorks}
					className='rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-accent'>
					Refresh
				</button>
			</div>
			<div className='overflow-hidden rounded-2xl border border-border'>
				<table className='min-w-full divide-y divide-border text-sm'>
					<thead className='bg-muted/50 text-left text-xs uppercase tracking-widest text-muted-foreground'>
						<tr>
							<th className='px-6 py-3'>Title</th>
							<th className='px-6 py-3'>Description</th>
							<th className='px-6 py-3'>Images</th>
							<th className='px-6 py-3'>Created</th>
							<th className='px-6 py-3 text-right'>Actions</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-border bg-card'>
						{works.map((work) => (
							<tr
								key={work.id}
								className='hover:bg-secondary/40'>
								<td className='px-6 py-4 font-semibold text-foreground'>
									{work.name}
								</td>
								<td className='px-6 py-4 text-muted-foreground'>
									<p className='line-clamp-2'>{work.description}</p>
								</td>
								<td className='px-6 py-4 text-muted-foreground'>
									<p className='text-xs'>
										Title + {work.galleryImageUrls?.length || 0} gallery
									</p>
								</td>
								<td className='px-6 py-4 text-muted-foreground'>
									{work.createdAt
										? new Date(work.createdAt).toLocaleDateString()
										: '—'}
								</td>
								<td className='px-6 py-4 text-right text-muted-foreground'>
									<button
										type='button'
										onClick={() => onEdit(work)}
										className='inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-foreground hover:border-accent mr-2'>
										<Edit3 className='h-4 w-4' /> Edit
									</button>
									<button
										type='button'
										onClick={() => onDelete(work)}
										className='inline-flex items-center gap-1 rounded-lg border border-red-300 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50'>
										<Trash2 className='h-4 w-4' /> Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default function AdminDashboardPage() {
	const [authenticated, setAuthenticated] = useState(false)
	const [checkingAuth, setCheckingAuth] = useState(true)
	const [activeTab, setActiveTab] = useState(TABS[0].id)
	const [refreshKey, setRefreshKey] = useState(0)
	const [toasts, setToasts] = useState([])
	const [editingWork, setEditingWork] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [modalSubmitting, setModalSubmitting] = useState(false)

	const pushToast = useCallback(({variant, message}) => {
		const id = crypto.randomUUID()
		setToasts((prev) => [...prev, {id, variant, message}])
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id))
		}, 3500)
	}, [])

	const dismissToast = (id) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}

	useEffect(() => {
		let mounted = true
		const checkSession = async () => {
			try {
				const response = await fetch('/api/admin/session', {cache: 'no-store'})
				const data = await response.json()
				if (mounted) {
					setAuthenticated(Boolean(data.authenticated))
				}
			} catch (error) {
				console.error('Failed to verify session', error)
			} finally {
				if (mounted) {
					setCheckingAuth(false)
				}
			}
		}
		checkSession()
		return () => {
			mounted = false
		}
	}, [])

	const handleAuthenticated = () => {
		setAuthenticated(true)
	}

	const handleWorkCreated = () => {
		setRefreshKey((prev) => prev + 1)
		setActiveTab('manage')
	}

	const handleEdit = (work) => {
		setEditingWork({
			...work,
			galleryImageUrls: work.galleryImageUrls || work.gallery || [],
			pendingGallery: [],
			pendingTitleFile: null,
		})
		setShowModal(true)
	}

	const handleDelete = async (work) => {
		if (!window.confirm(`Delete ${work.name}? This cannot be undone.`)) {
			return
		}
		try {
			const response = await fetch(`/api/works/${work.id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				const data = await response
					.json()
					.catch(() => ({error: 'Failed to delete'}))
				throw new Error(data.error || 'Failed to delete')
			}
			pushToast({variant: 'success', message: 'Work deleted'})
			setRefreshKey((prev) => prev + 1)
		} catch (error) {
			console.error('Delete work failed', error)
			pushToast({
				variant: 'error',
				message: error.message || 'Failed to delete work',
			})
		}
	}

	const closeModal = () => {
		setShowModal(false)
		setEditingWork(null)
	}

	const handleModalSubmit = async (event) => {
		event.preventDefault()
		if (!editingWork) return
		setModalSubmitting(true)
		try {
			let titleImageUrl = editingWork.titleImageUrl || editingWork.image
			if (editingWork.pendingTitleFile) {
				titleImageUrl = await uploadImageToCloud(
					editingWork.pendingTitleFile,
					'works/title'
				)
			}

			const galleryImageUrls = [...(editingWork.galleryImageUrls || [])]
			if (editingWork.pendingGallery?.length) {
				const uploaded = await Promise.all(
					editingWork.pendingGallery.map((file) =>
						uploadImageToCloud(file, 'works/gallery')
					)
				)
				galleryImageUrls.push(...uploaded)
			}

			const payload = {
				name: editingWork.name?.trim(),
				description: editingWork.description?.trim(),
				titleImageUrl,
				galleryImageUrls,
			}

			const response = await fetch(`/api/works/${editingWork.id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(payload),
			})
			if (!response.ok) {
				const data = await response
					.json()
					.catch(() => ({error: 'Failed to update'}))
				throw new Error(data.error || 'Failed to update')
			}
			pushToast({variant: 'success', message: 'Work updated'})
			setRefreshKey((prev) => prev + 1)
			closeModal()
		} catch (error) {
			console.error('Update work failed', error)
			pushToast({
				variant: 'error',
				message: error.message || 'Failed to update work',
			})
		} finally {
			setModalSubmitting(false)
		}
	}

	if (checkingAuth) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<p className='text-muted-foreground'>Preparing dashboard...</p>
			</div>
		)
	}

	return (
		<div className='relative min-h-screen bg-linear-to-br from-background via-secondary/30 to-background px-3 py-8 text-foreground sm:px-6'>
			<div className='mx-auto flex w-full max-w-5xl flex-col gap-6 lg:flex-row'>
				<ToastStack
					toasts={toasts}
					onDismiss={dismissToast}
				/>
				{!authenticated ? (
					<PasswordGate
						onAuthenticated={handleAuthenticated}
						pushToast={pushToast}
					/>
				) : (
					<>
						<TabSidebar
							activeTab={activeTab}
							onChange={setActiveTab}
						/>
						<section className='flex-1 space-y-6'>
							<header className='rounded-3xl border border-border bg-card/80 px-6 py-6 shadow-xl text-sm'>
								<p className='text-xs uppercase tracking-[0.4em] text-muted-foreground'>
									Welcome back
								</p>
								<h1 className='mt-2 text-2xl font-semibold'>Admin Dashboard</h1>
								<p className='mt-2 text-muted-foreground'>
									Manage showcased work with a smoother, more compact
									experience.
								</p>
							</header>
							{activeTab === 'add' ? (
								<AddWorkTab
									onCreated={handleWorkCreated}
									pushToast={pushToast}
								/>
							) : (
								<ManageWorkTab
									refreshKey={refreshKey}
									pushToast={pushToast}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							)}
						</section>
					</>
				)}
			</div>
			{showModal && editingWork && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8'>
					<div className='w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl'>
						<div className='mb-4 flex items-center justify-between sticky top-0 bg-card z-10 pb-4'>
							<div>
								<p className='text-xs uppercase tracking-[0.3em] text-muted-foreground'>
									Edit Work
								</p>
								<h3 className='text-lg font-semibold'>{editingWork.name}</h3>
							</div>
							<button
								type='button'
								onClick={closeModal}
								className='rounded-full px-4 py-2 text-2xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors'>
								✕
							</button>
						</div>
						<form
							className='space-y-4 text-sm'
							onSubmit={handleModalSubmit}>
							<div>
								<label className='mb-1 block text-xs font-semibold uppercase tracking-wide'>
									Name
								</label>
								<input
									value={editingWork.name}
									onChange={(e) =>
										setEditingWork((prev) => ({...prev, name: e.target.value}))
									}
									className='w-full rounded-xl border border-border bg-background px-3 py-2'
									required
								/>
							</div>
							<div>
								<label className='mb-1 block text-xs font-semibold uppercase tracking-wide'>
									Description (Optional)
								</label>
								<textarea
									value={editingWork.description}
									onChange={(e) =>
										setEditingWork((prev) => ({
											...prev,
											description: e.target.value,
										}))
									}
									rows={3}
									className='w-full rounded-xl border border-border bg-background px-3 py-2'
								/>
							</div>
							<div>
								<label className='mb-1 block text-xs font-semibold uppercase tracking-wide'>
									Title Image
								</label>
								<div className='flex items-center gap-4'>
									<img
										src={
											editingWork.pendingTitleFile
												? URL.createObjectURL(editingWork.pendingTitleFile)
												: editingWork.titleImageUrl || editingWork.image
										}
										alt='Title'
										className='h-20 w-20 rounded-xl border border-border object-cover'
									/>
									<label className='rounded-xl border border-dashed border-border px-3 py-2 text-xs font-semibold text-accent hover:text-accent-dark cursor-pointer'>
										Replace
										<input
											type='file'
											accept='image/*'
											className='hidden'
											onChange={(e) =>
												setEditingWork((prev) => ({
													...prev,
													pendingTitleFile: e.target.files?.[0] || null,
													titleImageUrl: e.target.files?.[0]
														? prev.titleImageUrl
														: prev.titleImageUrl,
												}))
											}
										/>
									</label>
								</div>
							</div>
							<div>
								<div className='mb-2 flex items-center justify-between'>
									<label className='text-xs font-semibold uppercase tracking-wide'>
										Gallery Images
									</label>
									<label className='rounded-xl border border-dashed border-border px-3 py-1 text-xs font-semibold text-accent hover:text-accent-dark cursor-pointer'>
										+ Add image
										<input
											type='file'
											accept='image/*'
											className='hidden'
											onChange={(e) =>
												setEditingWork((prev) => ({
													...prev,
													pendingGallery: e.target.files?.[0]
														? [
																...(prev.pendingGallery || []),
																e.target.files[0],
														  ]
														: prev.pendingGallery,
												}))
											}
										/>
									</label>
								</div>
								<div className='grid grid-cols-3 gap-3'>
									{(editingWork.galleryImageUrls || []).map((url, index) => (
										<div
											key={url + index}
											className='relative'>
											<img
												src={url}
												alt='Gallery'
												className='h-24 w-full rounded-xl object-cover border border-border'
											/>
											<button
												type='button'
												className='absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white'
												onClick={() =>
													setEditingWork((prev) => ({
														...prev,
														galleryImageUrls: prev.galleryImageUrls.filter(
															(_, idx) => idx !== index
														),
													}))
												}>
												✕
											</button>
										</div>
									))}
									{(editingWork.pendingGallery || []).map((file, index) => (
										<div
											key={file.name + index}
											className='relative'>
											<img
												src={URL.createObjectURL(file)}
												alt='Pending'
												className='h-24 w-full rounded-xl object-cover border border-dashed border-border'
											/>
											<button
												type='button'
												className='absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white'
												onClick={() =>
													setEditingWork((prev) => ({
														...prev,
														pendingGallery: prev.pendingGallery.filter(
															(_, idx) => idx !== index
														),
													}))
												}>
												✕
											</button>
										</div>
									))}
								</div>
							</div>
							<div className='sticky bottom-0 bg-card pt-4 border-t border-border mt-6'>
								<div className='flex justify-end gap-3'>
									<button
										type='button'
										onClick={closeModal}
										className='rounded-xl border border-border px-4 py-2 text-sm font-semibold'>
										Cancel
									</button>
									<button
										type='submit'
										disabled={modalSubmitting}
										className='rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg disabled:opacity-70'>
										{modalSubmitting ? 'Saving...' : 'Save Changes'}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
