<template>
    <div>
        <h1>Bonjour {{ data.user.name }} !</h1>
        <p>{{ data }}</p>
        <Dashboard :email="data.user.email"/>
    </div>
</template>

<script setup>
    const { data } = useAuth()
</script>

<style lang="scss" scoped>

</style>