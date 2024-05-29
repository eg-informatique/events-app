<template>
    <div v-if="pending" class="flex flex-col items-center justify-center h-full">
        <Icon name="line-md:loading-twotone-loop" size="80px"/>
    </div>
    <div v-else-if="error" class="flex flex-col items-center justify-center h-full">
        <p class="text-red-500">Une erreur est survenue lors du chargement des données.</p>
    </div>
    <div v-else class="grid lg:grid-cols-4 gap-7">
        <div v-for="event in events">
            <EventCard :event='event'/>
        </div>
    </div>
</template>

<script setup>
    const { data: events, pending, error } = useLazyFetch('/api/fetchEvents');
    definePageMeta({ auth: false });
</script>

<style scoped>

</style>