# 🚀 Elanchezhiyan P's Portfolio

A modern portfolio and project showcase web application for Elanchezhiyan P, a seasoned software developer specializing in .NET, Azure, CRM integrations, and cloud-native solutions.

## ✨ Features

- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/user.svg" width="18" style="vertical-align:middle;"/> **Personal Portfolio:** About, Experience Timeline, Certifications, and Resume Download.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layers.svg" width="18" style="vertical-align:middle;"/> **Project Showcase:** Filterable project gallery with featured projects and technology tags.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/message-square.svg" width="18" style="vertical-align:middle;"/> **Blog & Testimonials:** Sections for blog posts and client testimonials.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/calendar.svg" width="18" style="vertical-align:middle;"/> **Booking Flow:** Book a consultation, mentorship, or digital service via the `/book` page, powered by Topmate integration.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/mail.svg" width="18" style="vertical-align:middle;"/> **Contact & Freelance:** Contact form and call-to-action for freelance opportunities.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" width="18" style="vertical-align:middle;"/> **Consistent CTAs & Icons:** Unified button, icon, and CTA design across blog, testimonials, and footer for a seamless user experience.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/smartphone.svg" width="18" style="vertical-align:middle;"/> **Responsive Design:** Mobile-friendly layout with adaptive components.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/code.svg" width="18" style="vertical-align:middle;"/> **Modern Stack:** Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/search.svg" width="18" style="vertical-align:middle;"/> **SEO Optimized:** Uses `react-helmet-async` for meta tags and social sharing.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui, class-variance-authority
- **Routing:** React Router
- **State & Data:** React Hooks, Context API
- **Assets:** Local images for project thumbnails
- **Utilities:** Lucide React Icons, custom hooks

## 📁 Project Structure

```
src/
  components/
    ui/           # Reusable UI components (Button, Card, Sidebar, etc.)
    MobileTimeline.tsx
    Layout.tsx
  pages/
    About.tsx       # About & Experience
    Projects.tsx    # Project gallery
    Index.tsx       # Home/landing page
    Blog.tsx        # Blog posts
    Contact.tsx     # Contact form & CTA
    Testimonials.tsx# Client testimonials
    Book.tsx        # Booking flow (Topmate integration)
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

## ⚡ Getting Started

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

## 🎨 Customization

- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/file-text.svg" width="16" style="vertical-align:middle;"/> **Resume:** Place your PDF at `public/resume-elanchezhiyan.pdf` for the download button to work.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/folder.svg" width="16" style="vertical-align:middle;"/> **Projects:** Edit `src/data/projects.json` and add images to `src/assets/project/`.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/calendar.svg" width="16" style="vertical-align:middle;"/> **Booking Services:** Edit `src/data/topmateServices.ts` to manage available services for booking.
- <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/paintbrush.svg" width="16" style="vertical-align:middle;"/> **Theme & UI:** Tailwind and shadcn/ui are fully customizable via `tailwind.config.ts` and `components.json`. Button/icon/CTA styles are unified for consistency.

## 📄 License

This project is for personal/portfolio use. For commercial use or reuse, please contact the author.

---

<img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/user.svg" width="18" style="vertical-align:middle;"/> **Developed by Elanchezhiyan P**

[Portfolio](https://codebyelan.in)
