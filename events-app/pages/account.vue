<template>
    <div>
        <p class="font-bold text-2xl mb-4">{{ $t("account_welcome") }} {{ data.user.name }} !</p>
    
        <Dashboard :email="data.user.email"/>
    </div>
</template>

<script setup>
    const { data } = useAuth()
</script>

<style lang="scss" scoped>

</style>