// Schemas for the site's enquiry modals. One config-driven LeadModal renders
// these; every entry's key matches the string passed to uiStore.showModal(...).
//
// Keep this set small and reachable. A form nobody can open is a dead end: it
// looks like a capability on paper and never produces a single enquiry.

import { serviceNames } from './services'
import { sectorNames } from './sectors'

export interface LeadField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: string[]
  /** Pre-selected value when the page opening the modal gives no context. */
  defaultValue?: string
  /** Small helper line under the control. */
  hint?: string
  /** Span both columns in the two-column grid. */
  full?: boolean
}

export interface LeadForm {
  title: string
  subtitle?: string
  submit: string
  /** Line shown above the success message, e.g. what happens next. */
  successNote?: string
  fields: LeadField[]
}

const name: LeadField = { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' }
const email: LeadField = { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@company.com' }
const company: LeadField = { name: 'company', label: 'Company / Organization', type: 'text', placeholder: 'Optional' }
const phone: LeadField = { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: 'Optional, for a faster reply' }

// Service and sector selects are the fields a detail page pre-fills. They stay
// editable: the visitor may have landed on one page and want to ask about another.
const serviceField = (label: string): LeadField => ({
  name: 'service',
  label,
  type: 'select',
  required: true,
  full: true,
  options: [...serviceNames, 'Something else / not sure yet'],
  defaultValue: 'Something else / not sure yet',
  hint: 'Pre-filled from the page you came from. Change it if that is not the right fit.',
})

const sectorField: LeadField = {
  name: 'sector',
  label: 'Sector',
  type: 'select',
  full: true,
  options: [...sectorNames, 'Other / not listed'],
}

export const leadForms: Record<string, LeadForm> = {
  consultationForm: {
    title: 'Book a free consultation',
    subtitle: 'A 30-minute call to work out whether we are the right fit. No charge, no obligation.',
    submit: 'Request consultation',
    successNote: 'We reply to every consultation request within one working day.',
    fields: [
      name,
      email,
      company,
      { name: 'contact_method', label: 'Preferred contact', type: 'select', required: true, options: ['Email', 'Phone', 'WhatsApp', 'Video call'], defaultValue: 'Email' },
      serviceField('What is this about?'),
      { name: 'message', label: 'What do you need help with?', type: 'textarea', required: true, full: true, placeholder: 'A few lines on what you are trying to achieve.' },
    ],
  },

  requestQuoteForm: {
    title: 'Request a quote',
    subtitle: 'Give us the shape of the work and we will come back with scope, timeline and a price.',
    submit: 'Request quote',
    successNote: 'Quotes usually land within two to three working days, sooner if the scope is clear.',
    fields: [
      name,
      email,
      company,
      phone,
      serviceField('Which service?'),
      sectorField,
      {
        name: 'stage',
        label: 'Where are you now?',
        type: 'select',
        required: true,
        options: [
          'Just an idea',
          'Scoping and comparing options',
          'Have a spec or design ready',
          'Existing system needs work',
          'Live in production',
        ],
      },
      {
        name: 'timeline',
        label: 'When do you need it?',
        type: 'select',
        required: true,
        options: ['As soon as possible', 'Within 1 month', '1 to 3 months', '3 to 6 months', 'Still planning'],
      },
      {
        name: 'budget',
        label: 'Budget range (USD)',
        type: 'select',
        full: true,
        options: ['Under $5,000', '$5,000 to $15,000', '$15,000 to $50,000', 'Over $50,000', 'Not sure yet, advise me'],
        hint: 'A rough band is enough. It tells us what shape of solution to quote, not what to charge.',
      },
      {
        name: 'scope',
        label: 'What needs building?',
        type: 'textarea',
        required: true,
        full: true,
        placeholder: 'The problem, who uses it, any hardware or systems already involved.',
      },
      {
        name: 'success',
        label: 'What does done look like?',
        type: 'textarea',
        full: true,
        placeholder: 'Optional. The outcome you are measuring against.',
      },
    ],
  },

  partnershipForm: {
    title: 'Partner with BitPulse',
    subtitle: 'Tell us the shape of the collaboration and we will take it from there.',
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
      { name: 'message', label: 'What do you have in mind?', type: 'textarea', required: true, full: true, placeholder: 'A few lines on the idea.' },
    ],
  },

  earlyAccess: {
    title: 'Join early access',
    subtitle: 'Get on the list to test what we are building. We reach out as spots open.',
    submit: 'Request early access',
    fields: [
      name,
      email,
      { name: 'product', label: 'Which product / project?', type: 'text', full: true, placeholder: 'e.g. PulseNode, BitCraft' },
      { name: 'message', label: 'How would you use it?', type: 'textarea', full: true, placeholder: 'Tell us about your use case.' },
    ],
  },
}
