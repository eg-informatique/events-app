<template>
    <UButton :label="$t('home_create_event')" icon="i-mdi-plus" @click="isOpen = true"/>
        <UModal v-model="isOpen">
            <p>coucou</p>
        </UModal>
    
    <UButton :label="$t('home_create_event')" icon="i-mdi-plus" @click="isOpenEdit = true"/>
        <UModal v-model="isOpenEdit">
            <p>coucou2</p>
        </UModal>
    <UButton :label="$t('home_create_event')" icon="i-mdi-plus" @click="isOpenEdit2 = true"/>
        <UModal v-model="isOpenEdit2">
            <CreateEvent email="paul.lasryrobin@gmail.com" id=""/>
        </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const isOpenEdit = ref(false)
const isOpenEdit2 = ref(false)
</script>

<style lang="scss" scoped>

</style>