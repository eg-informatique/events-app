<template>
    <div>
        <h1>Vous etes sur le dash board</h1>
        <p>{{ data }}</p>
    </div>
</template>

<script setup>
    const {data } = useAuth()
</script>

<style lang="scss" scoped>

</style>