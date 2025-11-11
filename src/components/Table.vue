<script setup>
import { ref, onMounted } from "vue";
import Cell from "@c/Cell.vue";
import Row from "@c/Row.vue";

const data = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const json = await response.json();
    data.value = convertServerDataToDispayedData(json);
  } catch (error) {
    console.error("Ошибка при загрузке JSON:", error);
  }
});

const convertServerDataToDispayedData = (serverData) => {
  const displayedData = [];

  serverData.forEach((item) => {
    const obj = {};
    obj.title = item.title;
    obj.today = item.week.at(-1);
    obj.yesterday = item.week.at(-2);
    obj.yesterdayPercent = Math.round(100 - (obj.yesterday / obj.today) * 100);

    obj.average = Math.round(
      item.week.reduce((a, b) => {
        return a + b;
      }, 0) / item.week.length
    );

    obj.week = item.week;

    displayedData.push(obj);
  });

  return displayedData;
};
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <Cell tag="th">Показатель</Cell>
          <Cell tag="th" type="blue">Текущий день</Cell>
          <Cell tag="th">Вчера</Cell>
          <Cell tag="th">Среднее арифм.</Cell>
        </tr>
        <tr></tr>
      </thead>

      <tbody>
        <Row v-for="(item, index) in data" :key="index" :item="item" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  margin-inline: auto;

  @media (width < 1040px) {
    overflow-x: scroll;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      height: 20px;
    }
    &::-webkit-scrollbar-track {
      background: linear-gradient(to bottom, transparent 0 10px, rgba(29, 27, 27, 0.432) 10px 11px, transparent 11px 100%);
    }
    &::-webkit-scrollbar-thumb {
      background: #1c1c1c;
      background-clip: content-box;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
    }
  }
}

.table {
  border-spacing: 6px 3px;
  width: 1000px;
  margin-inline: auto;
}
</style>
