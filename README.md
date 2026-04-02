# ExamFlow

A modern exam practice platform starter built with Next.js, Tailwind CSS, TypeScript, and Supabase.

## Features

- Public exam browsing without login
- Email/password authentication with Supabase Auth
- Logged-in practice mode with saved attempts
- Document uploads with Supabase Storage
- PayPal support flow with server-side order creation and capture
- TELC-style starter content and modern UI

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env.local
```

3. Add your Supabase project values to `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Add PayPal credentials in `.env.local`

```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_ENV=sandbox
```

5. Run the dev server:

```bash
npm run dev
```

6. Open `http://localhost:3000`

## Notes

- The support flow now uses PayPal. Use `sandbox` while testing and switch `PAYPAL_ENV` to `live` for production.
- Create Supabase tables like `attempts`, `support_contributions`, and `document_uploads`, plus a `community-documents` storage bucket.
- The exam pages currently use bundled starter data instead of a database seed.

## Supabase Setup

1. Open the Supabase SQL editor and run [supabase/schema.sql](/Users/idrisay/Desktop/coding/apps/supabase/schema.sql)
2. Create a storage bucket named `community-documents`
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
4. Run:

```bash
npm run create:user
npm run create:admin
```

Use `create:user` for a normal user and `create:admin` for an admin or super admin.

Default user command:

```bash
npm run create:user
```

Default values:

- Email: `student@example.com`
- Name: `Sample User`
- Password: `ChangeMe123!`
- Role: `student`

Default admin command:

```bash
npm run create:admin
```

The script creates or updates this admin user by default:

- Email: `idrisaydev@gmail.com`
- Name: `uniqueay`
- Password: `ChangeMe123!`
- Role: `super_admin`

You can override them with env vars:

```bash
USER_EMAIL=student1@example.com
USER_NAME=Student Name
USER_LASTNAME=Student Lastname
USER_PASSWORD=StrongPassword123!
USER_ROLE=student

ADMIN_EMAIL=someone@example.com
ADMIN_NAME=Admin Name
ADMIN_LASTNAME=Admin Lastname
ADMIN_PASSWORD=StrongPassword123!
ADMIN_ROLE=admin
```

## Admin Auth

- The real user account is created in `auth.users`
- Admin authorization uses `auth.users.app_metadata.role = 'admin'`
- The public `users` table is your app user data linked to `auth.users`

There is also a protected server route for creating users with admin metadata:

- `POST /api/admin/create-user`

Example payload:

```json
{
  "email": "idrisaydev@gmail.com",
  "password": "ChangeMe123!",
  "name": "uniqueay",
  "role": "admin"
}
```
