<template>
    <div>
        <UCard >
            <template #header>
                <p class="font-bold">{{ $t('create_event_pageTitle') }}</p>
            </template>
            <UForm :state="state" class="space-y-4">
                <UFormGroup :label="$t('create_event_title')" name="title">
                    <UInput v-model="state.title"></UInput>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_start')" name="start_datetime">
                    <UPopover :popper="{ placement: 'bottom-start' }" overlay v-model="state.start_datetime">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(startDate, 'd MMM, yyy, HH:mm')" />
                        <template #panel="{ close }" class="inline-block align-top">
                            <div class="flex flex-col items-center space-y-4">
                                <DatePicker v-model="startDate" mode="dateTime" is24hr is-required/>
                                <UButton label="Validate" @click="close" />
                            </div>
                        </template>
                    </UPopover>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_end')" name="end_datetime">
                    <UPopover :popper="{ placement: 'bottom-start' }" overlay v-model="state.end_datetime">
                        <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(endDate, 'd MMM, yyy, HH:mm')" />
                        <template #panel="{ close }">
                            <div class="flex flex-col items-center space-y-4">
                               <DatePicker v-model="endDate" mode="dateTime" is24hr is-required/>
                                <UButton label="Validate" @click="close" /> 
                            </div>
                        </template>
                    </UPopover>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_description')" name="description">
                    <UTextarea v-model="state.descripton" />
                </UFormGroup>
                <UFormGroup :label="$t('create_event_major')" name="major_price">
                    <UInput v-model="state.major_price"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_minor')" name="minor_price">
                    <UInput v-model="state.minor_price"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_img')" name="img">
                    <UInput type="file" size="md" icon="i-heroicons-folder"/>
                </UFormGroup>
                <UFormGroup :label="$t('create_event_venue')" name="venue">
                    <UInput></UInput>
                </UFormGroup>
            </UForm>
        </UCard>
    </div>
</template>

<script setup>
import { format } from 'date-fns'


const state = ref({
    title: undefined,
    start_datetime: undefined,
    end_datetime: undefined,
    descripton: undefined,
    major_price: undefined,
    minor_price: undefined
})

const startDate = ref(new Date())
const endDate = ref(new Date())

</script>

<style scoped>

</style>