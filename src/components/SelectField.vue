<template>
  <label class="wrap">
    <div class="top">
      <span class="label">{{ label }}</span>
      <span v-if="hint" class="hint">{{ hint }}</span>
    </div>

    <select class="select" :value="modelValue" :disabled="disabled" @change="onChange">
      <option v-if="placeholder" disabled value="__placeholder__">{{ placeholder }}</option>
      <option v-for="o in options" :key="o.value" :value="o.value">
        {{ o.label }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
export type SelectOption = { value: string; label: string }

const props = defineProps<{
  label: string
  options: SelectOption[]
  modelValue: string
  disabled?: boolean
  hint?: string
  placeholder?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}
</script>

<style scoped>
.wrap { display: grid; gap: .35rem; }
.top { display:flex; align-items:baseline; justify-content:space-between; gap:.5rem; }
.label { font-size: .9rem; font-weight: 600; }
.hint { font-size: .8rem; opacity: .65; }
.select {
  width: 100%;
  padding: .55rem .6rem;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}
.select:disabled { opacity: .5; cursor: not-allowed; }
</style>
