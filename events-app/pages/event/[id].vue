<template>
    <EventDetailsCard :event='event'/>
</template>

<script setup>
    const { id } = useRoute().params
    const uri = 'https://events-api.org/event/' + id
    const { data : event } = await useFetch(uri, { key: id })
    if (!event.value) {
        throw createError({statusCode: 404, statusMessage: 'Event not found'})
    }
    definePageMeta({ auth: false })
</script>

<style scoped>

</style>