<script setup lang="ts">
const { signIn } = useAuth()
</script>

<template>
  <UButton 
  :label="$t('signin_github')"
  icon="i-mdi-github"
  variant="outline"
  @click="signIn('github')"
  />
</template>