<template>
    <div>
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        :placeholder="$t('search_venues')"
        class="search-bar"
        variant="none"
        size="xl"
        v-model="searchQuery"
        @input="fetchVenues"
      />
  
      <div 
        v-for="venue in venues" 
        :key="venue.id"  
        @click="() => selectVenue(venue.id)"
        :class="['cursor-pointer rounded p-4 border-b border-gray-200 dark:border-gray-700 hover:scale-[102%] transition', 
          { 'bg-gray-200 dark:bg-gray-700': selectedVenue === venue.id, 
            'hover:bg-gray-100 dark:hover:bg-gray-800': selectedVenue !== venue.id 
          }]"
      >
        <VenuePickerVenueDisplay :venue="venue"/>
      </div>  
    </div>
    <div v-if="emptyState">
      <p class="font-bold">{{ $t('create_event_venue_empty') }}</p>
    </div>
  </template>
  
  <script setup>

  const emptyState = ref(false);
  const searchQuery = ref('');
  const venues = ref([]);
  const selectedVenue = ref(null);
  const emit = defineEmits('venue-selected')
  
  const fetchVenues = async () => {
    emptyState.value = false;
    try {
      const response = await fetch(`https://events-api.org/venues?search=${searchQuery.value}`);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.length === 0) {
        emptyState.value = true;
      }
      venues.value = responseJson;
    } catch (err) {
      console.error(err);
    }
  };
  
  const selectVenue = (venueId) => {
    selectedVenue.value = venueId;
    console.log(venueId)
    emit('venue-selected', venueId);  // Émet l'événement avec l'ID de la venue sélectionnée
  };
  </script>
  
  <style scoped>
  .search-bar {
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  </style>
  