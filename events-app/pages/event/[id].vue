<template>
    <UBreadcrumb :links="links" class="mb-2"/>
    <EventDetailsCard :event='event'/>
</template>

<script setup>
    const { t } = useI18n()
    const { id } = useRoute().params
    const uri = 'https://events-api.org/event/' + id
    const { data : event } = await useFetch(uri, { key: id })

    const localPath = useLocalePath()
    
    const links = [{
        label: t('home_nav'),
        icon: 'i-heroicons-home',
        to: '/'
    }, {
        label: `${event.value.title}`,
        icon: 'i-heroicons-square-3-stack-3d',
        to:`${localPath('/event' + event.id)}`
    }]

    if (!event.value) {
        throw createError({statusCode: 404, statusMessage: 'Event not found'})
    }
    definePageMeta({ auth: false })
</script>

<style scoped>

</style>