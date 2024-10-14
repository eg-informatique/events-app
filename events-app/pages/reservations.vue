<template>
    <p class="font-bold text-2xl mb-3">{{ $t('dashoard_desc_register_events') }}</p>
    <p v-if="statusEvents" class="text-lg text-center text-gray-700 dark:text-gray-200">{{ $t('no_reserved_events') }}</p>
    <div v-if="showRegisterEvents" class="grid lg:grid-cols-6 gap-2">
        <div v-for="event in allEventsData" :key="event.id">
            <CompactEventCard :event="event" class="mb-2"/>
        </div>
    </div>
</template>

<script setup>
const statusEvents = ref(false)
const showRegisterEvents = ref(true)
const { data } = useAuth()
const email = data.value.user.email
const response = await fetch(`https://events-api.org/user?email=${email}`)
const userData = await response.json()
const response2 = await fetch(`https://events-api.org/event_list/${userData.user.id}`)
const eventsId = await response2.json()
const allEventsData = []
for(const events in eventsId){
    const response3 = await fetch(`https://events-api.org/event/${eventsId[events]}`)
    if (response2.ok){
        const eventsData = await response3.json()
        allEventsData.push(eventsData) 
    }else if(response2.status == 404){
        showRegisterEvents.value == false
        statusEvents.value = true
        console.log('Ca se voit')
    }
}
</script>

<style scoped>

</style>