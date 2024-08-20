<template>
    <UCard>
        <template #header>
            <p >{{ eventsId }}</p>
            <p>{{ allEventsData }}</p>
        </template>
    </UCard>
</template>

<script setup>
const { userId } = defineProps(["userId"])
const response = await fetch(`https://events-api.org/event_list/${userId}`)
const eventsId = await response.json()
const allEventsData = []
for(const events in eventsId){
    const response2 = await fetch(`https://events-api.org/event/${eventsId[events]}`)
    const eventsData = await response2.json()
    allEventsData.push(eventsData)
    
}
console.log(allEventsData)
</script>

<style scoped>

</style>