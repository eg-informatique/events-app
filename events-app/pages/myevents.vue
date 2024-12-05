<template>
    <div v-if="verify">
        <div class="flex items-center justify-between mb-3 mt-1">
            <p class="font-bold text-2xl">{{ $t('dashoard_desc_created_events') }}</p>
            <UButton v-if="showEvent && !statusEvents" :label="$t('account_hide')" icon="i-mdi-keyboard-arrow-down" @click="showHideEvent('hide')" class="mb-3"/>
            <UButton v-if="!showEvent && !statusEvents" :label="$t('account_show')" icon="i-mdi-keyboard-arrow-up" @click="showHideEvent('show')" class="mb-3"/>
        </div>
        <div class="mb-2">
            <UButton :label="$t('home_create_event')" icon="i-mdi-plus" @click="isOpen = true"/>
            <UModal v-model="isOpen">
                <CreateEvent :email="email" id=""/>
            </UModal>
        </div>
        <div v-if="showEvent" class="grid lg:grid-cols-6 gap-2">
            <div v-for="event in eventsData" :key="event.id">
                <UCard>  
                    <div class="flex">
                        <img class="rounded-md w-[50px] h-auto mx-auto ml-2" :src="event.img_url">
                        <p class="font-bold">{{ event.title }}</p>
                    </div>
                    <p class="font-bold m-4 text-center">{{ $formatLongDate(event, 'start_datetime') }}</p>
                    <div class="grid">
                        <UButton :label="$t('edit_event')" icon="i-mdi-edit" @click="openEventModal(event.id)" />
                            <UModal v-model="eventEdit[event.id]">
                                <CreateEvent :email="email" :id="event.id"/>
                            </UModal>
                        <UButton class="mt-2" :label="$t('details_btn')" icon="i-mdi-more" :to="`${locaPath('/event/' + `${event.id}`)}`"/>
                    </div>
                </UCard>
            </div>
        </div>

        <div class="flex items-center justify-between mb-3 mt-5">
            <p class="font-bold text-2xl">{{ $t('dashboard_desc_created_venues') }}</p>
            <UButton v-if="showVenue && !statusVenues" :label="$t('venue_hide')" icon="i-mdi-keyboard-arrow-down" @click="showHideVenue('hide')" class="mb-3"/>
            <UButton v-if="!showVenue && !statusVenues" :label="$t('venue_show')" icon="i-mdi-keyboard-arrow-up" @click="showHideVenue('show')" class="mb-3"/>
        </div>
        <div class="mb-2">
            <UButton :label="$t('dashboard_create_venue')" icon="i-mdi-plus" @click="isOpenVenue = true"/>
            <UModal v-model="isOpenVenue">
                <CreateVenue :email="email" id=""/>
            </UModal>
        </div>
        <div v-if="showVenue" class="grid lg:grid-cols-6 gap-2">
            <div v-for="venue in venuesData" :key="venue.id">
                <UCard>  
                    <div class="flex">
                        <img class="rounded-md w-[50px] h-auto mx-auto ml-2" :src="venue.img_url">
                        <p class="font-bold">{{ venue.name }}</p>
                    </div>
                    <p class="font-bold m-4 text-center">{{ venue.adress }}</p>
                    <div class="grid">
                        <UButton :label="$t('edit_venue')" icon="i-mdi-edit" @click="openVenueModal(venue.id)"/>
                        <UModal v-model="venueEdit[venue.id]">
                            <CreateVenue :email="email" :id="venue.id"/>
                        </UModal>
                        <UButton class="mt-2" :label="$t('details_btn')" icon="i-mdi-more" :to="`${locaPath('/venue/' + `${venue.id}`)}`"/>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
    <div v-if="!verify" class="justify-center text-center">
        <p class="font-bold text-2xl m-6">{{ $t("not_verify_myevents_txt") }}</p>
        <NotVerifiedEmail :email="data.user.email" class="mb-3"/>    
    </div>
</template>

<script setup>
const isOpen = ref(false)
const isOpenVenue = ref(false)
const venueEdit = reactive({})
const eventEdit = reactive({})
const { data } = useAuth()
const { $formatLongDate } = useNuxtApp()
const locaPath = useLocalePath()
const email = data.value.user.email
const response = await fetch(`https://events-api.org/user?email=${email}`)
const userData = await response.json()
const response2 = await fetch(`https://events-api.org/events?c=${userData.user.id}`)
const eventsData = await response2.json()
const response3 = await fetch(`https://events-api.org/venues?c=${userData.user.id}`)
const venuesData = await response3.json()
const showEvent = ref(true)
const showVenue = ref(true)
const statusEvents = ref(false)
const statusVenues = ref(false)

const verify = ref(true)
if (userData.user.verify == false ){
    verify.value == false
}

const openEventModal = (eventId) => {
  eventEdit[eventId] = true;
}
const openVenueModal = (venueId) => {
    venueEdit[venueId] = true;
}
const showHideEvent = (value) => {
    if(value == 'hide'){
      showEvent.value = false
    }
    if(value == 'show'){
        showEvent.value = true
    }
}
const showHideVenue = (value) => {
    if(value == 'hide'){
      showVenue.value = false
    }
    if(value == 'show'){
        showVenue.value = true
    }
}

</script>

<style lang="scss" scoped>

</style>