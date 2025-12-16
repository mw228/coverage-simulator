<template>
  <div class="stack">
    <PanelCard title="Offense">
      <div class="grid">
        <SelectField
          :label="schema.offense.personnel.label"
          :options="schema.offense.personnel.getOptions(scenario)"
          :model-value="scenario.offense.personnelId"
          @update:modelValue="onOffPersonnel"
        />
        <SelectField
          :label="schema.offense.formation.label"
          :options="schema.offense.formation.getOptions(scenario)"
          :model-value="scenario.offense.formationId"
          @update:modelValue="onOffFormation"
        />
      </div>
    </PanelCard>

    <PanelCard title="Defense">
      <div class="grid">
        <SelectField
          :label="schema.defense.front.label"
          :options="schema.defense.front.getOptions(scenario)"
          :model-value="scenario.defense.frontId"
          @update:modelValue="onDefFront"
        />
        <SelectField
          :label="schema.defense.package.label"
          :options="schema.defense.package.getOptions(scenario)"
          :model-value="scenario.defense.packageId"
          @update:modelValue="onDefPackage"
        />
        <SelectField
          :label="schema.defense.coverage.label"
          :options="schema.defense.coverage.getOptions(scenario)"
          :model-value="scenario.defense.coverageId"
          @update:modelValue="onDefCoverage"
        />
      </div>
    </PanelCard>
  </div>
</template>

<script setup lang="ts">
import PanelCard from '@/components/PanelCard.vue'
import SelectField from '@/components/SelectField.vue'
import type { Scenario } from '@/types/scenario'
import { controlSchema as schema } from '@/engine/controlSchema'

const props = defineProps<{ scenario: Scenario }>()
const emit = defineEmits<{ (e: 'changed'): void }>()

function onOffPersonnel(v: string) {
  schema.offense.personnel.setValue(props.scenario, v)
  emit('changed')
}
function onOffFormation(v: string) {
  schema.offense.formation.setValue(props.scenario, v)
  emit('changed')
}
function onDefFront(v: string) {
  schema.defense.front.setValue(props.scenario, v)
  emit('changed')
}
function onDefPackage(v: string) {
  schema.defense.package.setValue(props.scenario, v)
  emit('changed')
}
function onDefCoverage(v: string) {
  schema.defense.coverage.setValue(props.scenario, v)
  emit('changed')
}
</script>

<style scoped>
.stack { display:grid; gap: 1rem; }
.grid { display:grid; gap: .9rem; }
</style>
