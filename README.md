# Elanchezhiyan P's portfolio

A modern portfolio and project showcase web application for Elanchezhiyan P, a seasoned software developer specializing in .NET, Azure, CRM integrations, and cloud-native solutions.

## Features

- **Personal Portfolio:** About, Experience Timeline, Certifications, and Resume Download.
- **Project Showcase:** Filterable project gallery with featured projects and technology tags.
- **Blog & Testimonials:** Sections for blog posts and client testimonials.
- **Contact & Freelance:** Contact form and call-to-action for freelance opportunities.
- **Responsive Design:** Mobile-friendly layout with adaptive components.
- **Modern Stack:** Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.
- **SEO Optimized:** Uses `react-helmet-async` for meta tags and social sharing.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui, class-variance-authority
- **Routing:** React Router
- **State & Data:** React Hooks, Context API
- **Assets:** Local images for project thumbnails
- **Utilities:** Lucide React Icons, custom hooks

## Project Structure

```
src/
  components/
    ui/           # Reusable UI components (Button, Card, Sidebar, etc.)
    MobileTimeline.tsx
    Layout.tsx
  pages/
    About.tsx     # About & Experience
    Projects.tsx  # Project gallery
    Index.tsx     # Home/landing page
    Blog.tsx
    Contact.tsx
    Testimonials.tsx
    NotFound.tsx
  data/
    projects.json # Project metadata
  assets/
    project/      # Project images
  utils/
    dateUtils.ts  # Utility functions
App.tsx           # Main app entry
index.css         # Tailwind CSS entry
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/elanchezhiyan-p/profile.git
   cd profile
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

### Build for Production

```sh
npm run build
# or
yarn build
```

### Lint & Format

```sh
npm run lint
npm run format
```

## Customization

- **Resume:** Place your PDF at `public/resume-elanchezhiyan.pdf` for the download button to work.
- **Projects:** Edit `src/data/projects.json` and add images to `src/assets/project/`.
- **Theme:** Tailwind and shadcn/ui are fully customizable via `tailwind.config.ts` and `components.json`.

## License

This project is for personal/portfolio use. For commercial use or reuse, please contact the author.

---

**Developed by Elanchezhiyan P**

[Portfolio](https://elanchezhiyan-p.is-a.dev)
