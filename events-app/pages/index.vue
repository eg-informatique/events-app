<template>
  <div>
    <div class="parent-container" flex items-end>
      <div class="flex justify-between items-center mb-3 w-full " >
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          :placeholder="$t('search_events')"
          class="search-bar"
          variant="none"
          size="xl"
          v-model="searchQuery"
          @change="fetchEvents"
        />
      </div>
      <div class="right-7 mb-1" >
        <UButton v-if="authenticated" :label="$t('home_create_event')" to="/account" icon="i-mdi-plus" class="mb-2"/>
        <UButton v-else :label="$t('home_create_event')" to="/login" icon="i-mdi-sign-in" class="mb-2"/>

        <UPopover mode="hover" :popper="{ placement: 'top-end' }">
          <UButton :label="$t('home_sort_by_btn')" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel="{ close }">
              <div class="button-container mb-3">
                <UButton :label="$t('home_datesort_asc')" @click="() => changeSortOrder($t('home_datesort_asc'), 'ascending', close)" />
              </div>
              <div class="button-container">
                <UButton :label="$t('home_datesort_desc')" @click="() => changeSortOrder($t('home_datesort_desc'), 'descending', close)" />
              </div>
            </template>
        </UPopover>
      </div>
    </div>
    <div v-if="emptyState" class="flex flex-col items-center justify-center h-full mt-20">
      <Icon name="line-md:compass-loop" size="80px"/>
      <p class="text-red-500 font-bold text-1xl">{{ $t("home_no_result") }}</p>
    </div>
    <div class="flex">
      <div class="grid lg:grid-cols-3 gap-7 flex-grow">     
        <div v-for="event in events" :key="event.id" >
          <EventCard :event="event" />
        </div>
      </div>
      <UPopover :popper="{ placement: 'bottom-start' }" overlay class="block lg:hidden">
          <UButton icon="i-heroicons-calendar-days-20-solid"/>
          <template #panel="{ close }">
              <div class="flex flex-col items-center space-y-2">
                <DatePicker v-model="date" mode="date" is24hr is-required @update:modelValue="updateDate"/> 
                <UButton :label="$t('home_all_btn')" class="mb-2" @click="dateToNull"/>
              </div>
          </template>
      </UPopover>
      <div class="hidden lg:block ml-5">
        <ClientOnly>
          <DatePicker v-model="date" class="top-0 flex-shrink-0 self-start" mode="date" is24hr is-required @update:modelValue="updateDate"/>
          <UButton :label="$t('home_all_btn')" class="mt-2" @click="dateToNull"/>
        </ClientOnly>
      </div>
    </div>
    <div class="flex justify-center mt-7">
      <UPagination
        v-model="page"
        :page-count="12"
        :total="nb_events_data"
        @click="fetchEvents"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

definePageMeta({ auth: false });
const authenticated = ref(false)
const { status } = useAuth()
if(status.value == 'authenticated'){
    authenticated.value = true
}

const nb_events = await fetch('https://events-api.org/nb_events')
const nb_events_data = await nb_events.json()
const page = ref(1)

const searchQuery = ref('');
const emptyState = ref(false)

const buttonLabel = ref("Sort By");
const sortOrder = ref('ascending');
const date = ref(new Date().toISOString().split('T')[0])
const dateOnly = ref('')
const events = ref({})

const response = await fetch(`https://events-api.org/events?search=${searchQuery.value}&page=${page.value-1}&sort=${sortOrder.value}`);
events.value = await response.json()



const updateDate = (date) => {
  dateOnly.value = date.toISOString().split('T')[0]
  console.log(dateOnly.value)
  fetchEvents()
}

const changeSortOrder = (newLabel, order, close) => {
  buttonLabel.value = newLabel;
  sortOrder.value = order;
  fetchEvents()
  close();
};

const dateToNull = () => {
  dateOnly.value = null
  fetchEvents()
}

const fetchEvents = async () => {
  console.log(dateOnly.value)
  emptyState.value = false
  if(dateOnly.value == null){
    try {
    const response = await fetch(`https://events-api.org/events?search=${searchQuery.value}&page=${page.value-1}&sort=${sortOrder.value}`);
    const responseJson = await response.json()
    if (responseJson.length == 0){
      emptyState.value = true
    }
    events.value = responseJson
    
    } catch (err) {
      console.error(err)   
    }
  }
  else{
    try {
    const response = await fetch(`https://events-api.org/events?search=${searchQuery.value}&page=${page.value-1}&d=${dateOnly.value}&sort=${sortOrder.value}`);
    const responseJson = await response.json()
    if (responseJson.length == 0){
      emptyState.value = true
    }
    events.value = responseJson
    
    } catch (err) {
      console.error(err)   
    }
  }
  
};

watch(searchQuery, page, sortOrder, fetchEvents);
</script>

<style scoped>
.parent-container {
    display: flex; 
    align-items: flex-end;
}

.right-06 {
    margin-left: auto;  
    
}

.button-container {
    padding: 0px 0; 
 }

    .search-bar {
  width: 100%;
  max-width: 700px; 
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

</style>