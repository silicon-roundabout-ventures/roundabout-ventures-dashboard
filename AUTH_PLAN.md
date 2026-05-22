# Auth Implementation Plan

## Approach

No new dependencies. We use what's already installed:

- **React Context** for auth state (replaces XState)
- **React Query** (`@tanstack/react-query`) for API calls + caching
- **react-hook-form + zod** for the login form
- **Native `fetch`** with `credentials: "include"` (replaces wretch)
- **Gatsby pages** for routing (replaces TanStack Router)
- Cookies are set by the backend / in the verify response — we read them with `document.cookie` (no js-cookie needed since we only need to set the token once on verify)

## Key constraint: don't touch the marketing site

The public marketing pages (`/`, `/apply`, `/whoweare`, etc.) must remain completely unaffected. There is no global auth guard, no global `/me` call, and no login button in the navbar. The auth flow is isolated to its own pages.

## API Endpoints (already exist on backend)

All calls use `credentials: "include"` so cookies are sent automatically.

| Method | Path           | Body                  | Returns                  |
|--------|----------------|-----------------------|--------------------------|
| GET    | `/me`          | —                     | `{ status, data: User }` |
| POST   | `/magic-link`  | `{ email }`           | `{}`                     |
| POST   | `/verify`      | `{ xid, code }`       | `{ data: { token } }`   |
| POST   | `/logout`      | —                     | `{}`                     |

Base URL comes from an env var: `GATSBY_API_URL` (Gatsby requires `GATSBY_` prefix for client-side env vars).

## Files to create/modify

### New files

1. **`src/services/auth-api.ts`** — thin fetch wrappers for `/me`, `/magic-link`, `/verify`, `/logout`. Sets cookie on verify. ~40 lines.

2. **`src/context/AuthContext.tsx`** — React context + provider.
   - Does NOT call `/me` globally on mount.
   - Exposes: `{ user, isLoading, isAuthenticated, login, verify, logout, checkSession }`.
   - `checkSession()` → calls `GET /me`, sets user if valid. Only called from auth-related pages.
   - `login(email)` → calls `/magic-link`.
   - `verify(xid, code)` → calls `/verify`, sets cookie, then calls `checkSession`.
   - `logout()` → calls `/logout`, clears user + query cache.

3. **`src/pages/login.tsx`** — email input form (react-hook-form + zod). On mount, calls `checkSession` — if already logged in, redirects straight to `/dashboard`. On submit calls `login(email)`, shows "check your email" message. No link to this page from the navbar — you have to know the URL.

4. **`src/pages/verify.tsx`** — reads `id` and `code` from query params, calls `verify(xid, code)`, redirects to `/dashboard` on success or `/login` on failure.

5. **`src/pages/dashboard.tsx`** — simple authenticated page. On mount, calls `checkSession` — if not logged in, redirects to `/login`. Shows a dashboard header with user email and a logout button. Body is empty for now (placeholder).

### Modified files

6. **`gatsby-browser.tsx` / `gatsby-ssr.tsx`** — wrap app in `<AuthProvider>` using `wrapRootElement`. The provider is lightweight (just context, no API calls on mount), so it won't affect marketing pages.

7. **`.env.development`** — add `GATSBY_API_URL=https://...` (you'll provide the URL).

## Auth flow

```
Marketing site (/, /apply, /whoweare, etc.)
  → Completely unaware of auth. No /me call. No redirects.

/login (hidden — no navbar link)
  → checkSession() on mount — if already logged in, redirect to /dashboard
  → User enters email, submits
  → POST /magic-link with email
  → Show "check your email" message

User clicks email link → /verify?id=xxx&code=yyy
  → POST /verify with { xid, code }
  → Backend returns token, we set it as cookie
  → checkSession() → user is set
  → Redirect to /dashboard

/dashboard (protected)
  → checkSession() on mount — if not logged in, redirect to /login
  → Shows dashboard header (user email + logout)
  → Empty body for now

Logout (from dashboard)
  → POST /logout
  → Clear user from context + query cache
  → Redirect to /login
```

## What we're NOT doing

- No XState — React Context + React Query is sufficient
- No js-cookie — one `document.cookie` set on verify, rest is `credentials: "include"`
- No wretch — native fetch is fine for 4 endpoints
- No new UI components — reuse existing button, input, card from `src/components/parts/`
- No registration flow (unless you want it later)
- No global auth guard — marketing site is untouched
- No login button in the navbar — `/login` is a hidden route
