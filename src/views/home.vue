<template>
    <div class="min-h-screen bg-white flex flex-col justify-center items-center text-center px-4">
      <img src="../assets/bitpulse_monogram_transparent.png" alt="BitPulse Logo" class="h-24 mb-6" />
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        BitPulse is Launching Soon
      </h1>
      <p class="text-gray-600 text-lg mb-8 max-w-xl">
        A new wave of innovation is coming — powerful systems, smart infrastructure, and purposeful technology for the world and beyond.
      </p>
  
      <form class="w-full max-w-md">
        <div class="flex items-center border-b border-gray-300 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Enter your email to get notified"
            aria-label="Email"
          />
          <button
            class="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
            type="submit"
          >
            Notify Me
          </button>
        </div>
      </form>
  
      <div class="mt-10 text-gray-500 text-sm">
        &copy; 2025 BitPulse. All rights reserved.
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage'
  }
  </script>
  
  <style scoped>
  /* You can add transitions or animations here later */
  </style>
  