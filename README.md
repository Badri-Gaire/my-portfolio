# Badri Gaire - Portfolio

A modern, high-performance portfolio website built with **Astro**, **React**, and **Tailwind CSS**. Optimized for speed, local SEO, and seamless user experience.

## 🚀 Key Features

- **PWA Ready:** Progressive Web App support with offline caching and service worker integration.
- **Local SEO:** Targeted optimization for "Frontend Developer in Bhairahawa & Butwal" with proper `<h1>` hierarchy and metadata.
- **Advanced Performance:**
  - **Smart Prefetching:** Uses `hover` strategy to load pages only when users intend to click, saving massive bandwidth (down from 4.2MB to <1MB initial load).
  - **Optimal Hydration:** React components use `client:visible` to only load JavaScript when they enter the viewport.
  - **Astro Image Optimization:** High-quality, optimized images using `<Image />` component and Avif/WebP formats.
- **Analytics & Tracking:** Built-in integration for Google Analytics and Google Search Console.
- **Specialized Services:** Dedicated page for Technical Services including Ecommerce (Multi-tenant & Single-store) and performance consulting.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI Architecture:** [React](https://reactjs.org/) (Islands Architecture)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [Skill Icons](https://skillicons.dev/)

## 📁 Project Structure

```text
/
├── src/
│   ├── assets/       # Optimized images and styles
│   ├── components/   # Astro and React components
│   │   ├── features/ # Feature-specific logic (Home, Services)
│   │   └── ui/       # Shared UI components
│   ├── data/         # JSON/TS data files for easy content updates
│   ├── layouts/      # Base layouts for consistent structure
│   └── pages/        # File-based routing (proper URLs used)
├── public/           # Static assets (favicons, manifests)
└── astro.config.mjs  # Core project configuration
```

## 🌍 Deployment

Deployed using **Cloudflare Pages/Workers** for maximum speed and global distribution.

```sh
# Install dependencies
yarn install

# Start local development
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## ⚙️ Configuration

Centralized configuration is available in `src/utils/siteConfig.ts` and `src/data/`. Content updates for Experience, Projects, and Personal Info can be made directly in the `src/data/` folder.
