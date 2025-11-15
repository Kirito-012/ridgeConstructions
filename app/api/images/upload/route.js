import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {cloudinary} from '@/lib/cloudinary'
import {SESSION_COOKIE_NAME, validateSessionToken} from '@/lib/auth'

// Supported image formats
const ALLOWED_FORMATS = [
	'jpg',
	'jpeg',
	'png',
	'gif',
	'webp',
	'bmp',
	'tiff',
	'svg',
	'ico',
	'heic',
	'heif',
]

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

async function ensureAuthenticated() {
	const cookieStore = await cookies()
	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
	return validateSessionToken(token)
}

function validateImageFile(file) {
	// Check file size
	if (file.size > MAX_FILE_SIZE) {
		return {
			valid: false,
			error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
		}
	}

	// Check MIME type
	const mimeType = file.type.toLowerCase()
	const isValidMime = mimeType.startsWith('image/')

	if (!isValidMime) {
		return {
			valid: false,
			error: 'File must be an image',
		}
	}

	// Extract format from MIME type
	const format = mimeType.split('/')[1]
	const isAllowedFormat = ALLOWED_FORMATS.includes(format)

	if (!isAllowedFormat) {
		return {
			valid: false,
			error: `Image format not supported. Allowed formats: ${ALLOWED_FORMATS.join(
				', '
			)}`,
		}
	}

	return {valid: true}
}

export async function POST(request) {
	const authed = await ensureAuthenticated()
	if (!authed) {
		return NextResponse.json({error: 'Not Authenticated'}, {status: 401})
	}

	try {
		const formData = await request.formData()
		const file = formData.get('file')
		const folder = formData.get('folder')?.toString() || 'ridge-constructions'

		if (!file || typeof file === 'string') {
			return NextResponse.json({error: 'File is required'}, {status: 400})
		}

		// Validate image file
		const validation = validateImageFile(file)
		if (!validation.valid) {
			return NextResponse.json({error: validation.error}, {status: 400})
		}

		// Check if Cloudinary is configured
		if (
			!process.env.CLOUDINARY_CLOUD_NAME ||
			!process.env.CLOUDINARY_API_KEY ||
			!process.env.CLOUDINARY_API_SECRET
		) {
			console.error('Cloudinary not configured')
			return NextResponse.json(
				{
					error:
						'Image upload service not configured. Please contact administrator.',
				},
				{status: 500}
			)
		}

		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const result = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder,
					resource_type: 'auto',
					allowed_formats: ALLOWED_FORMATS,
					max_file_size: MAX_FILE_SIZE,
				},
				(error, uploadResult) => {
					if (error) {
						reject(error)
					} else {
						resolve(uploadResult)
					}
				}
			)

			uploadStream.on('error', (error) => {
				reject(error)
			})

			uploadStream.end(buffer)
		})

		return NextResponse.json({
			url: result.secure_url,
			publicId: result.public_id,
			bytes: result.bytes,
			format: result.format,
			width: result.width,
			height: result.height,
		})
	} catch (error) {
		console.error('Image upload failed:', error)

		// Provide more specific error messages
		let errorMessage = 'Image upload failed'
		if (error.message) {
			errorMessage = error.message
		}

		return NextResponse.json({error: errorMessage}, {status: 500})
	}
}
