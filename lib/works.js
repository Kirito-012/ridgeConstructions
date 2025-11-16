// Works service with caching and performance optimizations
let worksCache = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes cache

/**
 * Fetch all works from the API with client-side caching
 * @returns {Promise<Array>} Array of formatted works
 */
export async function fetchWorks() {
	const now = Date.now()

	// Return cached data if still valid
	if (worksCache && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
		return worksCache
	}

	try {
		const response = await fetch('/api/works', {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			// Add cache headers for better performance
			cache: 'force-cache',
		})

		if (!response.ok) {
			throw new Error('Failed to fetch works')
		}

		const data = await response.json()
		const formattedWorks = data.works.map((work) => ({
			id: work.id,
			title: work.name,
			description: work.description,
			image: work.titleImageUrl,
			gallery: work.galleryImageUrls || [],
			slug: work.name.toLowerCase().replace(/\s+/g, '-'),
		}))

		// Update cache
		worksCache = formattedWorks
		cacheTimestamp = now

		return formattedWorks
	} catch (error) {
		console.error('Error fetching works:', error)
		throw error
	}
}

/**
 * Find a work by slug
 * @param {string} slug - The work slug
 * @returns {Promise<Object|null>} The work object or null if not found
 */
export async function findWorkBySlug(slug) {
	try {
		const works = await fetchWorks()
		return works.find((work) => work.slug === slug) || null
	} catch (error) {
		console.error('Error finding work by slug:', error)
		throw error
	}
}

/**
 * Preload images for better performance
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @returns {Promise<void>} Promise that resolves when all images are loaded
 */
export function preloadImages(imageUrls) {
	if (typeof window === 'undefined') return Promise.resolve()

	const imagePromises = imageUrls
		.filter((url) => url) // Filter out empty URLs
		.map((url) => {
			return new Promise((resolve, reject) => {
				const img = new Image()
				img.onload = () => resolve()
				img.onerror = () => {
					console.warn(`Failed to load image: ${url}`)
					resolve() // Resolve anyway to not block the page
				}
				img.src = url
			})
		})

	return Promise.all(imagePromises)
}

/**
 * Clear the works cache
 */
export function clearWorksCache() {
	worksCache = null
	cacheTimestamp = null
}
