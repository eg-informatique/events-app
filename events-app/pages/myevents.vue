<template>
    <div class="flex items-center justify-between mb-3 mt-1">
        <p class="font-bold text-2xl">{{ $t('dashoard_desc_created_events') }}</p>
        <UButton v-if="showEvent && !statusEvents" :label="$t('account_hide')" icon="i-mdi-keyboard-arrow-down" @click="showHideEvent('hide')" class="mb-3"/>
        <UButton v-if="!showEvent && !statusEvents" :label="$t('account_show')" icon="i-mdi-keyboard-arrow-up" @click="showHideEvent('show')" class="mb-3"/>
    </div>
    <div class="mb-2">
        <UButton :label="$t('home_create_event')" icon="i-mdi-plus" @click="isOpen = true"/>
        <UModal v-model="isOpen">
            <DashboardCreateEvent :email="email"/>
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
                    <UButton :label="$t('edit_event')" icon="i-mdi-edit"/>
                    <UButton class="mt-2" :label="$t('details_btn')" icon="i-mdi-more" :to="`${locaPath('/event/' + `${event.id}`)}`"/>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup>
const isOpen = ref(false)
const { data } = useAuth()
const { $formatLongDate } = useNuxtApp()
const locaPath = useLocalePath()
const email = data.value.user.email
const response = await fetch(`https://events-api.org/user?email=${email}`)
const userData = await response.json()
const response2 = await fetch(`https://events-api.org/events?c=${userData.user.id}`)
const eventsData = await response2.json()
const showEvent = ref(true)
const showVenue = ref(false)

const showHideEvent = (value) => {
    if(value == 'hide'){
      showEvent.value = false
    }
    if(value == 'show'){
        showEvent.value = true
    }
}
</script>

<style lang="scss" scoped>

</style>