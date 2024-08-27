<template>
    <p>{{ auth.data.value.jwt }}</p>
</template>

<script setup lang="ts">
    const auth = useAuth()
    const token = auth.data.value.jwt
    const response = await fetch('https://events-api.org/users', {
        headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.ok){
        const userData = await response.json()
    }
    
</script>

<style lang="scss" scoped>

</style>