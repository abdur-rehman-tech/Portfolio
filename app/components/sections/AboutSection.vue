<script setup lang="ts">
import { onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const textVisible = ref(false)
const imageVisible = ref(false)

const qualities = [
  {
    icon: '🛡️',
    title: 'Security-First Mindset',
    desc: 'Security is embedded throughout every pipeline, not bolted on at the end. Threat modeling and vulnerability assessment are integral to every project.'
  },
  {
    icon: '⚡',
    title: 'Automation Enthusiast',
    desc: 'Manual processes are technical debt. I automate infrastructure provisioning, testing, and deployments to reduce errors and accelerate delivery.'
  },
  {
    icon: '📈',
    title: 'Continuous Learner',
    desc: 'Cloud technology evolves fast. I actively pursue certifications, hands-on labs, and real-world projects to stay ahead of the curve.'
  },
  {
    icon: '🤝',
    title: 'Team Collaborator',
    desc: 'DevSecOps is a team discipline. I communicate across development, operations, and security teams to align goals and deliver resilient systems.'
  },
]

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => { imageVisible.value = true }, 100)
      setTimeout(() => { textVisible.value = true }, 200)
      stop()
    }
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section id="about" ref="sectionRef" class="section about-section">
    <!-- Ambient glow -->
    <div class="about-orb ambient-orb ambient-orb-blue" aria-hidden="true" />

    <div class="container">
      <div class="about-grid">
        <!-- Portrait side -->
        <div class="about-image-col" :class="{ 'reveal-left visible': imageVisible, 'reveal-left': !imageVisible }">
          <div class="about-portrait-wrap">
            <div class="about-portrait-border" aria-hidden="true" />
            <div class="about-portrait-frame">
              <img
                src="/images/profile.png"
                alt="Abdur Rehman — DevSecOps Engineer"
                class="about-portrait-img"
                width="340"
                height="420"
                loading="lazy"
              />
            </div>
            <!-- Stats overlay -->
            <div class="about-stats">
              <div class="about-stat">
                <span class="stat-number gradient-text">3+</span>
                <span class="stat-label">Internships &<br>Roles</span>
              </div>
              <div class="stat-divider" />
              <div class="about-stat">
                <span class="stat-number gradient-text">5+</span>
                <span class="stat-label">Certifications<br>Earned</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content side -->
        <div class="about-content" :class="{ 'reveal-right visible': textVisible, 'reveal-right': !textVisible }">
          <!-- Section header inline -->
          <div class="section-eyebrow">About Me</div>
          <h2 class="section-title" style="text-align: left; margin-bottom: 20px;">
            A DevSecOps Engineer<br />
            <span class="gradient-text">passionate about secure systems</span>
          </h2>

          <div class="about-accent-line" aria-hidden="true" />

          <p class="about-text">
            I'm <strong>Abdur Rehman</strong>, a DevSecOps Engineer with strong expertise in cloud security,
            penetration testing, and secure CI/CD pipeline design. I specialize in embedding security
            throughout the software development lifecycle — from threat modeling and vulnerability
            assessment to automated security testing and remediation.
          </p>
          <p class="about-text">
            Hands-on with Linux systems, I work across cloud infrastructure, containerized applications,
            and network security. My approach combines the rigor of a security engineer with the
            automation mindset of a DevOps practitioner — delivering resilient, compliant systems
            that scale with confidence.
          </p>

          <!-- Interest tags -->
          <div class="about-interests">
            <span class="tech-tag">Cloud Infrastructure</span>
            <span class="tech-tag">CI/CD Security</span>
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">Container Security</span>
            <span class="tech-tag">IaC (Terraform/Ansible)</span>
            <span class="tech-tag">Monitoring</span>
            <span class="tech-tag">Penetration Testing</span>
            <span class="tech-tag">Linux</span>
          </div>

          <!-- Qualities grid -->
          <div class="about-qualities">
            <div
              v-for="q in qualities"
              :key="q.title"
              class="quality-card glass-card"
            >
              <span class="quality-icon" aria-hidden="true">{{ q.icon }}</span>
              <div>
                <h3 class="quality-title">{{ q.title }}</h3>
                <p class="quality-desc">{{ q.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  overflow: hidden;
}

.about-orb {
  width: 500px;
  height: 500px;
  top: 50%;
  left: -200px;
  opacity: 0.07;
}

/* ===== GRID ===== */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 80px;
  align-items: start;
}

/* ===== IMAGE COLUMN ===== */
.about-image-col {
  position: sticky;
  top: 100px;
}

.about-portrait-wrap {
  position: relative;
}

.about-portrait-border {
  position: absolute;
  inset: -12px;
  border: 1px solid var(--border);
  border-radius: 32px;
  pointer-events: none;
}

.about-portrait-frame {
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid var(--border-hover);
  background: var(--bg-mid);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), var(--glow-blue);
  position: relative;
}

.about-portrait-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
  display: block;
  aspect-ratio: 4/5;
}

/* Stats overlay */
.about-stats {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(6, 13, 30, 0.95);
  border: 1px solid var(--border-hover);
  border-radius: 14px;
  padding: 14px 24px;
  backdrop-filter: blur(16px);
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.about-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-align: center;
  line-height: 1.4;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border);
}

/* ===== CONTENT COLUMN ===== */
.about-accent-line {
  width: 48px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--blue-electric), var(--cyan));
  margin-bottom: 24px;
  animation: shimmer 3s infinite linear;
  background-size: 200%;
}

.about-text {
  font-size: 0.97rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}

.about-text strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* ===== INTERESTS ===== */
.about-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 24px 0 32px;
}

/* ===== QUALITIES ===== */
.about-qualities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.quality-card {
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  border-radius: 12px;
}

.quality-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.quality-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.quality-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .about-image-col {
    position: static;
    max-width: 340px;
    margin: 0 auto;
  }

  .section-title {
    text-align: left;
  }

  .about-qualities {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-qualities {
    grid-template-columns: 1fr;
  }
}
</style>
