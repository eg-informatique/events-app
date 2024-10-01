<template>
    <iframe
    width="600"
    height="450"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBoVK4uOknJxX1yDT1bXga0RehiHXhp9ck
        &q=40C+Route+de+Malagnou">
    </iframe>

    <p>{{ data }}</p>
    
</template>

<script setup lang="ts">

const {data } = useAuth()

</script>

<style lang="scss" scoped>

</style>