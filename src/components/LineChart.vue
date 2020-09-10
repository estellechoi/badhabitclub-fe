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
      <ul>
        <li v-for="(item) in yRange" :key="item">
          <div class="line-chart-graph__y-line">
            <span class="line-chart-graph__y-label">{{ item }}</span>
          </div>
        </li>
      </ul>

      <!-- X-Axis Labels -->
      <ol class="line-chart-graph__x-label">
        <li v-for="(item) in xLabels" :key="item">
          <span class="line-chart-graph__x-label">{{ item }}</span>
        </li>
      </ol>

      <!-- Income -->
      <ol class="line-chart-graph__values">
        <li v-for="(item, index) in incValList" :key="`income-${index}`">
          <span class="line-chart-graph-dot" :title="`매출 ${item}`" :style="dotStyle(item)">
            <span
              class="line-chart-graph-line"
              v-if="index < incValList.length"
              :style="lineStyle(item, index, incValList)"
            ></span>
          </span>
        </li>
      </ol>

      <!-- Outcome -->
      <ol class="line-chart-graph__values">
        <li v-for="(item, index) in outcValList" :key="`outcome-${index}`">
          <span
            class="line-chart-graph-dot line-chart-graph-dot--pink"
            :title="`비용 ${item}`"
            :style="dotStyle(item)"
          >
            <span
              class="line-chart-graph-line"
              v-if="index < outcValList.length"
              :style="lineStyle(item, index, outcValList)"
            ></span>
          </span>
        </li>
      </ol>
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
      width: 0,
    };
  },
  computed: {
    xInterval() {
      return (this.width - 7) / (this.incValList.length - 1);
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
      console.log(this.yMin);
      for (let i = 3; i >= 0; i--) {
        this.yRange.push(
          Math.ceil(((this.yMax - this.yMin) / 4) * i + this.yMin)
        );
      }
    },
    dotStyle(item) {
      return `bottom: ${item * this.yHeightRatio}px;`;
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
    getWidth() {
      this.width = this.$refs.lineChart.clientWidth;
    },
  },
  mounted() {
    this.xLabels = Object.keys(this.income);
    this.incValList = Object.values(this.income);
    this.outcValList = Object.values(this.outcome);
    this.getIncRange();
    this.getWidth();

    window.addEventListener("resize", this.getWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWidth);
  },
};
</script>

<style>
</style>