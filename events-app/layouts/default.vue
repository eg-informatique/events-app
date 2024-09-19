<template>
  <div class="grid lg:flex min-h-screen">
    <Sidebar />
    <div class="flex flex-col w-full">
      <div class="flex-grow p-5 overflow-auto mt-20">
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>