<template>
    <div v-for="event in eventsData" :key="event.id">
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
    </div>
</template>

<script setup>
    const { data } = useAuth()
    const { $formatLongDate } = useNuxtApp()
    const locaPath = useLocalePath()
    const email = data.value.user.email
    const response = await fetch(`https://events-api.org/user?email=${email}`)
    const userData = await response.json()
    const response2 = await fetch(`https://events-api.org/events?c=${userData.user.id}`)
    const eventsData = await response2.json()
</script>

<style lang="scss" scoped>

</style>