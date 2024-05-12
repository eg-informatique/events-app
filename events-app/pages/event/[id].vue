<template>
    <div v-for="event in events">
        <EventDetailsCard :event='event'/>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const uri = 'https://events-api.org/event/' + id
    const { data : events } = await useFetch(uri, { key: id })
    if (!events.value) {
        throw createError({statusCode: 404, statusMessage: 'Event not found'})
    }
    definePageMeta({ auth: false })
</script>

<style scoped>

</style>