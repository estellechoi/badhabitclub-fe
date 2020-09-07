<template>
  <div class="line-chart-container">
    <div
      class="line-chart-graph"
      ref="lineChart"
      tabindex="0"
      role="graphics-document"
      aria-roledescription="line-chart-box"
    >
      <!-- Color Labels -->
      <div class="line-chart-graph__dot-label-box">
        <div class="line-chart__dot-label">
          <span
            class="line-chart-graph-dot"
            tabindex="0"
            role="graphics-symbol"
            aria-roledescription="dot"
            aria-label="파란색 점과 선"
          ></span>
          <span class="line-chart-graph-dot-text" tabindex="0">수입</span>
        </div>

        <div class="line-chart__dot-label">
          <span
            class="line-chart-graph-dot line-chart-graph-dot--pink"
            tabindex="0"
            role="graphics-symbol"
            aria-roledescription="dot"
            aria-label="분홍색 점과 선"
          ></span>
          <span class="line-chart-graph-dot-text" tabindex="0">지출</span>
        </div>
      </div>

      <!-- Y-Axis Labels -->
      <div class="line-chart-graph__y-line" v-for="(item) in yRange" :key="item">
        <span class="line-chart-graph__y-label">{{ item }}</span>
      </div>

      <!-- X-Axis Labels -->
      <span
        class="line-chart-graph__x-label"
        v-for="(item, index) in xLabels"
        :key="item"
        :style="xLabelStyle(index)"
      >{{ item }}</span>

      <!-- Income -->
      <span
        class="line-chart-graph-dot"
        v-for="(item, index) in incValList"
        :key="`income-${index}`"
        :title="`매출 ${item}`"
        :style="dotStyle(item, index)"
      >
        <span
          class="line-chart-graph-line"
          v-if="index < incValList.length"
          :style="lineStyle(item, index, incValList)"
        ></span>
      </span>

      <!-- Outcome -->
      <span
        class="line-chart-graph-dot line-chart-graph-dot--pink"
        v-for="(item, index) in outcValList"
        :key="`outcome-${index}`"
        :title="`비용 ${item}`"
        :style="dotStyle(item, index)"
      >
        <span
          class="line-chart-graph-line"
          v-if="index < outcValList.length"
          :style="lineStyle(item, index, outcValList)"
        ></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    income: {
      type: Object,
      default() {
        return {};
      },
    },
    outcome: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      incValList: [],
      outcValList: [],
      yRange: [],
      xLabels: [],
    };
  },
  computed: {
    xInterval() {
      return this.$refs.lineChart.clientWidth / this.incValList.length;
    },
    yHeightRatio() {
      return (this.$refs.lineChart.clientHeight * 0.8) / this.yMax;
    },
    yMax() {
      return Math.max.apply(null, this.incValList);
    },
    yMin() {
      return Math.min.apply(null, this.incValList);
    },
  },
  methods: {
    getIncRange() {
      for (let i = 4; i >= 1; i--) {
        this.yRange.push(Math.ceil(((this.yMax - this.yMin) * i) / 4));
      }
    },
    xLabelStyle(index) {
      return `left: ${(index + 0.5) * this.xInterval - 5}px`;
    },
    dotStyle(item, index) {
      return `bottom: ${item * this.yHeightRatio}px; left: ${
        (index + 0.5) * this.xInterval
      }px`;
    },
    lineStyle(item, index, list) {
      return `width: ${this.lineLength(
        item,
        index,
        list
      )}px; transform: rotate(${this.lineDeg(item, index, list)}deg)`;
    },
    lineLength(item, index, list) {
      return Math.sqrt(
        ((list[index + 1] - item) * this.yHeightRatio) ** 2 +
          this.xInterval ** 2
      );
    },
    lineDeg(item, index, list) {
      const posiNega = list[index + 1] > item ? -1 : 1;
      return -(
        (180 / Math.PI) *
        Math.atan(
          ((list[index + 1] - item) * this.yHeightRatio) / this.xInterval
        ) *
        posiNega ** 2
      );
    },
  },
  mounted() {
    this.xLabels = Object.keys(this.income);
    this.incValList = Object.values(this.income);
    this.outcValList = Object.values(this.outcome);
    this.getIncRange();
  },
};
</script>

<style>
</style>