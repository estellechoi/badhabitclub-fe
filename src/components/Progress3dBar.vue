<template>
  <div class="progress-3d-container" :class="outerClass" :tabindex="tabindex">
    <div class="progress-3d-bar">
      <div class="barface barface--top">
        <div
          class="growing-bar"
          :style="`width:${ratio}%`"
          role="progressbar"
          :aria-valuemin="valuemin"
          :aria-valuemax="valuemax"
          :aria-valuenow="valuenow"
        ></div>
      </div>

      <div class="barface barface--side-0">
        <div class="growing-bar" :style="`width:${ratio}%`"></div>
      </div>

      <div class="barface barface--floor">
        <div class="growing-bar" :style="`width:${ratio}%`"></div>
      </div>

      <div class="barface barface--side-a"></div>
      <div class="barface barface--side-b"></div>

      <div class="barface barface--side-1">
        <div class="growing-bar" :style="`width:${ratio}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-3d-bar",
  props: {
    outerClass: {
      type: String,
      default: "",
    },
    valuenow: {
      type: Number,
      default: 0,
    },
    valuemin: {
      type: Number,
      default: 0,
    },
    valuemax: {
      type: Number,
      default: 100,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ratio() {
      return (this.valuenow / this.valuemax) * 100;
    },
  },
};
</script>

<style>
</style>