<template>
    <UCard>  
        <div class="flex">
            <img class="rounded-md w-[50px] mx-auto ml-2" :src="event.img_url">
            <p class="font-bold ml-2">{{ event.title }}</p>
        </div>
        <p class="font-bold m-4 text-center">{{ $formatLongDate(event, 'start_datetime') }}</p>
        <div class="grid">
            <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton :label="$t('edit_reservation')" class="text-cente" icon="i-mdi-edit"/>
            
                <template #panel="{ close }">
                    <p class="font-bold">{{ $t('event_details_tickets_title') }}</p>
                    <div class="p-4 flex flex-col items-center space-y-4">
                    <div class="flex items-center space-x-2">
                        <UButton @click="decreaseTickets" label="-" />
                            <UInput v-model.number="nbTickets" type="number" min="0" class="u-input" />
                        <UButton @click="increaseTickets" label="+" />
                    </div>
                    <UButton :label="$t('edit_reservation')" icon="i-mdi-edit" class="text-1xl font-bold mt-3" @click="editReserve(close)"/>
                    </div>
                </template>
            </UPopover>
            
            <UButton class="mt-2" :label="$t('details_btn')" icon="i-mdi-more" :to="`${locaPath('/event/' + `${event.id}`)}`"/>
        </div>
    </UCard>
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
const { $formatLongDate } = useNuxtApp()
const locaPath = useLocalePath()
const { event } = defineProps(["event"])
const { data } = useAuth()
const response = await fetch(`https://events-api.org/user/${data.value.id}`)
const userData = await response.json()
const response2 = await fetch(`https://events-api.org/event_nb_tickets/${event.id}/${userData.user.id}`)
const data2 = await response2.json()
const nbTickets = ref(Number(data2))

const reserveStatusOk = ref(false)
const reserveStatusErr = ref(false)

const editReserve = async (close) => {
        const response2 = await fetch(`https://events-api.org/reserve/${event.id}/${userData.id}/${nbTickets.value}`, {method:'PATCH'})
        if(response2.ok){
            reserveStatusOk.value = true
        }
        close()   
  }

const increaseTickets = () => {
    nbTickets.value++
    console.log(nbTickets.value)
}
  
const decreaseTickets = () => {
    if (nbTickets.value > 0) {
        nbTickets.value--
    }
}


</script>

<style scoped>

</style>