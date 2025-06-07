# Clinical Case Compass

## Description

This project is a web-based application designed for medical education and practice. It allows users to engage with interactive clinical case simulations, enhancing their diagnostic and decision-making skills in a risk-free environment. The platform aims to provide a realistic and engaging learning experience for medical students and professionals.

## Features

- **Interactive Case Scenarios:** Users can navigate through various clinical cases, making decisions and receiving feedback.
- **Realistic Patient Data:** Cases include detailed patient histories, vital signs, lab results, and imaging studies.
- **Dynamic Outcomes:** Decisions made by the user impact the progression of the case and patient outcomes.
- **Performance Tracking:** (Future Feature) Users can track their progress and identify areas for improvement.
- **User Authentication:** Secure login and user management via Supabase.
- **Responsive Design:** Accessible on various devices, including desktops, tablets, and mobile phones.
- **UI Components:** Leverages Shadcn/ui for a rich set of pre-built and customizable components.
- **Theming:** Dark/Light mode support.

## Tech Stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Routing:** React Router DOM
- **State Management:** React Context API, TanStack Query
- **Form Handling:** React Hook Form, Zod (for validation)
- **Backend (BaaS):** Supabase (for database, authentication, and real-time features)
- **UI Components & Libraries:** Shadcn/ui, Radix UI, Lucide Icons, Recharts (for charts), `embla-carousel-react`, `sonner` (for toasts), `vaul` (for drawers).
- **Linting:** ESLint
- **Package Manager:** npm (default, `bun` also supported)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to get a local copy of the project up and running.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd clinical-case-compass # Or your chosen directory name
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```
Or using Bun:
```bash
bun install
```

If you pull new updates or switch branches later, run `npm install` again to ensure all dependencies are installed.

### 3. Set Up Environment Variables

This project uses Supabase for its backend services. You will need to create a Supabase project and obtain your project URL and anon key.

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to your project's settings: `Settings` -> `API`.
3. Find your Project URL and anon key.
4. Copy the provided `.env.example` file to `.env` in the root of your project directory.
5. Add your Supabase credentials to the `.env` file like this:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Note:** The `VITE_` prefix is important for Vite projects to expose these variables to the client-side code.
The Supabase client now reads these values from `import.meta.env`.

If the app shows a blank page after running the dev server, double-check that the
`.env` file exists and contains your Supabase credentials.

### 4. Run the Development Server

Using npm:
```bash
npm run dev
```
Or using Bun:
```bash
bun run dev
```

This will start the development server, typically at `http://localhost:8080`.

## Available Scripts

The `package.json` file defines the following scripts:

- `npm run dev`: Starts the development server using Vite.
- `npm run build`: Builds the application for production.
- `npm run build:dev`: Builds the application for development (includes sourcemaps, etc.).
- `npm run lint`: Lints the codebase using ESLint.
- `npm test`: Runs the test suite with Vitest.
- `npm run preview`: Serves the production build locally for preview.

If using Bun, replace `npm run` with `bun run`.

## Running Tests

Before executing the tests, ensure all dependencies are installed:

```bash
npm install
```

Then run the suite:

```bash
npm test
```

If npm reports vulnerabilities, you may attempt to automatically fix them with:

```bash
npm audit fix
```

## Project Structure

```
clinical-case-compass/
├── .github/                            # GitHub Actions workflows (e.g., CI, summary.yml)
├── public/                             # Static assets (favicon, placeholder images, robots.txt)
├── src/                                # Source code
│   ├── components/                     # React components
│   │   ├── auth/                       # Authentication-related components (UserProfileDisplay, PrivateRoute)
│   │   ├── body-diagram/              # SimpleBodyPartSelector component
│   │   ├── cases/                      # Case specific components (e.g., CaseCard, SymptomChecklist)
│   │   ├── dashboard/                  # Dashboard specific components (e.g., RecentCasesList, StatCard, DashboardSearchBar)
│   │   ├── error/                      # Error handling (ErrorBoundary)
│   │   └── ui/                         # Core UI components from Shadcn/ui (Button, Card, Input, etc.)
│   ├── layouts/                        # Layout components (AppLayout, Sidebar)
│   ├── contexts/                       # React Context API providers (AuthContext, ThemeContext)
│   ├── data/                           # Mock data (mock-data.ts)
│   ├── hooks/                          # Custom React hooks (use-dashboard-data, use-supabase-cases, etc.)
│   ├── integrations/                   # Third-party service integrations
│   │   └── supabase/                   # Supabase client and type definitions
│   ├── lib/                            # Utility functions (utils.ts, validation.ts)
│   ├── pages/                          # Page components for different routes (Dashboard, Cases, Auth, etc.)
│   ├── types/                          # TypeScript type definitions (case.ts)
│   ├── App.css                         # Global styles for App component
│   ├── App.tsx                         # Main application component
│   ├── index.css                       # Global styles, Tailwind base/components/utilities
│   ├── main.tsx                        # Application entry point
│   └── vite-env.d.ts                 # Vite environment type definitions
├── supabase/                           # Supabase local development configuration (config.toml)
├── .gitignore                          # Files ignored by Git
├── components.json                     # Shadcn/ui component configuration
├── eslint.config.js                    # ESLint configuration
├── index.html                          # Main HTML file
├── package-lock.json                   # npm lock file
├── package.json                        # Project metadata, dependencies, and scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.ts                  # Tailwind CSS configuration
├── tsconfig.app.json                   # TypeScript configuration for the app
├── tsconfig.json                       # TypeScript base configuration
├── tsconfig.node.json                  # TypeScript configuration for Node.js context (e.g., vite.config.ts)
├── vite.config.ts                      # Vite build tool configuration
└── README.md                           # This file
```

**Note on Body Diagram Components:**
This project offers two components for selecting body regions:
* `src/features/cases/InteractiveBodyDiagram.tsx` – a full SVG diagram with zoom and anterior/posterior views.
* `src/components/body-diagram/SimpleBodyPartSelector.tsx` – a lightweight list of buttons for quick selection.

## Contributing

Contributions are welcome! Please refer to `CONTRIBUTING.md` for more details (if available) or follow standard GitHub flow (fork, branch, PR).

## License

MIT License
