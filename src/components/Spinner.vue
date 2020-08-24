<template>
  <div class="spinner">
    <button
      type="button"
      class="spinner__btn"
      aria-hidden="true"
      :disabled="valueNow <= min"
      @click="decrease"
    >-</button>

    <input
      type="number"
      class="spinner__cnt"
      role="spinbutton"
      autocomplete="off"
      :min="min"
      :max="max"
      :step="step"
      :aria-valuemin="min"
      :aria-valuenow="valueNow"
      :aria-label="`${label} 수량`"
      v-model="valueNow"
    />

    <button
      type="button"
      class="spinner__btn"
      aria-hidden="true"
      :disabled="valueNow >= max"
      @click="increase"
    >+</button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      valueNow: 1,
    };
  },
  watch: {
    value(newVal) {
      this.valueNow = newVal;
    },
    valueNow(newVal) {
      this.$emit("change", parseInt(newVal));
    },
  },
  methods: {
    increase() {
      this.valueNow = parseInt(this.valueNow) + this.step;
    },
    decrease() {
      this.valueNow = parseInt(this.valueNow) - this.step;
    },
  },
  mounted() {
    if (this.value !== 1) this.valueNow = this.value;
  },
};
</script>

<style></style>
