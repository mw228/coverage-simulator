<template>
  <div class="layout">
    <!-- Left column: controls -->
    <section class="panel">
      <ScenarioControls :scenario="scenario" @changed="onChanged" />
    </section>

    <!-- Center: diagram -->
    <section class="panel diagram">
      <h2>Diagram</h2>
      <pre class="ascii">{{ result.diagram.ascii }}</pre>
    </section>

    <!-- Right/bottom: output -->
    <section class="panel">
      <h2>Output</h2>

      <p class="title">{{ result.title }}</p>

      <div class="block">
        <h3>Offense summary</h3>
        <p class="muted">{{ result.offenseSummary }}</p>
      </div>

      <div class="block">
        <h3>Defense summary</h3>
        <p class="muted">{{ result.defenseSummary }}</p>
      </div>

      <div class="block">
        <h3>Coverage rules</h3>
        <div class="cols">
          <div>
            <h4>DB</h4>
            <ul><li v-for="(x,i) in result.notes.db" :key="'db'+i">{{ x }}</li></ul>
          </div>
          <div>
            <h4>LB</h4>
            <ul><li v-for="(x,i) in result.notes.lb" :key="'lb'+i">{{ x }}</li></ul>
          </div>
          <div>
            <h4>DL</h4>
            <ul><li v-for="(x,i) in result.notes.dl" :key="'dl'+i">{{ x }}</li></ul>
          </div>
        </div>
      </div>

      <div class="block">
        <h3>Offensive attacks (starter)</h3>
        <ul>
          <li v-for="a in result.offenseAttacks" :key="a.id">
            <strong>{{ a.name }}</strong>
            <ul>
              <li v-for="(w,i) in a.whyItWorks" :key="a.id + i">{{ w }}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div v-if="result.warnings?.length" class="warn">
        <h3>Warnings</h3>
        <ul><li v-for="(w,i) in result.warnings" :key="'w'+i">{{ w }}</li></ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Scenario } from '@/types/scenario'
import { evaluateScenario } from '@/engine/evaluateScenario'
import { coerceScenario } from '@/engine/coerceScenario'
import ScenarioControls from '@/components/ScenarioControls.vue'

const scenario = reactive<Scenario>({
  offense: { personnelId: '11', formationId: '3x1' },
  defense: { frontId: '4-3', packageId: '4-3-base', coverageId: 'cover-3' },
})

function onChanged() {
  // Ensures downstream selections remain valid when an upstream dropdown changes.
  coerceScenario(scenario)
}

const result = computed(() => evaluateScenario(scenario))

// Optional: coerce once on load so defaults are always valid even if data changes later.
coerceScenario(scenario)
</script>

<style scoped>
.layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 360px minmax(0, 1fr);
  grid-template-rows: auto auto;
}
.panel {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1rem;
  background: rgba(255,255,255,0.03);
}
.diagram { grid-column: 2; grid-row: 1 / span 2; }
h2 { margin: 0 0 .6rem; font-size: 1rem; }
h3 { margin: .9rem 0 .3rem; font-size: .95rem; }
h4 { margin: .5rem 0 .25rem; font-size: .9rem; opacity: .9; }
.muted { margin: 0; opacity: .7; }
.title { margin: .2rem 0 .6rem; font-weight: 600; }
.ascii {
  margin: .75rem 0 0;
  padding: .75rem;
  border-radius: 12px;
  background: rgba(0,0,0,0.25);
  overflow: auto;
  min-height: 360px;
}
.cols { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.block ul { margin: .25rem 0 0 1.1rem; }
.warn {
  margin-top: 1rem;
  padding: .75rem;
  border-radius: 12px;
  background: rgba(255, 200, 0, 0.08);
  border: 1px solid rgba(255, 200, 0, 0.18);
}
@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  .diagram { grid-column: auto; grid-row: auto; }
  .cols { grid-template-columns: 1fr; }
}
</style>
