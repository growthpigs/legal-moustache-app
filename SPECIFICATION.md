# Application Specification: Legal-Moustache

**Last Updated:** April 21, 2025 *(We can update this date as we refine)*

## 1. Application Name

*   Legal-Moustache

## 2. Core Technology Stack

*   **Framework:** Next.js (App Router)
*   **UI Library:** shadcn/ui (configured with "New-York" style)
*   **Styling:** Tailwind CSS v4
*   **Authentication:** NextAuth.js
*   **Database:** Firebase Firestore
*   **Deployment (Initial Assumption):** Vercel (or specify if different)

## 3. Core Features

### 3.1 User Authentication

*   **Implementation:** Use `NextAuth.js`.
*   **Providers:** Support Sign Up/Login with Google and Email/Password.
*   **Data Storage:** Utilize the `@next-auth/firebase-adapter` to store user data in the `users` collection and session information in Firebase Firestore.
*   **Flow:** Handle redirection logic for authenticated/unauthenticated users attempting to access protected or public routes.

### 3.2 Shared Layout & Navigation Bar

*   **File:** Implement within the root `layout.tsx` using Next.js App Router conventions.
*   **Components:** Build using `shadcn/ui` components (e.g., Navigation Menu, Buttons, potentially an Avatar for logged-in users).
*   **Responsiveness:** Ensure the navigation bar adapts cleanly to different screen sizes (desktop, tablet, mobile).
*   **Content:**
    *   Include the Legal Moustache logo (link to homepage `/`).
    *   **Conditional Links (based on `session` status):**
        *   *Authenticated:* "Dashboard", "Check Content", "Account Settings" (placeholder), "Sign Out".
        *   *Unauthenticated:* "Login", "Sign Up".

### 3.3 Authentication Screens

*   **Routes:**
    *   Sign Up page: `/signup`
    *   Login page: `/login`
*   **Components:** Use `shadcn/ui` for forms (`Input`, `Label`, `Button`, `Card`).
*   **Functionality:**
    *   Email/Password fields with appropriate validation.
    *   "Sign in with Google" button triggering the NextAuth.js Google provider flow.
    *   Clear error message handling (e.g., invalid credentials, email already exists).
    *   Redirection upon successful sign-up/login (typically to `/dashboard`).
    *   Prevent access to `/signup` and `/login` if the user is already authenticated (redirect to `/dashboard`).

### 3.4 Dashboard Screen

*   **Route:** `/dashboard` (Protected Route - requires authentication).
*   **Content:**
    *   Display a personalized welcome message (e.g., "Welcome back, [User Name]!"). Fetch user name from session/Firestore.
    *   Include a primary action button (`shadcn/ui Button`, styled per guidelines) labeled "Check New Marketing Content" (or similar) linking to the content input screen (`/check-content`).
    *   (Future Consideration: Display a summary of recent checks or account status).

### 3.5 Content Compliance Check Flow

*   **3.5.1 Input Screen**
    *   **Route:** `/check-content` (Protected Route).
    *   **Components (`shadcn/ui`):**
        *   `Textarea`: Large area for pasting marketing copy.
        *   `Select`: Dropdown labeled "Primary Target Jurisdiction". Options: "Victoria", "New South Wales", "Queensland". (Single selection for MVP).
        *   `Checkbox`: Labeled "Is this an electronic message (e.g., email, SMS)?".
        *   `Button`: Primary action button labeled "Check Compliance".
*   **3.5.2 Compliance Check Simulation (Backend Logic)**
    *   **Trigger:** Button click on the Input Screen.
    *   **Process:** Send content, jurisdiction, and message type to a backend function (e.g., Firebase Cloud Function or Next.js API Route).
    *   **Analysis (Simulated - Focus on Patterns):**
        *   **ACL Patterns:** Scan for keywords/phrases like:
            *   Absolutes: "guaranteed", "proven", "always", "never", "cure", "risk-free".
            *   Unsubstantiated Superlatives: "best", "most effective", "top-rated", "lowest price" (without clear context/source).
            *   Potentially Misleading Comparisons: Vague references to competitors, unclear "was/now" pricing.
            *   Sensitive Claim Areas: Keywords related to "organic", "eco-friendly", "natural", "health benefits", "financial returns" (flag for high scrutiny).
        *   **Spam Act Patterns (if Checkbox is true):**
            *   Sender ID: Look for patterns like "From:", company name signatures. Flag if potentially absent.
            *   Unsubscribe Mechanism: Look for keywords like "unsubscribe", "opt-out", "manage preferences". Flag if potentially absent.
    *   **Output:** Return a structured

