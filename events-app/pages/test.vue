<template>
    <Test/>
    <p>{{ eventId }}</p>
</template>

<script setup lang="ts">
import CreateVenue from '~/components/CreateVenue.vue';


const route = useRoute();
const eventId = route.query.e_id
if(eventId){
   console.log(eventId); 
}


</script>

<style lang="scss" scoped>

</style>