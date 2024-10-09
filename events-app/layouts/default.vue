<template>
  <div class="flex flex-col min-h-screen w-full overflow-hidden">
    <div class="w-full lg:px-16">
      <Sidebar />

      <div class="flex-grow overflow-auto lg:pt-16 w-full">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>