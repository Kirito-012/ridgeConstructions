import {NextResponse} from 'next/server'
import {cookies} from 'next/headers'
import {getWorksCollection} from '@/lib/db'
import {SESSION_COOKIE_NAME, validateSessionToken} from '@/lib/auth'

function formatWork(document) {
	if (!document) return null
	const {_id, ...rest} = document
	return {
		id: _id?.toString() ?? null,
		...rest,
	}
}

async function isAuthenticated() {
	const cookieStore = await cookies()
	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
	return validateSessionToken(token)
}

export async function GET() {
	try {
		const worksCollection = await getWorksCollection()
		const documents = await worksCollection
			.find({}, {projection: {password: 0}})
			.sort({createdAt: -1})
			.toArray()

		return NextResponse.json({
			works: documents.map((doc) => formatWork(doc)),
		})
	} catch (error) {
		console.error('GET /api/works failed', error)
		return NextResponse.json({error: 'Failed to fetch works'}, {status: 500})
	}
}

export async function POST(request) {
	const authed = await isAuthenticated()
	if (!authed) {
		return NextResponse.json({error: 'Not Authenticated'}, {status: 401})
	}

	try {
		const payload = await request.json()
		const name = payload?.name?.trim()
		const description = payload?.description?.trim() || ''
		const titleImageUrl = payload?.titleImageUrl?.trim()
		const galleryImageUrls = Array.isArray(payload?.galleryImageUrls)
			? payload.galleryImageUrls.filter(Boolean)
			: []

		if (!name || !titleImageUrl) {
			return NextResponse.json(
				{error: 'Missing required fields'},
				{status: 400}
			)
		}

		const worksCollection = await getWorksCollection()
		const result = await worksCollection.insertOne({
			name,
			description,
			titleImageUrl,
			galleryImageUrls,
			createdAt: new Date(),
		})

		return NextResponse.json({
			work: formatWork({
				_id: result.insertedId,
				name,
				description,
				titleImageUrl,
				galleryImageUrls,
				createdAt: new Date(),
			}),
		})
	} catch (error) {
		console.error('POST /api/works failed', error)
		return NextResponse.json({error: 'Failed to save work'}, {status: 500})
	}
}
