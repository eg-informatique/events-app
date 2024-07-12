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
                    <UInput v-model="state.venue"></UInput>
                </UFormGroup name="validate">
                <UButton type="submit">{{$t('create_event_btn')}}</UButton>
                <UButton type="reset" variant="outline" class="ml-2">{{ $t('create_event_clear_btn') }}</UButton>
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

const updateStartDatetime = (date: Date) => {
    state.value.start_datetime = date.toISOString();
}

const updateEndDatetime = (date: Date) => {
    state.value.end_datetime = date.toISOString();
}

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        state.value.img = file;  
    }
}

const eventState = ref(false)
const eventConflictState = ref(false)

async function handleFormSubmit(event: FormSubmitEvent<z.output<typeof EventValidatonSchemas>>) {
    if (!state.value.title || !state.value.start_datetime || !state.value.end_datetime || !state.value.description || !state.value.major_price || !state.value.minor_price || !state.value.venue || !state.value.img) {
        console.error('All fields are required');
        return;
    }

    const formData = new FormData();
    formData.append('title', state.value.title);
    formData.append('start_datetime', state.value.start_datetime);
    formData.append('end_datetime', state.value.end_datetime);
    formData.append('description', state.value.description);
    formData.append('major_price', state.value.major_price.toString());
    formData.append('minor_price', state.value.minor_price.toString());
    formData.append('venue', state.value.venue);
    
    if (state.value.img) {
        formData.append('file', state.value.img);  // Assuming state.value.img is a File object
    } else {
        console.error('No file selected');
        return;
    }

    try {
        const response = await fetch('https://events-api.org/event', {
            method: 'POST',
            body: formData,
        });

        // Loguer la réponse brute pour voir ce que le serveur renvoie
        const responseText = await response.text();
        console.log('Raw response:', responseText);

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
            console.error('Error data:', data);
            throw new Error(data.message || 'Failed to create event');
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