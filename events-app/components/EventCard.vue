<template>
    <div class="container text-center p-3 rounded-md bg-white shadow-md h-full">
        <img class="rounded-md w-[200px] mx-auto " :src="event.img_url">
        <p class="font-bold text-gray-700 m-4 ">{{ event.title }}</p>
        <p class="font-bold text-gray-700 m-4 ">{{ $formatDate(event, 'start_datetime') }}</p>
        <NuxtLink :to="`/event/${event.id}`">
            <p class="my-4">View details</p>
        </NuxtLink>
    </div>
</template>

<script setup>
    const { $formatDate } = useNuxtApp()
    const { event } = defineProps(['event'])
</script>

<style scoped>

</style>