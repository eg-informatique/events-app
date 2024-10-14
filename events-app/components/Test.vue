<script setup lang="ts">
const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: `test`,
  icon: 'i-heroicons-square-3-stack-3d'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link'
}]

const locaPath = useLocalePath()

console.log(locaPath);

</script>

<template>
  <UBreadcrumb :links="links" />
  <p>{{ locaPath('/venue/' + `coucou`) }}</p>
</template>