<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  lines: string[]
}

const props = withDefaults(defineProps<Props>(), {
  lines: () => []
})

const displayedLines = ref<string[]>([])
const currentLineText = ref('')
const isRunning = ref(true)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const sleep = (ms: number) => new Promise(resolve => { timeoutId = setTimeout(resolve, ms) })

async function runTyping() {
  for (let i = 0; i < props.lines.length; i++) {
    if (!isRunning.value) return
    const line = props.lines[i]
    currentLineText.value = ''

    for (let ch = 0; ch < line.length; ch++) {
      if (!isRunning.value) return
      currentLineText.value += line[ch]
      await sleep(35)
    }

    await sleep(600)
    displayedLines.value.push(line)
    currentLineText.value = ''

    // Keep only last 7 lines
    if (displayedLines.value.length > 7) {
      displayedLines.value = displayedLines.value.slice(-7)
    }
  }

  // Restart loop
  await sleep(2000)
  displayedLines.value = []
  if (isRunning.value) runTyping()
}

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    displayedLines.value = props.lines.slice(0, 6)
    return
  }
  runTyping()
})

onUnmounted(() => {
  isRunning.value = false
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div class="terminal" role="region" aria-label="Animated terminal">
    <!-- Header bar -->
    <div class="terminal-header">
      <div class="terminal-dots">
        <span class="dot dot-red" />
        <span class="dot dot-yellow" />
        <span class="dot dot-green" />
      </div>
      <span class="terminal-title text-mono">secure@abdur-rehman:~$</span>
    </div>

    <!-- Terminal body -->
    <div class="terminal-body">
      <!-- Previous lines -->
      <div
        v-for="(line, idx) in displayedLines"
        :key="idx"
        class="terminal-line"
      >
        <span class="terminal-prompt">$</span>
        <span class="terminal-text">{{ line }}</span>
      </div>

      <!-- Current line being typed -->
      <div v-if="currentLineText" class="terminal-line terminal-line-current">
        <span class="terminal-prompt">$</span>
        <span class="terminal-text">{{ currentLineText }}</span>
        <span class="terminal-cursor" aria-hidden="true">█</span>
      </div>

      <!-- Blinking cursor when idle -->
      <div v-else class="terminal-line">
        <span class="terminal-prompt">$</span>
        <span class="terminal-cursor" aria-hidden="true">█</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: rgba(3, 7, 18, 0.85);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 440px;
}

.terminal-header {
  background: rgba(10, 16, 32, 0.8);
  border-bottom: 1px solid var(--border);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red    { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green  { background: #28c840; }

.terminal-title {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.terminal-body {
  padding: 16px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.terminal-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.5;
}

.terminal-prompt {
  color: var(--blue-electric);
  opacity: 0.7;
  flex-shrink: 0;
}

.terminal-text {
  color: var(--text-secondary);
  word-break: break-all;
}

.terminal-line-current .terminal-text {
  color: var(--text-primary);
}

.terminal-cursor {
  color: var(--blue-electric);
  animation: blink-cursor 1s step-end infinite;
  flex-shrink: 0;
  font-size: 0.85em;
}
</style>
