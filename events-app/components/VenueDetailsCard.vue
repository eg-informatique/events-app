<template>
    <p>{{ venue }}</p>

    <UCard class="block lg:hidden z-50">
        <template #header>
            <p class="text-xl font-bold mt-3">{{ venue.name }}</p>
        </template>

        <div class="mt-2 px-2">
            <h1 class="font-bold">{{ $t('venue_name') }} :</h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.address }}</p>
        </div>

        <iframe
            width="600"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src=uri>
        </iframe>
    </UCard>

    <UCard class="hidden lg:block z-50">
        <template #header>
            <p class="text-2xl font-bold mt-3">{{ venue.name }}</p>
        </template>

        <div class="flex">
            <h1 class="font-bold">{{ $t('events_details_venue_name') }} : </h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venue.address }}</p>
        </div>
        <iframe
            width="600"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            :src=uri>
        </iframe>
    </UCard>   

</template>

<script setup>
const { venue } = defineProps(['venue'])
console.log(venue.address);

const uri = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBoVK4uOknJxX1yDT1bXga0RehiHXhp9ck
                &q=${venue.address}, ${venue.zipcode} ${venue.city}, ${venue.country}`
</script>

<style lang="scss" scoped>

</style>