<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const lineProgress = ref(0)

// All data verified against CV
const experiences = [
  {
    id: 'aiit',
    role: 'DevSecOps Engineer',
    org: 'AIIT Solutions',
    location: 'Rawalpindi',
    period: 'Mar 2026 — Present',
    type: 'Full-time',
    color: '#38bdf8',
    summary: 'Securing CI/CD pipelines, hardening containerized applications, and managing cloud infrastructure at an enterprise scale.',
    responsibilities: [
      'Secured CI/CD pipeline by implementing SonarQube quality gates, Trivy vulnerability scanning, and Cosign image signing to prevent Docker image tampering; identified 645 code improvements and flagged 15% of findings as security vulnerabilities.',
      'Hardened containerized AIIT application by rebuilding Docker images on Chainguard base images, eliminating root privilege execution and enforcing CPU/memory resource limits.',
      'Protected an unsecured internal VPC by deploying a VPN for remote employees and monitoring network traffic with Suricata and Zeek across 8 servers, enabling detection of anomalous activity.',
      'Configured Active Directory (AD) with role-based access controls to restrict external company users from accessing AIIT internal servers, enforcing least privilege access.',
      'Managed product release cycles and automated deployments on AWS, ensuring smooth, low-downtime transitions between versions.',
    ],
    tech: ['SonarQube', 'Trivy', 'Cosign', 'Chainguard', 'AWS', 'Suricata', 'Zeek', 'Active Directory', 'Docker'],
  },
  {
    id: 'moiz',
    role: 'DevOps Engineer',
    org: 'Moiz Tech Hub',
    location: 'Islamabad',
    period: 'Oct 2025 — Mar 2026',
    type: 'Full-time',
    color: '#22d3ee',
    summary: 'Led cloud migration, containerization, and Kubernetes orchestration, establishing observability practices and managing GCP environments.',
    responsibilities: [
      'Migrated the application from cPanel hosting to AWS Lightsail in 1 day with zero downtime.',
      'Containerized the full stack application using Docker, reducing application issues to 5%.',
      'Deployed applications on Kubernetes using production-ready workloads — Deployments, StatefulSets, Services, Ingress Controllers, HPA, and VPA — ensuring scalability and high availability.',
      'Developed Helm charts to standardize deployments and enable repeatable, consistent releases across environments.',
      'Implemented monitoring and observability with Prometheus and Grafana for real-time performance tuning; used Loki with Grafana for centralized log monitoring.',
      'Managed Google Cloud Platform (GCP) infrastructure and deployments for external clients.',
    ],
    tech: ['AWS Lightsail', 'Docker', 'Kubernetes', 'Helm', 'Prometheus', 'Grafana', 'Loki', 'GCP', 'kubectl'],
  },
  {
    id: 'sps',
    role: 'DevOps Intern',
    org: 'SPS Inc',
    location: 'Islamabad',
    period: 'Jun 2025 — Sep 2025',
    type: 'Internship',
    color: '#818cf8',
    summary: 'Built CI/CD pipelines, deployed containerized workloads on Kubernetes, and engineered Azure cloud infrastructure as an intern.',
    responsibilities: [
      'Architected and implemented CI/CD pipelines using Jenkins, Docker, and Kubernetes to enable scalable, automated application deployments.',
      'Deployed a containerized application on Kubernetes using Deployments, Services, and Ingress, ensuring high availability and production readiness.',
      'Integrated Prometheus and Grafana for monitoring and logging within a Kubernetes environment, enhancing operational visibility.',
      'Deployed containerized applications on IBM Cloud using IBM Kubernetes Service (IKS) and managed clusters with kubectl.',
      'Engineered infrastructure as code on Microsoft Azure, including VM deployment, VPN setup, and App Service configuration.',
    ],
    tech: ['Jenkins', 'Docker', 'Kubernetes', 'IBM Cloud', 'IKS', 'Azure', 'Prometheus', 'Grafana', 'kubectl', 'Terraform'],
  },
]

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      visible.value = true
      // Animate the timeline line
      let p = 0
      const interval = setInterval(() => {
        p += 2
        lineProgress.value = Math.min(p, 100)
        if (p >= 100) clearInterval(interval)
      }, 20)
      stop()
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <section id="experience" ref="sectionRef" class="section exp-section">
    <!-- Background glow -->
    <div class="exp-orb ambient-orb ambient-orb-violet" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Career</div>
        <h2 class="section-title">Professional Experience</h2>
        <p class="section-subtitle">My journey building secure, automated, and scalable infrastructure.</p>
      </div>

      <!-- Timeline -->
      <div class="timeline">
        <!-- Animated vertical line -->
        <div class="timeline-line" aria-hidden="true">
          <div class="timeline-progress" :style="`height: ${lineProgress}%`" />
        </div>

        <article
          v-for="(exp, idx) in experiences"
          :key="exp.id"
          class="timeline-entry"
          :class="[{ 'visible': visible }, `delay-${idx}`]"
        >
          <!-- Node -->
          <div class="timeline-node" :style="`--node-color: ${exp.color}`" aria-hidden="true">
            <span class="node-inner" />
          </div>

          <!-- Card -->
          <div class="exp-card glass-card" :style="`--card-color: ${exp.color}`">
            <!-- Header -->
            <div class="exp-card-header">
              <div class="exp-header-main">
                <div class="exp-role-row">
                  <h3 class="exp-role">{{ exp.role }}</h3>
                  <span class="exp-type-badge" :style="`border-color: ${exp.color}40; color: ${exp.color}`">
                    {{ exp.type }}
                  </span>
                </div>
                <div class="exp-org-row">
                  <span class="exp-org">{{ exp.org }}</span>
                  <span class="exp-sep">·</span>
                  <span class="exp-location">{{ exp.location }}</span>
                </div>
              </div>
              <div class="exp-period text-mono">{{ exp.period }}</div>
            </div>

            <p class="exp-summary">{{ exp.summary }}</p>

            <!-- Responsibilities -->
            <ul class="exp-responsibilities">
              <li v-for="resp in exp.responsibilities" :key="resp" class="exp-resp-item">
                <span class="resp-bullet" :style="`background: ${exp.color}`" aria-hidden="true" />
                <span>{{ resp }}</span>
              </li>
            </ul>

            <!-- Tech tags -->
            <div class="exp-tech">
              <span v-for="tech in exp.tech" :key="tech" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-section {
  position: relative;
  overflow: hidden;
}

