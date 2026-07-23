<template>
  <div class="py-10 space-y-10">
    <!-- <header class="space-y-4">
      <h1 class="text-3xl md:text-4xl font-extrabold leading-snug">
        Prototyping 101: From Idea to Physical MVP
      </h1>
      <p class="text-lg italic text-gray-300">
        What to Consider Before Starting Your Hardware or Embedded Software Prototype
      </p>
      <p class="italic text-gray-400">By BitPulse – Engineering Tomorrow, Today</p>
    </header> -->

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧵 TL;DR</h2>
      <p>
        Before you build your first hardware prototype or embedded system MVP (Minimum Viable
        Product), consider:
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>The <span class="font-bold">problem you're solving</span></li>
        <li>Your <span class="font-bold">target environment</span></li>
        <li><span class="font-bold">Power</span> source and management</li>
        <li><span class="font-bold">Sensors, inputs, and outputs</span></li>
        <li>The best <span class="font-bold">microcontroller or SoC</span></li>
        <li><span class="font-bold">Budget, timeline, and iteration plan</span></li>
        <li><span class="font-bold">Scalability and manufacturability</span></li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          A prototype isn’t a final product. It’s a <span class="font-bold">learning tool</span> —
          and a critical one.
        </p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">💡 Why Prototyping Matters</h2>
      <p>
        In software, a quick MVP might be an app mockup. In hardware and embedded systems, it's
        <span class="font-bold">a physical thing</span> — and that changes everything.
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>You’re dealing with <span class="font-bold">real components</span></li>
        <li>You may destroy something if done wrong</li>
        <li>Debugging is harder, slower, and costlier</li>
        <li>Iteration cycles involve solder, sensors, and boards — not just keystrokes</li>
      </ul>
      <p>That’s why <span class="font-bold">thinking before building</span> is everything.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧠 Step 1: What Problem Are You Solving?</h2>
      <p>
        It sounds obvious — but many hardware projects die because the purpose isn’t well defined.
      </p>
      <p>Ask yourself:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Who is this for?</li>
        <li>What’s the main pain point you're addressing?</li>
        <li>Can a physical solution solve it better than a purely digital one?</li>
      </ul>
      <p>Your answers will guide all other decisions — from component selection to form factor.</p>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300 font-semibold">
          Build for the problem, not just the thrill.
        </p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🌍 Step 2: Understand the Operating Environment</h2>
      <p>Where will this device live?</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Indoors or outdoors?</li>
        <li>Heat, dust, water, vibration?</li>
        <li>Wearable, portable, or stationary?</li>
        <li>Wireless access requirements?</li>
      </ul>
      <p>This determines:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Casing & protection level</li>
        <li>Communication (Bluetooth, Wi-Fi, LoRa, GSM)</li>
        <li>Power management</li>
        <li>Sensors & shielding</li>
      </ul>
      <p>Don’t prototype for the lab. Prototype for the real world.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🔌 Step 3: Power Is Everything</h2>
      <p>Power is the oxygen of embedded systems. No power, no product.</p>
      <p>Questions to ask:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Battery, USB, or mains powered?</li>
        <li>Expected runtime per charge?</li>
        <li>Can it sleep when idle?</li>
        <li>Replaceable or rechargeable batteries?</li>
      </ul>
      <p>You’ll likely need:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>A <span class="font-bold">buck or boost converter</span></li>
        <li>A <span class="font-bold">charging circuit</span></li>
        <li>Smart <span class="font-bold">power profiling</span></li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          A beautiful prototype is useless if it dies in 3 hours.
        </p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🎛️ Step 4: Choose Inputs and Outputs Carefully</h2>
      <p>Think beyond your idea. Think interaction.</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Essential sensors?</li>
        <li>Buttons, switches, dials?</li>
        <li>User feedback: LED, screen, sound, haptics?</li>
        <li>Need a companion app or dashboard?</li>
      </ul>
      <p>Your prototype should validate:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Data collection</li>
        <li>Data display or reaction</li>
        <li>User control / input</li>
      </ul>
      <p>Keep the interface simple but intentional.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🔩 Step 5: Pick the Right Microcontroller or SoC</h2>
      <p>This is the brain of your prototype. Consider:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Flash / RAM size</li>
        <li>GPIO & buses (I2C, SPI, UART)</li>
        <li>Analog inputs / PWM outputs</li>
        <li>Language support (C++, Rust, MicroPython)</li>
        <li>Community & docs</li>
        <li>Cost & availability</li>
      </ul>
      <p class="font-semibold">Beginner-friendly picks:</p>
      <ul class="list-disc list-inside space-y-1">
        <li><span class="font-bold">Arduino Uno</span> – basic I/O</li>
        <li><span class="font-bold">ESP32</span> – wireless + performance</li>
        <li><span class="font-bold">STM32 Blue Pill</span> – ARM experience</li>
        <li><span class="font-bold">RP2040</span> – dual-core, low-cost, Rust friendly</li>
      </ul>
      <p>Choose what aligns with your use case <span class="font-bold">and skill level</span>.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">📅 Step 6: Define Scope, Budget, and Timeline</h2>
      <p>Prototyping can be a rabbit hole. Set limits.</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Budget for multiple iterations</li>
        <li>Expect the first to fail</li>
        <li>Use simulations (e.g., Wokwi) early</li>
        <li>Sketch / 3D model enclosures</li>
      </ul>
      <p class="font-semibold">Simple roadmap:</p>
      <ol class="list-decimal list-outside ml-6 space-y-1">
        <li>Idea sketch</li>
        <li>Breadboard test</li>
        <li>Soldered circuit</li>
        <li>Enclosed MVP</li>
      </ol>
      <p>Build in public for fast feedback.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🛠️ Step 7: Design for Change</h2>
      <p>No prototype is perfect. Yours shouldn’t try to be.</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Use pin headers & connectors</li>
        <li>Avoid permanent soldering early</li>
        <li>Label everything</li>
        <li>Document schematics & pin mappings</li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">You’ll likely pivot. Make it easy.</p>
      </blockquote>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">📦 Step 8: Think Beyond the Board</h2>
      <p>Hardware MVPs are more than circuits. Consider:</p>
      <ul class="list-disc list-inside space-y-1">
        <li><span class="font-bold">Enclosures</span> – 3D print or repurpose?</li>
        <li><span class="font-bold">Heat dissipation</span></li>
        <li><span class="font-bold">Mounting</span> & placement</li>
        <li><span class="font-bold">User access</span> to buttons, ports, screens</li>
      </ul>
      <p>
        A messy prototype may work — but a
        <span class="font-bold">polished prototype tells a better story</span>.
      </p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🔁 Step 9: Test, Iterate, Repeat</h2>
      <p>Your first MVP should answer:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>Does it solve the core problem?</li>
        <li>Can it gather & process expected data?</li>
        <li>Is it safe & consistent?</li>
      </ul>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          MVP = <span class="font-bold">Minimum</span> Viable Product, not Maximum Viable
          Perfection.
        </p>
      </blockquote>
      <p>Use what you learn to build the next version.</p>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🌍 What This Means for Africa’s Tech Movement</h2>
      <p>
        For African innovators, <span class="font-bold">hardware is the next frontier</span>.
        Software brought us online. Embedded systems will transform how we live offline — in
        hospitals, farms, schools, and streets.
      </p>
      <p>
        Building for our context demands
        <span class="font-bold">practical, accessible prototyping skills</span> — not just importing
        foreign tools.
      </p>
      <p>That’s why we’re building at BitPulse:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>To explore, prototype, and share</li>
        <li>To create <span class="font-bold">open resources</span> for African engineers</li>
        <li>To make embedded innovation <span class="font-bold">inclusive and home-grown</span></li>
      </ul>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🧰 Resources to Get Started</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>
          <a href="https://wokwi.com/" target="_blank" class="text-orange-500 underline"
            >Wokwi Simulator</a
          >
          (free Arduino/ESP32 prototyping)
        </li>
        <li>
          <a href="https://fritzing.org/" target="_blank" class="text-orange-500 underline"
            >Fritzing</a
          >
          (diagrams & breadboarding)
        </li>
        <li>
          <a href="https://www.kicad.org/" target="_blank" class="text-orange-500 underline"
            >KiCad</a
          >
          (professional PCB design)
        </li>
        <li>
          <a href="https://www.tinkercad.com/" target="_blank" class="text-orange-500 underline"
            >Tinkercad Circuits</a
          >
          (simple web prototyping)
        </li>
      </ul>
      <p class="font-semibold">Want Rust? Start with:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>
          <a
            href="https://docs.rust-embedded.org/book/"
            target="_blank"
            class="text-orange-500 underline"
            >The Embedded Rust Book</a
          >
        </li>
        <li>
          <a href="https://rp-rs.github.io/" target="_blank" class="text-orange-500 underline"
            >rp-rs resources</a
          >
          (Raspberry Pi Pico + Rust)
        </li>
      </ul>
    </section>

    <hr class="border-gray-700" />

    <section class="space-y-4 text-lg">
      <h2 class="text-2xl font-bold">🗣️ Let’s Talk!</h2>
      <ul class="list-disc list-inside space-y-1">
        <li>What’s your biggest challenge when starting a hardware prototype?</li>
        <li>Would you want <span class="font-bold">BitPulse Prototyping Kits</span>?</li>
        <li>Should we host live or recorded build-alongs?</li>
      </ul>
      <p>
        Let’s empower <span class="font-bold">the next generation of African makers</span> —
        together.
      </p>
      <blockquote
        class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
      >
        <p class="italic text-gray-700 dark:text-gray-300">
          At BitPulse, prototyping isn’t just a process. It’s a path to purpose.
        </p>
      </blockquote>
    </section>
  </div>
</template>
