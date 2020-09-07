<template>
  <div :class="outerClass">
    <div class="progress-3d-container">
      <div class="progress-3d-bar">
        <div class="barface barface--top">
          <div
            class="growing-bar"
            :style="`width:${valuenow}%`"
            role="progressbar"
            :aria-valuemin="valuemin"
            :aria-valuemax="valuemax"
            :aria-valuenow="valuenow"
          ></div>
        </div>

        <div class="barface barface--side-0">
          <div class="growing-bar" :style="`width:${valuenow}%`"></div>
        </div>

        <div class="barface barface--floor">
          <div class="growing-bar" :style="`width:${valuenow}%`"></div>
        </div>

        <div class="barface barface--side-a"></div>
        <div class="barface barface--side-b"></div>

        <div class="barface barface--side-1">
          <div class="growing-bar" :style="`width:${valuenow}%`"></div>
        </div>
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
  },
};
</script>

<style>
</style>