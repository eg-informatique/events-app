<template>
    <div class="mt-7 max-w-sm mx-auto text-center">
        <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
        <p class="mt-7">{{ error.statusMessage }}</p>
        <button class="my-7 bg-white font-bold py-2 px-4 rounded hover:bg-neutral-100 hover:scale-[101%]" @click="handleClearError">Go home</button>
    </div>
</template>

<script setup>
    defineProps(['error'])
    const handleClearError = () => clearError({ redirect: '/'})
</script>

<style scoped>

</style>