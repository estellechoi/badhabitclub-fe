<template>
  <div class="donut-graph-outer">
    <div class="donut-graph-inner"></div>

    <div
      class="donut-graph-bar-outer"
      :style="`background-image: conic-gradient(rgb(61, 99, 246) ${ratio}%, rgba(0,0,0,0) ${ratio}% ${100 - ratio}%);`"
    >
      <div class="donut-graph-bar__inner">
        <div class="donut-graph-label">
          <span class="donut-graph-label__value">{{ ratio }} %</span>
          <span class="donut-graph-label__title">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propRatio: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      ratio: 0,
    };
  },
  mounted() {
    window.setInterval(() => {
      if (this.ratio < this.propRatio) this.ratio += 1;
    }, 10);
  },
};
</script>

<style>
</style>