<template>
    <div>
        <UCard>
            <template #header>
                <p class="font-bold">{{ $t('create_venue_pageTitle') }}</p>
            </template>
            <div v-if="venueState" class="mb-5 text-center">
                <p class="font-bold text-green-400">{{ $t('venue_created') }}</p>
            </div>
            <div v-if="venueConflictState" class="mb-5 text-center">
                <p class="font-bold text-red-400">{{ $t('venue_name_conflict') }}</p>
            </div>
            <div v-if="venueErrorState" class="mb-5 text-center">
                <p class="font-bold text-red-400">{{ $t('venue_creation_error') }}</p>
            </div>
            <UForm id="form" :state="state" class="space-y-4" :schema="VenueValidationSchemas" @submit="handleFormSubmit">
                <UFormGroup :label="$t('create_venue_name')" name="name">
                    <UInput v-model="state.name"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_url')" name="url">
                    <UInput v-model="state.url"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_address')" name="address">
                    <UInput v-model="state.address"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_zipcode')" name="zipcode">
                    <UInput v-model="state.zipcode" type="number"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_city')" name="city">
                    <UInput v-model="state.city"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_country')" name="country">
                    <UInput v-model="state.country"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_email')" name="email">
                    <UInput v-model="state.email" type="email"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_venue_phone')" name="phone">
                    <UInput v-model="state.phone" type="tel"/>
                </UFormGroup>
                <UButton type="submit">{{ $t('create_venue_btn') }}</UButton>
                <UButton type="reset" variant="outline" @click="resetFormState2()" class="ml-2">{{ $t('create_venue_clear_btn') }}</UButton>
            </UForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { createVenueValidationSchemas } from '~/schemas/CreateVenueValidation';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const { t } = useI18n();

const VenueValidationSchemas = createVenueValidationSchemas(t);

const state = ref({
    name: '',
    url: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
    email: '',
    phone: ''
});

const venueState = ref(false);
const venueConflictState = ref(false);
const venueErrorState = ref(false);

async function handleFormSubmit(event: FormSubmitEvent<z.output<typeof VenueValidationSchemas>>) {

    const data = {
        name: state.value.name,
        url: state.value.url,
        address: state.value.address,
        zipcode: state.value.zipcode,
        city: state.value.city,
        country: state.value.country,
        email: state.value.email,
        phone: state.value.phone
    };

    try {
        const response = await fetch('https://events-api.org/venue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        if (response.status === 409) {
            venueConflictState.value = true;
        } else if (!response.ok) {
            venueErrorState.value = true;
        } else {
            venueState.value = true;
            venueConflictState.value = false;
            resetFormState();
        }
        
    } catch (error) {
        console.error('Error creating venue:', error);
    }
}

function resetFormState() {
    state.value = {
        name: '',
        url: '',
        address: '',
        zipcode: '',
        city: '',
        country: '',
        email: '',
        phone: ''
    };
}
function resetFormState2() {
    state.value = {
        name: '',
        url: '',
        address: '',
        zipcode: '',
        city: '',
        country: '',
        email: '',
        phone: ''
    };
    venueConflictState.value = false
    venueErrorState.value = false
    venueState.value = false
}
</script>

<style scoped>

</style>
