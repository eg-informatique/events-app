<template>
  <div class="flex flex-col min-h-screen">
    <div class="w-full p-5">
      <Sidebar />
    </div>

    <div class="flex-grow p-5 overflow-auto">
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>