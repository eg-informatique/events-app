<template>
    <UCard class="block lg:hidden z-50">
        <template #header>
            <p class="text-xl font-bold mt-3">{{ event.title }}</p>
        </template>
        <div class="flex flex-col items-center space-y-4">
            <img class="rounded-md w-full" :src="event.img_url">
            <article class="w-full px-2">
            <p class="font-bold text-lg">{{ $t('events_details_description') }} :</p>
            <p class="font-bold ml-2 text-gray-700 dark:text-gray-400 break-words" v-html="formatDescription(event.description)"></p>
            </article>
        </div>

        <div class="flex mt-4">
            <UIcon name="i-heroicons-calendar-days-20-solid" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="font-bold ml-2 text-gray-600 dark:text-gray-400">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        </div>

        <div v-if="event.prices.minor === event.prices.major" class="flex mt-2">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="flex font-bold text-gray-600 dark:text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="flex mt-2">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div class="flex mt-2">
            <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <NuxtLink :to="`${locaPath('/venue/' + `${venueData.id}`)}?e_id=${event.id}&e_name=${event.title}`">
                <p class="font-bold text-primary hover:underline ml-2">{{ venueData.name }}</p>
            </NuxtLink>
        </div>
        <div class="flex items-center">
            <UIcon name="i-mdi-email" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <a :href="'mailto:' + encodeURIComponent(user.email)" class="text-primary hover:underline ml-2">{{ user.email }}</a>
        </div>
        <template #footer>
            <TicketSelector v-if="authenticated && verify" :eventId="event.id"/>
            <UButton v-else :label="$t('login_to_reserve')" to="/login" icon="i-mdi-sign-in"/>
        </template>
    </UCard>

    <UCard class="hidden lg:block z-50">
        <template #header>
            <p class="text-2xl font-bold mt-3">{{ event.title }}</p>
        </template>
        <div class="flex items-start space-x-7">
            <img class="rounded-md w-[350px]" :src="event.img_url">
            <article class="flex-1">
                <p class="font-bold text-gray-700 dark:text-gray-400 break-words md:break-normal" v-html="formatDescription(event.description)"></p>
            </article>
            <div class="flex-shrink-0 w-full max-w-[550px]">
                <UCard>
                    <template #header>
                        <p class="text-2xl font-bold mt-3">{{ venueData.name }}</p>
                    </template>
                    <iframe
                        class="rounded w-full max-w-[500px] h-[350px] max-h-[350px]"
                        loading="lazy"
                        allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade"
                        :src=uri>
                    </iframe>
                    <UButton :label="$t('details_btn')" class="mt-2" icon="i-mdi-more" :to="`${locaPath('/venue/' + `${venueData.id}`)}?e_id=${event.id}&e_name=${event.title}`"/>
                </UCard> 
            </div>
        </div>

        <div class="flex mt-3">
            <UIcon name="i-mdi-map-marker" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ venueData.name }}</p>
        </div>
        <div class="flex mt-1.5">
            <UIcon name="i-heroicons-calendar-days-20-solid" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="font-bold ml-2 text-gray-600 dark:text-gray-400">{{ $formatShortDate(event, 'start_datetime') }} - {{ $formatShortDate(event, 'end_datetime') }}</p>
        </div>
        
        <div v-if="event.prices.minor===event.prices.major" class="flex mt-1.5">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="flex font-bold text-gray-600 dark:text-gray-400">{{ event.prices.major }} {{ event.prices.currency }}</p>
        </div>
        <div v-else class="flex mt-1.5">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <p class="font-bold text-gray-600 dark:text-gray-400 ml-2">{{ event.prices.minor }} - {{ event.prices.major }} {{ event.prices.currency }}</p>
        </div> 
        <div class="flex items-center">
            <UIcon name="i-mdi-email" class="w-6 h-6 text-gray-900 dark:text-gray-100"/>
            <a :href="'mailto:' + encodeURIComponent(user.email)" class="text-primary hover:underline ml-2">{{ user.email }}</a>
        </div>
        <template #footer>
            <TicketSelector v-if="authenticated && verify" :eventId="event.id"/>
            <UButton v-if="!authenticated" :label="$t('login_to_reserve')" to="/login" icon="i-mdi-sign-in"/>
            <div v-if="!verify && authenticated" class="justify-center text-center">
                <p class="font-bold">{{ $t("not_verify_reservation_txt") }}</p>
                <NotVerifiedEmail :email="data.user.email"/>
            </div>
        </template>
    </UCard>
</template>

<script setup>
    const { $formatShortDate } = useNuxtApp()
    const locaPath = useLocalePath()
    const config = useRuntimeConfig()
    const { event } = defineProps(['event'])
    const venue = await fetch(`https://events-api.org/venue/${event.venue}`)
    const venueData = await venue.json()
    const userData = await fetch(`https://events-api.org/user/${event.organizer}`)
    const user = await userData.json()
    const verify = ref(false)
    const formatDescription = (description) => {
        return description.replace(/\n/g, '<br><br>');
    };
    let email = "example"
    const authenticated = ref(false)
    const { data, status } = useAuth()
    if(status.value == 'authenticated'){
        authenticated.value = true
        const currentUser = await fetch(`https://events-api.org/user?email=${data.value.user.email}`)
        const currentUserData = await currentUser.json()
        if(currentUserData.user.verify == true){
            verify.value = true
        }
        email = data.value.user.email
    }
    
    const apiKey = config.public.googleMapApiKey
    const uri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}
                &q=${venueData.address}, ${venueData.zipcode} ${venueData.city}, ${venueData.country}`
    const emitID = () => {
        emits(`emitID : ${event.id}`)
    }
</script>

<style scoped>

</style>