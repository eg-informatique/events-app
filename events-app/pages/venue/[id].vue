<template>
    <div>
        <VenueDetailsCard :venue='venue'/>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
    const uri = 'https://events-api.org/venue/' + id
    const { data : venue } = await useFetch(uri, { key: id })

    if (!venue.value) {
        throw createError({statusCode: 404, statusMessage: 'Venue not found'})
    }
    definePageMeta({ auth: false })
</script>

<style lang="scss" scoped>

</style>