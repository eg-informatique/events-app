<script setup lang="ts">
const { signIn } = useAuth()
</script>

<template>
  <button
    class="flex items-center border border-gray-800 px-4 py-2 rounded-lg text-black text-sm font-medium hover:text-gray-800 hover:bg-gray-100"
    @click="signIn('github')"
  >
  <Icon size="25" name="mdi:github" color="black"/>
    {{$t("signup_github")}}
  </button>
</template>