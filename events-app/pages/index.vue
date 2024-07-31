<template>
    <div class="parent-container">
        <div class="right-06 mb-3">
            <UPopover mode="hover" :popper="{ placement: 'top-end' }">
                <UButton color="white" :label="$t('home_sort_by_btn')" trailing-icon="i-heroicons-chevron-down-20-solid" />
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

    <div v-if="pending" class="flex flex-col items-center justify-center h-full">
        <Icon name="line-md:loading-twotone-loop" size="80px"/>
    </div>
    <div v-else-if="error" class="flex flex-col items-center justify-center h-full">
        <p class="text-red-500 font-bold">{{ $t('index_loading_error') }}</p>
    </div>
    <div v-else class="grid lg:grid-cols-4 gap-7">
        <div v-for="event in sortedEvents" :key="event.id">
            <EventCard :event="event" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { data: events, pending, error } = useLazyFetch('/api/fetchEvents');
definePageMeta({ auth: false });

const buttonLabel = ref("Sort By"); // ne marche pas encore, je narrive pas a le traduire pour le moment.
const sortOrder = ref('ascending');

const sortedEvents = computed(() => {
    if (!events.value) return [];

    return events.value.slice().sort((a, b) => {
        const dateA = new Date(a.start_datetime);
        const dateB = new Date(b.start_datetime);

        if (sortOrder.value === 'ascending') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });
});

const changeSortOrder = (newLabel, order, close) => {
    buttonLabel.value = newLabel;
    sortOrder.value = order;
    close();
};
</script>

<style scoped>
.parent-container {
    display: flex; 
}

.right-06 {
    margin-left: auto;  
}

.button-container {
    padding: 0px 0;  
}
</style>