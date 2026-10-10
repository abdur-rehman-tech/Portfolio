<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

// Projects drawn from CV and documented work at AIIT, Moiz Tech Hub, SPS Inc
const projects = [
  {
    id: 'cicd-security',
    title: 'Secure CI/CD Pipeline with DevSecOps Toolchain',
    description: 'Designed and implemented a fully secured CI/CD pipeline integrating SonarQube quality gates, Trivy image scanning, and Cosign image signing. The pipeline flags security vulnerabilities early, enforces code quality standards, and prevents tampered container images from reaching production.',
    category: 'DevSecOps',
    color: '#38bdf8',
    emoji: '🔐',
    tech: ['SonarQube', 'Trivy', 'Cosign', 'Jenkins', 'Docker', 'GitHub Actions'],
    highlights: [
      'Identified 645+ code improvement opportunities',
      'Flagged 15% of findings as security vulnerabilities',
      'Prevented Docker image tampering with Cosign signing'
    ],
    context: 'AIIT Solutions'
  },
  {
    id: 'container-hardening',
    title: 'Docker Container Hardening with Chainguard',
    description: 'Rebuilt production Docker images using Chainguard distroless base images, eliminating root privilege execution, reducing the attack surface, and enforcing strict CPU and memory resource limits across all containerized workloads.',
    category: 'Security',
    color: '#22d3ee',
    emoji: '🐳',
    tech: ['Docker', 'Chainguard', 'Kubernetes', 'Linux'],
    highlights: [
      'Eliminated root privilege execution in containers',
      'Reduced container attack surface significantly',
      'Enforced CPU/memory resource limits across workloads'
    ],
    context: 'AIIT Solutions'
  },
  {
    id: 'vpc-security',
    title: 'VPC Network Security with IDS/IPS',
    description: 'Secured an unsecured internal VPC by deploying VPN access for remote employees and implementing network intrusion detection using Suricata and Zeek across 8 servers, enabling real-time detection of anomalous network activity.',
    category: 'Network Security',
    color: '#818cf8',
    emoji: '🛡️',
    tech: ['VPN', 'Suricata', 'Zeek', 'AWS VPC', 'Linux', 'Active Directory'],
    highlights: [
      'Monitored network traffic across 8 servers',
      'Deployed VPN for secure remote employee access',
      'Configured AD with RBAC for least-privilege access'
    ],
    context: 'AIIT Solutions'
  },
  {
    id: 'k8s-migration',
    title: 'AWS Migration & Kubernetes Deployment',
    description: 'Led a zero-downtime migration from cPanel hosting to AWS Lightsail in under 24 hours, then containerized the full-stack application with Docker and deployed production Kubernetes workloads with Helm, HPA, and VPA for scalability.',
    category: 'Cloud & DevOps',
    color: '#f59e0b',
    emoji: '☁️',
    tech: ['AWS Lightsail', 'Docker', 'Kubernetes', 'Helm', 'HPA', 'VPA'],
    highlights: [
      'Zero-downtime migration completed in 1 day',
      'Reduced application issues to 5% post-containerization',
      'Production-grade Kubernetes workloads with auto-scaling'
    ],
    context: 'Moiz Tech Hub'
  },
  {
    id: 'observability',
    title: 'Full Observability Stack (Prometheus, Grafana, Loki)',
    description: 'Implemented comprehensive monitoring and logging for containerized applications using Prometheus for metrics, Grafana for visualization, and Loki for centralized log aggregation — enabling real-time performance tuning and restricted developer server access.',
    category: 'Monitoring',
    color: '#e879f9',
    emoji: '📊',
    tech: ['Prometheus', 'Grafana', 'Loki', 'Kubernetes', 'GCP', 'AWS'],
    highlights: [
      'Real-time performance monitoring across clusters',
      'Centralized log aggregation with Loki + Grafana',
      'Managed GCP and AWS environments for external clients'
    ],
    context: 'Moiz Tech Hub'
  },
  {
    id: 'azure-iac',
    title: 'Azure Infrastructure as Code',
    description: 'Engineered cloud infrastructure on Microsoft Azure using IaC principles — including VM deployment, VPN gateway setup, and App Service configuration — alongside IBM Cloud container deployments using IBM Kubernetes Service (IKS).',
    category: 'IaC',
    color: '#34d399',
    emoji: '🏗️',
    tech: ['Terraform', 'Azure', 'Azure VM', 'IBM Cloud', 'IKS', 'kubectl'],
    highlights: [
      'Automated Azure VM, VPN, and App Service provisioning',
      'Deployed containerized apps on IBM Cloud IKS',
      'Jenkins + Docker + K8s CI/CD pipeline architecture'
    ],
    context: 'SPS Inc'
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
  <section id="projects" ref="sectionRef" class="section projects-section">
    <div class="projects-orb ambient-orb ambient-orb-blue" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Portfolio</div>
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">
          Selected engineering work from professional roles — all details verified against real deliverables.
        </p>
      </div>

      <div class="projects-grid">
        <article
          v-for="(project, idx) in projects"
          :key="project.id"
          class="project-card glass-card"
          :class="{ 'visible': visible }"
          :style="`--proj-color: ${project.color}; transition-delay: ${idx * 0.08}s`"
        >
          <!-- Top stripe -->
          <div class="proj-stripe" aria-hidden="true" />

          <!-- Header -->
          <div class="proj-header">
            <span class="proj-emoji" aria-hidden="true">{{ project.emoji }}</span>
            <div class="proj-meta">
              <span class="proj-category" :style="`color: ${project.color}; border-color: ${project.color}30`">
                {{ project.category }}
              </span>
              <span class="proj-context text-mono">@ {{ project.context }}</span>
            </div>
          </div>

          <!-- Title + Description -->
          <h3 class="proj-title">{{ project.title }}</h3>
          <p class="proj-description">{{ project.description }}</p>

          <!-- Highlights -->
          <ul class="proj-highlights">
            <li v-for="h in project.highlights" :key="h" class="proj-highlight">
              <span class="highlight-dot" :style="`background: ${project.color}`" aria-hidden="true" />
              {{ h }}
            </li>
          </ul>

          <!-- Tech stack -->
          <div class="proj-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
        </article>
      </div>

      <!-- Note about project links -->
      <p class="projects-note text-mono">
        💡 GitHub links will be added as repositories are made public. All projects are based on real professional work.
      </p>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  overflow: hidden;
}

.projects-orb {
  width: 500px;
  height: 500px;
  top: 0;
  right: -150px;
  opacity: 0.07;
}

/* ===== GRID ===== */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

/* ===== CARD ===== */
.project-card {
  padding: 0;
  border-radius: 16px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s,
              box-shadow 0.3s,
              background 0.3s;
  display: flex;
  flex-direction: column;
}

.project-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  border-color: color-mix(in srgb, var(--proj-color) 35%, transparent);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px color-mix(in srgb, var(--proj-color) 10%, transparent);
  transform: translateY(-4px);
}

/* Stripe */
.proj-stripe {
  height: 3px;
  background: linear-gradient(90deg, var(--proj-color), transparent);
  opacity: 0.8;
}

/* Card inner */
.proj-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px 24px 0;
  margin-bottom: 12px;
}

.proj-emoji {
  font-size: 1.75rem;
  line-height: 1;
}

.proj-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.proj-category {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid;
  padding: 2px 10px;
  border-radius: 100px;
  font-family: var(--font-mono);
}

.proj-context {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.proj-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
  padding: 0 24px;
  margin-bottom: 10px;
}

.proj-description {
  font-size: 0.845rem;
  color: var(--text-secondary);
  line-height: 1.7;
  padding: 0 24px;
  margin-bottom: 16px;
}

/* Highlights */
.proj-highlights {
  list-style: none;
  padding: 0 24px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.proj-highlight {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.highlight-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
  opacity: 0.8;
}

/* Tech */
.proj-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 24px 24px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

/* ===== NOTE ===== */
.projects-note {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-muted);
  padding: 16px 24px;
  background: rgba(56, 189, 248, 0.04);
  border: 1px solid var(--border);
  border-radius: 10px;
  max-width: 580px;
  margin: 0 auto;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
