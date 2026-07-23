// Schemas for the site's enquiry modals. One config-driven LeadModal renders
// these; every entry's key matches the string passed to uiStore.showModal(...).

export interface LeadField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  /** Span both columns in the two-column grid. */
  full?: boolean
}

export interface LeadForm {
  title: string
  subtitle?: string
  submit: string
  fields: LeadField[]
}

const name: LeadField = { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' }
const email: LeadField = { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@company.com' }
const company: LeadField = { name: 'company', label: 'Company / Organization', type: 'text', placeholder: 'Optional' }

export const leadForms: Record<string, LeadForm> = {
  partnershipForm: {
    title: 'Partner with BitPulse',
    subtitle: "Tell us the shape of the collaboration — we'll take it from there.",
    submit: 'Submit proposal',
    fields: [
      name,
      email,
      company,
      {
        name: 'interest',
        label: 'Type of partnership',
        type: 'select',
        required: true,
        options: [
          'Product co-development',
          'Hardware / IoT research',
          'Government / NGO partnership',
          'Academic / training partnership',
          'Beta / early-adopter program',
          'Funding / strategic alliance',
        ],
      },
      { name: 'message', label: 'What do you have in mind?', type: 'textarea', required: true, full: true, placeholder: 'A few lines on the idea…' },
    ],
  },

  consultationForm: {
    title: 'Book a free consultation',
    subtitle: "Tell us what you're exploring and how best to reach you.",
    submit: 'Request consultation',
    fields: [
      name,
      email,
      company,
      { name: 'contact_method', label: 'Preferred contact', type: 'select', required: true, options: ['Email', 'Phone', 'WhatsApp'] },
      { name: 'area', label: 'What are you exploring?', type: 'select', required: true, full: true, options: ['Embedded & IoT', 'Backend & Systems', 'R&D & Prototyping', 'Developer Tools', 'Mentorship & Training', 'Not sure yet'] },
      { name: 'message', label: 'What do you need help with?', type: 'textarea', required: true, full: true, placeholder: 'Briefly describe what you’re trying to achieve…' },
    ],
  },

  requestQuoteForm: {
    title: 'Request a quote',
    subtitle: 'Backend & systems development, scoped to your project.',
    submit: 'Request quote',
    fields: [
      name,
      email,
      company,
      { name: 'project', label: 'Project category', type: 'select', required: true, options: ['API & microservices', 'Systems software', 'Custom protocol', 'Performance-critical app', 'Migration / refactoring', 'Other'] },
      { name: 'timeline', label: 'Timeline expectation', type: 'text', placeholder: 'e.g. 4 weeks, 2 months' },
      { name: 'message', label: 'Project overview', type: 'textarea', required: true, full: true, placeholder: 'Briefly describe what you’re trying to achieve…' },
    ],
  },

  customPrototypeForm: {
    title: 'Custom R&D & prototyping',
    subtitle: 'Bring your idea to a working proof-of-concept.',
    submit: 'Start the conversation',
    fields: [
      name,
      email,
      { name: 'area', label: 'Area of interest', type: 'select', required: true, full: true, options: ['Hardware + software integration', 'Experimental embedded systems', 'Communication systems', 'Rapid prototyping consultancy', 'Open innovation project'] },
      { name: 'message', label: 'Project overview', type: 'textarea', required: true, full: true, placeholder: 'Briefly describe what you’re trying to achieve…' },
    ],
  },

  bookSessionForm: {
    title: 'Book a mentorship session',
    subtitle: 'Training and mentorship, matched to your level.',
    submit: 'Request session',
    fields: [
      name,
      email,
      { name: 'session_type', label: 'Session type', type: 'select', required: true, options: ['1:1 mentorship', 'Team workshop', 'Curriculum / bootcamp', 'Speaking / talk'] },
      { name: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Mixed'] },
      { name: 'schedule', label: 'Preferred timing', type: 'text', full: true, placeholder: 'e.g. weekday evenings, or a date range' },
      { name: 'message', label: 'Anything else?', type: 'textarea', full: true, placeholder: 'Optional notes…' },
    ],
  },

  devSolutionRequestForm: {
    title: 'Request a developer tool',
    subtitle: 'SDKs, CLIs and open-source tooling for your workflow.',
    submit: 'Send request',
    fields: [
      name,
      email,
      { name: 'solution_type', label: 'What kind of tool?', type: 'text', full: true, placeholder: 'e.g. Rust CLI, embedded library, parser…' },
      { name: 'open_source', label: 'Open-source intent', type: 'select', options: ['Yes, open source', 'No, proprietary', 'Not sure yet'] },
      { name: 'message', label: 'Describe the need', type: 'textarea', required: true, full: true, placeholder: 'What should it do?' },
    ],
  },

  earlyAccess: {
    title: 'Join early access',
    subtitle: "Get on the list to test what we're building — we'll reach out as spots open.",
    submit: 'Request early access',
    fields: [
      name,
      email,
      { name: 'product', label: 'Which product / project?', type: 'text', full: true, placeholder: 'e.g. PulseNode, BitCraft…' },
      { name: 'message', label: 'How would you use it?', type: 'textarea', full: true, placeholder: 'Tell us about your use case…' },
    ],
  },

  embeddedQuoteForm: {
    title: 'Embedded project quote',
    subtitle: 'Sensor nodes, gateways and firmware, scoped to your build.',
    submit: 'Request quote',
    fields: [
      name,
      email,
      { name: 'project_type', label: 'Project type', type: 'select', required: true, options: ['New device / product', 'Firmware for existing hardware', 'IoT fleet / gateway', 'Firmware audit', 'Other'] },
      { name: 'has_hardware', label: 'Hardware status', type: 'select', options: ['Have hardware', 'Need hardware designed', 'Not sure'] },
      { name: 'budget', label: 'Budget range', type: 'text', full: true, placeholder: 'Optional' },
      { name: 'message', label: 'Project overview', type: 'textarea', required: true, full: true, placeholder: 'Briefly describe what you’re trying to build…' },
    ],
  },
}
