# Admin Dashboard Implementation Plan

## Objectives
- Add a protected `/adminuser` route that renders a password-gated admin dashboard aligned with the existing site theme.
- Provide a clean two-tab layout (“Add New Work” default tab, “Manage Work”) with responsive sidebar navigation.
- Support form submission for new work entries, persisting data in MongoDB Atlas and uploading all images to a cloud storage provider.
- Deliver user feedback via toasts for authentication, form submission success, and error states.

## Assumptions & Constraints
- Next.js App Router (app directory) with Tailwind CSS 4 utilities is available for styling.
- Global `Navbar`/`Footer` wrap all routes today; `/adminuser` will likely require a scoped layout to hide or restyle these components.
- Admin password will be provided via environment variable and should never be hard-coded. Hashing (e.g., bcrypt) preferred if password reuse is expected.
- User will later supply a MongoDB Atlas connection string and cloud image storage credentials (e.g., Cloudinary, AWS S3, or similar service that returns public URLs).

## Architecture Overview
- **Routing & Layout**: `app/adminuser/page.jsx` (client component) for dashboard shell; optional `app/adminuser/layout.jsx` to omit public nav and apply dashboard-specific styling.
- **Auth Guard**: Client-side password form that calls a server action or `/api/admin/login` route handler to validate password against env secret, returning session token (HTTP-only cookie) or short-lived JWT stored in secure cookie.
- **Dashboard UI**: Reusable sidebar component controlling tab state; main content pane conditionally renders “Add New Work” form or “Manage Work” list.
- **Data/API Layer**: Server action or `/api/works` route for CRUD operations, backed by a MongoDB collection (`works`).
- **Image Upload Pipeline**: Client uploads selected files to an external service (direct signed upload) before submit, or sends to backend which proxies upload; resulting URLs stored alongside metadata in MongoDB.

## Work Breakdown
1. **Scaffold Admin Route & Layout**
   - Create `app/adminuser/layout.jsx` that renders bare minimum chrome (optional logo) and wraps children with dashboard theme classes (dark/light support consistent with site).
   - Add `app/adminuser/page.jsx` as client component; structure page into two states: locked (password form) vs. dashboard.

2. **Password Protection Flow**
   - Build password prompt UI with controlled input + submit button; disable form while verifying.
   - Implement server action or POST `/api/admin/login` that compares submitted password to env secret/hash; on success, set HTTP-only cookie (`admin_session`) with expiry (e.g., 1 hour).
   - Inside `page.jsx`, check cookie via `cookies()` (server) or call validation endpoint to conditionally render dashboard vs. auth screen.
   - Integrate toast notifications (“Successfully logged in”, “Not Authenticated/Incorrect password”). Consider lightweight toast helper using React state or a small library (e.g., shadcn/toast) consistent with stack size.

3. **Dashboard Shell & Sidebar**
   - Create sidebar component with tab metadata array. Style with current theme colors, ensuring responsive behavior (collapsible on small screens).
   - Manage tab state via `useState`, defaulting to index 0 (“Add New Work”). Provide ARIA attributes for accessibility.
   - Content area renders tab-specific components; keep layout clean (card-like container, consistent spacing, typography).

4. **“Add New Work” Form**
   - Fields: work name (text), description (multiline), title image (single file upload or URL), dynamic gallery images (list of file inputs with “Add another image” button).
   - Use controlled inputs and local validation (required fields, file size/type checks).
   - For gallery images, maintain array of File objects; allow removing rows before upload.
   - On submit: disable button, show loading indicator, process uploads, then call backend action with payload `{ name, description, titleImageUrl, galleryImageUrls }`.
   - Upon success, reset form + show “Successfully Added” toast. Surface backend validation errors in toast or inline.

5. **“Manage Work” Tab (Stub)**
   - Fetch existing works from MongoDB via GET `/api/works`. Display list/table with thumbnails and metadata to prove wiring; future actions (edit/delete) can be placeholders for now.
   - Ensure loading & empty states match site aesthetics.

6. **Backend & Database Layer**
   - Create `lib/db.js` (or similar) to initialize MongoDB client once and share across route handlers.
   - Define schema expectations (even without Mongoose): `{ _id, name, description, titleImageUrl, galleryImageUrls[], createdAt }`.
   - Implement POST `/api/works` (or server action) that validates payload, ensures URLs exist, inserts record, and returns inserted document.
   - Add GET `/api/works` for Manage tab data.

7. **Image Upload Service Integration**
   - Decide on provider (e.g., Cloudinary) and store credentials in `.env.local` (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, etc.).
   - Current implementation: `/api/images/upload` streams files to Cloudinary via backend proxy, keeping credentials server-side. Consider upgrading to signed direct uploads later for performance.

8. **Notifications & Error Handling**
   - Implement reusable toast hook/component that supports success/error variants.
   - Display authentication errors, form validation issues, upload failures, and DB errors with clear messages.

9. **Configuration & Security**
   - Add `.env.example` entries for `ADMIN_PASSWORD_HASH` (or plain password for initial setup), `MONGODB_URI`, and chosen cloud storage keys.
   - Ensure sensitive logic runs server-side; never expose secrets in client bundles.
   - Sanitize file names, enforce max file size/count, and validate MIME types before upload.

10. **Testing & Verification**
    - Manual test matrix: password validation (success/fail), tab switching, multi-image uploads, Mongo insertions, Manage tab data display.
    - Optional: add Playwright/React Testing Library smoke tests for auth gate and form submission (mock network requests).

## Deliverables
- `plan.md` (this document) outlining the approach.
- When implementing later: new admin route/components, API handlers, DB helper, image upload utility, and toast system, plus updated env docs.
