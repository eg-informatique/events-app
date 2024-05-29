<template>
    <UCard>
        <template #header>
            <p class="font-bold">{{ event.title }}</p>
        </template>
        <img class="rounded-md w-[200px] mx-auto " :src="event.img_url">
        <p class="font-bold m-4 text-center">{{ $formatLongDate(event, 'start_datetime') }}</p>
        <template #footer class="items-center">
            <UButton class="text-center" 
                :label="$t('details_btn')"
                icon="i-mdi-more"
                :to="`${locaPath('/event/' + `${event.id}`)}`"/>  
        </template> 
    </UCard>
</template>

<script setup>
    const { $formatLongDate } = useNuxtApp()
    const { event } = defineProps(['event'])
    const locaPath = useLocalePath()
</script>

<style scoped>

</style>