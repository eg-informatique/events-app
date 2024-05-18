<template>
    <div>
        <CreateUser/>
    </div>
</template>

<script setup>
definePageMeta({ auth: {
    unauthenticatedOnly: true,
    navugateAuthenticatedTo: '/'
    } 
})
</script>

<style scoped>

</style>