<template>
  <label :for="id" class="text-box">
    <span class="checkbox" :class="{ 'checkbox--checked': model }">
      <input
        type="checkbox"
        aria-invalid="false"
        class="input--checkbox"
        :id="id"
        :value="value"
        v-model="model"
        @change="change"
      />
    </span>
    <span class="checkbox-label" :class="labelClass">
      {{
      label ? label : ""
      }}
    </span>
  </label>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    value: {
      type: String,
      default() {
        return "";
      },
    },
    checked: {
      type: Boolean,
      default() {
        return false;
      },
    },
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      model: false,
    };
  },
  watch: {
    checked(newVal) {
      this.model = newVal;
    },
  },
  methods: {
    change() {
      this.$emit("change", this.model);
    },
  },
  mounted() {
    this.model = this.checked;
  },
};
</script>

<style></style>
