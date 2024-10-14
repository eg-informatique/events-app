<template>
    <div>
        <UBreadcrumb :links="links" class="mb-2"/>
        <VenueDetailsCard :venue='venue'/>
    </div>
</template>

<script setup>
    const { t } = useI18n()
    const { id } = useRoute().params
    const uri = 'https://events-api.org/venue/' + id
    const { data : venue } = await useFetch(uri, { key: id })
    const localPath = useLocalePath()

    const route = useRoute();
    const eventId = route.query.e_id
    const eventName = route.query.e_name

    let links = [{
            label: t('home_nav'),
            icon: 'i-heroicons-home',
            to: '/'
        },{
            label: `${venue.value.name}`,
            icon: 'i-mdi-map-marker',
        }]
    if(eventId){
        console.log("c dedans")
        links = [{
            label: t('home_nav'),
            icon: 'i-heroicons-home',
            to: '/'
        }, {
            label: `${eventName}`,
            icon: 'i-heroicons-square-3-stack-3d',
            to:`${localPath('/event/' + eventId)}`
        },{
            label: `${venue.value.name}`,
            icon: 'i-mdi-map-marker',
        }]
    }
    

    if (!venue.value) {
        throw createError({statusCode: 404, statusMessage: 'Venue not found'})
    }
    definePageMeta({ auth: false })
</script>

<style lang="scss" scoped>

</style>