# Koeo Marketing Website

The official marketing website for Koeo, an AI infrastructure platform that simplifies GPU management for AI workloads. Built with Next.js 16, React 19, and Tailwind CSS.

## Features

- Modern, responsive marketing pages
- Beta signup form with Airtable integration
- Partner signup form
- Career application portal with resume upload
- SEO optimization with structured data
- Accessible UI components

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- Airtable account (for form submissions)
- Vercel Blob storage (for file uploads)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd koeo-marketing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id

# Vercel Blob Storage (for file uploads)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

#### Environment Variable Details

| Variable | Required | Description |
|----------|----------|-------------|
| `AIRTABLE_API_KEY` | Yes | Personal access token from Airtable for API authentication |
| `AIRTABLE_BASE_ID` | Yes | The ID of your Airtable base (starts with `app`) |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage token for resume uploads |

To get your Airtable credentials:
1. Go to [Airtable](https://airtable.com) and sign in
2. Navigate to your account settings > Developer hub > Personal access tokens
3. Create a new token with `data.records:write` scope
4. Copy your base ID from the Airtable URL (the part after `airtable.com/`)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run unit and integration tests with Vitest |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   │   ├── beta-signup/    # Beta signup form handler
│   │   ├── career-application/ # Career form handler
│   │   └── partner-signup/ # Partner form handler
│   ├── about/              # About page
│   ├── beta/               # Beta signup page
│   ├── brandkit/           # Brand assets page
│   ├── careers/            # Careers page
│   ├── product/            # Product page
│   ├── providers/          # Providers page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
│
├── components/             # React components
│   ├── layout/             # Layout components (Header, Footer, PageShell)
│   ├── sections/           # Page section components
│   ├── seo/                # SEO components (JSON-LD)
│   └── ui/                 # Reusable UI primitives
│
├── content/                # Centralized marketing copy
│   ├── homepage.ts         # Homepage content
│   ├── beta.ts             # Beta page content
│   ├── about.ts            # About page content
│   └── ...                 # Other page content
│
├── features/               # Domain-specific feature modules
│   ├── beta-signup/        # Beta signup form and logic
│   ├── partner-signup/     # Partner signup feature
│   └── careers/            # Career application feature
│
├── lib/                    # Utility libraries
│   ├── airtable/           # Airtable client and table mappings
│   ├── seo/                # SEO utilities and metadata
│   ├── utils.ts            # General utilities (cn helper)
│   └── validation.ts       # Form validation utilities
│
├── public/                 # Static assets
│   └── brand/              # Brand assets (logos, icons)
│
├── scripts/                # Utility scripts
│   └── *.ts                # Airtable testing and brand generation
│
└── tests/                  # Test configuration
    ├── e2e/                # End-to-end tests (Playwright)
    ├── integration/        # Integration tests
    └── setup.ts            # Vitest setup
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: Airtable API integration
- **File Storage**: Vercel Blob
- **Testing**: Vitest + React Testing Library + fast-check (property-based testing) + Playwright (E2E)

## Development

### Code Style

This project follows the coding standards defined in `.kiro/steering/coding-standards.md`:

- Use kebab-case for file names
- Use PascalCase for React components
- Use the `cn()` utility for conditional Tailwind classes
- Follow the component file structure (imports, types, constants, component, export)

### Testing

Run the test suite:

```bash
npm test              # Unit and integration tests
npm run test:e2e      # E2E tests with Playwright
```

Unit tests are co-located with source files using the `.test.tsx` suffix. E2E tests are in `tests/e2e/`.

### Linting

Check code quality:

```bash
npm run lint
```

## Deployment

The site is designed to be deployed on [Vercel](https://vercel.com). Push to the main branch to trigger automatic deployments.

For manual deployment:

```bash
npm run build
npm run start
```

## License

Proprietary - All rights reserved.
