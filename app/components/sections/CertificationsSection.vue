<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const activeIdx = ref<number | null>(null)

// Certifications verified from CV only
const certifications = [
  {
    id: 'ms-aks-deploy',
    name: 'Deploy and Monitor Applications on Azure Kubernetes Service',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    color: '#00a1f1',
    icon: '☁️',
    category: 'Microsoft Azure',
  },
  {
    id: 'ms-aks-containers',
    name: 'Deploy Containers by Using Azure Kubernetes Service (AKS)',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    color: '#00a1f1',
    icon: '🐳',
    category: 'Microsoft Azure',
  },
  {
    id: 'ms-ai-security',
    name: 'Secure AI Solutions in the Cloud',
    issuer: 'Microsoft',
    date: 'Sep 2026',
    color: '#00a1f1',
    icon: '🔐',
    category: 'Microsoft Azure',
  },
  {
    id: 'tcs-cybersecurity',
    name: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata Consultancy Services (TCS) via Forage',
    date: 'Aug 2026',
    color: '#003087',
    icon: '🛡️',
    category: 'Cybersecurity',
  },
  {
    id: 'aws-sa',
    name: 'Solutions Architecture',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Jan 2026',
    color: '#ff9900',
    icon: '🏛️',
    category: 'Cloud — AWS',
  },
  {
    id: 'udemy-viz',
    name: 'Python-based Data Visualization',
    issuer: 'Udemy',
    date: 'Jan 2024',
    color: '#a435f0',
    icon: '📊',
    category: 'Programming',
  },
  {
    id: 'udemy-numpy',
    name: 'Python, NumPy & Pandas for Data Science',
    issuer: 'Udemy',
    date: 'Jan 2024',
    color: '#a435f0',
    icon: '🐍',
    category: 'Programming',
  },
]

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry.isIntersecting) { visible.value = true; stop() }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <section id="certifications" ref="sectionRef" class="section certs-section">
    <div class="certs-orb ambient-orb ambient-orb-blue" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Credentials</div>
        <h2 class="section-title">Certifications</h2>
        <p class="section-subtitle">
          Industry certifications earned through verified programs. Names, issuers, and dates are accurate to my CV.
        </p>
      </div>

      <div class="certs-grid">
        <div
          v-for="(cert, idx) in certifications"
          :key="cert.id"
          class="cert-card glass-card"
          :class="{ 'visible': visible, 'cert-expanded': activeIdx === idx }"
          :style="`--cert-color: ${cert.color}; transition-delay: ${idx * 0.07}s`"
          @mouseenter="activeIdx = idx"
          @mouseleave="activeIdx = null"
          @focus="activeIdx = idx"
          @blur="activeIdx = null"
          tabindex="0"
          :aria-label="`${cert.name} by ${cert.issuer}, ${cert.date}`"
        >
          <!-- Top line -->
          <div class="cert-topline" aria-hidden="true" />

          <div class="cert-inner">
            <!-- Icon + Category -->
            <div class="cert-header">
              <span class="cert-icon" aria-hidden="true">{{ cert.icon }}</span>
              <span class="cert-category text-mono" :style="`color: ${cert.color}`">{{ cert.category }}</span>
            </div>

            <!-- Name -->
            <h3 class="cert-name">{{ cert.name }}</h3>

            <!-- Footer -->
            <div class="cert-footer">
              <span class="cert-issuer">{{ cert.issuer }}</span>
              <span class="cert-date text-mono">{{ cert.date }}</span>
            </div>
          </div>

          <!-- Hover glow -->
          <div class="cert-glow" aria-hidden="true" />
        </div>
      </div>

      <!-- Note about credentials -->
      <p class="certs-note text-mono">
        🔖 Credential verification links are not shown as certificate IDs have not been provided. All certifications are real and self-reported from the CV.
      </p>
    </div>
  </section>
</template>

<style scoped>
.certs-section {
  position: relative;
  overflow: hidden;
}

.certs-orb {
  width: 450px;
  height: 450px;
  bottom: -100px;
  right: -100px;
  opacity: 0.07;
}

/* ===== GRID ===== */
.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

/* ===== CARD ===== */
.cert-card {
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s,
              box-shadow 0.3s;
  cursor: default;
  position: relative;
  outline: none;
}

.cert-card:focus-visible {
  outline: 2px solid var(--blue-electric);
  outline-offset: 2px;
}

.cert-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.cert-card:hover,
.cert-card.cert-expanded {
  border-color: color-mix(in srgb, var(--cert-color) 40%, transparent);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 24px color-mix(in srgb, var(--cert-color) 12%, transparent);
  transform: translateY(-3px);
}

/* Top colored line */
.cert-topline {
  height: 3px;
  background: linear-gradient(90deg, var(--cert-color), transparent);
  opacity: 0.8;
}

.cert-inner {
  padding: 20px;
  position: relative;
  z-index: 1;
}

/* Header */
.cert-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.cert-icon {
  font-size: 1.3rem;
  line-height: 1;
}

.cert-category {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

/* Name */
.cert-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 16px;
}

/* Footer */
.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}

.cert-issuer {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.cert-date {
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  padding: 3px 8px;
  border-radius: 5px;
  flex-shrink: 0;
}

/* Hover glow */
.cert-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--cert-color) 10%, transparent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.cert-card:hover .cert-glow,
.cert-card.cert-expanded .cert-glow {
  opacity: 1;
}

/* ===== NOTE ===== */
.certs-note {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 14px 20px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .certs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
