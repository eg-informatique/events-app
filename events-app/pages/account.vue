<template>
    <div>
        <p>{{ status }} {{  data }}</p>
    </div>
</template>

<script setup>
    const { data, status } = useAuth()
    if (data.value && data.value.user) {
        console.log(data.value.user.email);
        console.log(data.value.user.profile?.first_name);
        console.log(data.value.user.profile?.last_name);
    }
</script>

<style lang="scss" scoped>

</style>