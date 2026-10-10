<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const { y } = useWindowScroll()
const mobileOpen = ref(false)
const activeSection = ref('hero')

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobile() {
  mobileOpen.value = false
}

function scrollToSection(href: string) {
  closeMobile()
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Active section detection via IntersectionObserver
let observers: IntersectionObserver[] = []

onMounted(() => {
  const sections = document.querySelectorAll('section[id]')
  sections.forEach(section => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.35 }
    )
    obs.observe(section)
    observers.push(obs)
  })
})

onUnmounted(() => {
  observers.forEach(obs => obs.disconnect())
})
</script>

<template>
  <header class="nav-header" :class="{ 'nav-scrolled': y > 60 }">
    <nav class="nav-inner container" role="navigation" aria-label="Main navigation">
      <!-- Logo / Monogram -->
      <a href="#hero" class="nav-logo" @click.prevent="scrollToSection('#hero')" aria-label="Back to top">
        <span class="logo-mark">AR</span>
        <span class="logo-name">Abdur Rehman</span>
      </a>

      <!-- Desktop nav links -->
      <ul class="nav-links" role="list">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="nav-link"
            :class="{ 'nav-link-active': activeSection === link.href.slice(1) }"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- CTA -->
      <a
        href="#contact"
        class="btn btn-primary nav-cta"
        @click.prevent="scrollToSection('#contact')"
      >
        Hire Me
      </a>

      <!-- Mobile hamburger -->
      <button
        id="mobile-menu-toggle"
        class="nav-hamburger"
        :class="{ 'is-open': mobileOpen }"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle mobile menu"
        @click="toggleMobile"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>

    <!-- Mobile nav panel -->
    <Transition name="mobile-nav">
      <div
        v-if="mobileOpen"
        id="mobile-nav"
        class="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <ul class="mobile-links" role="list">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="mobile-link"
              :class="{ 'mobile-link-active': activeSection === link.href.slice(1) }"
              @click.prevent="scrollToSection(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <a
          href="#contact"
          class="btn btn-primary mobile-cta"
          @click.prevent="scrollToSection('#contact')"
        >
          Hire Me
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ===== HEADER ===== */
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-header.nav-scrolled {
  background: rgba(3, 7, 18, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 32px;
}

/* ===== LOGO ===== */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-mark {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--blue-electric), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05em;
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  border-radius: 8px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(56, 189, 248, 0.08);
}

/* Fix: applying gradient text on a flex container + span */
.logo-mark span {
  background: linear-gradient(135deg, var(--blue-electric), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

/* ===== DESKTOP NAV LINKS ===== */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.25s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--blue-electric);
  border-radius: 2px;
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(56, 189, 248, 0.06);
}

.nav-link:hover::after,
.nav-link-active::after {
  width: 70%;
}

.nav-link-active {
  color: var(--blue-electric);
}

/* ===== CTA ===== */
.nav-cta {
  padding: 9px 20px;
  font-size: 0.85rem;
  flex-shrink: 0;
}

/* ===== HAMBURGER ===== */
.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: auto;
}

.nav-hamburger span {
  display: block;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.nav-hamburger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-hamburger.is-open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.nav-hamburger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ===== MOBILE NAV ===== */
.mobile-nav {
  background: rgba(6, 13, 30, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  padding: 24px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.mobile-link {
  display: block;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.mobile-link:hover,
.mobile-link-active {
  color: var(--blue-electric);
  background: rgba(56, 189, 248, 0.08);
}

.mobile-cta {
  width: 100%;
  justify-content: center;
  padding: 13px 24px;
}

/* ===== NAV TRANSITION ===== */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .nav-cta {
    display: none;
  }

  .nav-hamburger {
    display: flex;
  }
}
</style>
