<template>
    <div>
        <p>{{ status }} {{  data }}</p>
        <p>{{ data.id }}</p>
    </div>
</template>

<script setup>


    const { data, status } = useAuth()
    console.log(data.id);
    
</script>

<style lang="scss" scoped>

</style>