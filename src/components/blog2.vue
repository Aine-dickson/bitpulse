<template>
    <div class="text-white py-10 space-y-10">
        <!-- <header class="space-y-4">
            <h1 class="text-3xl md:text-4xl font-extrabold leading-snug">
                Rust vs C++ for Embedded Systems: The Battle for the Bare Metal
            </h1>
            <p class="italic text-gray-300">By BitPulse – Engineering Tomorrow, Today</p>
        </header> -->

        <section class="space-y-6 text-lg">
            <h2 class="text-2xl font-bold">🧵 TL;DR</h2>
            <div class="overflow-x-auto">
                <table
                    class="w-full text-sm md:text-base text-left text-gray-600 dark:text-gray-400 rounded-lg overflow-hidden"
                >
                <thead
                    class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                    <tr>
                    <th scope="col" class="px-6 py-3">Feature</th>
                    <th>C++</th>
                    <th>Rust</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Memory Safety
                        </th>
                        <td class="px-6 py-4">Manual, error-prone</td>
                        <td>Enforced at compile time</td>
                    </tr>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <td>Performance</td>
                        <td>Top-tier, proven</td>
                        <td>Equal or better with zero-cost abstractions</td>
                    </tr>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <td>Tooling</td>
                        <td>Mature, widespread</td>
                        <td>Growing fast, modern</td>
                    </tr>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <td>Concurrency</td>
                        <td>Dangerous without discipline</td>
                        <td>Safe, enforced through ownership</td>
                    </tr>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <td>Learning Curve</td>
                        <td>Familiar to many</td>
                        <td>Steeper but logical</td>
                    </tr>
                    <tr
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-950 border-b dark:border-gray-700 border-gray-200"
                    >
                        <td>Community</td>
                        <td>Huge, fragmented</td>
                        <td>Small, focused, friendly</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <blockquote
                class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
            >
                <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300">
                    Rust is not “just a safer C++.” It’s a paradigm shift — especially for embedded systems
                    where <span class="font-bold">bugs are expensive and safety is priceless</span>.
                </p>
            </blockquote>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
            <h2 class="text-2xl font-bold">🔧 Why This Debate Matters</h2>
            <p>Embedded systems don’t get a second chance.</p>
            <p>
                Whether you're programming a ventilator, a smart lock, or a motor controller, you're dealing
                with:
            </p>
            <ul class="list-disc list-inside space-y-1">
                <li class="font-bold">Limited memory</li>
                <li class="font-bold">Real-time constraints</li>
                <li class="font-bold">Unforgiving hardware</li>
                <li class="font-bold">Tight power budgets</li>
            </ul>
            <p>
                That means <span class="font-semibold">every bug counts</span>, and traditional debugging
                tricks (like reboots and logs) might not help.
            </p>
            <p>
                So — between C++ and Rust, which one should African engineers, innovators, and startups
                focus on as they build the
                <span class="font-bold">next wave of life-changing hardware</span>?
            </p>
            <p>Let’s break it down.</p>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
            <h2 class="text-2xl font-bold">🧓🏾 The C++ Legacy</h2>
            <p>C++ is the dominant force in embedded systems — and it’s earned that spot. It offers:</p>
            <ul class="list-disc list-inside space-y-1">
                <li>Direct memory control</li>
                <li>Real-time performance</li>
                <li>A massive ecosystem of tools, libraries, and compilers</li>
                <li>Compatibility with C libraries (which most embedded chips are built on)</li>
            </ul>
            <p>But here’s the catch:</p>
            <blockquote
                class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
            >
                <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300">
                    C++ gives you the power to do anything... and the gun to shoot yourself in the foot.
                </p>
            </blockquote>
            <p>
                Buffer overflows, use-after-free, memory leaks, data races — these bugs are silent killers
                in embedded. In systems without an OS or with strict uptime requirements, even a single
                mistake can brick your device or hurt someone.
            </p>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
            <h2 class="text-2xl font-bold">🦀 Enter Rust: Built for Fearless Systems</h2>
            <p>
                Rust is younger — but it's built from the ground up to
                <span class="font-bold">eliminate entire classes of bugs at compile time</span>.
            </p>
            <p>What does that mean for embedded systems?</p>
            <ul class="list-disc list-inside space-y-1 font-bold">
                <li>No nulls</li>
                <li>No data races</li>
                <li>No undefined behavior</li>
                <li>Safe concurrency</li>
                <li>
                Zero-cost abstractions <span class="font-normal">(you pay only for what you use)</span>
                </li>
            </ul>
            <p>
                Rust gives you the performance of C++ <span class="font-bold">without the footguns</span>.
            </p>
            <blockquote
                class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
            >
                <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300">
                In Rust, if it compiles, it probably works.
                </p>
            </blockquote>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-6 text-lg">
        <h2 class="text-2xl font-bold">🚀 Why Rust is Winning Over Embedded Devs</h2>
            <ol class="list-decimal list-outside ml-6 space-y-4">
                <li>
                    <p>
                        <span class="font-bold">Memory Safety Without a Garbage Collector</span> — Rust uses
                        ownership and lifetimes, making it predictable and efficient — perfect for
                        microcontrollers.
                    </p>
                </li>
                <li>
                    <p>
                        <span class="font-bold">No Runtime Required</span> — Can run without a standard library
                        (no-std) for bare metal.
                    </p>
                </li>
                <li>
                    <p>
                        <span class="font-bold">Modern Tooling</span> — Cargo, <code>rust-analyzer</code>,
                        <code>probe-rs</code>, plus ecosystems like <code>embedded-hal</code>,
                        <code>cortex-m</code>, <code>esp-idf-hal</code>.
                    </p>
                </li>
                <li>
                    <p>
                        <span class="font-bold">Portability and Interop</span> — Easily call into C when needed;
                        many use C for drivers and Rust for logic.
                    </p>
                </li>
                <li>
                    <p>
                        <span class="font-bold">Better Dev Experience</span> — Compiler guides you, failing
                        loudly and early to save time.
                    </p>
                </li>
            </ol>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
            <h2 class="text-2xl font-bold">👨🏿‍💻 Real Talk: When to Pick What</h2>
            <h3 class="text-xl font-semibold">✅ Choose C++ if:</h3>
            <ul class="list-disc list-inside space-y-1">
                <li>You’re working with legacy code or legacy toolchains</li>
                <li>You need a specific SDK that only supports C/C++</li>
                <li>You have very tight deadlines and an experienced C++ team</li>
                <li>You're optimizing every nanosecond and byte on ancient MCUs</li>
            </ul>
            <h3 class="text-xl font-semibold">✅ Choose Rust if:</h3>
            <ul class="list-disc list-inside space-y-1">
                <li>You’re starting a new project and want to avoid memory bugs</li>
                <li>You care about safety, readability, and long-term maintainability</li>
                <li>
                You want to bring <span class="font-bold">modern development practices</span> into
                embedded
                </li>
                <li>You plan to scale — teams using Rust onboard more safely</li>
            </ul>
            <blockquote
                class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
            >
                <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300">
                    “The future of embedded is <span class="font-bold">safe by default</span>. Rust is not a
                    trend — it’s an upgrade.”
                </p>
            </blockquote>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
        <h2 class="text-2xl font-bold">🌍 What This Means for Africa</h2>
        <p>
            If African developers and startups adopt Rust early for embedded systems, we can leapfrog
            outdated tooling and practices. This is our
            <span class="font-bold">opportunity to build safer, more reliable</span>, and
            <span class="font-bold">future-proof hardware products</span> — without the burden of legacy
            debt.
        </p>
        <p>
            From low-cost medical devices, to rural automation, to industrial control systems —
            <span class="font-bold"
            >Rust can help us build hardware that doesn't just work, but lasts.</span
            >
        </p>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
        <h2 class="text-2xl font-bold">⚡ BitPulse’s Position</h2>
        <p>
            At BitPulse, we’re betting on Rust. We prototype with it. We simulate with it. As we prepare
            for hardware deployment across various sectors, Rust gives us:
        </p>
        <ul class="list-disc list-inside space-y-1">
            <li>More <span class="font-bold">confidence</span> in our systems</li>
            <li>More <span class="font-bold">maintainability</span> in our codebase</li>
            <li>
            More <span class="font-bold">peace of mind</span> when deploying to real environments
            </li>
        </ul>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
        <h2 class="text-2xl font-bold">💬 Final Word</h2>
        <p>
            C++ walked so Rust could run. In the end, both are powerful tools. But Rust is leading a new
            movement — one that’s obsessed with
            <span class="font-bold">reliability, control, and safety</span> at all costs.
        </p>
        <blockquote
            class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
        >
            <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300">
            “In Africa, we don’t just need code. We need code that never forgets what it’s connected
            to.”
            </p>
        </blockquote>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
        <h2 class="text-2xl font-bold">🧪 Curious to Try?</h2>
        <p>Here’s where to start:</p>
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
            <a
                href="https://github.com/rust-embedded/awesome-embedded-rust"
                target="_blank"
                class="text-orange-500 underline"
                >awesome-embedded-rust</a
            >
            </li>
            <li>
            <a
                href="https://docs.rs/cortex-m-rt/latest/cortex_m_rt/"
                target="_blank"
                class="text-orange-500 underline"
                >Real-time interrupt-driven code using cortex-m-rt</a
            >
            </li>
        </ul>
        <p>Or check out what we’re building at BitPulse — some projects will be open-sourced soon!</p>
        </section>

        <hr class="border-gray-700" />

        <section class="space-y-4 text-lg">
        <h2 class="text-2xl font-bold">📣 Join the Conversation</h2>
        <ul class="list-disc list-inside space-y-1">
            <li>Are you using C++ or Rust for your embedded projects?</li>
            <li>What’s your biggest pain point with embedded development?</li>
            <li>
            Would you like to see tutorials or kits from BitPulse to kickstart embedded Rust in
            Africa?
            </li>
        </ul>
        <blockquote
            class="p-4 border-l-4 border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded"
        >
            <p class="text-md italic leading-relaxed text-gray-700 dark:text-gray-300 font-bold">
            Let’s build the future — safely, together.
            </p>
        </blockquote>
        </section>
    </div>
</template>
