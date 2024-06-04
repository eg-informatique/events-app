<template>
    <div>
        <UCard >
            <template #header>
                <p class="font-bold">{{ $t('create_event_pageTitle') }}</p>
            </template>
            <UForm :state="state" class="space-y-4" :schema="EventValidatonSchemas" @submit="handleFormSubmit">
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
                    <UInput type="file" v-model="state.img" size="md" icon="i-heroicons-folder" @change="handleFileChange"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_venue')" name="venue">
                    <UInput v-model="state.venue"></UInput>
                </UFormGroup name="validate">
                <UButton type="submit">{{$t('create_event_btn')}}</UButton>
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
    img: '', 
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
    console.log(state.value.img)
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        state.value.img = URL.createObjectURL(file);
    }
}

async function handleFormSubmit(event: FormSubmitEvent < z.output < typeof EventValidatonSchemas >> ) {
    console.log(event.data)
}

</script>

<style scoped>

</style>