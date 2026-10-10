<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const formState = ref<'idle' | 'submitting' | 'sent' | 'error'>('idle')
const errors = ref<Record<string, string>>({})

function validate() {
  const e: Record<string, string> = {}
  if (!form.value.name.trim()) e.name = 'Name is required.'
  if (!form.value.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'Enter a valid email address.'
  if (!form.value.subject.trim()) e.subject = 'Subject is required.'
  if (!form.value.message.trim()) e.message = 'Message is required.'
  else if (form.value.message.trim().length < 20) e.message = 'Message must be at least 20 characters.'
  errors.value = e
  return Object.keys(e).length === 0
}

function submitForm() {
  if (!validate()) return
  formState.value = 'submitting'

  // mailto-based fallback — opens default mail client
  const subject = encodeURIComponent(`[Portfolio] ${form.value.subject}`)
  const body = encodeURIComponent(
    `Name: ${form.value.name}\nEmail: ${form.value.email}\n\n${form.value.message}`
  )
  const mailto = `mailto:abdurrehmann54@gmail.com?subject=${subject}&body=${body}`

  // Small delay to show loading state
  setTimeout(() => {
    window.location.href = mailto
    formState.value = 'sent'
    // Reset form
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 600)
}

const contactInfo = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'abdurrehmann54@gmail.com',
    href: 'mailto:abdurrehmann54@gmail.com',
  },
  {
    icon: '💼',
    label: 'Business Email',
    value: 'ceo@artechops.com',
    href: 'mailto:ceo@artechops.com',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Islamabad, Pakistan',
    href: null,
  },
  {
    icon: '🔗',
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhamad-abdur-rehman-81777b366',
    href: 'https://www.linkedin.com/in/muhamad-abdur-rehman-81777b366/',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/abdur-rehman-tech',
    href: 'https://github.com/abdur-rehman-tech',
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
  <section id="contact" ref="sectionRef" class="section contact-section">
    <div class="contact-orb-1 ambient-orb ambient-orb-blue" aria-hidden="true" />
    <div class="contact-orb-2 ambient-orb ambient-orb-violet" aria-hidden="true" />

    <div class="container">
      <div class="section-header">
        <div class="section-eyebrow">Get in Touch</div>
        <h2 class="section-title">Let's Work Together</h2>
        <p class="section-subtitle">
          Have a project in mind or want to discuss opportunities? I'd love to hear from you.
        </p>
      </div>

      <div class="contact-grid" :class="{ 'visible': visible }">
        <!-- Info column -->
        <div class="contact-info">
          <div class="info-block glass-card">
            <h3 class="info-title">Contact Details</h3>
            <div class="info-items">
              <div
                v-for="item in contactInfo"
                :key="item.label"
                class="info-item"
              >
                <span class="info-icon" aria-hidden="true">{{ item.icon }}</span>
                <div class="info-content">
                  <span class="info-label text-mono">{{ item.label }}</span>
                  <a
                    v-if="item.href"
                    :href="item.href"
                    class="info-value info-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{{ item.value }}</a>
                  <span v-else class="info-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="availability-block glass-card">
            <div class="avail-dot" aria-hidden="true" />
            <div>
              <p class="avail-title">Open to Opportunities</p>
              <p class="avail-desc">Available for DevSecOps roles, cloud security consulting, and infrastructure projects.</p>
            </div>
          </div>
        </div>

        <!-- Form column -->
        <div class="contact-form-wrap">
          <!-- Success state -->
          <div v-if="formState === 'sent'" class="form-success glass-card">
            <span class="success-icon" aria-hidden="true">✅</span>
            <h3>Message Sent!</h3>
            <p>Your mail client should have opened. If it didn't, email me directly at <a href="mailto:abdurrehmann54@gmail.com">abdurrehmann54@gmail.com</a>.</p>
            <button class="btn btn-outline" @click="formState = 'idle'">Send Another</button>
          </div>

          <!-- Form -->
          <form v-else class="contact-form glass-card" @submit.prevent="submitForm" novalidate aria-label="Contact form">
            <h3 class="form-title">Send a Message</h3>

            <!-- Note about backend -->
            <p class="form-disclaimer text-mono">
              💡 This form opens your mail client. No data is sent to a server.
            </p>

            <div class="form-row">
              <!-- Name -->
              <div class="form-group" :class="{ 'has-error': errors.name }">
                <label for="contact-name" class="form-label">Name</label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  placeholder="Your full name"
                  autocomplete="name"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                />
                <span v-if="errors.name" id="name-error" class="form-error" role="alert">{{ errors.name }}</span>
              </div>

              <!-- Email -->
              <div class="form-group" :class="{ 'has-error': errors.email }">
                <label for="contact-email" class="form-label">Email</label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  placeholder="your@email.com"
                  autocomplete="email"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                />
                <span v-if="errors.email" id="email-error" class="form-error" role="alert">{{ errors.email }}</span>
              </div>
            </div>

            <!-- Subject -->
            <div class="form-group" :class="{ 'has-error': errors.subject }">
              <label for="contact-subject" class="form-label">Subject</label>
              <input
                id="contact-subject"
                v-model="form.subject"
                type="text"
                class="form-input"
                placeholder="What's it about?"
                :aria-describedby="errors.subject ? 'subject-error' : undefined"
              />
              <span v-if="errors.subject" id="subject-error" class="form-error" role="alert">{{ errors.subject }}</span>
            </div>

            <!-- Message -->
            <div class="form-group" :class="{ 'has-error': errors.message }">
              <label for="contact-message" class="form-label">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                class="form-input form-textarea"
                placeholder="Tell me about your project or opportunity..."
                rows="5"
                :aria-describedby="errors.message ? 'message-error' : undefined"
              />
              <span v-if="errors.message" id="message-error" class="form-error" role="alert">{{ errors.message }}</span>
            </div>

            <button
              type="submit"
              class="btn btn-primary form-submit"
              :disabled="formState === 'submitting'"
            >
              <span v-if="formState === 'submitting'" class="btn-spinner" aria-hidden="true" />
              {{ formState === 'submitting' ? 'Opening mail client...' : 'Send Message' }}
              <svg v-if="formState !== 'submitting'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  overflow: hidden;
}

.contact-orb-1 {
  width: 500px;
  height: 500px;
  top: -100px;
  left: -150px;
  opacity: 0.07;
}

.contact-orb-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -100px;
  opacity: 0.06;
}

