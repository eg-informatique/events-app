<template>
  <div class="grid lg:flex min-h-screen">
    <Sidebar />
    <div class="flex flex-col w-full">
      <div class="flex-grow p-5 overflow-auto">
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>