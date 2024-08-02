<template>
    <UCard class="block lg:hidden z-50">
        <template #header>
            <p class="text-xl font-bold mt-3">{{ event.title }}</p>
        </template>
        <div class="flex flex-col items-center space-y-4">
            <img class="rounded-md w-full" :src="event.img_url">
            <article class="w-full px-2">
            <p class="font-bold text-lg">{{ $t('events_details_description') }} :</p>
            <p class="font-bold text-gray-700 dark:text-gray-400 break-words" v-html="formatDescription(event.description)"></p>
            </article>
        </div>

        <div class="mt-2 px-2">
            <h1 class="font-bold">{{ $t('events_details_venue_name') }} :</h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venueData.name }}</p>
        </div>
        <div class="mt-2 px-2">
            <h1 class="font-bold">{{ $t('events_details_dates') }} :</h1>
            <p class="font-bold ml-2 text-gray-600 dark:text-gray-400">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        </div>

        <div v-if="event.prices.minor === event.prices.major" class="mt-2 px-2">
            <h1 class="font-bold">{{ $t('events_details_prices') }} :</h1>
            <p class="flex font-bold text-gray-600 dark:text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="mt-2 px-2">
            <h1 class="font-bold">{{ $t('events_details_prices') }} :</h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>

        <template #footer>
            <TicketSelector/>
        </template>
    </UCard>

    <UCard class="hidden lg:block z-50">
        <template #header>
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
        </template>
        <div class="flex items-start space-x-7">
            <img class="rounded-md w-[350px]" :src="event.img_url">
            <article class="flex-1">
                <p class="font-bold break-keep text-xl">{{ $t('events_details_description') }} :</p>
                <p class="font-bold text-gray-700 dark:text-gray-400 break-words md:break-normal" v-html="formatDescription(event.description)"></p>
            </article>
            <div class="flex-shrink-0">
                <USkeleton class="h-[300px] w-[450px]" />
            </div>
        </div>

        <div class="flex">
            <h1 class="font-bold">{{ $t('events_details_venue_name') }} : </h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venueData.name }}</p>
        </div>
        <div class="flex mt-1.5">
            <h1 class="font-bold">{{ $t('events_details_dates') }} : </h1>
            <p class="font-bold ml-2 text-gray-600 dark:text-gray-400">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        </div>
        
        <div v-if="event.prices.minor===event.prices.major" class="flex mt-1.5">
            <h1 class="font-bold">{{ $t('events_details_prices') }} : </h1>
            <p class="flex font-bold text-gray-600 dark:text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="flex mt-1.5">
            <h1 class="font-bold">{{ $t('events_details_prices') }} : </h1>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
        </div> 
        <template #footer>
            <TicketSelector/>
        </template>
    </UCard>
</template>

<script setup>
    const { $formatShortDate } = useNuxtApp()
    const { event } = defineProps(['event'])
    const venue = await fetch(`https://events-api.org/venue/${event.venue}`)
    const venueData = await venue.json()

    const formatDescription = (description) => {
        return description.replace(/\n/g, '<br><br>');
    };
</script>

<style scoped>

</style>