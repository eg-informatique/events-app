<template>
    <div>
        <UCard >
            <template #header>
                <p class="font-bold">{{ $t('create_event_pageTitle') }}</p>
            </template>
            <div v-if="eventState" class="mb-5 text-center">
                <p class="font-bold text-green-400">{{  $t('event_created') }}</p>
            </div>
            <div v-if="eventConflictState" class="mb-5 text-center">
                <p class="font-bold text-red-400">{{  $t('event_name_conflict') }}</p>
            </div>
            <div v-if="eventErrortState" class="mb-5 text-center">
                <p class="font-bold text-red-400">{{  $t('event_creation_error') }}</p>
            </div>
            <UForm id="form" :state="state" class="space-y-4" :schema="EventValidatonSchemas" @submit="handleFormSubmit">
                <UFormGroup :label="$t('create_event_title')" name="title">
                    <UInput v-model="state.title"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_start')" name="start_datetime">
                    <UPopover :popper="{ placement: 'bottom-start' }" overlay v-model="state.start_datetime">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(startDate, 'd MMM, yyy, HH:mm')" />
                        <template #panel="{ close }" class="inline-block align-top">
                            <div class="flex flex-col items-center space-y-4">
                                <DatePicker v-model="startDate" mode="dateTime" is24hr is-required @update:modelValue="updateStartDatetime"/>
                                <UButton label="Validate" @click="close" />
                            </div>
                        </template>
                    </UPopover>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_end')" name="end_datetime">
                    <UPopover :popper="{ placement: 'bottom-start' }" overlay v-model="state.end_datetime">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(endDate, 'd MMM, yyy, HH:mm')" />
                        <template #panel="{ close }">
                            <div class="flex flex-col items-center space-y-2">
                               <DatePicker v-model="endDate" mode="dateTime" is24hr is-required @update:modelValue="updateEndDatetime"/>
                               <UButton label="Validate" @click="close" /> 
                            </div>
                        </template>
                    </UPopover>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_description')" name="description">
                    <UTextarea v-model="state.description" />
                </UFormGroup>
                <UFormGroup :label="$t('create_event_major')" name="major_price">
                    <UInput v-model="state.major_price" type="number" min="0"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_minor')" name="minor_price">
                    <UInput v-model="state.minor_price" type="number"min="0"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_img')" name="img">
                    <input type="file" @change="handleFileChange"></input>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_venue')" name="venue">
                    <UPopover :popper="{ placement: 'top-end', arrow:true }" v-model="state.venue">
                        <UButton :label="$t('createEvent_search_venue')" trailing-icon="i-heroicons-chevron-down-20-solid" />
                        <template #panel="{ close }">
                            <div class="flex flex-col items-center space-y-2 p-4 rounded max-w-full sm:max-w-sm">
                            <VenuePicker @venue-selected="updateVenueId"/>
                            <UButton label="Validate" @click="close" /> 
                            </div>
                        </template>    
                    </UPopover>
                </UFormGroup>
                <UButton type="submit">{{$t('create_event_btn')}}</UButton>
                <UButton type="reset" variant="outline" @click="resetFormState()" class="ml-2">{{ $t('create_event_clear_btn') }}</UButton>
            </UForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { createEventValidationSchemas } from '~/schemas/CreateEventValidation';
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'


const { t } = useI18n()

const { email, id } = defineProps(['email', 'id'])

const EventValidatonSchemas = createEventValidationSchemas(t)

const state = ref({
    title: '',
    start_datetime: '',
    end_datetime: '',
    description: '',
    major_price: 0,
    minor_price: 0,
    img: null as File | null,
    venue: ''
})

const startDate = ref(new Date())
const endDate = ref(new Date())
const eventState = ref(false)
const eventConflictState = ref(false)
const eventErrortState = ref(false)

function resetFormState() {
    state.value = {
        title: '',
        start_datetime: '',
        end_datetime: '',
        description: '',
        major_price: 0,
        minor_price: 0,
        img: null,
        venue: ''
    };
}

const updateStartDatetime = (date: Date) => {
    state.value.start_datetime = date.toISOString();
}

const updateEndDatetime = (date: Date) => {
    state.value.end_datetime = date.toISOString();
}

const updateVenueId = (venueId) => {
  state.value.venue = venueId;  // Met à jour l'ID de la venue sélectionnée
  console.log(venueId)
};

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        state.value.img = file;  
    }
}
let method = 'POST'
let uri = 'https://events-api.org/event'
console.log(id);

if(id != ""){
    const data = await fetch(`https://events-api.org/event/${id}`)
    const event = await data.json()
    state.value = {
        title: event.title,
        start_datetime: event.start_datetime,
        end_datetime: event.end_datetime,
        description: event.description,
        major_price: event.major_price,
        minor_price: event.minor_price,
        img: null as File | null,
        venue: event.venue,
    }
    method = 'PATCH'
    uri = `https://events-api.org/event/${id}`
}


async function handleFormSubmit(event: FormSubmitEvent<z.output<typeof EventValidatonSchemas>>) {
    const response = await fetch(`https://events-api.org/user?email=${email}`)
    const userData = await response.json()

    const formData = new FormData();
    formData.append('title', state.value.title);
    formData.append('start_datetime', state.value.start_datetime);
    formData.append('end_datetime', state.value.end_datetime);
    formData.append('description', state.value.description);
    formData.append('major_price', state.value.major_price.toString());
    formData.append('minor_price', state.value.minor_price.toString());
    formData.append('venue', state.value.venue);
    formData.append('organizer', userData.user.id)
    if (state.value.img) {
        formData.append('file', state.value.img);
    } else {
        console.error('No file selected');
        return;
    }

    try {
        const response = await fetch(`${uri}`,  {
            method: method,
            body: formData,
        });

        const responseText = await response.text();

        // Essayer de parser la réponse en JSON
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (jsonError) {
            console.error('Invalid JSON response:', responseText);
            throw new Error('Invalid JSON response');
        }
        if(response.status==409){
            eventConflictState.value = true
        } else if (!response.ok) {
            eventErrortState.value = true
        } 
        else {
            eventState.value = true;
            eventConflictState.value = false
            resetFormState()
        }    
        
    } catch (error) {
        // Handle error (e.g., show an error message)
        console.error('Error creating event:', error);
    }
}
</script>

<style scoped>

</style>