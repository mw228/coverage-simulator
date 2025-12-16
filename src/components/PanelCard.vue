<template>
  <section class="card">
    <header v-if="title" class="head">
      <h2 class="title">{{ title }}</h2>
      <slot name="actions" />
    </header>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<style scoped>
.card { border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; background: rgba(255,255,255,0.03); }
.head { display:flex; justify-content:space-between; align-items:center; padding: .9rem 1rem .2rem; }
.title { margin: 0; font-size: 1rem; }
.body { padding: 1rem; }
</style>
