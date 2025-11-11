<script setup>
defineProps({
  tag: {
    type: String,
    default: "td",
  },
  type: {
    type: String,
  },
  percent: {
    type: Number,
  },
});
</script>

<template>
  <component :is="tag" class="cell" :class="type">
    <slot v-if="!percent" />
    <span v-else class="flexed">
      <span><slot /></span>
      <span class="percent" v-if="percent">{{ percent }}%</span>
    </span>
  </component>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.cell {
  padding: 0.8em 1.2em;
  background-color: $color-gray-100;
  font-weight: 600;
}
.flexed {
  display: flex;
  justify-content: space-between;
  gap: 1em;
}

td {
  text-align: right;
}

.blue {
  background-color: $color-blue;
}
.green {
  background-color: $color-green-100;
  .percent {
    color: $color-green-200;
  }
}
.red {
  background-color: $color-red-100;
  .percent {
    color: $color-red-200;
  }
}
</style>
