Decide authentication behaviour

You need to settle this before the other members build protected pages.

Your project already says:

JWT
+
bcryptjs

I'd recommend:

Register
   ↓
bcrypt password
   ↓
Save User
   ↓
Login
   ↓
Verify password
   ↓
Generate JWT
   ↓
Frontend stores authentication state
   ↓
Protected API requests
   ↓
Auth Middleware
   ↓
req.user

Your initial auth endpoints:

POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/auth/me

/me is particularly important.

Frontend can call:

GET /api/v1/auth/me

to determine:

"Who is currently logged in?"