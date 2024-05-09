<template>
    <div class="flex items-start justify-between text-center font-bold">
        <h1 class="border-b-2 grow text-5xl">Who are we ?</h1>
    </div>
    <div class="flex items-start justify-between text-center font-normal mt-7">
        <p class="text-1xl">This website was created as part of Petr Slazai and Paul Lasry-Robin's maturity project at
            Emilie-Gourd College. The development of this site spanned over a year. It first involved crafting an API
            using Flask and Nginx. This project is entirely open source and is available on GitHub</p>
    </div>
</template>

<script setup>
    useHead({
        title: 'Events Manages | About'
    })
    definePageMeta({ middleware: 'auth' })
</script>

<style scoped>

</style>