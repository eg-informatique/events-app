<template>
  <div class="container mx-auto p-8">
    <div class="text-center mb-8">
      <img src="~/assets/logo.png" alt="Logo" class="w-24 mx-auto mb-4">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Who Are We?</h1>
      <div class="bg-gray-600 h-1 w-full mb-4 mx-auto rounded-sm"></div>
    </div>
    <div class="max-w-3xl mx-auto">
      <p class="text-lg text-center text-gray-700 leading-relaxed">
        This website was created as part of Petr Slazai and Paul Lasry-Robin's maturity project at Emilie-Gourd College.
        The development of this site spanned over a year. It first involved crafting an API using Flask and Nginx. This
        project is entirely open source and is available on GitHub.
      </p>
      <div class="flex justify-center mt-8">
        <!--      
<img src="~/assets/image1.jpg" alt="Image 1" class="w-64 h-64 rounded-lg shadow-md mr-4 animate-pulse">
        <img src="~/assets/image2.jpg" alt="Image 2" class="w-64 h-64 rounded-lg shadow-md ml-4 animate-pulse">
      -->
      </div>
    </div>
  </div>
</template>
<script setup>
  useHead({
    title: 'Events Manages | About'
  })
  definePageMeta({
    auth: false
  })
</script>

<style scoped>

</style>