<script setup>
import Cell from "@c/Cell.vue";
import Char from "@c/Char.vue";
import { ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
  },
  index: {
    type: Number,
  },
});

const isCharOpened = ref(props.index == 0);
const toggleCharOpened = () => {
  isCharOpened.value = !isCharOpened.value;
};
</script>

<template v-for="(item, index) in data" :key="index">
  <tr @click="toggleCharOpened" class="datarow" role="button">
    <Cell style="text-align: left">{{ item.title }}</Cell>
    <Cell type="blue">{{ item.today }}</Cell>
    <Cell :type="item.yesterdayPercent > 0 ? 'green' : 'red'" :percent="item.yesterdayPercent">{{ item.yesterday }}</Cell>
    <Cell :type="index == 0 ? 'red' : [1, 2, 3, 8].includes(index) ? '' : 'green'">{{ item.average }}</Cell>
  </tr>
  <Char :data="item.week" :isCharOpened="isCharOpened" />
</template>

<style lang="scss" scoped>
.datarow {
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    background-color: rgba(204, 167, 235, 0.281);
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
</style>
