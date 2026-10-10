<script setup lang="ts">
const year = new Date().getFullYear()

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/abdur-rehman-tech',
    icon: 'github'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhamad-abdur-rehman-81777b366/',
    icon: 'linkedin'
  },
  {
    label: 'Email',
    href: 'mailto:abdurrehmann54@gmail.com',
    icon: 'mail'
  }
]

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <footer class="footer">
    <div class="footer-glow" />
    <div class="container">
      <div class="footer-grid">
        <!-- Brand column -->
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="footer-logo-mark">AR</span>
            <span class="footer-logo-name">Abdur Rehman</span>
          </div>
          <p class="footer-tagline">DevSecOps Engineer</p>
          <p class="footer-description">
            Building secure, automated, and scalable infrastructure for the modern cloud.
          </p>
          <a href="mailto:abdurrehmann54@gmail.com" class="footer-email">
            abdurrehmann54@gmail.com
          </a>
        </div>

        <!-- Quick links -->
        <div class="footer-links-col">
          <h3 class="footer-col-title">Navigation</h3>
          <ul class="footer-links-list">
            <li v-for="link in quickLinks" :key="link.href">
              <a :href="link.href" class="footer-link" @click.prevent="scrollToSection(link.href)">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="footer-connect-col">
          <h3 class="footer-col-title">Connect</h3>
          <div class="footer-socials">
            <a
              v-for="s in socialLinks"
              :key="s.label"
              :href="s.href"
              class="footer-social"
              :aria-label="s.label"
              target="_blank"
              rel="noopener noreferrer"
            >
              <!-- GitHub icon -->
              <svg v-if="s.icon === 'github'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <!-- LinkedIn icon -->
              <svg v-else-if="s.icon === 'linkedin'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <!-- Mail icon -->
              <svg v-else-if="s.icon === 'mail'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{{ s.label }}</span>
            </a>
          </div>
          <p class="footer-location">
            📍 Islamabad, Pakistan
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">
          © {{ year }} Abdur Rehman. All rights reserved.
        </p>
        <p class="footer-built text-mono">
          Built with Nuxt 4 &amp; deployed on Cloudflare Pages
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  border-top: 1px solid var(--border);
  padding: 64px 0 32px;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--blue-electric), var(--cyan), transparent);
  opacity: 0.5;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
}

/* ===== BRAND ===== */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.footer-logo-mark {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--blue-electric), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: 1.5px solid rgba(56, 189, 248, 0.3);
  border-radius: 7px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(56, 189, 248, 0.07);
}

.footer-logo-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-tagline {
  font-size: 0.8rem;
  color: var(--blue-electric);
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.footer-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
  max-width: 280px;
}

.footer-email {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-email:hover {
  color: var(--blue-electric);
}

/* ===== COLUMNS ===== */
.footer-col-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.footer-links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--blue-electric);
}

/* ===== SOCIALS ===== */
.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-social:hover {
  color: var(--blue-electric);
}

.footer-location {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* ===== BOTTOM ===== */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-copy {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.footer-built {
  font-size: 0.72rem;
  color: var(--text-muted);
  opacity: 0.7;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-description {
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
