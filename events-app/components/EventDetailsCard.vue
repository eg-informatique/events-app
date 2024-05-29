<template>
    <UCard class="block sm:hidden">
        <template #header>
            <img class="rounded-md w-[400px] mx-auto " :src="event.img_url">
        </template>
        <div v-if="event.prices.minor===event.prices.major" class="grid grid-cols-3 grid-rows-1 ">
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
            <p class="flex font-bold text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="grid grid-cols-3 grid-rows-1 ">
            <p class="text-2xl font-bold col-span-2">{{ event.title }}</p>
            <p class="font-bold text-gray-400 col-start-3 mt-1.5">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
            
        </div> 
        <p class="font-bold text-gray-400">{{ venueData.name }}</p>
        <p class="font-bold mt-1.5">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        <div class="w-[3/4] break-words md:break-all">
           <p class="font-bold ">{{ event.description }}</p> 
        </div>
            <UButton square label="Button" class="text-1xl font-bold mt-3" variant="solid">Button</UButton>
    </UCard>

    <UCard class="hidden sm:block">
        <template #header>
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
        </template>
            <div class="flex items-start space-x-7">
                <img class="rounded-md w-[400px] " :src="event.img_url">
                <p class="font-bold w-[1] flex-grow break-words md:break-all">{{ event.description }}</p>
                <USkeleton class="h-[300px] w-[450px] margin-left: auto;" />
            </div>
            
        <p class="font-bold text-gray-400">{{ venueData.name }}</p>
        <p class="font-bold mt-1.5">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        <div class="w-[3/4] break-words md:break-all">
        </div>
        <div v-if="event.prices.minor===event.prices.major" class=" grid-rows-1 ">
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
            <p class="flex font-bold text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="grid grid-cols-3 grid-rows-1 ">
            <p class="font-bold text-gray-400 mt-1.5">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
            
        </div> 
        <template #footer>
            <UButton square label="Button" class="text-1xl font-bold mt-3" variant="solid">Reserve</UButton>
        </template>
    </UCard>


    <!--Pettttttre, la documentation de <Ucard> ==> https://ui.nuxt.com/components/card et les champs de l'api (evenement) ==> https://events-api.org/events
        Si tu veux utiliser un champs de l'api tu fais comme au dessus: event.title par ex. Si tu veuc l'ajouter a de l'HTML comme au dessus tu
        dois utilise {{  }}
        Si tyu veux voir les champs de l'api pour la venue ==> https://events-api.org/venue/f7dd7ab4-855d-4cfd-9ee7-50660f7f34ec
        MTN tu fais !!!!!!!!!!!!!!!!!!
    -->

</template>

<script setup>
    const { $formatShortDate } = useNuxtApp()
    const { event } = defineProps(['event'])
    const venue = await fetch(`https://events-api.org/venue/${event.venue}`)
    const venueData = await venue.json()
</script>

<style scoped>

</style>