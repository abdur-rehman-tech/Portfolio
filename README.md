# Abdur Rehman — DevSecOps Engineer Portfolio

A modern, high-performance personal portfolio website built with **Nuxt 4**, **Vue 3**, **GSAP**, and custom cybersecurity-inspired design aesthetics.

---

## 🚀 Key Highlights & Architecture

- **Visual Theme**: Dark Navy (`#030712`) + Electric Blue (`#38bdf8`) + Cyan (`#06b6d4`) + Violet (`#8b5cf6`) accents with glassmorphism and subtle cyber-grid backgrounds.
- **Micro-Animations & Motion**:
  - Branded initial loader (`PageLoader.vue`) with orbital rings and monogram.
  - Interactive typewriter terminal (`AnimatedTerminal.vue`) displaying DevSecOps workflows.
  - Smooth hover states, glowing card borders, and smooth anchor scrolling.
- **CV-Verified Information**:
  - Roles at AIIT Solutions, Moiz Tech Hub, and SPS Inc.
  - 7 industry certifications (Microsoft Azure, TCS Cybersecurity, AWS Solutions Architecture, Python).
  - Degree: BS Information Technology from AIR University Islamabad.
  - Real project highlights (Cloud Security Hardening, Multi-Cloud K8s, Automated DevSecOps CI/CD, IaC Modular Framework).
- **SEO & Social Optimization**:
  - Pre-rendered static pages with OpenGraph, Twitter Cards, theme colors, and semantic HTML.
  - Brand favicons generated across multiple resolutions (16x16, 32x32, 180x180, 512x512, .ico).
  - Fast static delivery optimized for CDNs like Cloudflare Pages.

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Icons**: [lucide-vue-next](https://lucide.dev/)
- **Utilities & Motion**: [@vueuse/core](https://vueuse.org/), [@vueuse/motion](https://motion.vueuse.org/), [gsap](https://greensock.com/)
- **Styling**: Vanilla CSS Design System with custom properties, glassmorphism utilities, and keyframe animations.
- **Deployment Target**: Cloudflare Pages / Static Hosting

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Generate Static Build (Prerender)
```bash
npm run generate
```
Build output is saved to `.output/public`.

---

## ☁️ Cloudflare Pages Deployment

### Option A: Cloudflare Pages Git Integration (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete DevSecOps portfolio website"
   git remote add origin https://github.com/abdur-rehman-tech/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Nuxt` (or `None`)
   - **Build command**: `npm run generate`
   - **Build output directory**: `.output/public`
   - **Environment variables**:
     - `NODE_VERSION`: `20`
4. Click **Save and Deploy**.

### Option B: Direct Upload via Wrangler CLI
```bash
npm run generate
npx wrangler pages deploy .output/public --project-name=abdur-rehman-portfolio
```

---

## 📄 Assets & Downloads
- **Resume / CV**: Located in `/public/Abdur_Rehman_CV.pdf` and directly downloadable from the Hero & Navigation sections.
- **Profile Image**: Located in `/public/images/profile.png`.
- **Favicons**: Pre-generated and located in `/public/`.
