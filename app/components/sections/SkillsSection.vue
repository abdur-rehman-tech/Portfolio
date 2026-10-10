<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// All skills verified from CV
const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: '☁️',
    color: '#ff9900',
    skills: ['AWS', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'IBM Cloud']
  },
  {
    title: 'Containers & Orchestration',
    icon: '🐳',
    color: '#2496ed',
    skills: ['Docker', 'Kubernetes', 'Helm', 'kubectl', 'AKS', 'IKS', 'EKS']
  },
  {
    title: 'CI/CD & GitOps',
    icon: '⚙️',
    color: '#38bdf8',
    skills: ['Jenkins', 'ArgoCD', 'GitHub Actions', 'GitLab CI/CD', 'Git', 'GitHub']
  },
  {
    title: 'Infrastructure as Code',
    icon: '🏗️',
    color: '#7b42bc',
    skills: ['Terraform', 'Ansible', 'Bash Scripting', 'Python']
  },
  {
    title: 'DevSecOps & App Security',
    icon: '🛡️',
    color: '#22d3ee',
    skills: ['SonarQube', 'Trivy', 'Cosign', 'Chainguard Images', 'SAST', 'Container Security', 'Image Signing', 'Vulnerability Management', 'Threat Modeling']
  },
  {
    title: 'Monitoring & Observability',
    icon: '📊',
    color: '#f59e0b',
    skills: ['Prometheus', 'Grafana', 'Loki', 'Suricata', 'Zeek']
  },
  {
    title: 'Cloud & Network Security',
    icon: '🔒',
    color: '#6366f1',
    skills: ['Cloud Security', 'IAM', 'VPN Configuration', 'Active Directory', 'RBAC']
  },
  {
    title: 'Penetration Testing',
    icon: '🔍',
    color: '#ef4444',
    skills: ['Penetration Testing', 'Vulnerability Assessment', 'Nmap', 'Burp Suite', 'Metasploit', 'Kali Linux']
  },
  {
    title: 'OS & Infrastructure',
    icon: '🖥️',
    color: '#fcc624',
    skills: ['Linux Server Administration', 'On-Premises Server Setup', 'Windows Server']
  },
]

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      stop()
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <section id="skills" ref="sectionRef" class="section skills-section">
    <div class="skills-orb ambient-orb ambient-orb-cyan" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Expertise</div>
        <h2 class="section-title">Skills & Technologies</h2>
        <p class="section-subtitle">
          A categorized overview of the tools and platforms I work with, verified from my professional experience.
        </p>
      </div>

      <div class="skills-grid">
        <div
          v-for="(category, idx) in skillCategories"
          :key="category.title"
          class="skill-category glass-card"
          :class="{ 'visible': visible }"
          :style="`--cat-color: ${category.color}; transition-delay: ${idx * 0.06}s`"
        >
          <!-- Header -->
          <div class="cat-header">
            <span class="cat-icon" aria-hidden="true">{{ category.icon }}</span>
            <h3 class="cat-title">{{ category.title }}</h3>
          </div>

          <!-- Skills -->
          <div class="cat-skills">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="skill-pill"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  position: relative;
  overflow: hidden;
}

.skills-orb {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  opacity: 0.06;
}

/* ===== GRID ===== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* ===== CATEGORY CARD ===== */
.skill-category {
  padding: 24px;
  border-radius: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s,
              box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.skill-category::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cat-color), transparent);
  opacity: 0.7;
}

.skill-category.visible {
  opacity: 1;
  transform: translateY(0);
}

.skill-category:hover {
  border-color: color-mix(in srgb, var(--cat-color) 35%, transparent);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px color-mix(in srgb, var(--cat-color) 10%, transparent);
}

/* ===== HEADER ===== */
.cat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.cat-icon {
  font-size: 1.3rem;
}

.cat-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

/* ===== SKILLS ===== */
.cat-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-pill {
  display: inline-block;
  padding: 4px 11px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  transition: all 0.2s ease;
  cursor: default;
}

.skill-pill:hover {
  background: color-mix(in srgb, var(--cat-color) 12%, transparent);
  border-color: color-mix(in srgb, var(--cat-color) 40%, transparent);
  color: var(--text-primary);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
