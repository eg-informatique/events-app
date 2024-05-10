<template>
    <div>
        <div class="grid lg:grid-cols-4 gap-7">
            <div v-for="event in events" class="border rounded-lg">
                <EventCard :event='event'/>
            </div>
        </div>
    </div>
</template>

<script setup>
    //Get events from api
    const { data: events } = await useFetch('https://events-api.org/events')
    definePageMeta({ auth: false })
</script>

<style scoped>

</style>