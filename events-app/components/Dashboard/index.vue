<template>
  <!--Buton show/hide events-->
  <div class="flex items-center justify-between mb-3">
    <p class="font-bold text-2xl">{{ $t('dashoard_desc_register_events') }}</p>
    <UButton v-if="showRegisterEvents && !statusEvents" :label="$t('account_hide')" icon="i-mdi-keyboard-arrow-down" @click="showHideEvent('hide')" class="mb-3"/>
    <UButton v-if="!showRegisterEvents && !statusEvents" :label="$t('account_show')" icon="i-mdi-keyboard-arrow-up" @click="showHideEvent('show')" class="mb-3"/>
  </div>
  <!--Events (registred)-->
  <p v-if="statusEvents" class="text-lg text-center text-gray-700 dark:text-gray-200">{{ $t('no_event_register') }}</p>
  <div v-if="showRegisterEvents" class="grid lg:grid-cols-6 gap-2">
    <div v-for="event in allEventsData" :key="event.id">
      <CompactEventCard :event="event" class="lg:w-[225px] mb-2"/>
    </div>
  </div>
  <!--Create event/venue-->
  <UDivider class="my-5"/>
  <p class="font-bold text-2xl">{{ $t('dashboard_desc_creation') }}</p>
  <p class="font-bold text mb-4">{{ $t('dashboard_desc_creation_deep') }}</p>
  <div class="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4">
    <div class="col-span-1 md:col-span-2 md:row-span-5 w-full">
      <UButton :label="$t('show_event')"  @click="changeValue('event')" class="mb-2"/>
      <DashboardCreateEvent v-if="showEvent" :email="email"></DashboardCreateEvent>
    </div>
    <div class="col-span-1 md:col-span-2 md:row-span-5 md:col-start-4 w-full">
      <UButton :label="$t('show_venue')" @click="changeValue('venue')" class="mb-2"/>
      <DashboardCreateVenue v-if="showVenue" :email="email"></DashboardCreateVenue>
    </div>
  </div>
  </template>
  
<script setup>
  const showEvent = ref(false)
  const showVenue = ref(false)
  const statusEvents = ref(false)
  const showRegisterEvents = ref(true)

  const changeValue = (value) => {
    const count1 = ref(false)
    const count2 = ref(false)
    if(value == 'event'){
      if(showEvent.value == true) {
        showEvent.value = false
        return null
      }
      showEvent.value = true
    }
    if(value == 'venue'){
      if(showVenue.value == true) {
        showVenue.value = false
        return null
      }
      showVenue.value = true
    }
  }

  const showHideEvent = (value) => {
    if(value == 'hide'){
      showRegisterEvents.value = false
    }
    if(value == 'show'){
      showRegisterEvents.value = true
    }
  }

  const {email} = defineProps(['email'])
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
