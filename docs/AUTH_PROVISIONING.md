# Auth Provisioning Guide: Clerk + Neon

This document walks through setting up Clerk (authentication) + Neon (data API) for member-only access.

## Phase 1: Clerk Setup

### 1.1 Create Clerk Application

1. Go to https://dashboard.clerk.com and sign up / log in
2. Create a new application
3. In the application settings:
   - **Sign-in & Sign-up**: Enable
   - **Authentication Methods**:
     - Enable **Email link (magic link)**
     - Enable **Google OAuth**
   - **Restrictions** → **Allowlist**:
     - Enable "Only allow users with email addresses in Allowlist"
     - Add the approved member email addresses
4. Copy your **Publishable Key** (starts with `pk_`)

### 1.2 Add Neon JWT Template

1. In Clerk Dashboard → **Configure** → **JWT Templates**
2. Create a new template called `neon`
3. Set the Claims to:
   ```json
   {
     "sub": "{{user.id}}",
     "email": "{{user.primary_email_address}}",
     "role": "authenticated"
   }
   ```
4. Copy the template ID (you'll need this for Neon config)

Store these in your `.env` file:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_xxxxx
```

## Phase 2: Neon Setup

### 2.1 Create Neon Project

1. Go to https://console.neon.tech and sign up / log in
2. Create a new project
3. Once created, note the:
   - **Project ID** (visible in URL or dashboard)
   - **Database name** (default: `neondb`)
4. In project settings → **Authentication**:
   - Copy the connection string (normal PostgreSQL)

### 2.2 Enable Data API

1. In Neon Dashboard → **Settings** → **Data API**
2. Enable the Data API
3. Copy the **Data API URL** (format: `https://<project-id>.neon.tech/sql`)
4. Go to **API Keys** and create a read-write key
5. Copy the key

Store these in your `.env` file:
```
VITE_NEON_API_URL=https://xxxxx.neon.tech/sql
VITE_NEON_API_KEY=xxxxx
```

### 2.3 Configure JWT Auth in Neon

1. In Neon → **Settings** → **Data API** → **Authentication**
2. Click "Add Custom Provider"
3. Enter:
   - **Provider name**: `clerk`
   - **JWKS URL**: `https://<your-clerk-domain>/.well-known/jwks.json`
     - Find your Clerk domain in Clerk Dashboard → **Settings** → **API** → **Clerk domain**
4. Save and verify the connection

### 2.4 Enable pg_session_jwt Extension

1. Connect to Neon via the SQL Editor or `psql`
2. Run:
   ```sql
   CREATE EXTENSION IF NOT EXISTS pg_session_jwt;
   ```

## Phase 3: Test JWT Trust

### 3.1 Get a Test JWT

1. Run the app locally with Clerk integrated (`npm run dev`)
2. Open DevTools → **Application** → **Cookies**
3. Look for `__clerk_db_jwt` and copy its value
4. Or, call `getToken()` from `@clerk/clerk-react` in a component

### 3.2 Test Neon Data API

Make a test request to verify JWT auth:

```bash
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Authorization: Bearer <YOUR_CLERK_JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "statement": "SELECT auth.user_id() as user_id, current_user;"
  }'
```

Expected response:
```json
{
  "result": [
    {
      "user_id": "user_abc123def456",
      "current_user": "clerk:user_abc123def456"
    }
  ]
}
```

### 3.3 Test Anon Rejection

Make a request WITHOUT the JWT:

```bash
curl -X POST https://xxxxx.neon.tech/sql \
  -H "Content-Type: application/json" \
  -d '{"statement": "SELECT 1;"}'
```

Expected: **403 Forbidden** or similar auth error.

## Phase 4: Environment Configuration

1. Copy `.env.example` to `.env.local` (git-ignored):
   ```bash
   cp .env.example .env.local
   ```
2. Fill in all values from the steps above
3. **NEVER commit `.env.local` to git**

## Phase 5: Code Integration (Next Step)

- mavericks-j4v.2: Neon schema + RLS policies
- mavericks-j4v.4: ClerkProvider + sign-in/out UI
- mavericks-j4v.6: Data hooks replacing static imports

## Troubleshooting

- **"Unauthorized"** from Neon: JWT is invalid or expired; ensure Clerk JWKS URL is correct
- **"Allowlist" not working**: Ensure users are in Clerk Allowlist AND sign-up restrictions are ON
- **Data API 403**: Make sure JWT auth provider is configured in Neon and the JWT includes the right claims

## References

- Clerk Docs: https://clerk.com/docs
- Neon Data API: https://neon.tech/docs/reference/data-api
- Neon JWT Auth: https://neon.tech/docs/guides/authentication
