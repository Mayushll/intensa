<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s',
  htmlAttrs: {
    lang: 'ru',
  },
});
</script>
