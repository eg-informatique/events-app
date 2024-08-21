<template>
    <UCard>  
        <div class="flex">
            <img class="rounded-md w-[50px] mx-auto ml-2" :src="event.img_url">
            <p class="font-bold">{{ event.title }}</p>
        </div>
        <p class="font-bold m-4 text-center">{{ $formatLongDate(event, 'start_datetime') }}</p>
        <div class="grid">
            <UButton :label="$t('edit_reservation')" icon="i-mdi-edit"/>
            <UButton class="mt-2" :label="$t('details_btn')" icon="i-mdi-more" :to="`${locaPath('/event/' + `${event.id}`)}`"/>
        </div>
    </UCard>
</template>

<script setup>
const { $formatLongDate } = useNuxtApp()
const locaPath = useLocalePath()
const { event } = defineProps(["event"])
const { data } = useAuth()
const response = await fetch(`https://events-api.org/user?email=${data.value.user.email}`)
const userData = await response.json()
const response2 = await fetch(`https://events-api.org/event_nb_tickets/${event.id}/${userData.user.id}`)
const nbTickets = await response2.json()
</script>

<style scoped>

</style>