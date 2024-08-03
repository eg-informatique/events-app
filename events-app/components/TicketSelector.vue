<!-- components/TicketSelector.vue -->
<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton :label="$t('events_details_open_pophover')" trailing-icon="i-heroicons-chevron-down-20-solid" class="text-1xl font-bold mt-3" variant="solid" />
  
      <template #panel="{ close }">
        <p class="font-bold">{{ $t('event_details_tickets_title') }}</p>
        <div class="p-4 flex flex-col items-center space-y-4">
          <div class="flex items-center space-x-2">
            <UButton @click="decreaseTickets" label="-" />
            <UInput v-model.number="ticketCount" type="number" min="0" class="u-input" />
            <UButton @click="increaseTickets" label="+" />
          </div>
          <UButton :label="$t('events_details_reserve_btn')" class="text-1xl font-bold mt-3" @click="reserve(close)" />
        </div>
      </template>
    </UPopover>
    <UAlert v-if="reserveStatusOk"
      icon="i-heroicons-check-circle"
      color="primary"
      variant="solid"
      :title="$t('reserve_ok')"
      :description="$t('reserve_ok_description')"
      class="mt-3"
    />
    <UAlert v-if="reserveStatusErr"
      icon="i-heroicons-exclamation-circle"
      color="red-400"
      variant="solid"
      :title="$t('reserve_err')"
      :description="$t('reserve_err_description')"
      class="mt-3"
    />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const ticketCount = ref(1)
  const reserveStatusOk = ref(false)
  const reserveStatusErr = ref(false)

  const  eventId = defineProps(["eventId"])
  
  const { data, status } = useAuth()
  
  const increaseTickets = () => {
    ticketCount.value++
  }
  
  const decreaseTickets = () => {
    if (ticketCount.value > 0) {
      ticketCount.value--
    }
  }
  
  const reserve = async (close) => {
    if (status.value == 'authenticated') {
        const response = await fetch(`https://events-api.org/user?email=${data.value.user.email}`)
        if (response.ok) {
            const userData = await response.json()
            const response2 = await fetch(`https://events-api.org/reserve/${eventId.eventId}/${userData.user.id}/${ticketCount.value}`, {method:'POST'})
            if(response2.ok){
              reserveStatusOk.value = true
            }
            close()
        }
  }
    
  }
  </script>
  
  <style scoped>
  .u-input {
    width: 3rem;
    text-align: center;
  }
  </style>
  