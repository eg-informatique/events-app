<template>
    <div>
        <p class="font-bold text-2xl mb-4">{{ $t("account_welcome") }} {{ data.user.name }} !</p>
        <p>{{ status }} {{  data }}</p>
    </div>
</template>

<script setup>
    const { data, status } = useAuth()
    console.log(data.value.user.email);
    
</script>

<style lang="scss" scoped>

</style>