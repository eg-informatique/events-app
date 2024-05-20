<script setup lang="ts">
const { signIn } = useAuth()
</script>

<template>
  <UButton 
  label="Log in with Github"
  icon="i-mdi-github"
  variant="outline"
  @click="signIn('github')"
  />
</template>