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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const ticketCount = ref(1)
  
  const increaseTickets = () => {
    ticketCount.value++
  }
  
  const decreaseTickets = () => {
    if (ticketCount.value > 0) {
      ticketCount.value--
    }
  }
  
  const reserve = async (close) => {
    console.log(ticketCount.value)
    close()
  }
  </script>
  
  <style scoped>
  .u-input {
    width: 3rem;
    text-align: center;
  }
  </style>
  