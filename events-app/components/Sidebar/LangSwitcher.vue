<template>
  <select v-model="language" onchange="window.location.reload()">   
    <option
      v-for="item in locales"
      :key="typeof item === 'object' ? item.code : item"
      :value="typeof item === 'object' ? item.code : item"
    >
      <p>{{ typeof item === "object" ? item.name : item }}</p>
    </option>
  </select>
</template>

<script setup>
const { locales, locale, setLocale } = useI18n();

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});
</script>

<style scoped></style>
