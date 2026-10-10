<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(true)
const progress = ref(0)
const statusText = ref('Initializing...')

const messages = [
  'Initializing...',
  'Loading secure modules...',
  'Establishing connections...',
  'Ready.'
]

onMounted(() => {
  // Respect reduced motion — skip loader if user prefers
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    visible.value = false
    return
  }

  let step = 0
  const interval = setInterval(() => {
    step++
    progress.value = Math.min(step * 28, 100)
    if (messages[step]) statusText.value = messages[step]

    if (step >= 4) {
      clearInterval(interval)
      progress.value = 100
      statusText.value = 'Ready.'
      setTimeout(() => {
        visible.value = false
      }, 600)
    }
  }, 280)

  // Safety: never block the site for more than 3 seconds
  setTimeout(() => {
    visible.value = false
  }, 3000)
})
</script>

<template>
  <Transition name="loader">
    <div v-if="visible" class="loader" aria-label="Loading portfolio" role="progressbar">
      <!-- Background particles -->
      <div class="loader-bg">
        <div v-for="i in 12" :key="i" class="loader-particle" :style="`--delay: ${i * 0.3}s; --x: ${Math.sin(i * 1.3) * 40 + 50}%; --y: ${Math.cos(i * 1.1) * 35 + 50}%;`" />
      </div>

      <!-- Orbital rings -->
      <div class="loader-orbitals">
        <div class="orbital orbital-1" />
        <div class="orbital orbital-2" />
        <div class="orbital orbital-3" />

        <!-- Center monogram -->
        <div class="loader-monogram">
          <span class="monogram-ar">AR</span>
        </div>
      </div>

      <!-- Text and progress -->
      <div class="loader-footer">
        <p class="loader-tagline">Building Secure Systems for a Better Tomorrow.</p>
        <div class="loader-progress-track">
          <div class="loader-progress-bar" :style="`width: ${progress}%`" />
        </div>
        <span class="loader-status text-mono">{{ statusText }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg-deepest);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  overflow: hidden;
}

/* ===== PARTICLES ===== */
.loader-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.loader-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--blue-electric);
  left: var(--x);
  top: var(--y);
  opacity: 0;
  animation: particle-drift 3s ease-in-out infinite;
  animation-delay: var(--delay);
}

/* ===== ORBITALS ===== */
.loader-orbitals {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbital {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
}

.orbital-1 {
  width: 200px;
  height: 200px;
  border-top-color: var(--blue-electric);
  border-right-color: rgba(56, 189, 248, 0.3);
  animation: orbit-cw 3s linear infinite;
}

.orbital-2 {
  width: 156px;
  height: 156px;
  border-bottom-color: var(--cyan);
  border-left-color: rgba(34, 211, 238, 0.3);
  animation: orbit-ccw 2.4s linear infinite;
}

.orbital-3 {
  width: 110px;
  height: 110px;
  border-top-color: var(--violet);
  border-right-color: rgba(129, 140, 248, 0.2);
  animation: orbit-cw 1.8s linear infinite;
}

/* ===== MONOGRAM ===== */
.loader-monogram {
  width: 76px;
  height: 76px;
  background: var(--bg-card);
  border: 1px solid var(--border-hover);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(16px);
  animation: glow-pulse 2s ease-in-out infinite;
}

.monogram-ar {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, var(--blue-electric), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== FOOTER ===== */
.loader-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  padding: 0 24px;
}

.loader-tagline {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

.loader-progress-track {
  width: 100%;
  height: 2px;
  background: rgba(56, 189, 248, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.loader-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--blue-electric), var(--cyan));
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.loader-status {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ===== TRANSITION ===== */
.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.loader-enter-from {
  opacity: 0;
}

.loader-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
