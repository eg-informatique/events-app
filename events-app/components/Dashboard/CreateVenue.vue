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
                    <UInput v-model="state.address" @input="fetchAddressSuggestions"></UInput>
                    <ul v-if="addressSuggestions.length > 0" class="mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md">
                        <li v-for="(suggestion, index) in addressSuggestions" 
                            :key="index" 
                            @click="selectAddress(suggestion)"
                            class="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                            {{ suggestion.formatted_address }}
                        </li>
                    </ul>
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
const { email } = defineProps(['email'])

const VenueValidationSchemas = createVenueValidationSchemas(t);

const state = ref({
    name: '',
    url: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    creator: ''
});

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface GeocodeResult {
    formatted_address: string;
    address_components: AddressComponent[];
}

interface GeocodeResponse {
    results: GeocodeResult[];
    status: string;
}

const addressSuggestions = ref<GeocodeResult[]>([]);
const venueState = ref(false);
const venueConflictState = ref(false);
const venueErrorState = ref(false);

async function handleFormSubmit(event: FormSubmitEvent<z.output<typeof VenueValidationSchemas>>) {
    const response = await fetch(`https://events-api.org/user?email=${email}`)
    const userData = await response.json()

    const data = {
        name: state.value.name,
        url: state.value.url,
        address: state.value.address.split(',')[0].trim(),
        zipcode: state.value.zipcode,
        city: state.value.city,
        country: state.value.country,
        email: state.value.email,
        phone: state.value.phone,
        creator: userData.user.id
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
        phone: '',
        creator: ''
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
        phone: '',
        creator: ''
    };
    venueConflictState.value = false
    venueErrorState.value = false
    venueState.value = false
}

async function fetchAddressSuggestions() {
    if (state.value.address.length > 4) {
        const apiKey = 'AIzaSyBoVK4uOknJxX1yDT1bXga0RehiHXhp9ck';
                
        const address = encodeURIComponent(state.value.address + ', Switzerland');
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                
                addressSuggestions.value = data.results;
            } else {
                addressSuggestions.value = [];
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des suggestions d\'adresse:', error);
        }
    }
}

function formatAddress(suggestion: GeocodeResult): string {
    const streetNumber = extractComponent(suggestion.address_components, 'street_number');
    const route = extractComponent(suggestion.address_components, 'route');
    return `${streetNumber} ${route}`.trim();  
}

function selectAddress(suggestion: any) {
    state.value.address = suggestion.formatted_address;
    
    const addressComponents = suggestion.address_components;
    state.value.zipcode = extractComponent(addressComponents, 'postal_code');
    state.value.city = extractComponent(addressComponents, 'locality');
    state.value.country = extractComponent(addressComponents, 'country');
    
    
    addressSuggestions.value = [];
}

function extractComponent(components: any[], type: string): string {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : '';
}
watch(() => state.value.address, (newAddress) => {
    if (newAddress === '') {
        state.value.zipcode = '';
        state.value.city = '';
        state.value.country = '';
    }
});
</script>

<style>
.suggestions-list {
    list-style: none;
    padding: 0;
    margin-top: 5px;
    border: 1px solid #ccc;
    background-color: white;
}

.suggestions-list li {
    padding: 8px;
    cursor: pointer;
}

.suggestions-list li:hover {
    background-color: #f0f0f0;
}
</style>
