<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const showBackToTop = ref(false)

watch(y, (val) => {
  showBackToTop.value = val > 400
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Loading screen -->
    <PageLoader />

    <!-- Header -->
    <AppHeader />

    <!-- Main content -->
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Back to top button -->
    <Transition name="back-top">
      <button
        v-if="showBackToTop"
        id="back-to-top"
        class="back-to-top"
        aria-label="Scroll back to top"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
/* ===== BACK TO TOP ===== */
.back-to-top {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 200;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(10, 22, 40, 0.9);
  border: 1.5px solid rgba(56, 189, 248, 0.35);
  color: var(--blue-electric);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.back-to-top:hover {
  background: rgba(56, 189, 248, 0.15);
  border-color: var(--blue-electric);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(56, 189, 248, 0.2);
}

.back-top-enter-active,
.back-top-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
