<template>
    <div class="mt-7 max-w-sm mx-auto text-center">
        <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
        <p class="mt-7">{{ error.statusMessage }}</p>
        <UButton class="my-7"label="Return Home" icon="i-majesticons-home" @click="handleClearError"/>
    </div>
</template>

<script setup>
    defineProps(['error'])
    const handleClearError = () => clearError({ redirect: '/'})
</script>

<style scoped>

</style>