.exp-orb {
  width: 500px;
  height: 500px;
  top: 50%;
  right: -200px;
  opacity: 0.06;
}

/* ===== TIMELINE ===== */
.timeline {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding-left: 48px;
}

/* Vertical line */
.timeline-line {
  position: absolute;
  left: 15px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: rgba(56, 189, 248, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.timeline-progress {
  width: 100%;
  background: linear-gradient(180deg, var(--blue-electric), var(--cyan), var(--violet));
  border-radius: 2px;
  transition: height 2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== ENTRY ===== */
.timeline-entry {
  position: relative;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-entry:last-child {
  margin-bottom: 0;
}

.timeline-entry.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-entry.delay-0 { transition-delay: 0.1s; }
.timeline-entry.delay-1 { transition-delay: 0.25s; }
.timeline-entry.delay-2 { transition-delay: 0.4s; }

/* ===== NODE ===== */
.timeline-node {
  position: absolute;
  left: -40px;
  top: 20px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--node-color);
  background: var(--bg-deepest);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.node-inner {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--node-color);
  box-shadow: 0 0 6px var(--node-color);
}

/* ===== CARD ===== */
.exp-card {
  padding: 28px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

.exp-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--card-color), transparent);
  opacity: 0.6;
}

.exp-card:hover {
  border-color: color-mix(in srgb, var(--card-color) 40%, transparent);
  transform: translateY(-2px);
}

/* Header */
.exp-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.exp-role-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.exp-role {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.exp-type-badge {
  font-size: 0.7rem;
  font-weight: 600;
  font-family: var(--font-mono);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid;
  background: transparent;
  letter-spacing: 0.05em;
}

.exp-org-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.exp-org {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.exp-sep {
  color: var(--text-muted);
}

.exp-location {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.exp-period {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  padding: 4px 10px;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid var(--border);
  border-radius: 6px;
  flex-shrink: 0;
}

/* Summary */
.exp-summary {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

/* Responsibilities */
.exp-responsibilities {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.exp-resp-item {
  display: flex;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  align-items: flex-start;
}

.resp-bullet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-top: 7px;
  flex-shrink: 0;
  opacity: 0.8;
}

/* Tech */
.exp-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .timeline {
    padding-left: 32px;
  }

  .timeline-node {
    left: -26px;
  }

  .exp-card {
    padding: 20px;
  }

  .exp-card-header {
    flex-direction: column;
  }
}
</style>
