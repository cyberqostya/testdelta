<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import Highcharts from "highcharts";

const props = defineProps({
  data: {
    type: Array,
  },
  isCharOpened: {
    type: Boolean,
  },
});

const chartContainer = ref(null);
let chartInstance = null;

function renderChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = Highcharts.chart(chartContainer.value, {
    chart: {
      type: "line",
      backgroundColor: "",
      height: 400,
    },
    title: { text: "" },
    xAxis: {
      labels: { enabled: false },
      tickWidth: 5,
      tickLength: 5,
    },
    yAxis: {
      tickWidth: 5,
      tickLength: 5,
      labels: { enabled: false },
      title: { text: "" },
      gridLineColor: "#fff",
    },
    series: [
      {
        name: "Неделя",
        data: props.data,
        color: "#387938",
        lineWidth: 2,
        marker: { enabled: true, radius: 5 },
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
    accessibility: { enabled: false },
  });
}

onMounted(() => {
  renderChart();
});

watch(
  () => props.data,
  () => renderChart(),
  { deep: true }
);
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<template>
  <tr class="charrow" :class="isCharOpened && '_active'">
    <td class="charrow__td" colspan="4">
      <div class="charrow__char" ref="chartContainer"></div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.charrow {
  &._active {
    display: table-row;

    .charrow__char {
      height: 400px;
    }
  }
}

.charrow__td {
  padding: 0;
  border: none;
}

.charrow__char {
  overflow: hidden;
  transition: height 0.4s;
  height: 0;
}
</style>
