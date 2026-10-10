<script setup lang="ts">
import { ref, onMounted } from 'vue'

const terminalLines = [
  'trivy image --severity HIGH,CRITICAL myapp:latest',
  'sonarqube-scanner -Dsonar.projectKey=myapp',
  'kubectl apply -f k8s/deployments/ --namespace=prod',
  'terraform plan -var-file=prod.tfvars -out=tfplan',
  'ansible-playbook -i inventory/prod site.yml --check',
  'cosign sign --key cosign.key myrepo/myapp:v1.2.3',
  'argocd app sync myapp --prune --force',
  'helm upgrade --install myapp charts/myapp -n prod',
]

const badges = [
  { label: 'AWS', color: '#ff9900' },
  { label: 'Kubernetes', color: '#326ce5' },
  { label: 'Terraform', color: '#7b42bc' },
  { label: 'Docker', color: '#2496ed' },
  { label: 'DevSecOps', color: '#38bdf8' },
  { label: 'Linux', color: '#fcc624' },
]

const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})
</script>

<template>
  <section id="hero" class="hero-section">
    <!-- Grid background -->
    <div class="bg-grid" aria-hidden="true" />

    <!-- Ambient glows -->
    <div class="ambient-orb ambient-orb-blue hero-orb-1" aria-hidden="true" />
    <div class="ambient-orb ambient-orb-cyan hero-orb-2" aria-hidden="true" />
    <div class="ambient-orb ambient-orb-violet hero-orb-3" aria-hidden="true" />

    <div class="container hero-container">
      <!-- LEFT COLUMN: Text content -->
      <div class="hero-content" :class="{ 'hero-visible': visible }">
        <div class="hero-eyebrow text-mono">
          <span class="eyebrow-dot" aria-hidden="true" />
          <span>DevSecOps Engineer</span>
          <span class="eyebrow-location">📍 Islamabad, Pakistan</span>
        </div>

        <h1 class="hero-title">
          <span class="title-greeting">Hi, I'm</span>
          <span class="title-name gradient-text">Abdur Rehman.</span>
        </h1>

        <p class="hero-headline">
          Building <em>secure</em>, automated, and scalable<br class="desktop-br" />
          infrastructure for the modern cloud.
        </p>

        <!-- Value proposition chips -->
        <div class="hero-value-props">
          <span class="value-chip">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secure
          </span>
          <span class="value-chip">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Automate
          </span>
          <span class="value-chip">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Deploy
          </span>
        </div>

        <!-- Skill badges -->
        <div class="hero-badges">
          <span
            v-for="badge in badges"
            :key="badge.label"
            class="hero-badge"
            :style="`--badge-color: ${badge.color}`"
          >
            <span class="badge-dot" :style="`background: ${badge.color}`" />
            {{ badge.label }}
          </span>
        </div>

        <!-- CTA buttons -->
        <div class="hero-ctas">
          <a href="#contact" class="btn btn-primary" @click.prevent="$el.querySelector('#contact') || document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Get in Touch
          </a>
          <a href="/Abdur_Rehman_CV.pdf" class="btn btn-outline" download="Abdur_Rehman_CV.pdf">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Download CV
          </a>
        </div>

        <!-- Animated terminal -->
        <AnimatedTerminal :lines="terminalLines" class="hero-terminal" />
      </div>

      <!-- RIGHT COLUMN: Portrait + orbitals -->
      <div class="hero-portrait-wrap" :class="{ 'hero-visible': visible }">
        <div class="portrait-container">
          <!-- Outer orbital ring -->
          <div class="orbital-ring ring-1" aria-hidden="true">
            <span class="orbital-dot dot-blue" />
          </div>
          <!-- Middle ring -->
          <div class="orbital-ring ring-2" aria-hidden="true">
            <span class="orbital-dot dot-cyan" />
          </div>
          <!-- Inner ring -->
          <div class="orbital-ring ring-3" aria-hidden="true">
            <span class="orbital-dot dot-violet" />
          </div>

          <!-- Portrait image -->
          <div class="portrait-frame portrait-float">
            <img
              src="/images/profile.png"
              alt="Abdur Rehman — DevSecOps Engineer"
              class="portrait-img"
              width="320"
              height="380"
              loading="eager"
            />
          </div>

          <!-- Floating tech badges around portrait -->
          <div class="float-badge float-badge-tl" aria-hidden="true">
            <span class="float-badge-icon">🔒</span>
            <span>Security</span>
          </div>
          <div class="float-badge float-badge-tr" aria-hidden="true">
            <span class="float-badge-icon">☁️</span>
            <span>Cloud</span>
          </div>
          <div class="float-badge float-badge-br" aria-hidden="true">
            <span class="float-badge-icon">⚙️</span>
            <span>DevOps</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom scroll indicator -->
    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-line" />
      <span class="text-mono">scroll</span>
    </div>
  </section>
