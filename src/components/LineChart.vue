<template>
  <div class="line-chart-container">
    <div class="line-chart-graph" ref="lineChart">
      <span class="line-chart-graph__dot-label">
        <span class="line-chart-graph-dot">
          <span class="line-chart-graph-dot-text">수입</span>
        </span>
        <span class="line-chart-graph-dot line-chart-graph-dot--pink">
          <span class="line-chart-graph-dot-text">지출</span>
        </span>
      </span>

      <ul>
        <li class="line-chart-graph__y-line" v-for="(item, index) in yRange" :key="index">
          <span class="line-chart-graph__y-label">{{ item }}</span>
        </li>
      </ul>
      <!-- Labels -->
      <span
        class="line-chart-graph__x-label"
        v-for="(item, index) in xLabels"
        :key="index"
        :style="`left: ${(index + 0.5) * xInterval - 5}px`"
      >{{ item }}</span>

      <!-- Income -->
      <span
        class="line-chart-graph-dot"
        v-for="(item, index) in incValList"
        :key="index"
        :title="`매출 ${item}`"
        :style="`bottom: ${item * yHeightRatio}px; left: ${(index + 0.5) * xInterval}px`"
      >
        <span
          class="line-chart-graph-line"
          v-if="index < incValList.length"
          :style="`width: ${Math.sqrt((((incValList[index + 1] - item) * yHeightRatio) * ((incValList[index + 1] - item) * yHeightRatio)) + (xInterval * xInterval))}px; transform: rotate(${incValList[index + 1] > item ? '-' : '' }${180 / Math.PI * Math.atan((incValList[index + 1] - item) * yHeightRatio * (incValList[index + 1] > item ? 1 : -1)/ xInterval)}deg);`"
        ></span>
      </span>

      <!-- Outcome -->
      <span
        class="line-chart-graph-dot line-chart-graph-dot--pink"
        v-for="(item, index) in outcValList"
        :key="index"
        :title="`매출 ${item}`"
        :style="`bottom: ${item * yHeightRatio}px; left: ${(index + 0.5) * xInterval}px`"
      >
        <span
          class="line-chart-graph-line"
          v-if="index < outcValList.length"
          :style="`width: ${Math.sqrt((((outcValList[index + 1] - item) * yHeightRatio) * ((outcValList[index + 1] - item) * yHeightRatio)) + (xInterval * xInterval))}px; transform: rotate(${outcValList[index + 1] > item ? '-' : '' }${180 / Math.PI * Math.atan((outcValList[index + 1] - item) * yHeightRatio * (outcValList[index + 1] > item ? 1 : -1)/ xInterval)}deg);`"
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
      //   income: {
      //     "1월": 10,
      //     "2월": 39.9,
      //     "3월": 17,
      //     "4월": 30.0,
      //     "5월": 5.3,
      //     "6월": 38.4,
      //     "7월": 15.7,
      //     "8월": 9.0,
      //     "9월": 9.0,
      //     "10월": 9.0,
      //     "11월": 9.0,
      //     "12월": 9.0,
      //   },
      //   outcome: {
      //     "1": 20,
      //     "2": 15.9,
      //     "3": 10,
      //     "4": 16.0,
      //     "5": 9.3,
      //     "6": 10.4,
      //     "7": 6.7,
      //     "8": 16.0,
      //     "9": 8.0,
      //     "10": 6.0,
      //     "11": 6.0,
      //     "12": 6.0,
      //   },
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