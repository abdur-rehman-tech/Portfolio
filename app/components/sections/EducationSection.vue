<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const { stop } = useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry.isIntersecting) { visible.value = true; stop() }
  },
  { threshold: 0.2 }
)
</script>

<template>
  <section id="education" ref="sectionRef" class="section edu-section">
    <div class="edu-orb ambient-orb ambient-orb-violet" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Background</div>
        <h2 class="section-title">Education</h2>
      </div>

      <div class="edu-card-wrap">
        <div class="edu-card glass-card" :class="{ 'visible': visible }">
          <!-- Decorative side border -->
          <div class="edu-card-accent" aria-hidden="true" />

          <div class="edu-icon-wrap">
            <span class="edu-icon" aria-label="Graduation">🎓</span>
          </div>

          <div class="edu-body">
            <div class="edu-header">
              <div>
                <h3 class="edu-degree">Bachelor of Science in Information Technology</h3>
                <p class="edu-university">AIR University, Islamabad</p>
              </div>
              <div class="edu-badge text-mono">BS IT</div>
            </div>

            <p class="edu-description">
              Studying Information Technology with a focus on cloud computing, network administration,
              operating systems, and software development fundamentals. Active participant in technical
              projects bridging academic learning with real-world DevSecOps practice.
            </p>

            <div class="edu-tags">
              <span class="tech-tag">Cloud Computing</span>
              <span class="tech-tag">Networking</span>
              <span class="tech-tag">Operating Systems</span>
              <span class="tech-tag">Cybersecurity</span>
              <span class="tech-tag">Software Engineering</span>
              <span class="tech-tag">Database Systems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-section {
  position: relative;
  overflow: hidden;
}

.edu-orb {
  width: 400px;
  height: 400px;
  top: 0;
  left: -100px;
  opacity: 0.07;
}

.edu-card-wrap {
  max-width: 800px;
  margin: 0 auto;
}

.edu-card {
  padding: 40px;
  border-radius: 20px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.edu-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.edu-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--blue-electric), var(--cyan), var(--violet));
  border-radius: 4px 0 0 4px;
}

.edu-icon-wrap {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  background: rgba(56, 189, 248, 0.1);
  border: 1.5px solid rgba(56, 189, 248, 0.25);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-icon {
  font-size: 1.75rem;
}

.edu-body {
  flex: 1;
  min-width: 0;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.edu-degree {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
  margin-bottom: 4px;
}

.edu-university {
  font-size: 0.9rem;
  color: var(--blue-electric);
  font-weight: 600;
}

.edu-badge {
  padding: 5px 14px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: var(--blue-electric);
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.edu-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
}

.edu-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .edu-card {
    flex-direction: column;
    padding: 28px 24px;
    gap: 20px;
  }
}
</style>
