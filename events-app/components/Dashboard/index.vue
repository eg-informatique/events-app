<template>
  <CompactEventCard :userId="userData.user.id"/>
  <div class="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4">
    <div class="col-span-1 md:col-span-2 md:row-span-5 w-full">
      <UButton :label="$t('show_event')"  @click="changeValue('event')" class="mb-2"/>
      <DashboardCreateEvent v-if="showEvent" :email="email"></DashboardCreateEvent>
    </div>
    <div class="col-span-1 md:col-span-2 md:row-span-5 md:col-start-4 w-full">
      <UButton :label="$t('show_venue')" @click="changeValue('venue')" class="mb-2"/>
      <DashboardCreateVenue v-if="showVenue"></DashboardCreateVenue>
    </div>
  </div>
  </template>
  
<script setup>
  const showEvent = ref(false)
  const showVenue = ref(false)

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

  const {email} = defineProps(['email'])
  const response = await fetch(`https://events-api.org/user?email=${email}`)
  const userData = await response.json()
  
  console.log(userData.user.id)

</script>
