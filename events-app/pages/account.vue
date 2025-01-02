<template>
    <div>
        <p>{{ status }} {{  data }}</p>
        <p>{{ data.id }}</p>
    </div>
    <UAlert
      icon="i-heroicons-exclamation-circle"
      color="red"
      variant="solid"
      title="hi"
      description="'reserve_err_description')"
      class="mt-3"
    />
</template>

<script setup>


    const { data, status } = useAuth()
    console.log(data.id);
    
</script>

<style lang="scss" scoped>

</style>