/* ===== GRID ===== */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 32px;
  align-items: start;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== INFO COLUMN ===== */
.info-block {
  padding: 28px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.info-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: -0.01em;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.info-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.info-value {
  font-size: 0.82rem;
  color: var(--text-secondary);
  word-break: break-all;
}

.info-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.info-link:hover {
  color: var(--blue-electric);
}

/* Availability block */
.availability-block {
  padding: 20px;
  border-radius: 14px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.avail-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  flex-shrink: 0;
  margin-top: 4px;
  animation: pulse-ring 2s ease-in-out infinite;
}

.avail-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.avail-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ===== FORM ===== */
.contact-form {
  padding: 32px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.form-disclaimer {
  font-size: 0.72rem;
  color: var(--text-muted);
  background: rgba(56, 189, 248, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  line-height: 1.5;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
}

.form-input {
  background: rgba(10, 22, 40, 0.8);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  width: 100%;
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--blue-electric);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12);
  background: rgba(10, 22, 40, 1);
}

.has-error .form-input {
  border-color: #f87171;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  font-size: 0.73rem;
  color: #f87171;
  display: flex;
  align-items: center;
  gap: 4px;
}

.form-submit {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 0.925rem;
  margin-top: 4px;
}

.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  display: inline-block;
  animation: orbit-cw 0.7s linear infinite;
}

/* ===== SUCCESS ===== */
.form-success {
  padding: 48px 32px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.success-icon {
  font-size: 3rem;
}

.form-success h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.form-success p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 360px;
}

.form-success a {
  color: var(--blue-electric);
  text-decoration: none;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 24px;
  }
}
</style>
