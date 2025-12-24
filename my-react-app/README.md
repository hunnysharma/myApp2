# Ema Knowledge Insights Landing Page

A production-ready, modern landing page built with React, featuring GSAP animations, Lottie animations, scroll-triggered interactions, and Sanity CMS integration.

## Features

- **Hero Section** with Lottie animation
- **Scroll Sections** with 4 interactive cards and Lottie animations
- **Interactive Card Section** with Before/After toggle
- **Sticky Horizontal Scroll** section with scroll-based card animations
- **Stacked Cards Section** with GSAP scroll-triggered stacking animation
- **CTA Section** with customizable content
- **Footer** with CMS-driven content
- **Sanity CMS Integration** for all content management
- **Fully Responsive** design (mobile-first, 768px breakpoint)
- **Performance Optimized** (React.memo, useMemo, useCallback)
- **Production Ready** (no console.logs, no comments)

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **GSAP** - Advanced scroll animations with ScrollTrigger
- **Lottie React** - Animation library
- **Sanity CMS** - Headless CMS for content management
- **React Intersection Observer** - Scroll detection

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=your-token
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
my-react-app/
├── public/
│   ├── assets/
│   │   └── lottie/          # Lottie animation JSON files
│   └── fonts/               # Font files (if using local fonts)
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── LottieAnimation.jsx
│   ├── sections/            # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── ScrollSections.jsx
│   │   ├── InteractiveCardSection.jsx
│   │   ├── StickyHorizontalScroll.jsx
│   │   ├── StackedCardsSection.jsx
│   │   └── CTASection.jsx
│   ├── services/
│   │   └── cms.js          # Sanity CMS integration
│   ├── lib/
│   │   └── sanity.js      # Sanity client configuration
│   ├── fonts.css           # Font imports
│   ├── App.jsx
│   └── main.jsx
└── take-home-ema/          # Sanity Studio configuration
    └── schemaTypes/        # Sanity schemas
```

## Sanity CMS Setup

This project uses Sanity CMS for content management. The Sanity Studio is located in the `take-home-ema` directory.

### Running Sanity Studio

```bash
cd take-home-ema
npm install
npm run dev
```

The studio will be available at `http://localhost:3333`

### Available Schemas

- `heroSection` - Hero section content
- `scrollSection` - Scroll sections with cards
- `interactiveCardSection` - Interactive card content
- `stickyHorizontalScroll` - Horizontal scroll cards
- `stackedCardsSection` - Stacked cards content
- `ctaSection` - CTA section content
- `footer` - Footer content
- `header` - Header navigation

## Git Setup & Deployment

### Initial Git Setup

1. Configure Git:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

2. Initialize repository:
```bash
git init
git add .
git commit -m "Initial commit: Production-ready React app"
```

3. Add remote and push:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Authentication

**Option A: HTTPS with Personal Access Token**
1. Create token at: https://github.com/settings/tokens
2. Use token as password when pushing

**Option B: SSH Keys**
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add to GitHub → Settings → SSH keys
git remote set-url origin git@github.com:username/repo.git
```

## Deployment

### Environment Variables

Set these in your deployment platform:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_TOKEN=your-token
```

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

## Fonts

The project uses **Satoshi** font family loaded via FontShare CDN. The font is automatically loaded in `fonts.css`.

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet/Desktop**: ≥ 768px
- **Large Desktop**: ≥ 1024px

## Performance Optimizations

- React.memo for component memoization
- useMemo for expensive computations
- useCallback for event handlers
- Throttled resize handlers
- Lazy loading for images and animations
- Optimized GSAP ScrollTrigger configurations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Ema.
