<template>
    <div class="flex flex-col items-center justify-top px-6 py-8 mx-auto h-screen lg:py-0">
        <img class="rounded-md w-[400px] mx-auto " :src="event.img_url">
        <div v-if="event.prices.minor===event.prices.major">
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
            <p class="flex font-bold text-gray-700">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="grid grid-cols-3 grid-rows-1 ">
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
            <p class="font-bold text-gray-700 col-start-3 mt-5">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div >
            <p class="font-bold text-gray-700 m-4 ">Description : {{ event.description }}</p>
        </div>
        
    </div>
</template>

<script setup>
    import { useDateFormat } from '@vueuse/core';
    const { event } = defineProps(['event'])
</script>

<style scoped>

</style>