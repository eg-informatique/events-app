<template>
    <div class="container text-center p-3 rounded-md bg-white shadow-md h-full">
        <img class="rounded-md w-[200px] mx-auto " :src="event.img_url">
        <p class="font-bold text-gray-700 m-4 ">{{ event.title }}</p>
        <p class="font-bold text-gray-700 m-4 ">{{ useDateFormat(event.start_datetime, "dddd DD MMMM, YYYY") }}</p>
        <NuxtLink :to="`/${event.id}`">
            <p class="my-4">View details</p>
        </NuxtLink>
    </div>
</template>

<script setup>
    import { useDateFormat } from '@vueuse/core';
    const { event } = defineProps(['event'])
</script>

<style scoped>

</style>