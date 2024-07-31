<template>
    <div class="grid grid-cols-5 grid-rows-5 gap-4">
        <div class="col-span-2 row-span-5"><DashboardCreateEvent :email="email"></DashboardCreateEvent></div>
        <div class="col-span-2 row-span-5 col-start-4"><DashboardCreateVenue></DashboardCreateVenue></div>
    </div>
</template>

<script setup>
    const {email} = defineProps(['email'])
</script>   

<style lang="scss" scoped>

</style>
