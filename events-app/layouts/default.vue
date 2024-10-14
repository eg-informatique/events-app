<template>
  <div class="flex flex-col min-h-screen w-full overflow-auto">
    <div class="w-full p-5 lg:px-16">
      <Sidebar />

      <div class="pt-16 w-full">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>