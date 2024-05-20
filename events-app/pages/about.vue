<template>
  <div class="container mx-auto p-8">
    <div class="text-center mb-8">
      <img src="~/assets/logo.png" alt="Logo" class="w-24 mx-auto mb-4">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-50 mb-4">Who Are We?</h1>
      <div class="bg-gray-600 dark:bg-gray-100 h-1 w-full mb-4 mx-auto rounded-sm"></div>
    </div>
    <div class="max-w-3xl mx-auto">
      <p class="text-lg text-center text-gray-700 dark:text-gray-200 leading-relaxed">
        This website was created as part of Petr Szalai and Paul Lasry-Robin's maturity project at Emilie-Gourd College.
        The development of this site spanned over a year. It first involved crafting an API using Flask and Nginx. This
        project is entirely open source and is available on GitHub.
      </p>
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