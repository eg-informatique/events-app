<template>
    <UCard>
        <template #header>
            <p class="font-bold">{{ event.title }}</p>
        </template>
        <img class="rounded-md w-[200px] mx-auto " :src="event.img_url">
        <p class="font-bold m-4 text-center">{{ $formatDate(event, 'start_datetime') }}</p>
        <template #footer class="items-center">
            <UButton class="text-center" 
                label="Details"
                icon="i-mdi-more"
                :to="`/event/${event.id}`"/>  
        </template> 
    </UCard>
</template>

<script setup>
    const { $formatDate } = useNuxtApp()
    const { event } = defineProps(['event'])
</script>

<style scoped>

</style>