<script setup lang="ts">
const { signIn } = useAuth()
</script>

<template>
  <UButton 
  :label="$t('signup_google')"
  icon="i-mdi-google"
  variant="outline"
  @click="signIn('google')"
  />
</template>