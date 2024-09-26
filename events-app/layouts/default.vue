<template>
  <div class="flex flex-col min-h-screen">
    <div class="w-full p-5">
      <Sidebar />
   
    <div class= "flex-grow p-5 overflow-auto lg:pt-16">
      <slot />
    </div>
  </div>
  

    <!-- Footer -->
    <Footer />
  </div>
</template>