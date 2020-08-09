<template>
  <div class="radio-group">
    <div class="radio-box" v-for="(item, index) in list" :key="index">
      <label :for="`${idPrefix}-radio-${index}`">
        <div class="radio-box__container">
          <span class="radio-box__label">{{ item.label }}</span>

          <div class="radio-box__radio">
            <input
              type="radio"
              aria-invalid="false"
              class="input--radio"
              :id="`${idPrefix}-radio-${index}`"
              :value="item.value"
              v-model="model"
              @change="change"
            />
            <div class="radio">
              <div class="radio__dot" v-if="model===item.value"></div>
            </div>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "radio-group",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    idPrefix: {
      type: String,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    change() {
      this.$emit("change", this.model);
    },
  },
};
</script>

<style>
</style>