<template>
    <div v-for="event in events" class="h-full">
        <div>
        <Head>
            <Title>Events Manager | {{ event.title }}</Title>
        </Head>
    </div>
        <div class="container text-center p-3 rounded-md bg-white shadow-md h-full">
            <img class="rounded-md w-[200px] mx-auto " :src="event.img_url">
            <p class="font-bold text-gray-700 m-4 ">{{ event.title }}</p>
            <p class="font-bold text-gray-700 m-4 ">{{ useDateFormat(event.start_datetime, "dddd DD MMMM, YYYY") }}</p>
    </div>
    </div>
</template>

<script setup>
    import { useDateFormat } from '@vueuse/core';
    const { id } = useRoute().params
    const uri = 'https://events-api.org/event/' + id
    const { data : events } = await useFetch(uri, { key: id })
    if (!events.value) {
        throw createError({statusCode: 404, statusMessage: 'Event not found'})
    }
</script>

<style scoped>

</style>