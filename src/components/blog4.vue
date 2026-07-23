<template>
  <div class="py-10 space-y-10">
    <!-- <header class="space-y-4">
      <h1 class="text-3xl md:text-4xl font-extrabold leading-snug">
        Launching Open Source Hardware Projects with the Community
      </h1>
      <p class="text-lg italic text-gray-300">
        Tips for Publishing and Managing Open-Source Embedded or Tooling Projects
      </p>
      <p class="italic text-gray-400">By BitPulse – Engineering Tomorrow, Together</p>
    </header> -->

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🔓 TL;DR</h2>
      <p>
        Open-source hardware projects enable <span class="font-bold">learning</span>,
        <span class="font-bold">collaboration</span>, and
        <span class="font-bold">scalable innovation</span>. But success takes more than uploading
        schematics.
      </p>
      <p>To do it right, you need:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Clear goals & community mindset</li>
        <li>Transparent, well-documented design files</li>
        <li>Friendly licensing</li>
        <li>Onboarding guides</li>
        <li>Consistent maintenance</li>
      </ul>
      <p>Let’s dive in.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">💬 Why Open Source Hardware?</h2>
      <p>
        Hardware is <span class="font-bold">physical</span> — it costs time, materials, and
        iteration. Openness multiplies impact for:
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>Students learning hands-on</li>
        <li>Makers & innovators in underserved regions</li>
        <li>Startups reducing R&amp;D cost</li>
        <li>Developers building on proven foundations</li>
      </ul>
      <p>Africa can <span class="font-bold">leapfrog</span> by embracing open designs.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧠 Step 1: Know Why You’re Opening It Up</h2>
      <p>Ask yourself:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Do I want to teach?</li>
        <li>Am I solving a common problem?</li>
        <li>Do I want feedback & contributions?</li>
        <li>Is this a community-focused project?</li>
      </ul>
      <p>Your <span class="font-bold">why</span> shapes documentation depth & openness level.</p>
      <p class="font-semibold">Open Source ≠ Abandoned Upload.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🗂️ Step 2: Structure Your Project</h2>
      <p>Make it approachable:</p>
      <div class="bg-gray-900 rounded p-4 text-sm font-mono overflow-x-auto border border-gray-700">
        <pre>
/project-name
├── hardware/
│  ├── schematic.sch
│  ├── board.kicad_pcb
│  └── BOM.csv
├── firmware/
│  ├── src/
│  ├── Cargo.toml (Rust) or platformio.ini (C++)
├── docs/
│  ├── wiring_guide.md
│  └── theory_of_operation.md
├── LICENSE
├── README.md
└── CONTRIBUTING.md</pre
        >
      </div>
      <ul class="list-disc list-inside space-y-1">
        <li><span class="font-bold">README.md</span>: what & why + quick start</li>
        <li><span class="font-bold">CONTRIBUTING.md</span>: how to help</li>
        <li><span class="font-bold">BOM.csv</span>: parts, specs, sources</li>
      </ul>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧾 Step 3: Choose a License</h2>
      <p>Hardware & software can use <span class="font-bold">separate licenses</span>.</p>
      <ul class="list-disc list-inside space-y-1">
        <li><span class="font-bold">CERN OHL</span> – physical design friendly</li>
        <li><span class="font-bold">TAPR OHL</span> – GPL-style spirit</li>
        <li><span class="font-bold">MIT / Apache 2.0 / BSD</span> – common for firmware</li>
      </ul>
      <p>Add a <code>LICENSES.md</code> explaining each piece.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧰 Step 4: Document Like You’re Teaching</h2>
      <p>Good docs are a <span class="font-bold">form of kindness</span>.</p>
      <ul class="list-disc list-inside space-y-1">
        <li>High-level overview + block diagram</li>
        <li>Wiring / assembly guides</li>
        <li>Firmware flashing instructions</li>
        <li>Common errors & troubleshooting</li>
        <li>Extensions / ideas</li>
      </ul>
      <p>
        Mirror with platforms like
        <a href="https://www.hackster.io" target="_blank" class="text-orange-500 underline"
          >Hackster</a
        >,
        <a href="https://www.instructables.com" target="_blank" class="text-orange-500 underline"
          >Instructables</a
        >, or a blog.
      </p>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          Every open project can become a mentor.
        </p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🌍 Step 5: Make It Accessible</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>Use affordable, globally available parts</li>
        <li>Suggest alternatives for rare chips</li>
        <li>Offer simulators (e.g. Wokwi)</li>
        <li>Write simple, low-jargon English</li>
        <li>Keep docs lightweight for bandwidth</li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          A $5 board no one can replicate locally isn’t truly open.
        </p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🤝 Step 6: Design for Collaboration</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>Label issues (good first issue, help wanted)</li>
        <li>Respond within a few days</li>
        <li>Accept small fixes (typos count)</li>
        <li>Highlight contributors (THANKS.md)</li>
        <li>Use Discussions / chat channels</li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">Community grows through interaction.</p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧪 Step 7: Provide Ready Examples</h2>
      <p>Give people a fast win:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Breadboard diagrams</li>
        <li>Blink / sensor sample firmware</li>
        <li>3D-printable case models</li>
        <li>Simulator link (Wokwi)</li>
        <li>Color pinout diagram</li>
      </ul>
      <p>Your goal: <span class="font-bold">zero guesswork</span>.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🚢 Step 8: Launch Like a Product</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>Launch blog post</li>
        <li>Short demo video</li>
        <li>Share on Reddit, LinkedIn, Hackaday, Dev.to</li>
        <li>Invite early testers</li>
        <li>Iterate with feedback</li>
      </ul>
      <p>One engaged user is a win.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🔁 Step 9: Iterate & Nurture</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>Fix early issues fast</li>
        <li>Ship minor releases (v1.1, v1.2…)</li>
        <li>Offer kits or PCB ordering paths</li>
        <li>Showcase forks & mods</li>
        <li>Stay welcoming & consistent</li>
      </ul>
      <p>Success = <span class="font-bold">shipping + listening + visibility</span>.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🚀 BitPulse’s Take</h2>
      <p>
        Open hardware accelerates <span class="font-bold">localized, sustainable innovation</span>.
      </p>
      <p>We’re preparing open blueprints for:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Smart agricultural tools</li>
        <li>Classroom sensor kits</li>
        <li>Custom prototyping boards</li>
        <li>Embedded Rust learning tools</li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">Not just open code. Open progress.</p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🎯 Quick Checklist Before You Launch</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>✅ Clear scope & goal</li>
        <li>✅ Clean folder structure</li>
        <li>✅ License + BOM</li>
        <li>✅ Wiring & setup guides</li>
        <li>✅ Entry-level examples</li>
        <li>✅ Issue labels & contribution guide</li>
        <li>✅ Friendly tone & launch plan</li>
        <li>✅ Engagement cadence</li>
      </ul>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">📣 Over to You!</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>Have you launched or forked an open hardware project?</li>
        <li>What challenges do you face in open-sourcing hardware?</li>
        <li>Would you contribute to BitPulse’s open tools?</li>
      </ul>
      <p>Let’s unlock Africa’s embedded potential — one open project at a time.</p>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300 font-semibold">
          The blueprint is ours. The build is ours. The future is ours.
        </p>
      </blockquote>
    </section>
  </div>
</template>
