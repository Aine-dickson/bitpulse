<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { projects, getProjectBySlug, statusMeta } from '@/data/projects'
import { useUiStore } from '@/stores/ui'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { breadcrumbLd, ORG_ID } from '@/utils/structuredData'
import NetLabel from '@/components/ui/NetLabel.vue'

const route = useRoute()
const uiStore = useUiStore()

const project = computed(() => getProjectBySlug(route.params.slug as string) ?? null)
const others = computed(() => projects.filter((p) => p.slug !== project.value?.slug).slice(0, 3))

useSeoMeta({
  title: project.value ? `${project.value.name} | ${project.value.category}` : 'Project',
  description: project.value?.detail ?? project.value?.blurb,
  canonical: project.value ? `/lab/${project.value.slug}` : '/lab',
  // Placeholder entries stay out of the index until the copy is real.
  noindex: !project.value || project.value.indexable === false,
  jsonLd: project.value
    ? [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'The Lab', path: '/lab' },
          { name: project.value.name, path: `/lab/${project.value.slug}` },
        ]),
        {
          '@type': 'SoftwareApplication',
          '@id': `https://bitpulse.dev/lab/${project.value.slug}#software`,
          name: project.value.name,
          description: project.value.detail ?? project.value.blurb,
          url: `https://bitpulse.dev/lab/${project.value.slug}`,
          applicationCategory: project.value.appCategory ?? 'DeveloperApplication',
          operatingSystem: 'Any',
          author: { '@id': ORG_ID },
          publisher: { '@id': ORG_ID },
          ...(project.value.features?.length
            ? { featureList: project.value.features.join(', ') }
            : {}),
          ...(project.value.keywords?.length
            ? { keywords: project.value.keywords.join(', ') }
            : {}),
          ...(project.value.externalUrl ? { sameAs: [project.value.externalUrl] } : {}),
        },
      ]
    : [],
})
</script>

<template>
  <section v-if="!project" class="mx-auto max-w-[640px] px-6 py-28 text-center">
    <h1 class="text-[1.6rem] text-ink">Project not found</h1>
    <p class="mt-2 text-ink-3">
      <RouterLink to="/lab" class="text-accent-deep hover:underline">See everything in the Lab</RouterLink>
    </p>
  </section>

  <template v-else>
    <!-- HERO -->
    <section class="bg-plate-0">
      <div class="mx-auto max-w-[1120px] px-6 pb-14 pt-20">
        <RouterLink
          to="/lab"
          class="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-deep hover:underline"
        >
          ← The Lab
        </RouterLink>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <NetLabel :text="project.category" />
          <span class="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">
            <span class="h-2.5 w-2.5 rounded-full" :style="{ background: statusMeta[project.status].dot }" />
            {{ statusMeta[project.status].label }} · {{ statusMeta[project.status].note }}
          </span>
        </div>

        <h1 class="mt-6 max-w-[20ch] text-[clamp(2.3rem,5.5vw,3.8rem)] leading-[0.98] text-ink">
          {{ project.name }}
        </h1>
        <p class="mt-6 max-w-[60ch] text-[1.1rem] text-ink-2">
          {{ project.detail ?? project.blurb }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button class="btn btn-primary" @click="uiStore.showModal('earlyAccess')">
            Get early access
          </button>
          <a
            v-if="project.externalUrl"
            :href="project.externalUrl"
            class="btn"
            rel="noopener"
          >
            {{ project.externalLabel ?? 'Visit site' }} →
          </a>
        </div>

        <ul v-if="project.tags.length" class="mt-8 flex flex-wrap gap-2">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </section>

    <!-- WHAT IT DOES -->
    <section v-if="project.features?.length" class="bg-plate-1">
      <div class="mx-auto max-w-[1120px] px-6 py-16">
        <NetLabel text="What it does" />
        <ul class="mt-8 grid gap-4 sm:grid-cols-2">
          <li
            v-for="feature in project.features"
            :key="feature"
            class="rounded-lg border border-line bg-surface p-5 text-ink-2"
          >
            {{ feature }}
          </li>
        </ul>
      </div>
    </section>

    <!-- WHO IT'S FOR -->
    <section v-if="project.goodFor?.length" class="bg-plate-2">
      <div class="mx-auto max-w-[1120px] px-6 py-16">
        <NetLabel text="Who it's for" />
        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="item in project.goodFor"
            :key="item"
            class="rounded-lg border border-line bg-surface p-5 text-ink-2"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- MORE FROM THE LAB: internal links so crawlers reach every product -->
    <section class="bg-plate-0">
      <div class="mx-auto max-w-[1120px] px-6 py-16">
        <NetLabel text="More from the Lab" />
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="other in others"
            :key="other.slug"
            :to="`/lab/${other.slug}`"
            class="rounded-lg border border-line bg-surface p-6 transition hover:border-accent"
          >
            <span class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-ink-3">
              {{ other.category }}
            </span>
            <h2 class="mt-2 text-[1.15rem] text-ink">{{ other.name }}</h2>
            <p class="mt-2 text-[0.94rem] text-ink-2">{{ other.blurb }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </template>
</template>