</template>

<style scoped>
/* ===== HERO SECTION ===== */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0 80px;
}

/* Ambient orbs */
.hero-orb-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
  opacity: 0.12;
}

.hero-orb-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -50px;
  opacity: 0.08;
}

.hero-orb-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 30%;
  opacity: 0.05;
}

/* ===== CONTAINER ===== */
.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* ===== ANIMATIONS ===== */
.hero-content {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-portrait-wrap {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
}

.hero-content.hero-visible,
.hero-portrait-wrap.hero-visible {
  opacity: 1;
  transform: translateX(0);
}

/* ===== EYEBROW ===== */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--blue-electric);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--blue-electric);
  flex-shrink: 0;
  animation: pulse-ring 2s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
}

.eyebrow-location {
  font-size: 0.72rem;
  color: var(--text-muted);
  border-left: 1px solid var(--border);
  padding-left: 10px;
  letter-spacing: 0.05em;
}

/* ===== TITLE ===== */
.hero-title {
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-greeting {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.5em;
  letter-spacing: 0.02em;
}

/* ===== HEADLINE ===== */
.hero-headline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 28px;
  max-width: 480px;
}

.hero-headline em {
  color: var(--blue-electric);
  font-style: normal;
  font-weight: 600;
}

.desktop-br { display: none; }
@media (min-width: 1024px) { .desktop-br { display: inline; } }

/* ===== VALUE PROPS ===== */
.hero-value-props {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.value-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: var(--blue-electric);
  transition: all 0.2s ease;
}

.value-chip:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
}

/* ===== SKILL BADGES ===== */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.hero-badge:hover {
  background: rgba(var(--badge-color), 0.1);
  border-color: color-mix(in srgb, var(--badge-color) 40%, transparent);
  color: var(--text-primary);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ===== CTAs ===== */
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

/* ===== TERMINAL ===== */
.hero-terminal {
  max-width: 480px;
}

/* ===== PORTRAIT ===== */
.portrait-container {
  position: relative;
  width: 380px;
  height: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbital-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  pointer-events: none;
}

.ring-1 {
  width: 380px;
  height: 380px;
  border-color: rgba(56, 189, 248, 0.15);
  border-top-color: rgba(56, 189, 248, 0.5);
  animation: orbit-cw 12s linear infinite;
}

.ring-2 {
  width: 310px;
  height: 310px;
  border-color: rgba(34, 211, 238, 0.1);
  border-bottom-color: rgba(34, 211, 238, 0.4);
  animation: orbit-ccw 9s linear infinite;
}

.ring-3 {
  width: 250px;
  height: 250px;
  border-color: rgba(129, 140, 248, 0.08);
  border-right-color: rgba(129, 140, 248, 0.35);
  animation: orbit-cw 7s linear infinite;
}

.orbital-dot {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

.dot-blue  { background: var(--blue-electric); color: var(--blue-electric); }
.dot-cyan  { background: var(--cyan); color: var(--cyan); }
.dot-violet { background: var(--violet); color: var(--violet); }

/* ===== PORTRAIT FRAME ===== */
.portrait-frame {
  position: relative;
  z-index: 2;
  width: 280px;
  height: 340px;
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid rgba(56, 189, 248, 0.25);
  box-shadow: 0 0 40px rgba(56, 189, 248, 0.12), 0 20px 60px rgba(0, 0, 0, 0.5);
  background: var(--bg-mid);
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ===== FLOAT BADGES ===== */
.float-badge {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(10, 22, 40, 0.9);
  border: 1px solid var(--border-hover);
  color: var(--text-primary);
  backdrop-filter: blur(12px);
  white-space: nowrap;
  animation: float 5s ease-in-out infinite;
}

.float-badge-tl {
  top: 40px;
  left: -20px;
  animation-delay: 0s;
}

.float-badge-tr {
  top: 30px;
  right: -10px;
  animation-delay: 1.5s;
}

.float-badge-br {
  bottom: 60px;
  right: -20px;
  animation-delay: 0.8s;
}

.float-badge-icon {
  font-size: 0.9rem;
}

/* ===== SCROLL INDICATOR ===== */
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--blue-electric), transparent);
  animation: float 2s ease-in-out infinite;
}

.scroll-indicator span {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: 20px;
  }

  .hero-portrait-wrap {
    order: -1;
    transform: translateX(0);
  }

  .portrait-container {
    width: 300px;
    height: 380px;
  }

  .portrait-frame {
    width: 220px;
    height: 270px;
  }

  .ring-1 { width: 300px; height: 300px; }
  .ring-2 { width: 240px; height: 240px; }
  .ring-3 { width: 190px; height: 190px; }

  .float-badge {
    display: none;
  }

  .hero-terminal {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 120px;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .hero-ctas .btn {
    justify-content: center;
    text-align: center;
  }
}
</style>
