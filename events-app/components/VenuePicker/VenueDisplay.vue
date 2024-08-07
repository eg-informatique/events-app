<template>
    <div>
        <p class="font-bold mx-2">{{venue.name}}</p>
        <p class="font-bold mx-2">{{ venue.address }}, {{ venue.city }}, {{ venue.zipcode }}, {{ venue.country }}</p>
    </div>
</template>

<script setup>
const { venue } = defineProps(['venue']) 
</script>

<style lang="scss" scoped>

</style>